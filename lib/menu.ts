export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

export const menu: MenuItem[] = [
  // =====================
  // 🍽️ PLATS
  // =====================

  {
    id: "poulet-yassa",
    name: "Poulet Yassa",
    price: 12.5,
    category: "Plats",
    image: "/plats/poulet-yassa.jpg",
  },

  {
    id: "mafe",
    name: "Mafé",
    price: 12.5,
    category: "Plats",
    image: "/plats/mafe.jpg",
  },

  {
    id: "thieb",
    name: "Thiéb",
    price: 12.5,
    category: "Plats",
    image: "/plats/thieb.jpg",
  },

  {
    id: "ndole",
    name: "Ndolé",
    price: 12.5,
    category: "Plats",
    image: "/plats/ndole.jpg",
  },

  {
    id: "poulet",
    name: "Poulet",
    price: 12.5,
    category: "Plats",
    image: "/plats/poulet.jpg",
  },

  {
    id: "tartare-saumon",
    name: "Tartare au saumon",
    price: 12.5,
    category: "Plats",
    image: "/plats/tartare-saumon.jpg",
  },

  {
    id: "salade-wacha",
    name: "Salade Wacha",
    price: 12.5,
    category: "Plats",
    image: "/plats/salade-wacha.jpg",
  },

  // =====================
  // 🍌 ACCOMPAGNEMENT
  // =====================

  {
    id: "alloco",
    name: "Alloco",
    price: 4,
    category: "Accompagnements",
    image: "/plats/alloco.jpg",
  },

  // =====================
  // 🧃 JUS FRAIS
  // =====================

  {
    id: "jus-orange",
    name: "Jus d'orange",
    price: 5,
    category: "Jus frais",
    image: "/boissons/jus-orange.jpg",
  },

  {
    id: "jus-carotte",
    name: "Jus de carotte",
    price: 5,
    category: "Jus frais",
    image: "/boissons/jus-carotte.jpg",
  },

  {
    id: "jus-grenade",
    name: "Jus de grenade",
    price: 5,
    category: "Jus frais",
    image: "/boissons/jus-grenade.jpg",
  },

  {
    id: "jus-bissap",
    name: "Jus de bissap",
    price: 5,
    category: "Jus frais",
    image: "/boissons/jus-bissap.jpg",
  },

  {
    id: "jus-gingembre",
    name: "Jus de gingembre",
    price: 5,
    category: "Jus frais",
    image: "/boissons/jus-gingembre.jpg",
  },

  // =====================
  // 💧 EAUX
  // =====================

  {
    id: "volvic",
    name: "Volvic 50 cl",
    price: 2.5,
    category: "Eaux",
    image: "/boissons/volvic.jpg",
  },

  {
    id: "san-pellegrino",
    name: "San Pellegrino 50 cl",
    price: 2.5,
    category: "Eaux",
    image: "/boissons/san-pellegrino.jpg",
  },

  // =====================
  // 🍺 BIÈRES
  // =====================

  {
    id: "guinness",
    name: "Guinness 33 cl",
    price: 5,
    category: "Bières",
    image: "/boissons/guinness.jpg",
  },

  {
    id: "peroni",
    name: "Peroni 33 cl",
    price: 5,
    category: "Bières",
    image: "/boissons/peroni.jpg",
  },

  {
    id: "chimay",
    name: "Chimay 33 cl",
    price: 5,
    category: "Bières",
    image: "/boissons/chimay.jpg",
  },

  // =====================
  // 🥤 SODAS
  // =====================

  {
    id: "coca-cola",
    name: "Coca-Cola",
    price: 2,
    category: "Sodas",
    image: "/boissons/coca-cola.jpg",
  },

  {
    id: "coca-cola-zero",
    name: "Coca-Cola Zéro",
    price: 2,
    category: "Sodas",
    image: "/boissons/coca-cola-zero.jpg",
  },

  {
    id: "sprite",
    name: "Sprite",
    price: 2,
    category: "Sodas",
    image: "/boissons/sprite.jpg",
  },

  {
    id: "orangina",
    name: "Orangina",
    price: 2,
    category: "Sodas",
    image: "/boissons/orangina.jpg",
  },

  {
    id: "fuze-tea-peche",
    name: "Fuze Tea Pêche",
    price: 2,
    category: "Sodas",
    image: "/boissons/fuze-tea-peche.jpg",
  },

  {
    id: "7up-mojito",
    name: "7UP Mojito",
    price: 2,
    category: "Sodas",
    image: "/boissons/7up-mojito.jpg",
  },

  {
    id: "schweppes-agrumes",
    name: "Schweppes Agrumes",
    price: 2,
    category: "Sodas",
    image: "/boissons/schweppes-agrumes.jpg",
  },
];