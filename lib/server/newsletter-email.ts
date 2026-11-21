import { site } from "@/content/site";
import { getDict } from "@/content";
import type { Locale } from "@/content/routes";

/** Tamni, minimalni potvrdni mail u stilu stranice. Tablice + inline stilovi radi e-mail klijenata. */
export function confirmEmail(confirmUrl: string, unsubscribeUrl: string, locale: Locale = "hr") {
  const t = getDict(locale).messages.newsletter.email;
  const logo = `${site.url}/brand/tavla-icon-512.png`;
  const html = `<!doctype html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="color-scheme" content="dark light"><title>${t.htmlTitle}</title></head>
<body style="margin:0;padding:0;background:#0b0b0d;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0d;">
    <tr><td align="center" style="padding:48px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#171719;border-radius:28px;">
        <tr><td style="padding:40px 36px 8px;">
          <img src="${logo}" width="44" height="44" alt="Tavla" style="display:block;border-radius:12px;">
        </td></tr>
        <tr><td style="padding:24px 36px 0;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;">
          <h1 style="margin:0;color:#ffffff;font-size:26px;line-height:1.15;font-weight:600;letter-spacing:-0.5px;">${t.heading}</h1>
          <p style="margin:16px 0 0;color:#a1a1aa;font-size:16px;line-height:1.55;">
            ${t.body}
          </p>
        </td></tr>
        <tr><td style="padding:32px 36px 8px;">
          <a href="${confirmUrl}" style="display:inline-block;background:#ffffff;color:#0b0b0d;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;text-decoration:none;padding:15px 28px;border-radius:999px;">${t.button}</a>
        </td></tr>
        <tr><td style="padding:16px 36px 40px;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#71717a;font-size:13px;line-height:1.6;">
          ${t.expiry}
        </td></tr>
      </table>
      <p style="margin:24px 0 0;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#52525b;font-size:12px;line-height:1.6;">
        Tavla · <a href="${site.url}" style="color:#71717a;">tavlahr.com</a> · <a href="${unsubscribeUrl}" style="color:#71717a;">${t.unsubscribe}</a>
      </p>
    </td></tr>
  </table>
</body>
</html>`;
  const text = `${t.textIntro}

${t.textBody}
${confirmUrl}

${t.textExpiry}

${t.unsubscribe}: ${unsubscribeUrl}`;
  return { html, text };
}
