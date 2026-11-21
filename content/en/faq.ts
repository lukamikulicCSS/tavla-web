/**
 * English translation of content/hr/faq.ts.
 * Answers describe ONLY existing functionality. Do not mention POS integrations,
 * payment processing or fiscalization until they are actually available.
 */
import type { FaqItem } from "../types";

export const faq: FaqItem[] = [
  {
    q: "What is Tavla?",
    a: "Tavla is a digital menu and ordering system for hospitality venues. Guests order from their own phone, staff see the order instantly with the table number, and the owner tracks orders and sales in one overview.",
  },
  {
    q: "How does QR ordering work?",
    a: "Every table has its own QR code. The guest scans it with their phone camera, a menu linked to that table opens, they pick items and send the order. Staff see it the same moment, and the guest follows its status on their phone.",
  },
  {
    q: "Do guests need to download an app?",
    a: "No. Tavla opens in the phone's browser. No download, no sign-up, no password.",
  },
  {
    q: "How does the venue receive orders?",
    a: "Orders arrive in the staff interface on a tablet, computer or phone. Each order shows the table, items and notes, and staff update the status as they prepare and serve it.",
  },
  {
    q: "Can Tavla be tailored to our venue?",
    a: "Yes. You edit the menu, categories, prices, descriptions and translations yourself in the admin. Changes are visible to guests right away, with no reprinting.",
  },
  {
    q: "Can it handle many tables?",
    a: "Yes. Every table has its own code, and staff see orders and requests from all tables in one place.",
  },
  {
    q: "Can guests call a waiter or ask for the bill?",
    a: "Yes. From the menu, guests can call a waiter or ask for the bill, and the request reaches staff with the table number.",
  },
  {
    q: "Does Tavla offer business analytics?",
    a: "Owners see an overview of orders and sales, best sellers and table activity. We keep expanding analytics.",
  },
  {
    q: "How does a venue get started with Tavla?",
    a: "Book a demo through the form. We'll show you how Tavla works, set up your menu and tables together, and you get codes ready for your tables.",
  },
  {
    q: "How is pricing set?",
    a: "Tavla is a monthly subscription per venue. On request, we also offer one-time on-site setup. You'll get an exact quote after a short conversation about your venue.",
  },
];
