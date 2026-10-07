// NATUREQUEST STATIC DATASETS
// Plant & Nature Exploration OS — 100% Offline, Zero Cloud Dependency

// Initial user discoveries start at 0 so all categories and codex records begin fresh
export const INITIAL_PLANTS = [];

export const INITIAL_QUESTS = [
  {
    id: 'q-five-petals',
    title: 'The Five-Petal Bloom',
    category: 'PLANTS',
    duration: '15 min',
    difficulty: 'Easy',
    reward: 40,
    equipment: 'Magnifying glass or phone lens',
    objective: 'Find a wild or garden flower with exactly five visible petals.',
    hint: 'Look near path edges, open sunny meadows, or lawn margins. Common in buttercups, violets, and geraniums.',
    progress: '0 / 1 found',
    completed: false
  },
  {
    id: 'q-leaf-shapes',
    title: 'Leaf Shape Hunt',
    category: 'OBSERVATION',
    duration: '20 min',
    difficulty: 'Easy',
    reward: 60,
    equipment: 'Sensible walking shoes',
    objective: 'Find and compare three distinctly different leaf shapes (e.g. heart-shaped, lobed, and needle-like).',
    hint: 'Notice how shape correlates with how much wind and sunlight the plant receives.',
    progress: '0 / 3 found',
    completed: false
  },
  {
    id: 'q-unknown-tree',
    title: 'The Unknown Tree',
    category: 'DISCOVERY',
    duration: '30 min',
    difficulty: 'Medium',
    reward: 80,
    equipment: 'Field notebook or lens',
    objective: 'Find a mature tree you pass frequently but have never identified, and study its leaf arrangement.',
    hint: 'Check whether the leaves are opposite (paired directly across) or alternate (staggered) along the twig.',
    progress: '0 / 1 identified',
    completed: false
  },
  {
    id: 'q-texture-walk',
    title: 'Texture Walk',
    category: 'WALK',
    duration: '20 min',
    difficulty: 'Easy',
    reward: 50,
    equipment: 'Bare hands & gentle touch',
    objective: 'Gently feel the surfaces of three different living leaves (e.g. glossy waxy, rough pubescent, and paper-thin).',
    hint: 'Never tear foliage from living branches. Touch gently while the leaf remains attached.',
    progress: '0 / 3 observed',
    completed: false
  },
  {
    id: 'q-veins',
    title: 'Leaf With Unusual Veins',
    category: 'PHOTOGRAPHY',
    duration: '20 min',
    difficulty: 'Medium',
    reward: 60,
    equipment: 'Camera',
    objective: 'Find and photograph a leaf with a highly unusual or distinct vein pattern.',
    hint: 'Hold the leaf up to the light to photograph the vascular structure.',
    progress: '0 / 1 photographed',
    completed: false
  },
  {
    id: 'q-three-shades',
    title: 'Three Green Shades',
    category: 'PHOTOGRAPHY',
    duration: '25 min',
    difficulty: 'Easy',
    reward: 50,
    equipment: 'Camera',
    objective: 'Capture three photos of entirely different shades of green in nature.',
    hint: 'Look for new spring growth vs. old mature foliage.',
    progress: '0 / 3 photographed',
    completed: false
  },
  {
    id: 'q-rough-bark',
    title: 'Rough Bark',
    category: 'PHOTOGRAPHY',
    duration: '15 min',
    difficulty: 'Easy',
    reward: 40,
    equipment: 'Camera',
    objective: 'Photograph the closest, most detailed macro shot of rough tree bark you can find.',
    hint: 'Look for deep fissures and ridges in mature trees.',
    progress: '0 / 1 photographed',
    completed: false
  },
  {
    id: 'q-smallest-leaf',
    title: 'Smallest Leaf You Can Find',
    category: 'DISCOVERY',
    duration: '20 min',
    difficulty: 'Adventure',
    reward: 80,
    equipment: 'Patience',
    objective: 'Find and log the absolute smallest distinct leaf you can locate outdoors.',
    hint: 'Look closely at mosses, tiny groundcovers, and emerging sprouts.',
    progress: '0 / 1 found',
    completed: false
  }
];

export const CURATED_TRAILS = [
  {
    id: 'trail-1',
    name: 'Greenway Botanical Loop',
    area: 'Creekside Nature Reserve',
    distance: '3.4 km',
    duration: '50 min',
    difficulty: 'Easy',
    terrain: 'Crushed gravel & packed earth footpaths',
    bestFor: 'Native wildflowers, fern gullies, riparian flora',
    safetyNotes: 'Can become slick after rain near the creek bank. Stay on marked paths to avoid soil erosion.',
    plantHighlights: ['Fern fronds', 'Sycamore bark', 'Streamside wild mint'],
    completed: false,
    saved: true
  },
  {
    id: 'trail-2',
    name: 'Ancient Oak Ridge Walk',
    area: 'Highland Forest Park',
    distance: '5.2 km',
    duration: '75 min',
    difficulty: 'Moderate',
    terrain: 'Rocky dirt trail with gradual hillside ascent',
    bestFor: 'Hardwood canopy, mature oak-hickory groves, fungi study',
    safetyNotes: 'Watch for exposed tree roots along the upper ridge. Bring adequate water for the climb.',
    plantHighlights: ['English Oak', 'Shagbark Hickory', 'Shelf bracket fungi'],
    completed: false,
    saved: false
  },
  {
    id: 'trail-3',
    name: 'Meadow Creek Wetland Circuit',
    area: 'Valley Basin Sanctuary',
    distance: '2.1 km',
    duration: '30 min',
    difficulty: 'Easy',
    terrain: 'Flat timber boardwalk & level turf paths',
    bestFor: 'Sedges, aquatic rushes, pollinator meadow wildflowers',
    safetyNotes: 'Boardwalk can have morning dew slickness. Do not step off boardwalk into sensitive wetland peat.',
    plantHighlights: ['Cattail reeds', 'Meadow Violet', 'Wild Iris blooms'],
    completed: false,
    saved: true
  },
  {
    id: 'trail-4',
    name: 'Pine needle Valley Loop',
    area: 'Northern Conifer Woodland',
    distance: '4.6 km',
    duration: '65 min',
    difficulty: 'Moderate',
    terrain: 'Soft pine-needle duff & undulating forest floor',
    bestFor: 'Evergreen conifers, aromatic resin bark, understory mosses',
    safetyNotes: 'Dense canopy lowers natural ambient light quickly at dusk. Carry a small flashlight.',
    plantHighlights: ['White Pine needles', 'Ground lichen', 'Resinous cone scales'],
    completed: false,
    saved: false
  }
];

export const NATURE_GUIDE_ARTICLES = [
  {
    id: 'guide-1',
    title: 'How to Observe a Leaf: The Botanist’s Eye',
    category: 'LEAVES',
    readTime: '4 min',
    summary: 'Learn how botanists dissect leaf structure without picking the leaf—from margins and venation to petiole attachment.',
    content: `When you encounter a plant outdoors, the leaf is your most reliable identification key. Before touching anything, observe its posture on the branch.

### 1. Simple vs. Compound Leaves
Look where the leaf stalk (petiole) meets the woody twig. If there is a small swelling or bud at the base of the stalk, that entire structure is a single leaf. If multiple small leaflets arise along a stalk without a bud at their individual bases, you are looking at a compound leaf (like ash, walnut, or neem).

### 2. Leaf Arrangement Along the Stem
Are leaves arranged in opposite pairs directly across from each other, or do they alternate in a staggered zigzag pattern along the twig? In temperate trees, only a few major families have opposite leaves (remember the MAD acronym: Maple, Ash, Dogwood).

### 3. Margin & Venation
Run your eyes along the perimeter margin. Is it smooth and toothless (entire), serrated like a kitchen knife, or deeply lobed with rounded hollows? Examine the veins beneath the leaf: do they branch off a central midrib like a feather (pinnate), or radiate from one point like fingers on a hand (palmate)?`
  },
  {
    id: 'guide-2',
    title: 'Why Bark Texture Matters: Dendrology 101',
    category: 'TREES',
    readTime: '5 min',
    summary: 'Tree bark is not dead wood—it is a living ecological interface protecting the vascular cambium from fire, insects, and frost.',
    content: `Tree bark provides critical identification clues in winter and early spring when canopies are bare. Bark changes dramatically as a tree matures.

### The Role of Bark
Bark consists of inner living phloem (transporting sugars) and outer cork tissue impregnated with suberin—a waterproof, rot-resistant waxy substance. As the trunk expands in girth, the outer dead layer must either stretch, peel, or crack into fissures.

### Identifying Patterns
- **Smooth & Lenticelled:** Young beech, birch, and cherry exhibit smooth skins punctuated by horizontal breathing slits called lenticels.
- **Deeply Furrowed:** Mature oaks and ashes feature vertical ridges with deep valleys, providing sheltered crevices where spiders and overwintering moth pupae hide.
- **Peeling & Exfoliating:** River birch, paper birch, and sycamore shed outer plates in curls or large camouflage patches, preventing climbing vines from choking their trunks.`
  },
  {
    id: 'guide-3',
    title: 'Beginner’s Guide to Flower Anatomy',
    category: 'FLOWERS',
    readTime: '4 min',
    summary: 'Decipher sepals, petals, stamens, and symmetry to understand why plants evolved specific floral architectures.',
    content: `Flowers are reproductive organs evolved to attract specific pollinating animals or capture wind-borne pollen grains.

### Floral Symmetry
Flowers generally fall into two broad architectural categories:
1. **Radial Symmetry (Actinomorphic):** Can be sliced in half along any line like a pie (e.g. wild rose, buttercup, apple blossom). These generally accommodate open-access generalist insects like beetles and flies.
2. **Bilateral Symmetry (Zygomorphic):** Can only be divided into two mirrored halves down a single central vertical line (e.g. violets, snapdragons, orchids). These are specialized landing pads tailored for specific bees with precision weight and landing requirements.

### Counting Flower Parts
Notice the number of petals. Monocots (grasses, lilies, irises) almost universally produce flower parts in multiples of three. Eudicots (broadleaf trees, roses, mints) typically exhibit floral parts in multiples of four or five.`
  },
  {
    id: 'guide-4',
    title: 'Field Observation Safety & Ethics',
    category: 'SAFETY',
    readTime: '3 min',
    summary: 'Essential Leave-No-Trace principles for mindful plant study, identifying poison ivy, and respecting wild microhabitats.',
    content: `The primary law of field naturalists is stewardship: leave the natural world healthier than you found it.

### Never Forage Without Absolute Certainty
Never consume any wild plant, berry, seed, or mushroom based solely on an app or automated visual classification. Plants can exhibit identical visual morphology while containing dangerous oxalates, alkaloids, or contact irritants.

### The Rule of Gentle Contact
- Do not uproot wild plants or strip bark from living tree trunks.
- When taking close-up macro photographs, gently support the stem from behind with your finger rather than snapping the flower head off.
- Stay on established footpaths to prevent soil compaction over shallow tree roots.`
  }
];

export const FIELD_STORIES = [
  {
    id: 'story-1',
    title: 'The Tree You Walk Past Every Day',
    category: 'FIELD REFLECTION',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    summary: 'Urban and suburban trees are not static sidewalk decorations; they are resilient architectural witnesses to decades of microclimates.',
    content: `Every morning, hundreds of commuters rush past an old street tree without once lifting their gaze. If they paused for thirty seconds, they would notice a miniature ecosystem operating at full capacity.

In the furrowed bark of that single urban ash or plane tree, lichens indicate ambient air quality. Spiders spin nocturnal webs across the crevices. Microscopic rot-holes collect rainwater that sustains bird drinking spots through summer heatwaves.

When you learn the name and seasonal rhythms of the tree on your daily corner, the concrete landscape suddenly transforms into a living neighborhood.`
  },
  {
    id: 'story-2',
    title: 'Why Leaves Have Different Shapes',
    category: 'EVOLUTIONARY BIOLOGY',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    summary: 'From desert needles to rainforest fan-palms, leaf geometry is a mathematical compromise between water loss, light harvest, and wind drag.',
    content: `Why isn’t every leaf on earth a simple round solar panel? Because sunlight is only one of many evolutionary pressures.

A broad, flat leaf is excellent at absorbing photons, but in heavy winds it acts like a sail, threatening to snap branches. In intense sunlight, a broad leaf overheats and evaporates water at alarming rates.

Lobed leaves (like oaks and maples) allow wind to pass freely through the sinuses between lobes while shedding excess heat through perimeter turbulence. Desert plants reduce leaves to spines to eliminate surface transpiration entirely. Nature’s diversity is never random—it is physics written in chlorophyll.`
  },
  {
    id: 'story-3',
    title: '5 Things to Notice on Your Next 15-Minute Walk',
    category: 'OUTDOOR HABITS',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
    summary: 'A simple sensory field guide to re-tuning your peripheral observation skills on familiar neighbourhood sidewalks.',
    content: `You don’t need a national park to explore. On your next brief walk around the block, set your screen to sleep and look for these five clues:

1. Sidewalk Crack Colonizers: Notice how dandelions, plantain, and shepherd’s purse exploit the micro-climate of concrete seams, generating deep taproots that break up asphalt.
2. The Moss Compass: Check north-facing masonry walls and tree trunks. The lack of direct afternoon sun preserves moisture, creating vibrant emerald mats.
3. Canopy Gaps: Look up at tree crowns. Notice crown shyness—how canopies of adjacent mature trees often maintain a visible narrow gap, never touching branch tips.
4. Seed Dispersal Mechanisms: Look for winged maple samaras, sticky burrs, or feathery thistle parachutes designed to hitchhike across city parks.
5. Leaf Texture Differences: Touch three leaves without picking them. Feel the difference between shade foliage and sun-drenched canopy leaves.`
  }
];

export const YOUTUBE_JOURNALS = [
  {
    id: 'yt-1',
    title: 'Introduction to Nature Journaling',
    author: 'John Muir Laws',
    youtubeId: '6BNzzjBIBPo',
    duration: '11 min',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    category: 'NATURE JOURNALING',
    summary: 'A foundational field workshop on using words, sketches, and numbers to sharpen outdoor observational skills without needing to be an artist.',
    takeaways: [
      'Document what you see using words, pictures, and numbers',
      'Ask three simple questions outdoors: I notice, I wonder, It reminds me of',
      'The goal of journaling is curiosity and attention, not making fine museum art'
    ]
  },
  {
    id: 'yt-2',
    title: 'How Trees Talk to Each Other and Share Nutrients',
    author: 'TED-Ed & Suzanne Simard',
    youtubeId: 'yWOqeyPIVRo',
    duration: '5 min',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    category: 'FOREST ECOLOGY',
    summary: 'Explore how underground mycorrhizal fungal networks link old-growth mother trees to young seedlings across the forest floor.',
    takeaways: [
      'Mycorrhizal fungi connect tree root networks throughout vast woodlands',
      'Mature mother trees transfer carbon and warning signals to shaded saplings',
      'A forest behaves like a cooperative living super-organism rather than isolated competitors'
    ]
  },
  {
    id: 'yt-3',
    title: 'Meet the Plants: Crash Course Botany',
    author: 'CrashCourse Botany',
    youtubeId: 'Jb6P5E7b3jY',
    duration: '13 min',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    category: 'BOTANY BASICS',
    summary: 'An engaging, accessible introduction to plant biodiversity, photosynthesis, and how flora shaped earth’s oxygenated atmosphere.',
    takeaways: [
      'Plants transformed the planetary atmosphere by generating atmospheric oxygen',
      'Vascular systems evolved to allow vertical growth into towering forest canopies',
      'Understanding fundamental plant anatomy unlocks deeper appreciation on any outdoor walk'
    ]
  },
  {
    id: 'yt-4',
    title: 'The Real Reason Leaves Change Color in Autumn',
    author: 'MinuteEarth',
    youtubeId: 'd260CmZoxj8',
    duration: '3 min',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
    category: 'SEASONAL SCIENCE',
    summary: 'Why deciduous trees break down green chlorophyll to salvage nitrogen and phosphorus before winter dormancy.',
    takeaways: [
      'Trees actively reabsorb valuable nutrients from leaves into branch bark before shedding',
      'Carotenoids and xanthophylls produce golden yellows already present inside foliage',
      'Anthocyanin reds act as a protective sunscreen while nutrients are safely recovered'
    ]
  }
];

export const ACHIEVEMENTS_LIST = [
  {
    id: 'ach-first',
    title: 'FIRST DISCOVERY',
    description: 'Scan and identify your first outdoor plant specimen.',
    icon: 'Leaf',
    progress: (history) => Math.min(history.length, 1),
    target: 1,
    isUnlocked: (history) => history.length >= 1
  },
  {
    id: 'ach-naturalist',
    title: 'FIELD NATURALIST',
    description: 'Log 10 plant discoveries in your Field Codex.',
    icon: 'Compass',
    progress: (history) => Math.min(history.length, 10),
    target: 10,
    isUnlocked: (history) => history.length >= 10
  },
  {
    id: 'ach-curious',
    title: 'CURIOUS EXPLORER',
    description: 'Complete 5 outdoor nature quests.',
    icon: 'Target',
    progress: (h, qCount) => Math.min(qCount, 5),
    target: 5,
    isUnlocked: (h, qCount) => qCount >= 5
  },
  {
    id: 'ach-green-eyes',
    title: 'GREEN EYES',
    description: 'Identify specimens across 3 distinct plant categories.',
    icon: 'Eye',
    progress: (history) => {
      const cats = new Set(history.map(h => (h.category || '').toUpperCase()));
      return Math.min(cats.size, 3);
    },
    target: 3,
    isUnlocked: (history) => {
      const cats = new Set(history.map(h => (h.category || '').toUpperCase()));
      return cats.size >= 3;
    }
  },
  {
    id: 'ach-off-grid',
    title: 'OFF-GRID EXPLORER',
    description: 'Complete a plant analysis using local Gemma 3.',
    icon: 'ShieldCheck',
    progress: () => 1,
    target: 1,
    isUnlocked: () => true
  },
  {
    id: 'ach-codex-keeper',
    title: 'CODEX KEEPER',
    description: 'Save 15 specimens into your permanent nature journal.',
    icon: 'BookOpen',
    progress: (history) => Math.min(history.length, 15),
    target: 15,
    isUnlocked: (history) => history.length >= 15
  }
];

export const SAMPLE_TEST_PLANTS = [
  {
    id: 'sample-neem',
    name: 'Neem Tree (Azadirachta indica)',
    category: 'Tree',
    confidence: 'Moderate',
    features: ['Compound serrated leaflets', 'Asymmetric leaf base', 'Rough grey-brown fissured bark'],
    fieldNotes: 'Native to dry tropical regions; produces bitter azadirachtin compounds naturally repelling insect pests.',
    whereToLook: 'Parks, suburban botanical collections, and open woodland margins with well-drained soil.',
    observationChallenge: 'Find another nearby tree with a noticeably different leaf structure.',
    safetyNote: 'Do not consume wild plant material based solely on automated visual classification.',
    xp: 50
  },
  {
    id: 'sample-violet',
    name: 'Meadow Violet (Viola sororia)',
    category: 'Flower',
    confidence: 'Moderate',
    features: ['5 bilateral asymmetrical petals', 'Spurred lower petal with nectar guides', 'Heart-shaped basal leaves'],
    fieldNotes: 'Perennial groundcover wildflower serving as an early nectar source for emerging native pollinators.',
    whereToLook: 'Moist woodland paths, semi-shaded lawns, and forest transition zones beneath deciduous canopies.',
    observationChallenge: 'Examine the lower petal closely to notice the purple landing-strip veins.',
    safetyNote: 'Do not forage in areas exposed to urban lawn treatment chemicals.',
    xp: 45
  },
  {
    id: 'sample-oak',
    name: 'English Oak (Quercus robur)',
    category: 'Tree',
    confidence: 'High',
    features: ['Lobed margin with rounded hollows', 'Short leaf stalks with basal lobes', 'Deeply ridged rugged bark'],
    fieldNotes: 'Ecological keystone tree species sustaining hundreds of bird, insect, and fungal organisms.',
    whereToLook: 'Old-growth parks, field hedgerows, and mixed hardwood woodland trails.',
    observationChallenge: 'Look beneath leaves for spherical silk-like oak gall wasp structures.',
    safetyNote: 'Acorns are high in astringent tannins; safe to handle, but do not consume raw.',
    xp: 50
  },
  {
    id: 'sample-fern',
    name: 'Bracken Fern (Pteridium aquilinum)',
    category: 'Plant',
    confidence: 'High',
    features: ['Large triangular bipinnate fronds', 'Underground rhizome network', 'Sori spores on underside margins'],
    fieldNotes: 'One of the most ancient surviving vascular land plant lineages, reproducing via microscopic spores rather than seeds.',
    whereToLook: 'Damp acidic forest floors, shaded gullies, and heathland margins.',
    observationChallenge: 'Check the undersides of mature fronds for rows of spore-bearing sporangia.',
    safetyNote: 'Bracken fern contains ptaquiloside; do not consume or forage.',
    xp: 40
  }
];

// POPULAR & FINDABLE MILESTONE SPECIES LIST
// These are target species for users to find outdoors. A milestone is satisfied ONLY when the user photographs and identifies it!
export const POPULAR_MILESTONE_SPECIES = [
  {
    id: 'ms-pine',
    name: 'Pine Tree',
    scientificName: 'Pinus',
    category: 'Tree',
    difficulty: 'Common',
    reward: 100,
    keywords: ['pine', 'pinus', 'conifer', 'pinecone', 'needle'],
    description: 'Evergreen gymnosperms known for slender needle leaves bound in bundles and woody cones.',
    whereToLook: 'Parks, suburban gardens, highland paths, and evergreen borders.',
    keyFeatures: ['Clustered needle-like leaves', 'Woody pinecones', 'Rough scaly bark']
  },
  {
    id: 'ms-banyan',
    name: 'Banyan Tree',
    scientificName: 'Ficus benghalensis',
    category: 'Tree',
    difficulty: 'Iconic',
    reward: 120,
    keywords: ['banyan', 'ficus benghalensis', 'bargad', 'prop root', 'strangler fig'],
    description: 'Vast canopy tree famous for hanging aerial prop roots that grow downward into supportive auxiliary trunks.',
    whereToLook: 'Botanical collections, tropical avenues, temple courtyards, and open suburban parks.',
    keyFeatures: ['Aerial roots hanging from branches', 'Large leathery oval leaves', 'Milky white sap']
  },
  {
    id: 'ms-neem',
    name: 'Neem Tree',
    scientificName: 'Azadirachta indica',
    category: 'Tree',
    difficulty: 'Common',
    reward: 80,
    keywords: ['neem', 'azadirachta', 'margosa'],
    description: 'Hardy shade tree with curved serrated compound leaflets known for natural insect resistance.',
    whereToLook: 'Sidewalks, park borders, suburban gardens, and dry sunny avenues.',
    keyFeatures: ['Serrated sickle-shaped leaflets', 'Rough dark grey bark', 'Pale green berries']
  },
  {
    id: 'ms-peepal',
    name: 'Peepal / Sacred Fig',
    scientificName: 'Ficus religiosa',
    category: 'Tree',
    difficulty: 'Common',
    reward: 90,
    keywords: ['peepal', 'ficus religiosa', 'sacred fig', 'bodhi'],
    description: 'Resilient fig tree with unmistakable heart-shaped leaves ending in a long, slender drip-tip tail.',
    whereToLook: 'Old masonry walls, street corners, temple courtyards, and community parks.',
    keyFeatures: ['Heart-shaped leaf with long tail drip tip', 'Prominent webbed veins', 'Smooth pale grey bark']
  },
  {
    id: 'ms-oak',
    name: 'Oak Tree',
    scientificName: 'Quercus',
    category: 'Tree',
    difficulty: 'Common',
    reward: 100,
    keywords: ['oak', 'quercus', 'acorn'],
    description: 'Majestic hardwood tree supporting huge biodiversity networks, recognizable by lobed leaves and acorns.',
    whereToLook: 'Deciduous woodlands, nature reserves, and municipal parks.',
    keyFeatures: ['Rounded or pointed leaf lobes', 'Acorn nuts in wooden caps', 'Deep vertical bark ridges']
  },
  {
    id: 'ms-palm',
    name: 'Palm Tree',
    scientificName: 'Arecaceae',
    category: 'Tree',
    difficulty: 'Common',
    reward: 80,
    keywords: ['palm', 'arecaceae', 'date palm', 'fan palm', 'coconut'],
    description: 'Columnar evergreen monocot with a distinctive crown of large radiating fan or feather fronds.',
    whereToLook: 'Subtropical boulevards, public parks, garden borders, and landscaped avenues.',
    keyFeatures: ['Unbranched columnar trunk', 'Fan or feather fronds', 'Leaf scar rings on bark']
  },
  {
    id: 'ms-fern',
    name: 'Wild Fern',
    scientificName: 'Pteridophyta',
    category: 'Plant',
    difficulty: 'Common',
    reward: 70,
    keywords: ['fern', 'pteridophyta', 'bracken', 'frond', 'maidenhair'],
    description: 'Ancient non-flowering vascular plant that reproduces through spores nestled beneath delicate divided fronds.',
    whereToLook: 'Damp shaded forest floors, creek margins, and shaded garden stone walls.',
    keyFeatures: ['Feathery divided fronds with young fiddleheads', 'Spore clusters under mature leaves', 'No seeds or blossoms']
  },
  {
    id: 'ms-bamboo',
    name: 'Bamboo',
    scientificName: 'Bambusoideae',
    category: 'Plant',
    difficulty: 'Common',
    reward: 80,
    keywords: ['bamboo', 'bambusoideae', 'culm', 'cane'],
    description: 'Fast-growing giant woody grass featuring hollow jointed stems and graceful linear leaves.',
    whereToLook: 'Park edges, water features, botanical gardens, and privacy hedges.',
    keyFeatures: ['Jointed hollow stems with visible nodes', 'Narrow arching leaves', 'Clumping rhizome growth']
  },
  {
    id: 'ms-hibiscus',
    name: 'Hibiscus / China Rose',
    scientificName: 'Hibiscus rosa-sinensis',
    category: 'Flower',
    difficulty: 'Common',
    reward: 80,
    keywords: ['hibiscus', 'china rose', 'gudhal'],
    description: 'Tropical flowering shrub with large trumpet blossoms and an extended yellow-anthered staminal column.',
    whereToLook: 'Residential gardens, sunny outdoor planters, and park flowerbeds.',
    keyFeatures: ['Five large showy petals', 'Prominent protruding pollen column', 'Glossy serrated foliage']
  },
  {
    id: 'ms-dandelion',
    name: 'Dandelion',
    scientificName: 'Taraxacum officinale',
    category: 'Flower',
    difficulty: 'Very Easy',
    reward: 60,
    keywords: ['dandelion', 'taraxacum', 'puffball'],
    description: 'Everywhere sidewalk wildflower with lion-toothed leaves, bright yellow composite flowers, and spherical seed puffs.',
    whereToLook: 'Sidewalk cracks, open lawns, park edges, and roadside paths.',
    keyFeatures: ['Basal rosette of toothed leaves', 'Hollow flower stalks', 'Yellow bloom or feathery seed ball']
  },
  {
    id: 'ms-tulsi',
    name: 'Tulsi / Holy Basil',
    scientificName: 'Ocimum tenuiflorum',
    category: 'Plant',
    difficulty: 'Common',
    reward: 75,
    keywords: ['tulsi', 'basil', 'ocimum', 'holy basil'],
    description: 'Aromatic sacred herbal plant with intensely fragrant opposite leaves and square stems.',
    whereToLook: 'Courtyards, kitchen gardens, herbal collections, and balcony planters.',
    keyFeatures: ['Square stem structure', 'Strong clove and herbal aroma', 'Opposite serrated leaves']
  },
  {
    id: 'ms-aloe',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    category: 'Plant',
    difficulty: 'Common',
    reward: 70,
    keywords: ['aloe', 'aloe vera', 'succulent'],
    description: 'Thick fleshy succulent with spiny margins that stores natural clear moisture gel.',
    whereToLook: 'Rock gardens, sunny balconies, arid outdoor beds, and planters.',
    keyFeatures: ['Thick water-storing leaves with soft spikes', 'Translucent gel inside blades', 'Rosette leaf arrangement']
  },
  {
    id: 'ms-eucalyptus',
    name: 'Eucalyptus / Gum Tree',
    scientificName: 'Eucalyptus',
    category: 'Tree',
    difficulty: 'Medium',
    reward: 100,
    keywords: ['eucalyptus', 'gum tree', 'blue gum', 'safeda'],
    description: 'Aromatic towering tree with colorful peeling ribbon bark and sickle-shaped blue-green leaves.',
    whereToLook: 'Parkways, highway shelterbelts, plantations, and city botanical gardens.',
    keyFeatures: ['Aromatic menthol-scented leaves', 'Peeling smooth bark in ribbons', 'Woody capsule gum nuts']
  },
  {
    id: 'ms-maple',
    name: 'Maple Tree',
    scientificName: 'Acer',
    category: 'Tree',
    difficulty: 'Medium',
    reward: 90,
    keywords: ['maple', 'acer', 'samara', 'sycamore'],
    description: 'Deciduous canopy tree with palmate lobed leaves and spinning helicopter-winged seeds.',
    whereToLook: 'City avenues, community parks, river paths, and temperate woodlands.',
    keyFeatures: ['Opposite palmately lobed leaves (3 to 5 lobes)', 'Paired winged helicopter seeds', 'Vibrant autumn foliage']
  },
  {
    id: 'ms-bougainvillea',
    name: 'Bougainvillea',
    scientificName: 'Bougainvillea spectabilis',
    category: 'Flower',
    difficulty: 'Common',
    reward: 80,
    keywords: ['bougainvillea', 'paper flower', 'bract'],
    description: 'Vigorous ornamental woody vine covered in bright magenta or crimson paper-thin petal-like bracts.',
    whereToLook: 'Garden fences, sunny walls, pergolas, and outdoor boundary gates.',
    keyFeatures: ['Paper-thin colorful bracts', 'Tiny white tubular true flowers', 'Curved protective thorns']
  }
];

// Helper to check whether a milestone species has been satisfied by a real uploaded photograph
export function getMilestoneStatus(milestone, userHistory = []) {
  const match = userHistory.find(item => {
    const itemName = (item.name || item.identification || '').toLowerCase();
    const itemNotes = (item.fieldNotes || item.fact || '').toLowerCase();
    const itemFeatures = Array.isArray(item.features) ? item.features.join(' ').toLowerCase() : '';
    const itemCategory = (item.category || '').toLowerCase();

    return milestone.keywords.some(kw => 
      itemName.includes(kw) || itemNotes.includes(kw) || itemFeatures.includes(kw)
    );
  });

  return {
    isSatisfied: !!match,
    matchedItem: match || null
  };
}
