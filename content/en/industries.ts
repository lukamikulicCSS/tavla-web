/**
 * English translation of content/hr/industries.ts (same IDs and images).
 */
import type { Industry } from "../types";

export const industries: Industry[] = [
  {
    id: "kafici",
    name: "Cafés",
    text: "Morning rush and packed terraces. Guests order when they're ready, staff just deliver.",
    image: "/images/industries/kafici.jpg",
    imageAlt: "A guest on a café terrace orders by phone using a Tavla stand with a QR code",
  },
  {
    id: "restorani",
    name: "Restaurants",
    text: "Another round with one tap on the NFC tag, while staff stay with the guests.",
    image: "/images/industries/restorani.jpg",
    imageAlt: "A restaurant guest taps their phone on the NFC tag next to a Tavla stand",
  },
  {
    id: "barovi-klubovi",
    name: "Bars and clubs",
    text: "Booths and tables order without hunting for a waiter in the crowd and noise.",
    image: "/images/industries/barovi-klubovi.jpg",
    imageAlt: "Friends in a club booth order through a Tavla stand with a QR code and NFC tag",
  },
  {
    id: "beach",
    name: "Beach bars",
    text: "Sunbeds are far from the bar. Guests order from their spot, and you know exactly where they are.",
    image: "/images/industries/beach-barovi.jpg",
    imageAlt: "Friends on sunbeds by the sea order drinks through a Tavla stand",
  },
  {
    // PROVJERI s Antom: podržava li aplikacija narudžbe iz sobe (soba kao "stol")
    id: "hoteli",
    name: "Hotels",
    text: "Room service, lobby bar and pool in one ordering system.",
    image: "/images/industries/hoteli.jpg",
    imageAlt: "A hotel room with a Tavla room service tile on the nightstand",
  },
];
