import { Resend } from 'resend';

export interface EmailInquiryData {
  name: string;
  email: string;
  whatsapp?: string;
  message: string;
  timestamp?: string;
}

export interface EmailSettings {
  resendApiKey?: string;
  resendFromEmail?: string;
  adminEmail?: string;
}

// Resolve Resend configuration from environment variables or database settings
export function getResendClient(settings?: EmailSettings) {
  const apiKey = (process.env.RESEND_API_KEY || settings?.resendApiKey || '').trim();
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export function getFromEmail(settings?: EmailSettings): string {
  const customFrom = (process.env.RESEND_FROM_EMAIL || settings?.resendFromEmail || '').trim();
  if (customFrom) {
    const match = customFrom.match(/<([^>]+)>/);
    const emailOnly = (match ? match[1] : customFrom).replace(/["']/g, '').trim();
    const domain = emailOnly.split('@')[1]?.toLowerCase();
    
    // Public webmail domains cannot be verified on Resend and will cause 403 validation_error
    const publicWebmail = [
      'gmail.com', 'googlemail.com', 'yahoo.com', 'ymail.com', 
      'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 
      'icloud.com', 'me.com', 'mac.com', 'aol.com', 'proton.me', 'protonmail.com'
    ];
    
    if (domain && !publicWebmail.includes(domain)) {
      return customFrom.includes('<') ? customFrom : `Nilesh Mali <${customFrom}>`;
    }
  }
  // Default Resend sandbox sender
  return 'Nilesh Mali <onboarding@resend.dev>';
}

/**
 * Generates responsive and clean HTML email template for the visitor's auto-thank-you email
 */
export function getVisitorThankYouEmailHtml(data: EmailInquiryData): string {
  const safeName = data.name || 'there';
  const safeMessage = (data.message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');
  const safeWhatsapp = data.whatsapp || 'Not provided';
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Getting in Touch</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0d0d0d; width: 100% !important;">
    <tr>
      <td align="center" style="padding: 40px 15px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 580px; background-color: #141414; border: 1px solid #262626; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background: linear-gradient(135deg, #1c1c1c 0%, #121212 100%); border-bottom: 2px solid #D1FF52;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #D1FF52; margin-bottom: 6px;">PORTFOLIO & STUDIO</span>
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; text-transform: uppercase;">NILESH MALI</h1>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #a3a3a3;">Graphic Designer & Creative Specialist • Abu Road, Rajasthan</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 32px 28px 32px;">
              <h2 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                Thanks for reaching out, ${safeName}! ✨
              </h2>
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #d4d4d4;">
                Thank you for taking the time to send an inquiry. I have received your message and will review your project details carefully.
              </p>

              <!-- Details Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #1a1a1a; border: 1px solid #2e2e2e; border-radius: 12px; margin: 24px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #D1FF52; margin-bottom: 12px;">
                      SUMMARY OF YOUR INQUIRY
                    </div>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #888888; width: 100px;">Name:</td>
                        <td style="padding: 4px 0; font-size: 14px; font-weight: 600; color: #ffffff;">${safeName}</td>
                      </tr>
                      ${data.whatsapp ? `
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #888888;">WhatsApp:</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #ffffff;">${safeWhatsapp}</td>
                      </tr>
                      ` : ''}
                      ${data.email ? `
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #888888;">Email:</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #ffffff;">${data.email}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 8px 0 4px 0; font-size: 13px; color: #888888; vertical-align: top;">Message:</td>
                        <td style="padding: 8px 0 4px 0; font-size: 14px; line-height: 1.5; color: #e5e5e5;">${safeMessage}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What to Expect -->
              <h3 style="margin: 28px 0 10px 0; font-size: 15px; font-weight: 700; color: #ffffff;">
                What happens next?
              </h3>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #a3a3a3;">
                I typically respond to inquiries within <strong>24 hours</strong>. If your requirement is urgent or you would like to share design references right away, feel free to drop me a quick message on WhatsApp.
              </p>

              <!-- Action Buttons -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 24px 0 12px 0;">
                <tr>
                  <td style="border-radius: 8px; background-color: #D1FF52;">
                    <a href="https://api.whatsapp.com/send/?phone=916378954363&text=Hi+Nilesh%2C+I+just+submitted+the+contact+form+on+your+website." target="_blank" style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: 700; color: #000000; text-decoration: none; border-radius: 8px; letter-spacing: 0.3px;">
                      Chat on WhatsApp &rarr;
                    </a>
                  </td>
                  <td style="padding-left: 14px;">
                    <a href="https://www.instagram.com/_nilesh._.mali_/" target="_blank" style="display: inline-block; padding: 12px 20px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border: 1px solid #333333; border-radius: 8px;">
                      Instagram @_nilesh._.mali_
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #0f0f0f; border-top: 1px solid #222222; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #737373;">
                &copy; ${year} Nilesh Mali • Abu Road, Rajasthan, India
              </p>
              <p style="margin: 0; font-size: 11px; color: #525252;">
                This automated confirmation was sent via Resend because you submitted a contact inquiry on Nilesh Mali's Portfolio.
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
}

/**
 * Generates notification email HTML sent directly to Nilesh Mali (Admin)
 */
export function getAdminNotificationEmailHtml(data: EmailInquiryData): string {
  const safeName = data.name || 'Website Visitor';
  const safeEmail = data.email || 'Not provided';
  const safeWhatsapp = data.whatsapp || 'Not provided';
  const safeMessage = (data.message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');
  const timestamp = data.timestamp || new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

  const cleanDigits = (data.whatsapp || '').replace(/[^0-9]/g, '');
  const waLink = cleanDigits ? `https://wa.me/${cleanDigits}` : null;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Client Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 580px; background-color: #1e293b; border: 1px solid #334155; border-radius: 14px; overflow: hidden;">
          <tr>
            <td style="padding: 24px 28px; background-color: #0f172a; border-bottom: 2px solid #38bdf8;">
              <span style="font-size: 11px; font-weight: 700; color: #38bdf8; letter-spacing: 1.5px; text-transform: uppercase;">NEW LEAD ALERT</span>
              <h1 style="margin: 6px 0 0 0; font-size: 22px; color: #ffffff;">New Message from ${safeName}</h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">Received on ${timestamp}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; width: 110px;">Client Name:</td>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #ffffff;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8;">Email Address:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #38bdf8;">
                    ${data.email ? `<a href="mailto:${data.email}" style="color: #38bdf8; text-decoration: underline;">${data.email}</a>` : 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8;">WhatsApp / Phone:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #ffffff;">
                    ${data.whatsapp ? `${data.whatsapp} ${waLink ? `(<a href="${waLink}" style="color: #4ade80; text-decoration: underline;">Open WhatsApp</a>)` : ''}` : 'Not provided'}
                  </td>
                </tr>
              </table>

              <div style="background-color: #0f172a; border-left: 3px solid #38bdf8; padding: 16px; border-radius: 6px; margin: 20px 0;">
                <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px;">Visitor Message</div>
                <div style="font-size: 14px; line-height: 1.6; color: #f1f5f9;">${safeMessage}</div>
              </div>

              ${data.email ? `
              <div style="margin-top: 24px;">
                <a href="mailto:${data.email}?subject=Re:%20Your%20Inquiry%20to%20Nilesh%20Mali" style="display: inline-block; background-color: #38bdf8; color: #0f172a; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
                  Reply Directly via Email &rarr;
                </a>
              </div>
              ` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Sends both visitor confirmation (auto thanks email) and admin lead notification via Resend
 */
export async function sendInquiryEmails(
  inquiry: EmailInquiryData,
  settings?: EmailSettings
): Promise<{
  visitorEmailSent: boolean;
  adminEmailSent: boolean;
  note?: string;
  error?: string;
}> {
  const resend = getResendClient(settings);
  if (!resend) {
    return {
      visitorEmailSent: false,
      adminEmailSent: false,
      note: 'Resend API key not configured. Inquiry saved to database.'
    };
  }

  const fromEmail = getFromEmail(settings);
  const adminTargetEmail = (settings?.adminEmail || process.env.ADMIN_EMAIL || 'work.nileshmali@gmail.com').trim();
  const isResendSandbox = fromEmail.includes('@resend.dev');

  let visitorEmailSent = false;
  let adminEmailSent = false;
  const errors: string[] = [];
  let sandboxNote = '';

  // 1. Send Auto "Thank You" confirmation email to visitor if email was provided
  if (inquiry.email && inquiry.email.includes('@')) {
    const visitorEmail = inquiry.email.trim();
    const isVisitorSameAsAdmin = adminTargetEmail && visitorEmail.toLowerCase() === adminTargetEmail.toLowerCase();

    // In Resend sandbox mode (@resend.dev), Resend strictly permits sending only to the registered account owner's email.
    // Attempting to send to arbitrary third-party visitor emails triggers 403 validation_error from Resend API.
    if (isResendSandbox && !isVisitorSameAsAdmin) {
      sandboxNote = 'In Resend sandbox mode (onboarding@resend.dev), auto-emails to external visitor inboxes require a verified custom domain at resend.com/domains. Lead details delivered to admin.';
    } else {
      try {
        const visitorResult = await resend.emails.send({
          from: fromEmail,
          to: visitorEmail,
          subject: `Thanks for reaching out, ${inquiry.name || 'Friend'}! | Nilesh Mali`,
          html: getVisitorThankYouEmailHtml(inquiry),
          replyTo: adminTargetEmail
        });

        if (visitorResult.error) {
          errors.push(`Visitor email: ${visitorResult.error.message}`);
        } else {
          visitorEmailSent = true;
        }
      } catch (err: any) {
        errors.push(`Visitor email: ${err?.message || err}`);
      }
    }
  }

  // 2. Send Lead Notification email to Nilesh Mali (Admin)
  if (adminTargetEmail) {
    try {
      const adminResult = await resend.emails.send({
        from: fromEmail,
        to: adminTargetEmail,
        subject: `🚀 New Lead: ${inquiry.name || 'Website Visitor'}${inquiry.whatsapp ? ` (${inquiry.whatsapp})` : ''}`,
        html: getAdminNotificationEmailHtml(inquiry),
        replyTo: inquiry.email ? inquiry.email.trim() : undefined
      });

      if (adminResult.error) {
        errors.push(`Admin email: ${adminResult.error.message}`);
      } else {
        adminEmailSent = true;
      }
    } catch (err: any) {
      errors.push(`Admin email: ${err?.message || err}`);
    }
  }

  return {
    visitorEmailSent,
    adminEmailSent,
    note: visitorEmailSent 
      ? 'Auto thank-you email sent successfully via Resend!' 
      : (sandboxNote || (adminEmailSent ? 'Lead notification sent to Admin.' : undefined)),
    error: errors.length > 0 ? errors.join('; ') : undefined
  };
}

/**
 * Test function to verify Resend API Key from Admin Dashboard
 */
export async function sendTestResendEmail(
  targetEmail: string,
  settings?: EmailSettings
): Promise<{ success: boolean; message: string; id?: string }> {
  const resend = getResendClient(settings);
  if (!resend) {
    return {
      success: false,
      message: 'Resend API Key is missing. Please set RESEND_API_KEY or configure it in Settings.'
    };
  }

  const fromEmail = getFromEmail(settings);
  const adminTargetEmail = (settings?.adminEmail || process.env.ADMIN_EMAIL || 'work.nileshmali@gmail.com').trim();
  const isResendSandbox = fromEmail.includes('@resend.dev');
  const recipient = (targetEmail || adminTargetEmail).trim();

  // If in sandbox mode and target is not owner's email, warn user before making the forbidden call
  if (isResendSandbox && adminTargetEmail && recipient.toLowerCase() !== adminTargetEmail.toLowerCase()) {
    return {
      success: false,
      message: `In Resend sandbox mode (${fromEmail}), test emails can only be sent to your registered account email (${adminTargetEmail}). To send to other emails, please verify your custom domain at resend.com/domains.`
    };
  }

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      subject: '✅ Resend API Test Email - Nilesh Mali Portfolio',
      html: `
        <div style="font-family: sans-serif; background: #111; color: #fff; padding: 30px; border-radius: 12px; max-width: 500px;">
          <h2 style="color: #D1FF52; margin-top: 0;">Resend API is Working! 🎉</h2>
          <p>This is a test email from your Nilesh Mali portfolio website backend.</p>
          <p style="color: #aaa; font-size: 13px;">Sender: ${fromEmail}</p>
          <p style="color: #aaa; font-size: 13px;">Recipient: ${recipient}</p>
          <p style="color: #aaa; font-size: 13px;">Timestamp: ${new Date().toISOString()}</p>
          <div style="margin-top: 20px; padding: 12px; background: #222; border-radius: 8px; font-size: 12px; color: #4ade80;">
            Auto-email on contact form submissions is active and operational.
          </div>
        </div>
      `,
      replyTo: adminTargetEmail
    });

    if (result.error) {
      return {
        success: false,
        message: result.error.message
      };
    }

    return {
      success: true,
      message: `Test email sent successfully to ${recipient}! Message ID: ${result.data?.id || 'OK'}`,
      id: result.data?.id
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Error occurred while testing Resend email'
    };
  }
}
