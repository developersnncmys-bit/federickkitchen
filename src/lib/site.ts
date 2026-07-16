/**
 * Single source of truth for all client-editable content.
 * Frederick's Kitchen — Chikmagaluru.
 *
 * Photography note: the `image` fields point at real interior/room/restaurant
 * photos in /public/images. Shots that carried another venue's signage are
 * deliberately not used. Swap any file for the client's own final photography
 * and nothing else needs to change.
 */

export const site = {
  name: "Frederick's Kitchen",
  tagline: "A coffee estate table, high in the Western Ghats.",
  location: "Chikmagaluru, Karnataka",
  address: "Frederick's Kitchen, Mullayanagiri Road, Chikmagaluru, Karnataka 577101",
  phone: "+91 98800 00000",
  whatsapp: "919880000000",
  email: "stay@frederickskitchen.in",
  url: "https://frederickskitchen.in",
  mapEmbed:
    "https://www.google.com/maps?q=Chikmagaluru,Karnataka&output=embed",
  social: {
    instagram: "https://instagram.com/frederickskitchen",
    facebook: "https://facebook.com/frederickskitchen",
  },
  responseAssurance: "Every enquiry answered within 24 hours.",
} as const;

export const nav = [
  { label: "Dining", href: "/dining" },
  { label: "Rooms", href: "/rooms" },
  { label: "Experiences", href: "/experiences" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
] as const;

/* ---------------------------------- Rooms --------------------------------- */

export type Room = {
  slug: string;
  name: string;
  blurb: string;
  description: string;
  price: number;
  guests: number;
  size: string;
  bed: string;
  amenities: string[];
  image: string;
  tone: string;
};

export const rooms: Room[] = [
  {
    slug: "estate-suite",
    name: "The Estate Suite",
    blurb: "Corner suite over the coffee rows, with a private verandah.",
    description:
      "Our largest room, set at the quiet end of the house. Floor-to-ceiling windows open onto a private verandah that looks straight down the Arabica rows to the Baba Budangiri ridge. Wake to mist, drink the estate's own pour, and watch the valley clear by nine.",
    price: 8500,
    guests: 3,
    size: "520 sq ft",
    bed: "King + daybed",
    amenities: [
      "Private verandah",
      "Valley-facing",
      "Estate coffee bar",
      "Rain shower",
      "Work desk",
      "Room heater",
    ],
    image: "/images/room-executive.jpg",
    tone: "from-[#4a3a24] via-[#2a2013] to-[#12100a]",
  },
  {
    slug: "planters-room",
    name: "The Planter's Room",
    blurb: "Teak, filtered light, and the old planter's writing desk.",
    description:
      "A restored room in the original planter's wing — teak floors, a four-poster, and shuttered windows that throw slatted light across the bed each afternoon. The writing desk is the one the estate's ledgers were kept on. Quiet, warm, and full of the house's history.",
    price: 6500,
    guests: 2,
    size: "380 sq ft",
    bed: "King",
    amenities: [
      "Four-poster bed",
      "Heritage teak interiors",
      "Garden view",
      "Estate coffee bar",
      "Rain shower",
      "Room heater",
    ],
    image: "/images/room-deluxe.jpg",
    tone: "from-[#3f3320] via-[#241c11] to-[#100e09]",
  },
  {
    slug: "riders-room",
    name: "The Rider's Room",
    blurb: "Ground floor, boot-friendly, ten steps from covered parking.",
    description:
      "Built for the way riders actually arrive: muddy, tired, and at odd hours. Ground floor, direct access from covered secure parking, a boot rack and gear rail at the door, and a hot shower with real pressure. Check in late without waking the house.",
    price: 4500,
    guests: 2,
    size: "300 sq ft",
    bed: "Queen",
    amenities: [
      "Covered secure parking",
      "Gear rail & boot rack",
      "Ground floor access",
      "24-hour hot water",
      "Late check-in",
      "Chain lube & basic tools",
    ],
    image: "/images/room-standard.jpg",
    tone: "from-[#39301f] via-[#211a10] to-[#0f0d08]",
  },
  {
    slug: "garden-twin",
    name: "The Garden Twin",
    blurb: "Two beds, a wardrobe, and a long window onto the pepper vines.",
    description:
      "A bright, uncluttered twin opening onto the kitchen garden — the same beds our cook picks from each morning. The best-value room in the house and the easiest to share, with a long window seat made for a slow coffee and a book.",
    price: 3800,
    guests: 3,
    size: "320 sq ft",
    bed: "Twin + extra bed",
    amenities: [
      "Kitchen garden view",
      "Full wardrobe",
      "Estate coffee bar",
      "Hot shower",
      "Room heater",
      "Sleeps three",
    ],
    image: "/images/room-wardrobe.jpg",
    tone: "from-[#35331f] via-[#1f1d11] to-[#0e0d08]",
  },
];

/* ---------------------------------- Menu ---------------------------------- */

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  chefSpecial?: boolean;
  veg: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  note: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "breakfast",
    title: "Breakfast",
    note: "Served 7:30 – 11:00. Riders leaving early — tell us the night before and we'll have it ready at six.",
    items: [
      {
        name: "Estate Breakfast",
        description:
          "Akki roti, coconut chutney, a soft-set egg, seasonal fruit from the garden, and a pour of the estate's own coffee.",
        price: 420,
        chefSpecial: true,
        veg: false,
      },
      {
        name: "Kadubu & Ghee",
        description:
          "Steamed rice dumplings pressed in the old moulds, finished with estate ghee and jaggery.",
        price: 260,
        veg: true,
      },
      {
        name: "Malnad Neer Dosa",
        description:
          "Lace-thin rice dosa, chicken sukka or vegetable saagu on the side.",
        price: 320,
        veg: false,
      },
      {
        name: "Coorg Honey Toast",
        description:
          "Thick-cut sourdough, wild forest honey, cultured butter, black pepper.",
        price: 240,
        veg: true,
      },
    ],
  },
  {
    id: "mains",
    title: "Mains",
    note: "Served 12:30 – 15:00 and 19:30 – 22:30. Most of the plate is grown within a kilometre of it.",
    items: [
      {
        name: "Pandi Curry, Kachampuli",
        description:
          "The Kodagu classic, slow-cooked three hours with estate pepper and finished with kachampuli vinegar. Served with kadumbuttu.",
        price: 680,
        chefSpecial: true,
        veg: false,
      },
      {
        name: "Wood-Fired Estate Chicken",
        description:
          "Whole leg marinated overnight in curd, green chilli and coriander root, cooked over coffee wood.",
        price: 620,
        veg: false,
      },
      {
        name: "Bamboo Shoot Palya",
        description:
          "Monsoon bamboo shoot, coconut, and a tempering of curry leaf. A Malnad monsoon dish, on the menu only when the shoots are right.",
        price: 380,
        veg: true,
      },
      {
        name: "Pepper-Rubbed River Fish",
        description:
          "Whole fish, banana leaf, estate peppercorns crushed coarse. Charred on the outside, steamed within.",
        price: 720,
        chefSpecial: true,
        veg: false,
      },
      {
        name: "Coconut & Cashew Kurma",
        description:
          "Garden vegetables in a fresh-ground coconut masala, with ghee rice.",
        price: 420,
        veg: true,
      },
    ],
  },
  {
    id: "coffee",
    title: "Coffee",
    note: "Grown on the slope below you, pulped in our own yard, roasted in Chikmagaluru each week.",
    items: [
      {
        name: "Estate Single Origin — Filter",
        description:
          "Our Arabica, medium roast, brewed in the steel filter the way it has been here for forty years. Chicory optional, and we won't judge either way.",
        price: 160,
        chefSpecial: true,
        veg: true,
      },
      {
        name: "Pourover Flight",
        description:
          "Three cups, three roast levels, side by side. The clearest way to taste what elevation does to a bean.",
        price: 450,
        veg: true,
      },
      {
        name: "Monsooned Malabar",
        description:
          "Aged in the monsoon winds off the coast. Low acid, heavy body, faintly of cocoa and cracked wood.",
        price: 220,
        veg: true,
      },
      {
        name: "Cold Brew, 18 Hours",
        description: "Slow-steeped overnight, served over estate-water ice.",
        price: 240,
        veg: true,
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    note: "Small, and worth the walk back up the hill.",
    items: [
      {
        name: "Coffee Blossom Honey Panna Cotta",
        description:
          "Set with honey the bees made from our own coffee flowers, in the two weeks a year they bloom.",
        price: 280,
        chefSpecial: true,
        veg: true,
      },
      {
        name: "Jaggery & Cardamom Custard",
        description: "Baked slow, served warm, dusted with roasted coffee.",
        price: 240,
        veg: true,
      },
      {
        name: "Chikku Halwa",
        description: "The kitchen's own, cut thick, with a spoon of cream.",
        price: 220,
        veg: true,
      },
    ],
  },
];

/* ------------------------------- Experiences ------------------------------ */

export type Experience = {
  slug: string;
  title: string;
  kicker: string;
  duration: string;
  bestFor: string;
  description: string;
  details: { label: string; value: string }[];
  image?: string;
  tone: string;
};

export const experiences: Experience[] = [
  {
    slug: "biker-routes",
    title: "The Ridge Routes",
    kicker: "For riders",
    duration: "Half day to full day",
    bestFor: "Weekend riders from Bengaluru & Mysuru",
    description:
      "We ride these roads ourselves, so the notes are honest. Three routes off the property, mapped with the surface you'll actually meet, the corner that catches people out, and where to stop for chai. Covered secure parking, a gear rail at the door, chain lube and basic tools in the shed, and a hot breakfast at six if you're chasing the light.",
    details: [
      { label: "Mullayanagiri Loop", value: "58 km · tarmac, tight switchbacks, best at first light" },
      { label: "Kemmangundi Run", value: "94 km · mixed surface, two broken sections after the monsoon" },
      { label: "Baba Budangiri Ridge", value: "42 km · high ridge, cloud after 11am, ride it early" },
      { label: "At the house", value: "Covered secure parking · gear rail · chain lube & tools · 6am breakfast on request" },
    ],
    image: "/images/exterior-tower.jpg",
    tone: "from-[#2b3a44] via-[#1a2228] to-[#0d1013]",
  },
  {
    slug: "plantation-walk",
    title: "The Plantation Walk",
    kicker: "For coffee people",
    duration: "2 hours, from 7:00",
    bestFor: "Coffee enthusiasts, estate planters",
    description:
      "Not a demonstration — a working walk through a working estate, led by the people who run it. Down the Arabica rows to the pulping yard, through the drying beds, and into the roastery. You'll pick, pulp, and cup, and you'll taste the same lot at three roast levels to see what the slope does to it. Ends with a bag of the lot you liked best.",
    details: [
      { label: "Route", value: "Arabica rows → pulping yard → drying beds → roastery → cupping table" },
      { label: "Season", value: "Picking Nov–Feb · blossom Mar–Apr · year-round cupping" },
      { label: "Group size", value: "Six people, so everyone gets to the table" },
      { label: "You leave with", value: "250g of the lot you cupped, roasted to your pick" },
    ],
    image: "/images/restaurant-tree.jpg",
    tone: "from-[#3d4a2c] via-[#232a19] to-[#0e100a]",
  },
  {
    slug: "private-events",
    title: "Private Table & Offsites",
    kicker: "For groups",
    duration: "By arrangement",
    bestFor: "Private dining, corporate offsites, celebrations",
    description:
      "The long table seats twenty-four, and the house sleeps nine across its four rooms. Teams take the property end to end — dining room, lawn, and the estate itself. We build the menu with you, and the kitchen will cook to the occasion rather than to a fixed package. Tell us the shape of the thing and we'll tell you honestly whether we can do it well.",
    details: [
      { label: "Long table", value: "Seats 24 · private dining room · menu built with the chef" },
      { label: "Full property", value: "4 rooms, sleeps 9 · lawn · estate access, exclusive use" },
      { label: "Offsites", value: "Meeting space, blackout-free power, working wifi" },
      { label: "Lead time", value: "Two weeks for the table, four for the full house" },
    ],
    image: "/images/restaurant-hall.jpg",
    tone: "from-[#46302c] via-[#281b19] to-[#0f0b0a]",
  },
];

/* ------------------------------ Testimonials ------------------------------ */

export const testimonials = [
  {
    quote:
      "Rode up from Bengaluru in the rain and arrived at nine at night, filthy. They'd left the light on, the parking was covered, and there was hot food. The route notes the next morning were better than anything on the internet.",
    name: "Arjun Rao",
    context: "Rider · Bengaluru",
  },
  {
    quote:
      "I've walked a lot of estates and been sold a lot of stories. This was the first one where they handed me the pulping lever and let me get it wrong. The cupping at the end was the real thing.",
    name: "Meera Krishnan",
    context: "Estate planter · Coorg",
  },
  {
    quote:
      "We took the full property for an offsite. Twenty-two people, no schedule to speak of, and the kitchen simply fed us better each day. The pandi curry ended the argument about where we go next year.",
    name: "Nikhil Menon",
    context: "Private offsite · Mysuru",
  },
] as const;

/* -------------------------------- Gallery --------------------------------- */

export type GalleryItem = {
  id: string;
  caption: string;
  category: "restaurant" | "rooms" | "experiences" | "chikmagaluru";
  image: string;
  span: "tall" | "wide" | "square";
};

export const galleryCategories = [
  { id: "all", label: "Everything" },
  { id: "restaurant", label: "The Restaurant" },
  { id: "rooms", label: "Rooms" },
  { id: "experiences", label: "Lounge & Spaces" },
  { id: "chikmagaluru", label: "The House" },
] as const;

export const gallery: GalleryItem[] = [
  { id: "g1", caption: "The garden dining room", category: "restaurant", image: "/images/restaurant-wide.jpg", span: "wide" },
  { id: "g2", caption: "Dining under the trees", category: "restaurant", image: "/images/restaurant-tree.jpg", span: "square" },
  { id: "g3", caption: "First pour of the morning", category: "restaurant", image: "/images/restaurant-nook.jpg", span: "tall" },
  { id: "g4", caption: "The Estate Suite", category: "rooms", image: "/images/room-executive.jpg", span: "tall" },
  { id: "g5", caption: "The Planter's Room", category: "rooms", image: "/images/room-deluxe.jpg", span: "square" },
  { id: "g6", caption: "The Rider's Room", category: "rooms", image: "/images/room-standard.jpg", span: "square" },
  { id: "g7", caption: "The Garden Twin", category: "rooms", image: "/images/room-wardrobe.jpg", span: "wide" },
  { id: "g8", caption: "The reading lounge", category: "experiences", image: "/images/lounge-brick.jpg", span: "wide" },
  { id: "g9", caption: "Benches in the green", category: "experiences", image: "/images/restaurant-benches.jpg", span: "square" },
  { id: "g10", caption: "The evening lounge", category: "experiences", image: "/images/lounge-mandala.jpg", span: "tall" },
  { id: "g11", caption: "The house after dark", category: "chikmagaluru", image: "/images/exterior-tower.jpg", span: "tall" },
  { id: "g12", caption: "The long verandah", category: "chikmagaluru", image: "/images/corridor-a.jpg", span: "square" },
  { id: "g13", caption: "The garden hall", category: "chikmagaluru", image: "/images/restaurant-garden.jpg", span: "wide" },
  { id: "g14", caption: "Quiet corner, warm light", category: "experiences", image: "/images/restaurant-lounge.jpg", span: "square" },
];

/* ------------------------------ Booking meta ------------------------------ */

export const timeSlots = [
  "12:30", "13:00", "13:30", "14:00", "14:30",
  "19:30", "20:00", "20:30", "21:00", "21:30",
] as const;

export const bookingStatuses = ["pending", "confirmed", "cancelled"] as const;
export type BookingStatus = (typeof bookingStatuses)[number];
