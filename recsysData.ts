// GENERATED FILE - do not edit by hand.
//
// Item vectors for the toy recommender in the Research section. They come from
// a BPR matrix-factorization model trained offline on a synthetic implicit-
// feedback dataset (4k users, six taste themes, long-tailed popularity).
// Vectors are L2-normalised, so a dot product is a cosine similarity.
//
// This is an illustration of the idea, not a result from the MSc research.

export interface RecItem {
  id: string;
  name: string;
  theme: string;
  plays: number;
  popRank: number;
  vec: number[];
}

export const REC_ITEMS: RecItem[] = [
  {
    "id": "espresso-machine",
    "name": "Espresso machine",
    "theme": "coffee",
    "plays": 1435,
    "popRank": 2,
    "vec": [
      -0.2883,
      -0.4029,
      -0.1103,
      -0.3484,
      -0.0359,
      -0.2255,
      -0.1412,
      -0.2333,
      -0.6223,
      -0.0892,
      0.092,
      -0.3012
    ]
  },
  {
    "id": "burr-grinder",
    "name": "Burr grinder",
    "theme": "coffee",
    "plays": 1043,
    "popRank": 10,
    "vec": [
      -0.2446,
      -0.0979,
      0.4821,
      -0.2694,
      0.3398,
      -0.0596,
      0.2108,
      -0.4206,
      -0.4116,
      -0.0416,
      0.3371,
      0.0197
    ]
  },
  {
    "id": "gooseneck-kettle",
    "name": "Gooseneck kettle",
    "theme": "coffee",
    "plays": 870,
    "popRank": 13,
    "vec": [
      -0.5339,
      -0.2218,
      -0.1615,
      -0.3561,
      0.0618,
      0.0097,
      -0.119,
      -0.3581,
      0.0166,
      -0.4025,
      0.367,
      -0.2638
    ]
  },
  {
    "id": "milk-frothing-pitcher",
    "name": "Milk frothing pitcher",
    "theme": "coffee",
    "plays": 678,
    "popRank": 21,
    "vec": [
      -0.532,
      0.0904,
      0.0197,
      -0.4669,
      -0.064,
      0.3839,
      0.1407,
      -0.4843,
      -0.0229,
      -0.0592,
      -0.1954,
      -0.2057
    ]
  },
  {
    "id": "bottomless-portafilter",
    "name": "Bottomless portafilter",
    "theme": "coffee",
    "plays": 492,
    "popRank": 27,
    "vec": [
      -0.6565,
      0.1431,
      0.34,
      -0.5246,
      0.0245,
      0.1806,
      0.2499,
      -0.1109,
      -0.0109,
      0.0186,
      -0.0792,
      -0.2073
    ]
  },
  {
    "id": "dosing-funnel",
    "name": "Dosing funnel",
    "theme": "coffee",
    "plays": 339,
    "popRank": 33,
    "vec": [
      -0.4329,
      0.3985,
      0.0,
      -0.2571,
      0.0767,
      -0.1941,
      0.5294,
      -0.1276,
      -0.3577,
      -0.1146,
      0.3244,
      -0.0361
    ]
  },
  {
    "id": "running-shoes",
    "name": "Running shoes",
    "theme": "running",
    "plays": 1464,
    "popRank": 1,
    "vec": [
      0.139,
      -0.264,
      0.1282,
      0.5221,
      0.0883,
      0.2461,
      -0.1894,
      0.1355,
      -0.3419,
      -0.5298,
      -0.1828,
      -0.2615
    ]
  },
  {
    "id": "sports-watch",
    "name": "Sports watch",
    "theme": "running",
    "plays": 1108,
    "popRank": 8,
    "vec": [
      0.0192,
      -0.0856,
      -0.2303,
      0.3763,
      0.3513,
      0.4144,
      0.3569,
      0.2448,
      -0.2033,
      -0.233,
      -0.437,
      -0.1691
    ]
  },
  {
    "id": "hydration-vest",
    "name": "Hydration vest",
    "theme": "running",
    "plays": 730,
    "popRank": 18,
    "vec": [
      0.1966,
      0.19,
      -0.069,
      0.3723,
      0.3695,
      -0.0552,
      0.211,
      -0.0843,
      0.2004,
      -0.7345,
      -0.0313,
      -0.1004
    ]
  },
  {
    "id": "compression-socks",
    "name": "Compression socks",
    "theme": "running",
    "plays": 595,
    "popRank": 24,
    "vec": [
      -0.1132,
      0.197,
      0.2892,
      0.303,
      0.0634,
      -0.2524,
      0.1638,
      0.4315,
      -0.0449,
      -0.3105,
      -0.5777,
      -0.2449
    ]
  },
  {
    "id": "foam-roller",
    "name": "Foam roller",
    "theme": "running",
    "plays": 536,
    "popRank": 25,
    "vec": [
      -0.3276,
      0.0939,
      0.1221,
      0.5369,
      0.1079,
      0.4555,
      0.276,
      0.454,
      0.0187,
      -0.2607,
      0.0881,
      0.0562
    ]
  },
  {
    "id": "anti-chafe-balm",
    "name": "Anti-chafe balm",
    "theme": "running",
    "plays": 287,
    "popRank": 36,
    "vec": [
      -0.3616,
      0.2685,
      -0.0321,
      0.238,
      0.0348,
      -0.2998,
      0.1007,
      0.3936,
      0.3181,
      -0.5162,
      -0.2076,
      -0.2691
    ]
  },
  {
    "id": "mirrorless-camera",
    "name": "Mirrorless camera",
    "theme": "photography",
    "plays": 1365,
    "popRank": 3,
    "vec": [
      0.0937,
      -0.0462,
      -0.1106,
      -0.069,
      0.4478,
      -0.0109,
      -0.5949,
      0.2844,
      -0.3478,
      0.2446,
      0.0623,
      0.3899
    ]
  },
  {
    "id": "50mm-prime-lens",
    "name": "50mm prime lens",
    "theme": "photography",
    "plays": 983,
    "popRank": 11,
    "vec": [
      0.0891,
      0.179,
      0.2646,
      -0.2766,
      0.42,
      0.3616,
      -0.5203,
      0.1372,
      -0.0096,
      0.2374,
      -0.2676,
      0.2978
    ]
  },
  {
    "id": "camera-bag",
    "name": "Camera bag",
    "theme": "photography",
    "plays": 795,
    "popRank": 14,
    "vec": [
      0.0857,
      0.4581,
      -0.0769,
      -0.1432,
      0.0908,
      -0.02,
      -0.8243,
      0.0058,
      0.1104,
      -0.1588,
      -0.0315,
      0.1729
    ]
  },
  {
    "id": "carbon-tripod",
    "name": "Carbon tripod",
    "theme": "photography",
    "plays": 610,
    "popRank": 23,
    "vec": [
      0.0622,
      0.4811,
      -0.5966,
      -0.2174,
      0.3825,
      -0.0328,
      -0.2955,
      0.1246,
      0.0197,
      0.0402,
      0.0553,
      0.326
    ]
  },
  {
    "id": "variable-nd-filter",
    "name": "Variable ND filter",
    "theme": "photography",
    "plays": 440,
    "popRank": 29,
    "vec": [
      0.0857,
      0.5398,
      -0.1118,
      -0.4102,
      0.4163,
      0.0624,
      -0.0337,
      -0.0122,
      0.2152,
      0.1399,
      -0.3938,
      0.3479
    ]
  },
  {
    "id": "lens-cleaning-kit",
    "name": "Lens cleaning kit",
    "theme": "photography",
    "plays": 341,
    "popRank": 32,
    "vec": [
      -0.2564,
      0.705,
      0.2318,
      0.0173,
      -0.2517,
      0.2459,
      -0.3031,
      0.1958,
      0.0754,
      0.1225,
      -0.0286,
      0.3281
    ]
  },
  {
    "id": "mechanical-keyboard",
    "name": "Mechanical keyboard",
    "theme": "desk",
    "plays": 1354,
    "popRank": 4,
    "vec": [
      -0.0466,
      -0.6809,
      -0.1555,
      0.1073,
      -0.2579,
      -0.2457,
      -0.0718,
      -0.0193,
      -0.1087,
      0.1866,
      -0.3667,
      0.4301
    ]
  },
  {
    "id": "ultrawide-monitor",
    "name": "Ultrawide monitor",
    "theme": "desk",
    "plays": 1174,
    "popRank": 7,
    "vec": [
      0.2391,
      -0.3638,
      0.0873,
      0.1194,
      -0.2197,
      0.0653,
      -0.104,
      -0.5678,
      0.302,
      -0.1781,
      -0.0616,
      0.5255
    ]
  },
  {
    "id": "monitor-arm",
    "name": "Monitor arm",
    "theme": "desk",
    "plays": 794,
    "popRank": 15,
    "vec": [
      -0.1356,
      -0.3686,
      0.3992,
      0.2528,
      -0.0999,
      -0.134,
      0.1853,
      -0.0115,
      0.1544,
      0.1463,
      0.1609,
      0.6992
    ]
  },
  {
    "id": "desk-mat",
    "name": "Desk mat",
    "theme": "desk",
    "plays": 689,
    "popRank": 20,
    "vec": [
      0.0047,
      0.2326,
      -0.0881,
      0.2791,
      -0.6337,
      -0.0996,
      0.1984,
      -0.2599,
      -0.1752,
      0.0084,
      -0.1242,
      0.5437
    ]
  },
  {
    "id": "keycap-set",
    "name": "Keycap set",
    "theme": "desk",
    "plays": 478,
    "popRank": 28,
    "vec": [
      -0.0272,
      -0.2117,
      -0.3194,
      -0.0017,
      -0.0254,
      -0.466,
      0.3543,
      -0.1351,
      0.4748,
      -0.1666,
      -0.0806,
      0.4808
    ]
  },
  {
    "id": "cable-raceway",
    "name": "Cable raceway",
    "theme": "desk",
    "plays": 292,
    "popRank": 35,
    "vec": [
      -0.4697,
      -0.0351,
      -0.0158,
      0.0502,
      -0.4513,
      -0.082,
      0.2706,
      0.2615,
      0.2622,
      0.2148,
      -0.1813,
      0.525
    ]
  },
  {
    "id": "chefs-knife",
    "name": "Chef's knife",
    "theme": "cooking",
    "plays": 1333,
    "popRank": 5,
    "vec": [
      0.3703,
      0.0105,
      0.0963,
      0.4268,
      0.0537,
      -0.1893,
      -0.1652,
      -0.4214,
      -0.0565,
      0.4439,
      0.099,
      -0.4667
    ]
  },
  {
    "id": "cast-iron-skillet",
    "name": "Cast iron skillet",
    "theme": "cooking",
    "plays": 1047,
    "popRank": 9,
    "vec": [
      0.0631,
      0.0982,
      -0.5246,
      0.3947,
      -0.053,
      0.1748,
      -0.0118,
      -0.2109,
      -0.0177,
      0.577,
      0.0399,
      -0.3777
    ]
  },
  {
    "id": "digital-scale",
    "name": "Digital scale",
    "theme": "cooking",
    "plays": 751,
    "popRank": 16,
    "vec": [
      -0.0875,
      -0.2205,
      -0.1212,
      0.2702,
      0.1374,
      -0.3235,
      -0.1899,
      -0.033,
      0.5922,
      0.2713,
      0.2457,
      -0.459
    ]
  },
  {
    "id": "dutch-oven",
    "name": "Dutch oven",
    "theme": "cooking",
    "plays": 648,
    "popRank": 22,
    "vec": [
      0.2244,
      0.2132,
      0.0686,
      0.2296,
      0.4119,
      -0.1144,
      0.3063,
      -0.3148,
      0.2331,
      0.5577,
      0.0331,
      -0.3235
    ]
  },
  {
    "id": "bench-scraper",
    "name": "Bench scraper",
    "theme": "cooking",
    "plays": 368,
    "popRank": 31,
    "vec": [
      -0.3823,
      -0.0007,
      -0.1078,
      0.1795,
      -0.0294,
      0.0281,
      0.0419,
      0.2615,
      0.6428,
      0.4345,
      0.257,
      -0.2648
    ]
  },
  {
    "id": "instant-read-thermometer",
    "name": "Instant-read thermometer",
    "theme": "cooking",
    "plays": 519,
    "popRank": 26,
    "vec": [
      -0.2364,
      0.464,
      0.2377,
      0.3952,
      -0.4113,
      -0.2266,
      -0.1272,
      -0.0399,
      0.0316,
      0.4431,
      0.0171,
      -0.2832
    ]
  },
  {
    "id": "2-person-tent",
    "name": "2-person tent",
    "theme": "camping",
    "plays": 1260,
    "popRank": 6,
    "vec": [
      0.5097,
      -0.4123,
      0.1323,
      -0.503,
      -0.2493,
      0.2919,
      0.0984,
      0.212,
      0.1019,
      0.1207,
      -0.0885,
      -0.2548
    ]
  },
  {
    "id": "sleeping-bag",
    "name": "Sleeping bag",
    "theme": "camping",
    "plays": 970,
    "popRank": 12,
    "vec": [
      0.493,
      -0.06,
      -0.1427,
      -0.164,
      -0.2709,
      0.2041,
      0.237,
      0.2825,
      -0.2356,
      -0.0113,
      0.6251,
      0.0933
    ]
  },
  {
    "id": "camp-stove",
    "name": "Camp stove",
    "theme": "camping",
    "plays": 733,
    "popRank": 17,
    "vec": [
      0.6654,
      0.196,
      0.2042,
      -0.3656,
      -0.3655,
      -0.3438,
      0.1421,
      0.1226,
      -0.0738,
      -0.0761,
      -0.1517,
      -0.149
    ]
  },
  {
    "id": "headlamp",
    "name": "Headlamp",
    "theme": "camping",
    "plays": 722,
    "popRank": 19,
    "vec": [
      0.2934,
      0.0259,
      0.0913,
      -0.2496,
      -0.5424,
      0.3153,
      -0.1242,
      0.1423,
      0.2567,
      -0.3124,
      0.4513,
      -0.2149
    ]
  },
  {
    "id": "dry-bag",
    "name": "Dry bag",
    "theme": "camping",
    "plays": 432,
    "popRank": 30,
    "vec": [
      0.1159,
      0.033,
      0.1118,
      -0.3673,
      -0.0486,
      -0.2988,
      0.4708,
      0.6633,
      0.1386,
      0.1587,
      0.1913,
      -0.0614
    ]
  },
  {
    "id": "titanium-spork",
    "name": "Titanium spork",
    "theme": "camping",
    "plays": 293,
    "popRank": 34,
    "vec": [
      0.196,
      0.2448,
      -0.2664,
      -0.4744,
      -0.1871,
      -0.2225,
      0.4493,
      0.2993,
      0.3975,
      -0.1882,
      0.1845,
      -0.0468
    ]
  }
];
