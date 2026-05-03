import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { userRepo } from "../repos/user.repo.js";
import { mailer } from "../lib/mailer.js";
import { AppError } from "../lib/errors.js";

function trialEnd() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d;
}

export const authService = {
  register: async (data: {
    email: string;
    name: string;
    password: string;
    termsAccepted: boolean;
  }) => {
    if (await userRepo.findByEmail(data.email))
      throw new AppError("Email already registered", 409);
    const passwordHash = await bcrypt.hash(data.password, 12);
    const verifyToken = nanoid(32);
    const now = new Date();
    const user = await userRepo.create({
      email: data.email,
      name: data.name,
      passwordHash,
      plan: "FREE",
      trialEndsAt: trialEnd(),
      verifyToken,
      termsAcceptedAt: now,
      privacyAcceptedAt: now,
    });
    await mailer.sendVerification(user.email, verifyToken).catch(() => {});
    await mailer.sendWelcome(user.email, user.name).catch(() => {});
    return sanitize(user);
  },

  login: async (email: string, password: string) => {
    const user = await userRepo.findByEmail(email);
    if (!user || !user.passwordHash)
      throw new AppError("Invalid credentials", 401);
    if (!(await bcrypt.compare(password, user.passwordHash)))
      throw new AppError("Invalid credentials", 401);
    // Gap 3: block unverified accounts
    if (!user.emailVerified)
      throw new AppError("Please verify your email before logging in", 403);
    // Gap 2: clear any pending reset token on successful login (prevent reuse)
    if (user.resetToken) {
      await userRepo.update(user.id, { resetToken: null, resetTokenExpiry: null });
    }
    return sanitize(user);
  },

  googleAuth: async (data: {
    googleId: string;
    email: string;
    name: string;
    avatar?: string;
  }) => {
    let user =
      (await userRepo.findByGoogleId(data.googleId)) ||
      (await userRepo.findByEmail(data.email));
    if (!user) {
      user = await userRepo.create({
        ...data,
        plan: "FREE",
        trialEndsAt: trialEnd(),
        emailVerified: true,
      });
      await mailer.sendWelcome(user.email, user.name).catch(() => {});
    } else if (!user.googleId) {
      user = await userRepo.update(user.id, {
        googleId: data.googleId,
        avatar: data.avatar,
      });
    }
    return sanitize(user);
  },

  verifyEmail: async (token: string) => {
    const user = await userRepo.findByVerifyToken(token);
    if (!user) throw new AppError("Invalid or expired token", 400);
    await userRepo.update(user.id, { emailVerified: true, verifyToken: null });
  },

  forgotPassword: async (email: string) => {
    const user = await userRepo.findByEmail(email);
    if (!user) return; // silent - don't reveal existence
    const token = nanoid(32);
    const expiry = new Date(Date.now() + 3600_000); // 1hr
    await userRepo.update(user.id, {
      resetToken: token,
      resetTokenExpiry: expiry,
    });
    await mailer.sendPasswordReset(user.email, token).catch(() => {});
  },

  resetPassword: async (token: string, password: string) => {
    const user = await userRepo.findByResetToken(token);
    if (!user) throw new AppError("Invalid or expired token", 400);
    const passwordHash = await bcrypt.hash(password, 12);
    await userRepo.update(user.id, {
      passwordHash,
      resetToken: null,
      resetTokenExpiry: null,
    });
  },

  resendVerification: async (userId: string) => {
    const user = await userRepo.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    if (user.emailVerified) throw new AppError("Email already verified", 400);
    const verifyToken = nanoid(32);
    await userRepo.update(userId, { verifyToken });
    await mailer.sendVerification(user.email, verifyToken).catch(() => {});
  },

  getMe: async (id: string) => {
    const user = await userRepo.findById(id);
    if (!user) throw new AppError("User not found", 404);
    return sanitize(user);
  },

  deleteAccount: async (id: string, password?: string) => {
    const user = await userRepo.findById(id);
    if (!user) throw new AppError("User not found", 404);
    // If password-based account, verify password before deletion
    if (user.passwordHash && password) {
      if (!(await bcrypt.compare(password, user.passwordHash)))
        throw new AppError("Incorrect password", 401);
    }
    await userRepo.softDelete(id);
  },

  exportData: async (id: string) => {
    const user = await userRepo.findWithData(id);
    if (!user) throw new AppError("User not found", 404);
    const {
      passwordHash,
      verifyToken,
      resetToken,
      resetTokenExpiry,
      ...safeUser
    } = user as any;
    return safeUser;
  },
};

function sanitize(user: any) {
  const { passwordHash, verifyToken, resetToken, resetTokenExpiry, ...rest } =
    user;
  return rest;
}
