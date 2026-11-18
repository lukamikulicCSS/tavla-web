/**
 * Izvor posjeta za kontakt formu i newsletter. Postoji SAMO ako je posjetitelj dao
 * pristanak na analitiku (tada ga tracker zapiše u sessionStorage). Inače vraća prazno.
 */
export type SessionSource = { ref?: string; utmSource?: string; utmMedium?: string; utmCampaign?: string; landing?: string };

export function readSessionSource(): SessionSource {
  try {
    const raw = sessionStorage.getItem("tavla_attr");
    if (!raw) return {};
    const a = JSON.parse(raw) as { ref?: string; us?: string; um?: string; uc?: string; landing?: string };
    return { ref: a.ref || undefined, utmSource: a.us || undefined, utmMedium: a.um || undefined, utmCampaign: a.uc || undefined, landing: a.landing || undefined };
  } catch {
    return {};
  }
}
