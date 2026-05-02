import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const from = `${process.env.GMAIL_FROM || process.env.GMAIL_USER}`
const appUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

export const mailer = {
  sendVerification: (email: string, token: string) =>
    transporter.sendMail({
      from,
      to: email,
      subject: 'Verify your Urli account',
      html: `<p>Click to verify: <a href="${appUrl}/verify-email?token=${token}">Verify Email</a></p><p>Expires in 24 hours.</p>`,
    }),

  sendPasswordReset: (email: string, token: string) =>
    transporter.sendMail({
      from,
      to: email,
      subject: 'Reset your Urli password',
      html: `<p>Click to reset: <a href="${appUrl}/reset-password?token=${token}">Reset Password</a></p><p>Expires in 1 hour.</p>`,
    }),

  sendWelcome: (email: string, name: string) =>
    transporter.sendMail({
      from,
      to: email,
      subject: 'Welcome to Urli 🔗',
      html: `<p>Hi ${name},</p><p>Welcome to Urli! Your 30-day Pro trial has started.</p><p><a href="${appUrl}/dashboard">Go to Dashboard</a></p>`,
    }),
}
