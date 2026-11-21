/**
 * English home page text. Same keys as content/hr/home.ts (type HomeText).
 */
import type { HomeText } from "../hr/home";

export const home: HomeText = {
  hero: {
    title: "The next level of hospitality.",
    lead: "Digital menu and ordering for cafés, restaurants and hotels. Guests order from their phone, staff see it instantly.",
    cta: "Book a demo",
    secondary: "See how it works",
  },

  partnerStrip: { aria: "Partners", label: "Partners:" },

  aiSoon: {
    badge: "Coming soon",
    title: "Tavla AI is coming to your venue.",
    text: "Two new features we're building, for guests and for staff.",
    link: "All about Tavla AI",
    items: [
      { name: "AI Menu", text: "A menu that recommends drinks based on the time of day and what the guest has already ordered.", visual: "menu" },
      { name: "AI Tips", text: "A smart tip suggestion at checkout, matched to the bill.", visual: "tips" },
    ],
    menuChip: { pick: "Picked for you", name: "Spritz", why: "Popular at this time of day", price: 6.5 },
    tipsChip: { question: "Add a tip?", suggested: "Suggested" },
  },

  problem: {
    title: "Less waiting. More experience.",
    lead: "Most of the waiting in a café or restaurant isn't the cooking. It's the walking: for the menu, for the order, for the bill. Tavla cuts that walking short.",
    caption: "Comparison: how it works today and how it works with Tavla",
    now: "Today",
    withTavla: "With Tavla",
    rows: [
      { now: "Guests wait for someone to bring the menu.", tavla: "The menu is on the table, on the guest's phone." },
      { now: "Guests wait for a waiter to take the order.", tavla: "Guests order when they're ready, and it arrives instantly." },
      { now: "Extra requests get lost in the rush.", tavla: "Waiter calls and bills arrive with the table number." },
      { now: "Staff walk for orders and write them down.", tavla: "Staff prepare and serve. The order is already written." },
      { now: "Owners can't see what's happening on a shift.", tavla: "Orders and sales are visible in one overview." },
      { now: "The second round never happens because nobody asked.", tavla: "Pairing suggestions and “Another round” in one tap." },
    ],
  },

  how: {
    title: "Three steps from table to order.",
    lead: "No app to download, no sign-up, no waiting for a waiter.",
    stepsAria: "Steps",
    steps: [
      { title: "Scan", text: "The guest scans the code on their table with their phone camera. The menu opens in the browser, already linked to that table." },
      { title: "Order", text: "The guest browses the menu, picks drinks and sends the order from their phone, whenever they're ready." },
      { title: "Enjoy", text: "Staff get the order instantly and prepare it, while the guest follows its status on their phone." },
    ],
    phoneLabel: (step: number, title: string) => `Guest's phone, step ${step}: ${title}`,
  },

  experiences: {
    title: "Three experiences. One platform.",
    lead: "Guests, staff and owners see the same order, each from their own perspective, at the same moment.",
    guests: {
      who: "For guests",
      title: "Everything they need, in their hand.",
      text: "The menu opens with a scan of the table code. Guests choose, order and track it without waiting to be noticed.",
      visualLabel: "Guest interface: digital menu with categories and prices",
    },
    staff: {
      who: "For staff",
      title: "Service without the extra running.",
      text: "Orders and guest requests reach the tablet at the bar, with the table number. Staff see what's new, what's being prepared and what's served.",
    },
    owners: {
      who: "For owners",
      title: "Your whole venue at a glance.",
      text: "You edit the menu yourself, while revenue, best sellers and table activity are visible without copying from a notebook.",
    },
  },

  demo: {
    title: "Try Tavla.",
    lead: "Order as a guest, receive the order as staff and check the numbers as the owner. It's all one connected demo.",
    tabsAria: "Choose a perspective",
    tabs: {
      guest: { label: "Guest", hint: "Add a drink to the cart and send the order. After that, you can order another round, call a waiter or ask for the bill." },
      staff: { label: "Staff", hint: "Orders and requests from the tables arrive here. Accept an order, then mark it as served." },
      owner: { label: "Owner", hint: "Revenue, best sellers and active tables at a glance. Your demo orders are already included." },
    },
    newCount: (n: number) => `${n} new`,
    note: "The demo runs only in your browser, with made-up data. Nothing is sent to a real venue.",
    reset: "Reset the demo",
  },

  benefits: {
    title: "Built to make hospitality work better.",
    items: [
      { title: "A better guest experience", text: "Guests don't have to catch a waiter's eye. Menu, order and bill are within reach." },
      { title: "Faster ordering", text: "Orders go straight from the table to the bar, with no writing down and passing on." },
      { title: "Fewer interruptions for staff", text: "The menu answers “what beers do you have?”, and staff focus on serving." },
      { title: "More efficient service", text: "When staff walk less for orders, they have more time for guests." },
      { title: "Upsell opportunities", text: "Pairing suggestions and repeat rounds encourage a second round without pushing." },
      { title: "A clear view of the business", text: "What sells, when it's busiest and which tables are active, in real time." },
      { title: "Simpler order management", text: "Every order has a table, a status and a time. Nothing gets lost between table and bar." },
    ],
  },

  industries: {
    title: "Wherever guests sit and order.",
    lead: "From morning coffee on the terrace to a club booth, Tavla works the same: the order from the table reaches staff instantly.",
    listAria: "Venue types",
  },

  why: {
    title: "Technology behind great hospitality.",
    lead: "The best service is the one guests don't notice. Tavla works in the background so staff can shine up front.",
    principles: [
      { word: "Simplicity", text: "No app to download, no account to create. Code, menu, order." },
      { word: "Speed", text: "The order reaches the bar the moment it's sent, and the guest's status updates on its own." },
      { word: "Modern technology", text: "A web app that works on any phone or tablet, with no special hardware." },
      { word: "Clearer communication", text: "Orders, calls and bills always come with the table number. No shouting, no mix-ups." },
      { word: "Guest experience", text: "Guests order at their own pace and in their own language, Croatian or English." },
      { word: "Efficiency", text: "Less walking for orders means more time for the guests who really need staff." },
      { word: "Always improving", text: "We keep developing Tavla. New features arrive on their own, with no installs and no downtime." },
    ],
  },

  team: {
    title: "The people behind Tavla.",
    lead: "We build Tavla in Croatia, for hospitality teams who want service to flow without a hitch.",
    linkedin: "LinkedIn profile",
  },

  partners: {
    title: "Partners",
    logoAlt: (name: string) => `${name} logo`,
    newTab: (name: string) => `${name} (opens in a new tab)`,
  },

  testimonials: {
    emptyTitle: "Our first venues with Tavla will be featured here.",
    emptyText: "We're looking for cafés, restaurants and bars that want to be among the first to use Tavla and help us shape it around real shifts.",
    emptyCta: "Get in touch",
    title: "What hospitality teams say.",
    kind: { owner: "Owner", manager: "Manager", partner: "Partner" },
    quote: (q: string) => `“${q}”`,
  },

  faq: {
    title: "FAQ.",
    lead: "Don't see your question? Send it through the form and we'll answer directly.",
  },

  contact: {
    title: "Ready for a different kind of shift?",
    lead: "We'll show you how Tavla can simplify your day-to-day and create a better experience for your guests.",
    points: [
      "A short demo, in person or online",
      "We set up your menu and tables with you",
      "A quote based on your venue's size and type",
    ],
  },
};
