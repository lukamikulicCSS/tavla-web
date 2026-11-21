/**
 * English translation of content/hr/ai.ts.
 * slug, id, status, ai and visual MUST match the Croatian file (checked at build time in content/index.ts).
 * anchor = in-page anchor on the English pillar page.
 *
 * [PROVJERI s Antom] status of every item before publishing.
 */
import type { AiOverview, AiPillar } from "../types";

export const pillars: AiPillar[] = [
  {
    slug: "poslovanje",
    name: "Run a smoother operation",
    headline: "Less running. More tables served.",
    lead: "Orders, calls and bill requests reach staff with the table number, and the menu updates without reprinting.",
    metaTitle: "Tavla for operations: staff panel and AI Menu",
    metaDescription:
      "Orders and calls reach staff with the table number. AI Menu, in development, writes item descriptions and translations, and the owner approves everything.",
    features: [
      {
        id: "panel-za-osoblje",
        anchor: "staff-panel",
        name: "Staff panel",
        short: "Orders arrive with the table number",
        title: "Every order on one screen.",
        body: "Orders, waiter calls and bill requests arrive live, with table number and notes. Staff update the status in one tap, and the guest sees it on their phone.",
        points: ["Live orders with table number", "Calls and bills in the same place", "Status visible to the guest too"],
        status: "live",
        ai: false,
        visual: "staff",
      },
      {
        id: "ai-menu",
        anchor: "ai-menu",
        name: "AI Menu",
        short: "Descriptions, translations and item order",
        title: "A menu written and arranged with AI.",
        body: "AI suggests item descriptions, translates the menu and proposes the order and highlights based on your sales. Nothing reaches guests until you approve it.",
        points: ["Suggested descriptions and translations", "Order based on real sales", "You approve every change"],
        status: "soon",
        ai: true,
        visual: "menu",
      },
      {
        id: "integracija-s-kasom",
        anchor: "pos-integration",
        name: "POS integration",
        short: "Orders go into your POS",
        title: "Orders go straight into your POS.",
        // [PROVJERI: s kojim kasama Tavla radi ili će raditi]
        body: "Orders from the guest's phone are entered into your existing POS, with no manual re-typing. We will publish the list of supported systems once the integration is ready.",
        points: ["No double entry", "Fiscalization stays in your POS", "Fewer billing mistakes"],
        status: "soon",
        ai: false,
        visual: "pos",
      },
      {
        id: "jezik-gosta",
        anchor: "guest-language",
        name: "Guest language",
        short: "Menu in Croatian and English",
        title: "Guests read the menu in their language.",
        body: "The menu is available in Croatian and English. Guests switch language in one tap, and you edit both translations in one place.",
        points: ["Croatian and English", "Switch language in one tap", "Translations next to each item, in one place"],
        status: "live",
        ai: false,
        visual: "language",
      },
    ],
    aiSteps: [
      "AI reads your items, categories and sales by hour.",
      "It suggests descriptions, translations and menu order.",
      "You review, edit and approve. Only then do guests see the change.",
    ],
    faq: [
      {
        q: "Does AI Menu change my menu without my approval?",
        a: "No. AI Menu only suggests descriptions, translations and order. Every change waits for your approval before guests see it.",
      },
      {
        q: "Do staff need special hardware for the panel?",
        a: "No. The staff panel runs in the browser on the tablet, phone or computer you already have.",
      },
      {
        q: "Which POS systems does the integration support?",
        a: "The POS integration is in development. We will publish the list of supported systems when it is ready. Until then, tell us which POS you use.",
      },
    ],
  },
  {
    slug: "tim",
    name: "Keep and motivate your team",
    headline: "A team that knows the effort shows.",
    lead: "Tips, ratings and recognition tied to the waiter who actually served the table.",
    metaTitle: "Tavla for teams: AI Tips and waiter profiles",
    metaDescription:
      "AI Tips, in development, suggests a tip based on the bill, and the guest always decides. Waiter profiles show performance and ratings.",
    features: [
      {
        id: "ai-tips",
        anchor: "ai-tips",
        name: "AI Tips",
        short: "Suggested tip at checkout",
        title: "Tipping without the awkward moment.",
        body: "When paying by phone, the guest sees a suggested tip matched to the bill. They can always choose another amount, or none.",
        points: ["Suggestion based on the bill", "The guest always decides", "Tips are linked to the waiter"],
        status: "soon",
        ai: true,
        visual: "tips",
      },
      {
        id: "profili-konobara",
        anchor: "waiter-profiles",
        name: "Waiter profiles",
        short: "Performance and ratings per waiter",
        title: "Every waiter has a profile.",
        body: "Owners see who took how many orders, how fast, and how guests rated them. Waiters see their own progress.",
        points: ["Orders served and speed", "Guest ratings per waiter", "Overview by shift"],
        status: "soon",
        ai: false,
        visual: "staff",
      },
      {
        id: "konobar-mjeseca",
        anchor: "waiter-of-the-month",
        name: "Waiter of the month",
        short: "Recognition for the best",
        title: "Recognition based on guest ratings.",
        body: "At the end of each month, Tavla suggests the waiter with the best guest ratings. You decide whether and how to reward them.",
        points: ["Based on guest ratings", "You confirm the choice", "Visible to the whole team"],
        status: "planned",
        ai: false,
        visual: "insights",
      },
    ],
    aiSteps: [
      "AI looks at the bill and the usual tips at your venue.",
      "It suggests three amounts, with one highlighted.",
      "The guest picks one, enters their own or skips. You set the rules.",
    ],
    faq: [
      {
        q: "Does the guest have to leave a tip?",
        a: "No. AI Tips only suggests an amount. The guest can always enter another amount or skip the tip.",
      },
      {
        q: "Who gets the tip?",
        a: "The tip is recorded against the waiter who served the table. How tips are shared within the team is up to the venue owner.",
      },
      {
        q: "Can waiters see each other's ratings?",
        a: "No. Each waiter sees their own profile. Only the owner or manager sees the full overview.",
      },
    ],
  },
  {
    slug: "gosti",
    name: "Attract and engage guests",
    headline: "Guests who come back.",
    lead: "A loyalty program, recommendations and a menu in your venue's style.",
    metaTitle: "Tavla for guests: Tavla+ loyalty and AI recommendations",
    metaDescription:
      "Tavla+ loyalty and AI drink recommendations by time of day are in development. The venue owner always sets the perks and rules.",
    features: [
      {
        id: "tavla-plus",
        anchor: "tavla-plus",
        name: "Tavla+ loyalty",
        short: "Points, credits and perks",
        title: "A loyalty program guests actually use.",
        body: "Guests collect points and credits with every order. The owner sets up the program, and guests use it at every venue with Tavla.",
        points: ["You set the rules and perks", "No plastic cards", "One account for every Tavla venue"],
        status: "soon",
        ai: false,
        visual: "loyalty",
      },
      {
        id: "ai-preporuke",
        anchor: "ai-recommendations",
        name: "AI recommendations",
        short: "Picks by time of day",
        title: "The right drink at the right time.",
        body: "The menu recommends a drink based on the time of day and what the guest has already ordered. Recommendations are based on orders at the venue, not on the guest's personal data.",
        points: ["By time of day", "Based on what's already ordered", "You choose what can be recommended"],
        status: "soon",
        ai: true,
        visual: "menu",
      },
      {
        id: "stalni-gosti",
        anchor: "regulars",
        name: "Recognizing regulars",
        short: "Regulars, recognized",
        title: "Regulars feel like regulars.",
        body: "Guests who join Tavla+ can be recognized when they return, with their consent. Staff see only what the guest allows.",
        points: ["Only with the guest's consent", "Favorite orders at hand", "No data shared with other venues"],
        status: "planned",
        ai: false,
        visual: "loyalty",
      },
      {
        id: "ai-branding",
        anchor: "ai-branding",
        name: "AI Branding",
        short: "A menu in your style",
        title: "Menu and table stands in your venue's style.",
        body: "Menu and table stands in your venue's colors and style, with AI-suggested visuals. You choose and approve the final look.",
        points: ["Your colors and style", "AI-suggested visuals", "The final choice is yours"],
        status: "planned",
        ai: true,
        visual: "branding",
      },
      {
        id: "narudzba-unaprijed",
        anchor: "order-ahead",
        name: "Order ahead and takeaway",
        short: "Order before arriving",
        title: "The order is in before the guest sits down.",
        body: "Guests order ahead or for takeaway from the same menu. The order reaches staff like any other.",
        points: ["Same menu, same panel", "Less waiting at peak times", "You decide when it's available"],
        status: "planned",
        ai: false,
        visual: "staff",
      },
    ],
    aiSteps: [
      "AI looks at what is ordered at your venue at each time of day.",
      "It suggests a drink that goes well with what the guest has already ordered.",
      "You choose which items can be recommended, and when.",
    ],
    faq: [
      {
        q: "Does Tavla use guests' personal data for recommendations?",
        a: "No. AI recommendations are based on orders at the venue and the time of day, and guests' personal data is not used to train models.",
      },
      {
        q: "Who decides the loyalty perks?",
        a: "The venue owner. You set how many points an order is worth and what guests get for them.",
      },
      {
        q: "Is Tavla+ available yet?",
        a: "Tavla+ is in development. Sign up for updates and we'll let you know when you can turn it on at your venue.",
      },
    ],
  },
  {
    slug: "rast",
    name: "Grow your business",
    headline: "Decisions based on data, not gut feeling.",
    lead: "Sales by hour, best sellers and a weekly summary that tells you what to do.",
    metaTitle: "Tavla for growth: sales analytics and AI insights",
    metaDescription:
      "Revenue by hour, best sellers and table activity at a glance. AI insights, in development, send a weekly summary with suggestions.",
    features: [
      {
        id: "analitika-prodaje",
        anchor: "sales-analytics",
        name: "Sales analytics",
        short: "Revenue by hour and item",
        title: "See how the day is going.",
        // [PROVJERI: koliko je od analitike vidljivo vlasniku u sučelju danas]
        body: "Revenue and order count by hour, best sellers and table activity, on one screen.",
        points: ["Revenue by hour and day", "Best sellers", "Table activity"],
        status: "live",
        ai: false,
        visual: "analytics",
      },
      {
        id: "ai-uvidi",
        anchor: "ai-insights",
        name: "AI insights",
        short: "Weekly summary with suggestions",
        title: "A weekly summary in plain language.",
        body: "Once a week you get a short summary with suggestions, e.g. “On Tuesdays from 5 to 7 pm, lemonade sales go up. Feature it on the menu.” You decide what to do.",
        points: ["Short, no spreadsheets", "A suggestion with every insight", "Based on your sales"],
        status: "soon",
        ai: true,
        visual: "insights",
      },
      {
        id: "analitika-gostiju",
        anchor: "guest-analytics",
        name: "Guest analytics",
        short: "Returning guests and spend",
        title: "Who comes back, and how often.",
        body: "Share of returning guests, average spend and visit frequency, from anonymized order data.",
        points: ["Returning guests", "Average spend", "Visit frequency"],
        status: "planned",
        ai: false,
        visual: "analytics",
      },
    ],
    aiSteps: [
      "AI reads sales by hour, day and item.",
      "It spots patterns and writes a short suggestion.",
      "You decide whether to act on it.",
    ],
    faq: [
      {
        q: "What do owners see in analytics today?",
        a: "Revenue and order count by day and hour, best sellers and table activity.",
      },
      {
        q: "What are AI insights?",
        a: "A weekly sales summary with short suggestions. AI insights are in development and never change anything at your venue on their own.",
      },
      {
        q: "Where is sales data stored?",
        a: "Sales data belongs to the venue and is used only to show it to the owner. Details on the storage region are in our Privacy Policy.",
      },
    ],
  },
];

/** /en/tavla-ai page */
export const aiOverview: AiOverview = {
  headline: "Artificial intelligence that works for your bar.",
  lead: "Tavla AI suggests, you decide. Four areas where Tavla helps your venue, from the menu to a weekly sales summary.",
  metaTitle: "Tavla AI: AI for cafés, restaurants and hotels",
  metaDescription:
    "What Tavla AI does today, what is in development and how it uses data. AI suggests, and the venue owner always has the final say.",
  transparency: {
    title: "How Tavla uses AI.",
    lead: "AI in Tavla suggests. The decisions stay yours.",
    items: [
      {
        title: "What data it uses",
        text: "Orders, items, prices and order times at your venue. That's enough for menu suggestions, tips and weekly insights.",
      },
      {
        title: "What data it doesn't use",
        text: "Guests' personal data is not used to train AI models. Recommendations are not based on who the guest is.",
      },
      {
        title: "Who decides",
        text: "The owner. AI never changes the menu, prices or settings on its own. Every suggestion waits for your approval.",
      },
      {
        title: "Where the data is",
        // [PROVJERI s Antom: regija baze i AI pružatelja]
        text: "[PROVJERI: data storage region and AI provider, e.g. “Data is stored in the EU.”]",
      },
    ],
  },
};
