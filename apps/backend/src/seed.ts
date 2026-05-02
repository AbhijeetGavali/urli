/**
 * Seed script: creates an ADMIN user or promotes existing user to ADMIN
 * Usage: pnpm db:seed -- --email admin@example.com --name "Admin"
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const args = process.argv.slice(2);
const get = (flag: string) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

const email = get("--email") || "admin@urli.ideasprout.in";
const name = get("--name") || "Admin";
const password = get("--password") || "Admin@123456";

async function main() {
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { role: "ADMIN", plan: "BUSINESS" },
    });
    console.log(`✅ Promoted ${email} to ADMIN`);
  } else {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "ADMIN",
        plan: "BUSINESS",
        emailVerified: true,
      },
    });
    console.log(`✅ Created ADMIN user: ${email} / ${password}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
