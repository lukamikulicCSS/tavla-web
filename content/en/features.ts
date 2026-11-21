/**
 * English translation of content/hr/features.ts.
 * IDs and statuses MUST match the Croatian file (checked at build time in content/index.ts).
 * Items marked PROVJERI must be confirmed before publishing.
 */
import type { Feature } from "../types";

export const guestFeatures: Feature[] = [
  { id: "table", title: "Knows the table", text: "The code on the table opens a menu already linked to it. Guests type nothing.", status: "live" },
  { id: "menu", title: "Digital menu", text: "Categories, prices and descriptions, always up to date. In Croatian and English.", status: "live" },
  { id: "order", title: "Order in a few taps", text: "Pick, review, send. The order reaches staff instantly.", status: "live" },
  { id: "upsell", title: "Smart pairings", text: "Next to their drink, guests see what is most often ordered with it.", status: "live" },
  { id: "popular", title: "Most popular", text: "The most-ordered items are highlighted automatically.", status: "live" },
  { id: "repeat", title: "Another round", text: "The same order again, in one tap.", status: "live" },
  { id: "status", title: "Order status", text: "Guests see whether their order is received, being prepared or on its way.", status: "live" },
  // PROVJERI: potvrditi da je poziv konobara implementiran u aplikaciji
  { id: "waiter", title: "Call a waiter", text: "Need something else? One tap and the waiter knows which table.", status: "live" },
  // PROVJERI: potvrditi da je zahtjev za račun implementiran u aplikaciji
  { id: "bill", title: "Ask for the bill", text: "No waving, no waiting to be noticed.", status: "live" },
  { id: "pay", title: "Pay by phone", text: "Settle the bill right from Tavla.", status: "soon" },
];

export const staffFeatures: Feature[] = [
  { id: "incoming", title: "Orders arrive instantly", text: "Every order with table number, items and notes.", status: "live" },
  { id: "realtime", title: "Live status", text: "Received, preparing, served. Guests see exactly what you see.", status: "live" },
  // PROVJERI: isto kao poziv konobara / račun gore
  { id: "requests", title: "Calls and bills in one place", text: "Guest requests arrive with the table number. No running around the floor.", status: "live" },
  { id: "manage", title: "Order management", text: "Every open order by table, from the first round to the last.", status: "live" },
  { id: "profiles", title: "Waiter profiles", text: "Performance and ratings for every waiter.", status: "soon" },
];

export const ownerFeatures: Feature[] = [
  { id: "menu-admin", title: "Menu editing", text: "Items, prices, categories and translations. No reprinting.", status: "live" },
  // PROVJERI: koliko je od analitike vidljivo vlasniku u sučelju danas
  { id: "sales", title: "Sales overview", text: "Revenue and order count by day and hour.", status: "live" },
  { id: "top", title: "Best sellers", text: "What sells, and what just sits on the menu.", status: "live" },
  { id: "tables", title: "Table activity", text: "Which tables are active and how the floor is moving.", status: "live" },
  { id: "loyalty", title: "Loyalty program", text: "Your own loyalty program for your guests.", status: "soon" },
];
