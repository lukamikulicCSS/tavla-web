import { ui } from "./ui";
import { home } from "./home";
import { messages } from "./messages";
import { demo } from "./demo";
import { guestFeatures, staffFeatures, ownerFeatures } from "./features";
import { pillars, aiOverview } from "./ai";
import { faq } from "./faq";
import { industries } from "./industries";
import { team } from "./team";
import { partners } from "./partners";
import { testimonials, partnerLogos } from "./testimonials";

export const dict = {
  ui,
  home,
  messages,
  demo,
  features: { guest: guestFeatures, staff: staffFeatures, owner: ownerFeatures },
  ai: { pillars, overview: aiOverview },
  faq,
  industries,
  team,
  partners,
  testimonials,
  partnerLogos,
};
