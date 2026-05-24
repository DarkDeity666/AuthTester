export function generateOtp(){
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
}

export function getOtpHtml(otp){
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Identity</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f6f9fc; padding: 40px 0;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03); border: 1px solid #eef2f6;">
          <!-- Header -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 40px 20px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Verification Required</h1>
              <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 14px;">Please use the verification code below</p>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 32px; background-color: #ffffff;">
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 24px; color: #334155;">Hello,</p>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #475569;">Thank you for registering! To complete your sign-up process and secure your account, please enter the following One-Time Password (OTP) on the verification screen:</p>
              
              <!-- OTP Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 20px 30px; display: inline-block;">
                      <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 800; letter-spacing: 8px; color: #4f46e5; display: inline-block; margin-left: 8px;">${otp}</span>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 22px; color: #64748b;">This OTP is valid for the next <strong>10 minutes</strong>. For security reasons, please do not share this code with anyone.</p>
              <p style="margin: 0 0 8px 0; font-size: 14px; line-height: 22px; color: #64748b;">If you did not request this code, you can safely ignore this email.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #94a3b8;">&copy; 2026 AuthTester. All rights reserved.</p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #cbd5e1;">This is an automated security message. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}