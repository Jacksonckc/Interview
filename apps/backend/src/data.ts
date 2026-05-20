export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  flavor: "classic" | "chocolate" | "fruit" | "seasonal";
  stock: number;
  isFeatured: boolean;
};

export const products: Product[] = [
  {
    id: "choco-chip",
    name: "Chocolate Chip Classic",
    description: "Brown sugar dough, dark chocolate chunks, and flaky sea salt.",
    price: 3.5,
    image: "🍪",
    flavor: "classic",
    stock: 14,
    isFeatured: true
  },
  {
    id: "brown-butter-snickerdoodle",
    name: "Brown Butter Snickerdoodle",
    description: "Toasty brown butter, cinnamon sugar, and a chewy vanilla center.",
    price: 3.75,
    image: "🍪",
    flavor: "classic",
    stock: 18,
    isFeatured: false
  },
  {
    id: "oatmeal-cream",
    name: "Oatmeal Cream Pie",
    description: "Soft oat cookies sandwiched around vanilla bean buttercream.",
    price: 4.5,
    image: "🥛",
    flavor: "classic",
    stock: 9,
    isFeatured: true
  },
  {
    id: "double-cocoa",
    name: "Double Cocoa",
    description: "Fudgy cocoa cookie with white chocolate chips.",
    price: 4.25,
    image: "🍫",
    flavor: "chocolate",
    stock: 8,
    isFeatured: true
  },
  {
    id: "espresso-brownie",
    name: "Espresso Brownie Cookie",
    description: "Dense brownie-style cookie with espresso powder and ganache chips.",
    price: 4.75,
    image: "☕",
    flavor: "chocolate",
    stock: 7,
    isFeatured: false
  },
  {
    id: "hazelnut-nutella",
    name: "Hazelnut Cocoa Swirl",
    description: "Chocolate dough, roasted hazelnuts, and a cocoa spread ribbon.",
    price: 4.95,
    image: "🌰",
    flavor: "chocolate",
    stock: 11,
    isFeatured: true
  },
  {
    id: "lemon-crinkle",
    name: "Lemon Crinkle",
    description: "Bright lemon zest, powdered sugar, and a soft center.",
    price: 3.75,
    image: "🍋",
    flavor: "fruit",
    stock: 10,
    isFeatured: false
  },
  {
    id: "strawberry-shortbread",
    name: "Strawberry Shortbread",
    description: "Buttery shortbread with strawberry jam ribbons.",
    price: 4,
    image: "🍓",
    flavor: "fruit",
    stock: 6,
    isFeatured: false
  },
  {
    id: "blueberry-cheesecake",
    name: "Blueberry Cheesecake",
    description: "Vanilla cookie with blueberry compote and cream cheese chips.",
    price: 4.75,
    image: "🫐",
    flavor: "fruit",
    stock: 12,
    isFeatured: true
  },
  {
    id: "raspberry-almond",
    name: "Raspberry Almond Thumbprint",
    description: "Almond shortbread filled with tart raspberry jam.",
    price: 3.95,
    image: "🍇",
    flavor: "fruit",
    stock: 15,
    isFeatured: false
  },
  {
    id: "pumpkin-spice",
    name: "Pumpkin Spice",
    description: "Warm spice cookie with cinnamon cream glaze.",
    price: 4.5,
    image: "🎃",
    flavor: "seasonal",
    stock: 5,
    isFeatured: true
  },
  {
    id: "peppermint-bark",
    name: "Peppermint Bark Crunch",
    description: "Chocolate peppermint cookie with candy cane pieces and white drizzle.",
    price: 4.65,
    image: "🎄",
    flavor: "seasonal",
    stock: 10,
    isFeatured: false
  },
  {
    id: "maple-pecan",
    name: "Maple Pecan",
    description: "Maple cookie with toasted pecans and a brown sugar glaze.",
    price: 4.35,
    image: "🍁",
    flavor: "seasonal",
    stock: 13,
    isFeatured: false
  }
];
