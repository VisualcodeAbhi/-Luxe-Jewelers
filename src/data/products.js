export const products = [
  {
    id: 1,
    name: "Diamond Solitaire Ring",
    category: "rings",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviewCount: 128,
    desc: "18K white gold with 1ct brilliant cut diamond",
    longDesc: "This timeless masterpiece features a hand-selected 1-carat brilliant-cut diamond of exceptional clarity and brilliance, meticulously set in a pristine 18-karat white gold band. A classic four-prong setting maximizes light entry, creating an unmatched fire and scintillation. Perfect as an engagement ring or a celebration of personal milestones.",
    stock: 5,
    image: "/images/diamond_solitaire_ring.png",
    gallery: [
      "/images/diamond_solitaire_ring.png",
      "/images/bridal_tiara_set.png",
      "/images/diadem_necklace.png"
    ],
    reviews: [
      { name: "Sophia Martinez", rating: 5, text: "Absolutely breathtaking! The diamond catches the light beautifully. The craftsmanship is flawless." },
      { name: "James Anderson", rating: 5, text: "Proposed with this ring and she said yes! Excellent customer service and incredible quality." },
      { name: "Charlotte Green", rating: 4, text: "Stunning design, fits perfectly. The packaging was extremely luxury." }
    ]
  },
  {
    id: 2,
    name: "Sapphire Halo Ring",
    category: "rings",
    price: 899,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 94,
    desc: "Blue sapphire surrounded by diamond halo",
    longDesc: "Embrace regal elegance with our Sapphire Halo Ring. A vivid, deep-blue oval sapphire sits at the center, surrounded by a radiant halo of pavé-set diamonds that extend down the delicate platinum band. Inspired by classic royal designs, this ring offers a bold statement of luxury and grace.",
    stock: 8,
    image: "/images/diamond_solitaire_ring.png",
    gallery: [
      "/images/diamond_solitaire_ring.png",
      "/images/diadem_necklace.png"
    ],
    reviews: [
      { name: "Emily Watson", rating: 5, text: "The blue color of the sapphire is so deep and mesmerizing. Truly a royal piece." },
      { name: "Michael Carter", rating: 4, text: "Very elegant, though I wish the band was slightly thicker. Overall wonderful craftsmanship." }
    ]
  },
  {
    id: 3,
    name: "Emerald Cut Diamond Ring",
    category: "rings",
    price: 2499,
    originalPrice: null,
    rating: 5.0,
    reviewCount: 67,
    desc: "2ct emerald cut diamond in platinum setting",
    longDesc: "An epitome of sophistication, this ring features a striking 2-carat emerald-cut diamond. The step-cut facets deliver long lines of light, producing a hall-of-mirrors effect. Nestled in a premium, high-polished platinum setting with claw prongs, this ring is for those who appreciate structural elegance and vintage luxury.",
    stock: 2,
    image: "/images/diamond_solitaire_ring.png",
    gallery: [
      "/images/diamond_solitaire_ring.png",
      "/images/bridal_tiara_set.png"
    ],
    reviews: [
      { name: "Isabella Rossi", rating: 5, text: "Simply magnificent. The emerald cut is incredibly elegant and modern. Highly recommend!" },
      { name: "David Sterling", rating: 5, text: "Exceptional clarity and stunning presence. Worth every penny." }
    ]
  },
  {
    id: 4,
    name: "Gold Chain Necklace",
    category: "necklaces",
    price: 1599,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 156,
    desc: "18K yellow gold, 18-inch Italian chain",
    longDesc: "Crafted in the heart of Italy, this 18-inch link chain is fashioned from solid 18-karat yellow gold. Its high-polish finish reflects light with every movement, creating a warm, gilded aura. Designed to be worn alone as a statement of minimalist luxury or layered with other fine necklaces.",
    stock: 12,
    image: "/images/opulence_necklace.png",
    gallery: [
      "/images/opulence_necklace.png",
      "/images/diadem_necklace.png"
    ],
    reviews: [
      { name: "Liam O'Connor", rating: 5, text: "Perfect weight and brilliant gold tone. Clearly authentic and high quality." },
      { name: "Olivia Taylor", rating: 4, text: "Beautiful Italian craftsmanship. The clasp is secure and elegant." }
    ]
  },
  {
    id: 5,
    name: "Diamond Pendant Necklace",
    category: "necklaces",
    price: 2199,
    originalPrice: 2599,
    rating: 4.9,
    reviewCount: 112,
    desc: "Platinum chain with 0.5ct diamond pendant",
    longDesc: "Suspended from a delicate, shimmering platinum chain, this pendant showcases a brilliant 0.5-carat round diamond. The minimalist bezel setting emphasizes the diamond's natural beauty and allows it to rest seamlessly against the skin. An exquisite daily signature or the ultimate evening accompaniment.",
    stock: 4,
    image: "/images/diadem_necklace.png",
    gallery: [
      "/images/diadem_necklace.png",
      "/images/opulence_necklace.png"
    ],
    reviews: [
      { name: "Chloe Henderson", rating: 5, text: "The pendant is the perfect size for daily luxury. The diamond sparkles beautifully." },
      { name: "Alexander Vance", rating: 5, text: "Bought this as an anniversary gift. My wife was absolutely thrilled." }
    ]
  },
  {
    id: 6,
    name: "Pearl Strand Necklace",
    category: "necklaces",
    price: 899,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 89,
    desc: "Akoya cultured pearls with gold clasp",
    longDesc: "A timeless classic, this strand features perfectly matched, high-luster Akoya cultured pearls. Individually knotted on silk thread, the strand is finished with an ornate 18K yellow gold filigree clasp. A symbol of purity and classic high-fashion luxury.",
    stock: 7,
    image: "/images/opulence_necklace.png",
    gallery: [
      "/images/opulence_necklace.png",
      "/images/diadem_necklace.png"
    ],
    reviews: [
      { name: "Eleanor Sterling", rating: 5, text: "Unbelievable luster. The pearls feel wonderfully heavy and luxurious." }
    ]
  },
  {
    id: 7,
    name: "Diamond Stud Earrings",
    category: "earrings",
    price: 799,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 203,
    desc: "0.5ct total weight, 14K white gold",
    longDesc: "Essential for any fine jewelry collection, these classic stud earrings feature twin round brilliant-cut diamonds totaling 0.5 carats. Set in high-polished 14-karat white gold baskets with secure screw-back posts for worry-free everyday wear.",
    stock: 15,
    image: "/images/diadem_necklace.png",
    gallery: [
      "/images/diadem_necklace.png",
      "/images/diamond_solitaire_ring.png"
    ],
    reviews: [
      { name: "Grace Bennett", rating: 5, text: "Classic, comfortable, and perfect for every day. They are my absolute favorite." }
    ]
  },
  {
    id: 8,
    name: "Ruby Drop Earrings",
    category: "earrings",
    price: 1299,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 76,
    desc: "Natural rubies with diamond accents",
    longDesc: "Unleash bold passion with these exquisite drop earrings. Vivid, natural pear-shaped rubies dangle gracefully from a delicate cascade of round brilliant diamonds set in 18-karat rose gold. Every movement produces a spectacular dance of crimson and white fire.",
    stock: 3,
    image: "/images/diadem_necklace.png",
    gallery: [
      "/images/diadem_necklace.png",
      "/images/opulence_necklace.png"
    ],
    reviews: [
      { name: "Stella Fontaine", rating: 5, text: "The rubies have the most rich, vibrant red hue. Truly spectacular design." }
    ]
  },
  {
    id: 9,
    name: "Gold Hoop Earrings",
    category: "earrings",
    price: 599,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 145,
    desc: "Classic 18K gold hoops, medium size",
    longDesc: "These medium-sized hoop earrings are a luxurious staple. Meticulously hollow-crafted in 18-karat yellow gold for a lightweight feel that doesn't compromise on visual presence. Features a secure latch-back closure for seamless, sleek styling.",
    stock: 10,
    image: "/images/diamond_solitaire_ring.png",
    gallery: [
      "/images/diamond_solitaire_ring.png",
      "/images/diadem_necklace.png"
    ],
    reviews: [
      { name: "Aria Montgomery", rating: 5, text: "Extremely lightweight but they look so premium and rich. Love them." }
    ]
  },
  {
    id: 10,
    name: "Tennis Bracelet",
    category: "bracelets",
    price: 1899,
    originalPrice: 2199,
    rating: 4.9,
    reviewCount: 98,
    desc: "3ct total diamond weight in white gold",
    longDesc: "A continuous line of endless fire. This iconic tennis bracelet features 3 carats of perfectly matched round brilliant-cut diamonds, meticulously set in a flexible 18-karat white gold line mount. Complete with a hidden safety clasp for peace of mind during glamorous events.",
    stock: 6,
    image: "/images/opulence_necklace.png",
    gallery: [
      "/images/opulence_necklace.png",
      "/images/diadem_necklace.png"
    ],
    reviews: [
      { name: "Lucas Reinhardt", rating: 5, text: "A stunning piece of engineering and art. The diamonds line up perfectly." }
    ]
  },
  {
    id: 11,
    name: "Charm Bracelet",
    category: "bracelets",
    price: 699,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 134,
    desc: "Sterling silver with 5 interchangeable charms",
    longDesc: "This high-polish sterling silver link bracelet comes pre-adorned with 5 beautifully detailed, luxury-themed charms: a golden key, a diamond-accented star, an emerald-cut crystal box, a high-fashion bag, and a classic diamond logo token.",
    stock: 9,
    image: "/images/opulence_necklace.png",
    gallery: [
      "/images/opulence_necklace.png"
    ],
    reviews: [
      { name: "Natalie Young", rating: 4, text: "Very playful yet highly elegant. Sterling silver quality is premium." }
    ]
  },
  {
    id: 12,
    name: "Gold Bangle Bracelet",
    category: "bracelets",
    price: 1499,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 87,
    desc: "18K rose gold with diamond accents",
    longDesc: "Sculpted from luminous 18-karat rose gold, this structural bangle features a hinged lock mechanism. A delicate path of pavé diamonds runs along the top half, making it the perfect piece to layer or wear alone as a subtle touch of premium elegance.",
    stock: 5,
    image: "/images/opulence_necklace.png",
    gallery: [
      "/images/opulence_necklace.png",
      "/images/diadem_necklace.png"
    ],
    reviews: [
      { name: "Victoria Pierce", rating: 5, text: "The rose gold tone is absolutely gorgeous, very warm. The hinge is secure." }
    ]
  },
  {
    id: 13,
    name: "Swiss Automatic Watch",
    category: "watches",
    price: 3499,
    originalPrice: null,
    rating: 5.0,
    reviewCount: 54,
    desc: "Swiss movement, sapphire crystal, leather strap",
    longDesc: "A masterclass in luxury horology. Powered by a precision Swiss automatic self-winding movement, this watch features a champagne-toned guilloché dial, real gold hour indicators, and a scratch-resistant sapphire crystal glass. Housed in a solid stainless steel case with a premium hand-stitched alligator leather strap.",
    stock: 3,
    image: "/images/chronos_gold_watch.png",
    gallery: [
      "/images/chronos_gold_watch.png",
      "/images/nocturne_watch.png"
    ],
    reviews: [
      { name: "Arthur Pendelton", rating: 5, text: "An absolute masterpiece. Keeps time perfectly and looks stunning in the boardroom." }
    ]
  },
  {
    id: 14,
    name: "Diamond Bezel Watch",
    category: "watches",
    price: 2499,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 72,
    desc: "Stainless steel with diamond-encrusted bezel",
    longDesc: "Glamour meets precision. This luxury timepiece features a premium stainless steel integrated bracelet, surrounding a dial framed by a dazzling bezel encrusted with 48 round brilliant-cut diamonds. Equipped with a Swiss quartz movement and a butterfly deployment clasp.",
    stock: 4,
    image: "/images/nocturne_watch.png",
    gallery: [
      "/images/nocturne_watch.png",
      "/images/chronos_gold_watch.png"
    ],
    reviews: [
      { name: "Diana Prince", rating: 5, text: "Extremely luxurious. It sparkles like crazy in natural light. Stunning watch." }
    ]
  },
  {
    id: 15,
    name: "Classic Gold Watch",
    category: "watches",
    price: 1899,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 118,
    desc: "18K gold-plated with genuine leather band",
    longDesc: "Timeless styling for the modern connoisseur. Features an ultra-thin 18K gold-plated case, an elegant minimalist white dial, and a premium black leather band. Its understated classic profile makes it the ultimate companion for both high-end social dinners and business affairs.",
    stock: 6,
    image: "/images/chronos_gold_watch.png",
    gallery: [
      "/images/chronos_gold_watch.png",
      "/images/nocturne_watch.png"
    ],
    reviews: [
      { name: "Julian Vance", rating: 5, text: "Excellent vintage look. Clean, elegant, and very stylish." }
    ]
  },
  {
    id: 16,
    name: "Complete Bridal Set",
    category: "bridal",
    price: 3199,
    originalPrice: 3999,
    rating: 5.0,
    reviewCount: 156,
    desc: "Necklace, earrings, bracelet, and tiara",
    longDesc: "Designed for the modern royal bride. This breathtaking 4-piece collection comprises an elaborate crystal-pendant necklace, matching drop earrings, an elegant pavé-link bracelet, and a majestic, hand-crafted diamond tiara. Each piece is set in a premium silver-platinum alloy base to ensure safety and eternal luster.",
    stock: 2,
    image: "/images/bridal_tiara_set.png",
    gallery: [
      "/images/bridal_tiara_set.png",
      "/images/diadem_necklace.png",
      "/images/diamond_solitaire_ring.png"
    ],
    reviews: [
      { name: "Seraphina Vance", rating: 5, text: "Wore this set for my wedding and felt like a queen. The tiara is surprisingly comfortable and absolutely stunning." },
      { name: "Marcus Stone", rating: 5, text: "Absolutely brilliant set. Worth every single cent to see my bride shine like that." }
    ]
  },
  {
    id: 17,
    name: "Wedding Band Pair",
    category: "bridal",
    price: 2899,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 142,
    desc: "Matching his & hers 18K gold bands",
    longDesc: "Bound in absolute unity. This matching set offers a wider, classic high-polish flat band for him and a delicate, sparkling pavé diamond band for her, both crafted in timeless 18-karat yellow gold. Inside bands can be custom-engraved to eternalize your special day.",
    stock: 5,
    image: "/images/diamond_solitaire_ring.png",
    gallery: [
      "/images/diamond_solitaire_ring.png",
      "/images/bridal_tiara_set.png"
    ],
    reviews: [
      { name: "Henry Jenkins", rating: 5, text: "Perfect fit, beautiful matching gold tones. Very comfortable comfort-fit design." }
    ]
  },
  {
    id: 18,
    name: "Luxury Bridal Collection",
    category: "bridal",
    price: 4299,
    originalPrice: null,
    rating: 5.0,
    reviewCount: 89,
    desc: "Diamond tiara, necklace, and earrings set",
    longDesc: "The pinnacle of our high-jewelry collection. Features an intricate diamond tiara depicting delicate leaf vines, an opulent V-shaped diamond necklace, and a pair of long, matching chandelier earrings. Over 8 carats of brilliant diamonds in platinum settings represent an heirloom-quality collection.",
    stock: 1,
    image: "/images/bridal_tiara_set.png",
    gallery: [
      "/images/bridal_tiara_set.png",
      "/images/diadem_necklace.png"
    ],
    reviews: [
      { name: "Elizabeth Hastings", rating: 5, text: "An heirloom masterwork. The sparkle is blind-inducing under the chandelier lights. Phenomenal!" }
    ]
  }
];
