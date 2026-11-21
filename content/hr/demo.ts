/** Nazivi i opisi demo artikala (izmišljeni). Cijene i ID-jevi su u content/demo-data.ts. */
import type { DemoText } from "../demo-data";

export const demo: DemoText = {
  venue: "Demo bar",
  categories: {
    kava: "Kava",
    bezalkoholno: "Bezalkoholno",
    pivo: "Pivo",
    kokteli: "Kokteli",
  },
  items: {
    espresso: { name: "Espresso", desc: "Kratka, intenzivna, 100% arabica" },
    "kava-mlijeko": { name: "Kava s mlijekom", desc: "Espresso i malo pjenastog mlijeka" },
    cappuccino: { name: "Cappuccino", desc: "Espresso, mlijeko i gusta pjena" },
    voda: { name: "Voda 0,25 l", desc: "Negazirana ili gazirana" },
    naranca: { name: "Cijeđena naranča", desc: "Svježe cijeđena, 0,3 l" },
    limunada: { name: "Domaća limunada", desc: "Limun, menta, malo šećera" },
    toceno: { name: "Točeno pivo 0,5 l", desc: "Svijetli lager" },
    craft: { name: "Craft IPA 0,33 l", desc: "Lokalna pivovara, gorko i aromatično" },
    kikiriki: { name: "Kikiriki", desc: "Prženi, slani" },
    spritz: { name: "Spritz", desc: "Prošek, gorki liker, soda" },
    "gin-tonic": { name: "Gin tonic", desc: "Gin, tonik, krastavac" },
    hugo: { name: "Hugo", desc: "Pjenušac, bazga, menta" },
  },
};
