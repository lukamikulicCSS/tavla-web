/** English names and descriptions for the demo items (fictional). Prices and IDs live in content/demo-data.ts. */
import type { DemoText } from "../demo-data";

export const demo: DemoText = {
  venue: "Demo bar",
  categories: {
    kava: "Coffee",
    bezalkoholno: "Soft drinks",
    pivo: "Beer",
    kokteli: "Cocktails",
  },
  items: {
    espresso: { name: "Espresso", desc: "Short, intense, 100% arabica" },
    "kava-mlijeko": { name: "Coffee with milk", desc: "Espresso with a little frothed milk" },
    cappuccino: { name: "Cappuccino", desc: "Espresso, milk and thick foam" },
    voda: { name: "Water 0.25 l", desc: "Still or sparkling" },
    naranca: { name: "Fresh orange juice", desc: "Freshly squeezed, 0.3 l" },
    limunada: { name: "Homemade lemonade", desc: "Lemon, mint, a little sugar" },
    toceno: { name: "Draft beer 0.5 l", desc: "Pale lager" },
    craft: { name: "Craft IPA 0.33 l", desc: "Local brewery, bitter and aromatic" },
    kikiriki: { name: "Peanuts", desc: "Roasted, salted" },
    spritz: { name: "Spritz", desc: "Prosecco, bitter liqueur, soda" },
    "gin-tonic": { name: "Gin & tonic", desc: "Gin, tonic, cucumber" },
    hugo: { name: "Hugo", desc: "Sparkling wine, elderflower, mint" },
  },
};
