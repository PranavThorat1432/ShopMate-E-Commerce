export const generateEmail = (resetPasswordUrl) => {
    return `
        <div style="background-color: #ffffff; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #ffffff; line-height: 1.6;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #1a1d21; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid #2d3136;">
                
                <div style="padding: 30px 40px 20px 40px; text-align: center;">
                    <div style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                        ShopMate ECommerce
                    </div>
                </div>

                <div style="padding: 0 40px 40px 40px; text-align: center;">
                    <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 12px; color: #ffffff;">Reset your password</h2>
                    <p style="font-size: 15px; color: #9ca3af; margin-bottom: 32px;">
                        We received a request to reset the password for your account. No changes have been made yet.
                    </p>

                    <a href="${resetPasswordUrl}" 
                    style="display: inline-block; background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%); color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(255,255,255,0.1);">
                        Reset Password
                    </a>

                    <p style="font-size: 13px; color: #6b7280; margin-top: 32px;">
                        This link will expire in <span style="color: #ef4444; font-weight: 600;">10 minutes</span>.
                    </p>
                </div>

                <div style="padding: 24px 40px; background-color: #14171a; border-top: 1px solid #2d3136; text-align: center;">
                    <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">Button not working? Copy this link:</p>
                    <p style="font-size: 12px; color: #3b82f6; word-break: break-all; margin: 0;">${resetPasswordUrl}</p>
                </div>
            </div>

            <div style="max-width: 500px; margin: 24px auto 0; text-align: center; font-size: 12px; color: #4b5563;">
                <p style="margin-bottom: 4px;">&copy; 2026 ShopMate Team. All rights reserved.</p>
                <p>If you didn't request this, you can safely ignore this email.</p>
            </div>
        </div>
    `;
};