// NATUREQUEST STATIC DATASETS & EXPEDITION TEMPLATES
// 100% Offline, Zero Cloud Dependency

export const ACTIVITIES = [
  {
    id: 'station',
    title: 'Field Station',
    discipline: 'Command Hub',
    desc: 'Central expedition radar, mission brief & specimen analyzer',
    icon: 'Compass',
    reward: 'Hub',
    status: 'Ready'
  },
  {
    id: 'plant',
    title: 'Plant Scout',
    discipline: 'Botanical Survey',
    desc: 'Identify wildflowers, shrubs and vascular ground flora',
    icon: 'Leaf',
    reward: '+40 XP',
    status: 'Active'
  },
  {
    id: 'tree',
    title: 'Tree Detective',
    discipline: 'Dendrology',
    desc: 'Study canopy structure, bark fissures and foliage patterns',
    icon: 'Trees',
    reward: '+50 XP',
    status: 'Active'
  },
  {
    id: 'bird',
    title: 'Bird Watch',
    discipline: 'Ornithology',
    desc: 'Observe plumage, silhouette, perches and naturally fallen feathers',
    icon: 'Bird',
    reward: '+60 XP',
    status: 'Challenging'
  },
  {
    id: 'insect',
    title: 'Insect Scout',
    discipline: 'Entomology',
    desc: 'Spot pollinators, macro exoskeletons and leaf miners',
    icon: 'Bug',
    reward: '+45 XP',
    status: 'Active'
  },
  {
    id: 'rock',
    title: 'Rock & Mineral',
    discipline: 'Field Geology',
    desc: 'Analyze sedimentary strata, quartz veins and riverbed pebbles',
    icon: 'Mountain',
    reward: '+55 XP',
    status: 'Active'
  },
  {
    id: 'hunt',
    title: 'Nature Hunt',
    discipline: 'Scavenger Challenge',
    desc: 'Execute multi-target outdoor biodiversity scavenger trails',
    icon: 'Binoculars',
    reward: '+100 XP',
    status: 'High Bounty'
  },
  {
    id: 'trail',
    title: 'Trail Quest',
    discipline: 'Wilderness Navigation',
    desc: 'Complete terrain-based outdoor walking & pacing objectives',
    icon: 'Footprints',
    reward: '+75 XP',
    status: 'Active'
  },
  {
    id: 'sky',
    title: 'Sky Watch',
    discipline: 'Atmospheric Study',
    desc: 'Observe cloud classifications, sun angles and natural canopy light',
    icon: 'Telescope',
    reward: '+35 XP',
    status: 'Weather Safe'
  },
  {
    id: 'random',
    title: 'Random Expedition',
    discipline: 'Dynamic AI Directive',
    desc: 'Let offline Gemma 3 pick an unexpected outdoor micro-quest',
    icon: 'Dices',
    reward: '+??? XP',
    status: 'Signature'
  }
];

export const QUEST_CATEGORIES = [
  'ALL',
  'WALK',
  'NATURE',
  'OBSERVATION',
  'PHOTO',
  'DISCOVERY',
  'FITNESS',
  'SOCIAL'
];

export const INITIAL_QUESTS = [
  {
    id: 'q-green-reset',
    title: 'The 20-Minute Green Reset',
    category: 'WALK',
    duration: '20 MIN',
    difficulty: 'EASY',
    reward: 80,
    equipment: 'Sensible shoes',
    objective: 'Walk outside continuously for 20 minutes with zero notifications.',
    hint: 'Leave your headphones behind. Listen for wind in branches and distant birds.',
    completed: false
  },
  {
    id: 'q-five-texture',
    title: 'The Five-Texture Hunt',
    category: 'OBSERVATION',
    duration: '30 MIN',
    difficulty: 'EASY',
    reward: 100,
    equipment: 'Field notebook or lens',
    objective: 'Touch or inspect 5 distinctly different natural textures (e.g. rough bark, smooth pebble, fuzzy moss, brittle twig, glossy leaf).',
    hint: 'Notice micro-gradients that digital screens can never replicate.',
    completed: false
  },
  {
    id: 'q-five-petals',
    title: 'The Five-Petal Bloom',
    category: 'NATURE',
    duration: '25 MIN',
    difficulty: 'EASY',
    reward: 40,
    equipment: 'Camera lens',
    objective: 'Find and photograph a wild flower with five distinct petals.',
    hint: 'Look along footpath borders, untamed lawn margins, or sunny hedgerows.',
    completed: false
  },
  {
    id: 'q-unknown-tree',
    title: 'The Unknown Tree',
    category: 'DISCOVERY',
    duration: '45 MIN',
    difficulty: 'MEDIUM',
    reward: 150,
    equipment: 'Gemma 3 Camera',
    objective: 'Find a tree you pass frequently but have never identified, and photograph its leaf structure.',
    hint: 'Study leaf arrangement: alternate or opposite along the stem?',
    completed: false
  },
  {
    id: 'q-pollinator-macro',
    title: 'Pollinator Standoff',
    category: 'PHOTO',
    duration: '35 MIN',
    difficulty: 'MEDIUM',
    reward: 90,
    equipment: 'Camera / Macro lens',
    objective: 'Photograph an active pollinator (bee, fly, butterfly) resting on a flower.',
    hint: 'Move with slow, deliberate breathing. Never cast your shadow over the blossom.',
    completed: false
  },
  {
    id: 'q-elevation-pulse',
    title: 'The Ridge Pace Circuit',
    category: 'FITNESS',
    duration: '40 MIN',
    difficulty: 'HARD',
    reward: 120,
    equipment: 'Water bottle, trail boots',
    objective: 'Ascend the nearest hill, staircase, or park incline at brisk cadence.',
    hint: 'Focus on diaphragmatic breathing while keeping eyes forward.',
    completed: false
  },
  {
    id: 'q-share-discovery',
    title: 'Field Companion Walk',
    category: 'SOCIAL',
    duration: '30 MIN',
    difficulty: 'EASY',
    reward: 70,
    equipment: 'A walking partner',
    objective: 'Bring a friend, neighbor, or family member outside and point out 3 natural details.',
    hint: 'Shared observation deepens retention and makes outdoor habits stick.',
    completed: false
  }
];

export const SAMPLE_SPECIMENS = [
  {
    id: 'sample-oak',
    name: 'Quercus robur (English Oak)',
    category: 'TREE',
    confidence: 'HIGH',
    features: ['Lobed margin without bristles', 'Auriculate leaf base', 'Sturdy rough furrowed bark'],
    fact: 'A single mature oak supports over 2,300 species of birds, insects, and mycorrhizal fungi throughout its lifespan.',
    observation: 'Check the undersides of leaves for tiny spherical silk-like oak gall wasp structures.',
    nextChallenge: 'Find another tree nearby with compound leaflets rather than simple lobed edges.',
    safetyNote: 'Acorns contain tannins; safe to handle, but do not consume raw.',
    xp: 50,
    svgColor: '#10b981'
  },
  {
    id: 'sample-violet',
    name: 'Viola sororia (Common Meadow Violet)',
    category: 'FLOWER',
    confidence: 'HIGH',
    features: ['5 bilateral asymmetrical petals', 'Heart-shaped basal leaves', 'Spurred lower petal'],
    fact: 'Violet seeds feature a nutrient-rich fatty appendage called an elaiosome, specifically gathered and planted underground by ants.',
    observation: 'Examine the lower petal; notice the dark purple veins acting as nectar flight guides for bees.',
    nextChallenge: 'Locate a yellow or white flowering specimen within 10 meters.',
    safetyNote: 'Do not forage wild plants near roadside runoff zones.',
    xp: 45,
    svgColor: '#8b5cf6'
  },
  {
    id: 'sample-cricket',
    name: 'Gryllus pennsylvanicus (Fall Field Cricket)',
    category: 'INSECT',
    confidence: 'MODERATE',
    features: ['Dark melanistic exoskeleton', 'Enlarged jumping hind femora', 'Thread-like sensory antennae'],
    fact: 'Crickets hear using tympanal acoustic organs located on their front legs rather than on their heads.',
    observation: 'Listen closely: if ambient temperature drops, the chirp frequency noticeably slows.',
    nextChallenge: 'Locate an insect exhibiting natural camouflage against decaying wood.',
    safetyNote: 'Completely harmless ground dwelling insect; observe without grasping.',
    xp: 55,
    svgColor: '#f59e0b'
  },
  {
    id: 'sample-granite',
    name: 'Feldspar-Quartz Granite Pebble',
    category: 'ROCK',
    confidence: 'HIGH',
    features: ['Plutonic crystalline texture', 'Pinkish potassium feldspar grains', 'Translucent glassy quartz veins'],
    fact: 'Formed kilometers deep in ancient magma chambers cooling over millions of years before river abrasion smoothed its facets.',
    observation: 'Hold it under direct sunlight to view specular cleavage reflections from cleavage planes.',
    nextChallenge: 'Find a contrasting sedimentary stone showing visible horizontal stratification.',
    safetyNote: 'Watch your footing when observing riverbed cobblestones.',
    xp: 40,
    svgColor: '#06b6d4'
  }
];

export const INITIAL_DISCOVERIES = [
  {
    id: 'disc-1',
    name: 'Quercus velutina (Black Oak)',
    category: 'TREE',
    confidence: 'HIGH',
    features: ['Deep glossy lobes', 'Rough dark fissures', 'Pubescent buds'],
    fact: 'The inner bark contains quercitron, a rich natural yellow pigment historically prized by indigenous naturalists.',
    observation: 'Touch the bark: the rough vertical ridges shelter overwintering insect pupae.',
    challengeCompleted: 'Find a compound leaf or dark tree bark',
    earned: 50,
    time: '09:22 AM',
    date: 'Oct 06, 2026'
  },
  {
    id: 'disc-2',
    name: 'Papilio polyxenes (Black Swallowtail)',
    category: 'INSECT',
    confidence: 'HIGH',
    features: ['Black wings with yellow chevron submarginal spots', 'Orange anal eye-spot', 'Slender spatulate tails'],
    fact: 'Caterpillars of this swallowtail sequester aromatic terpenes from wild carrot and parsley hosts to deter avian predators.',
    observation: 'Notice how swallowtails flutter their forewings rapidly while feeding to maintain equilibrium.',
    challengeCompleted: 'Spot an active pollinator in sunlight',
    earned: 60,
    time: '11:45 AM',
    date: 'Oct 06, 2026'
  }
];

export const BADGES = [
  {
    id: 'b-first-step',
    title: 'FIRST STEP',
    subtitle: 'First completed outdoor mission',
    icon: 'Footprints',
    condition: (history, xp, completed) => completed >= 1
  },
  {
    id: 'b-naturalist',
    title: 'FIELD NATURALIST',
    subtitle: 'Log 5 distinct nature specimens',
    icon: 'Compass',
    condition: (history) => history.length >= 5
  },
  {
    id: 'b-touch-grass',
    title: 'TOUCH GRASS',
    subtitle: 'Log active outdoor exploration sessions',
    icon: 'Leaf',
    condition: (history, xp, completed, streak) => streak >= 3 || completed >= 3
  },
  {
    id: 'b-curious-mind',
    title: 'CURIOUS MIND',
    subtitle: 'Discover specimens across 3 distinct categories',
    icon: 'Sparkles',
    condition: (history) => {
      const cats = new Set(history.map(h => (h.category || '').toUpperCase()));
      return cats.size >= 3;
    }
  },
  {
    id: 'b-off-grid',
    title: 'OFF-GRID',
    subtitle: 'Execute local AI inference without internet',
    icon: 'WifiOff',
    condition: () => true
  },
  {
    id: 'b-botanist',
    title: 'FOREST SCHOLAR',
    subtitle: 'Earn 250+ outdoor field XP',
    icon: 'Trophy',
    condition: (history, xp) => xp >= 250
  }
];

export const RANDOM_EXPEDITIONS = [
  {
    title: 'The 30-Minute Peripheral Vision Walk',
    duration: '30 MIN',
    difficulty: 'EASY',
    category: 'OBSERVATION',
    challenge: 'Walk somewhere familiar. Notice five things you normally ignore or rush past.',
    bonus: 'Find something distinctly yellow in nature.',
    reward: 120
  },
  {
    id: 'rand-micro-bark',
    title: 'The Tree Bark Tactile Survey',
    duration: '20 MIN',
    difficulty: 'EASY',
    category: 'NATURE',
    challenge: 'Locate 3 different tree species purely by touching their bark with your eyes closed first.',
    bonus: 'Find tree lichen or moss growing on the northern exposure.',
    reward: 95
  },
  {
    id: 'rand-shadow-trail',
    title: 'Canopy Shadow Navigation',
    duration: '25 MIN',
    difficulty: 'MODERATE',
    category: 'WALK',
    challenge: 'Follow paths illuminated exclusively by broken sunlight filtering through branches.',
    bonus: 'Capture an image of light rays striking a forest floor seedling.',
    reward: 110
  },
  {
    id: 'rand-soundscape',
    title: 'The 10-Minute Forest Auditory Reset',
    duration: '15 MIN',
    difficulty: 'EASY',
    category: 'OBSERVATION',
    challenge: 'Sit on a trail bench or boulder. Count how many individual bird calls or insect frequencies you detect.',
    bonus: 'Spot the creature creating the highest-pitched sound.',
    reward: 85
  }
];
