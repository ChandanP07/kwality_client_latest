import nodemailer from 'nodemailer';
import { Resend } from 'resend';

// Check if we're using Resend or Nodemailer
const useResend = process.env.RESEND_API_KEY;
const resend = useResend ? new Resend(process.env.RESEND_API_KEY) : null;

// Check if email is configured for nodemailer
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

// Create transporter only if email is configured and not using Resend
const transporter = (!useResend && isEmailConfigured) ? nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
}) : null;

// Development fallback - logs to console instead of sending email
async function logEmailToDevelopment(to: string, subject: string, content: string, url?: string) {
  console.log('═══════════════════════════════════════════');
  console.log('📧 EMAIL (Development Mode)');
  console.log('═══════════════════════════════════════════');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  if (url) {
    console.log(`Link: ${url}`);
  }
  console.log('───────────────────────────────────────────');
  console.log('Email content logged to console.');
  console.log('In production, this would be sent via email.');
  console.log('═══════════════════════════════════════════');
}

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify your Kwality Enterprise account</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center;">
                    <div style="display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">Kwality Enterprise</h1>
                    </div>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 28px; font-weight: bold; text-align: center;">Welcome to Kwality Enterprise!</h2>
                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 24px; text-align: center;">
                      Thank you for signing up. Please verify your email address to complete your registration and access all features.
                    </p>
                  </td>
                </tr>
                
                <!-- Button -->
                <tr>
                  <td style="padding: 0 40px 30px 40px; text-align: center;">
                    <a href="${verifyUrl}" style="display: inline-block; padding: 14px 30px; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 50px; text-transform: uppercase;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
                
                <!-- Alternative Link -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px; text-align: center;">
                      Or copy and paste this link in your browser:
                    </p>
                    <p style="margin: 0; word-break: break-all; color: #4a90e2; font-size: 14px; text-align: center;">
                      <a href="${verifyUrl}" style="color: #4a90e2; text-decoration: underline;">
                        ${verifyUrl}
                      </a>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px; text-align: center;">
                      This link will expire in 24 hours for security reasons.
                    </p>
                    <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                      If you didn't create an account with Kwality Enterprise, please ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  // If using Resend
  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'Kwality Enterprise <onboarding@resend.dev>',
        to: email,
        subject: 'Verify your Kwality Enterprise account',
        html: htmlContent,
      });
      
      if (error) {
        console.error('Resend error:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw error;
    }
  }
  
  // If using Nodemailer
  if (transporter) {
    const mailOptions = {
      from: `"Kwality Enterprise" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your Kwality Enterprise account',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return;
  }
  
  // Development mode - log to console
  await logEmailToDevelopment(
    email,
    'Verify your Kwality Enterprise account',
    'Please verify your email address',
    verifyUrl
  );
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset your Kwality Enterprise password</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center;">
                    <div style="display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">Kwality Enterprise</h1>
                    </div>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 28px; font-weight: bold; text-align: center;">Password Reset Request</h2>
                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 24px; text-align: center;">
                      We received a request to reset your password. Click the button below to create a new password.
                    </p>
                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 24px; text-align: center;">
                      If you didn't request this, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
                
                <!-- Button -->
                <tr>
                  <td style="padding: 0 40px 30px 40px; text-align: center;">
                    <a href="${resetUrl}" style="display: inline-block; padding: 14px 30px; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 50px; text-transform: uppercase;">
                      Reset Password
                    </a>
                  </td>
                </tr>
                
                <!-- Alternative Link -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px; text-align: center;">
                      Or copy and paste this link in your browser:
                    </p>
                    <p style="margin: 0; word-break: break-all; color: #4a90e2; font-size: 14px; text-align: center;">
                      <a href="${resetUrl}" style="color: #4a90e2; text-decoration: underline;">
                        ${resetUrl}
                      </a>
                    </p>
                  </td>
                </tr>
                
                <!-- Security Notice -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <div style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; padding: 12px;">
                      <p style="margin: 0; color: #856404; font-size: 14px;">
                        <strong>Security Notice:</strong> This password reset link will expire in 1 hour. For your security, please do not share this email with anyone.
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px; text-align: center;">
                      This is an automated email from Kwality Enterprise. Please do not reply to this email.
                    </p>
                    <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                      © ${new Date().getFullYear()} Kwality Enterprise. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  // If using Resend
  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'Kwality Enterprise <onboarding@resend.dev>',
        to: email,
        subject: 'Reset your Kwality Enterprise password',
        html: htmlContent,
      });
      
      if (error) {
        console.error('Resend error:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw error;
    }
  }
  
  // If using Nodemailer
  if (transporter) {
    const mailOptions = {
      from: `"Kwality Enterprise" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset your Kwality Enterprise password',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return;
  }
  
  // Development mode - log to console
  await logEmailToDevelopment(
    email,
    'Reset your Kwality Enterprise password',
    'Password reset request',
    resetUrl
  );
}

// Welcome email after successful registration
export async function sendWelcomeEmail(email: string, name: string) {
  const loginUrl = `${process.env.NEXTAUTH_URL}/login`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Kwality Enterprise</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center;">
                    <div style="display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">Kwality Enterprise</h1>
                    </div>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 28px; font-weight: bold; text-align: center;">
                      Welcome aboard, ${name}! 🎉
                    </h2>
                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 24px;">
                      Your account has been successfully created. You now have access to all Kwality Enterprise features:
                    </p>
                    
                    <ul style="margin: 20px 0; padding-left: 20px; color: #666666; font-size: 16px; line-height: 28px;">
                      <li>Create and track orders</li>
                      <li>Register and monitor complaints</li>
                      <li>Manage your print assets</li>
                      <li>View and pay bills online</li>
                      <li>Update branch locations</li>
                    </ul>
                  </td>
                </tr>
                
                <!-- Button -->
                <tr>
                  <td style="padding: 0 40px 30px 40px; text-align: center;">
                    <a href="${loginUrl}" style="display: inline-block; padding: 14px 30px; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 50px;">
                      Login to Dashboard
                    </a>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                      Need help? Contact our support team at support@kwalityenterprise.com
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  if (transporter) {
    const mailOptions = {
      from: `"Kwality Enterprise" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to Kwality Enterprise, ${name}!`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
  }
}