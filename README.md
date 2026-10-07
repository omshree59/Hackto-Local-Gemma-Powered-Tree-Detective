# 🌲 NATUREQUEST: Field Exploration OS

> **Step away from the screen. Explore what's around you.**  
> *Local AI field intelligence. Zero cloud dependency. 100% offline-ready.*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Ollama](https://img.shields.io/badge/Ollama-Local%20Inference-orange.svg)](https://ollama.com/)
[![Model](https://img.shields.io/badge/Model-Gemma%203%204B%20Vision-blue.svg)](https://ollama.com/library/gemma3)
[![Vite](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-teal.svg)](https://tailwindcss.com/)
[![Privacy](https://img.shields.io/badge/Privacy-Zero%20Telemetry-green.svg)](#privacy-first-philosophy)

---

## 🍃 Product Overview

NatureQuest is a local-first outdoor exploration platform designed around plant discovery, sensory field observation, quests, curated trails, and a personal nature journal.

Most digital nature apps require high-speed cellular connections, upload your photos to remote servers, and keep you glued to your phone screen. When you hike into a national park, walk through deep woodlands, or wander off the grid, connectivity vanishes—and cloud APIs break down.

NatureQuest flips this paradigm entirely:
1. **Zero Cloud Dependency:** Every vision inference, identification, and field notes generation is executed strictly on your local machine using Ollama and Google's Gemma 3 4B multimodal model.
2. **Minimal Screen Time:** The app is engineered to get you outside, provide quick observational clues in seconds, issue a physical sensory quest, and encourage you to put your phone away.
3. **The Outdoors Is the Product:** The screen is only a tool. Nature is the experience.

---

## 📸 Visual Showcase & Interface Gallery

<div align="center">

### 🧭 Field Station — Central Exploration Hub & Daily Rotating Task
![Field Station](./public/screenshots/field_station.png)

### 🎯 Species Milestones — 15 Popular Findable Flora Checklist (Satisfied with Photo Proof)
![Species Milestones](./public/screenshots/species_milestones.png)

</div>

| 🌿 Plant Scout Optical Lens | 🎥 Video Journals & Field Stories |
| :---: | :---: |
| ![Plant Scout](./public/screenshots/plant_scout.png) | ![Field Stories](./public/screenshots/field_stories.png) |

| 🎯 Field Quests & Procedural Mission Engine |
| :---: |
| ![Field Quests](./public/screenshots/quests.png) |

---

## 🌟 Key Features

### 🌿 1. Plant Scout & Optical Lens
- **Hardware-Aware Camera:** Starts the camera lens on demand and automatically stops all media tracks the instant you capture a photo, turning off your device camera light immediately.
- **Local Device Upload:** Seamlessly drag-and-drop or upload local photos without activating your camera hardware.
- **Animated Circular Progress Engine:** Multi-stage circular processing indicator with real-time feedback and dynamic encouraging compliments if local neural tensor inference takes extra time.
- **Local AI Field Reports:** Comprehensive botanical breakdowns displaying likely species names, confidence scores, visual evidence reasoning ("Why this match?"), plant condition estimates, what to observe next, and field safety warnings.

### 🎯 2. Species Milestone Checklist (15 Popular Findable Species)
A milestone target checklist designed for outdoor exploration. Milestones are **satisfied only when you upload photographic proof** of each species in the wild:
- 🌲 **Pine Tree** (*Pinus*) — Needle leaf clusters and woody cones
- 🌳 **Banyan Tree** (*Ficus benghalensis*) — Aerial prop roots and expansive canopy
- 🌿 **Neem Tree** (*Azadirachta indica*) — Curved serrated compound leaflets
- 🍃 **Peepal / Sacred Fig** (*Ficus religiosa*) — Heart-shaped leaves with distinct drip-tip tails
- 🪵 **Oak Tree** (*Quercus*) — Sinuous leaf lobes and acorn cups
- 🌴 **Palm Tree** (*Arecaceae*) — Columnar trunk and radiating fan/feather fronds
- 🌿 **Wild Fern** (*Pteridophyta*) — Divided feathery fronds and spore clusters
- 🎋 **Bamboo** (*Bambusoideae*) — Segmented hollow culms and arching leaves
- 🌺 **Hibiscus** (*Hibiscus rosa-sinensis*) — Five showy petals with extended pollen column
- 🌼 **Dandelion** (*Taraxacum officinale*) — Sidewalk rosette leaves and composite blooms
- 🌿 **Tulsi / Holy Basil** (*Ocimum tenuiflorum*) — Square aromatic stems and medicinal foliage
- 🪴 **Aloe Vera** (*Aloe barbadensis*) — Thick water-storing succulent blades
- 🌲 **Eucalyptus** (*Eucalyptus*) — Aromatic blue-green sickle leaves and ribbon bark
- 🍁 **Maple Tree** (*Acer*) — Palmate lobed leaves and helicopter samara seeds
- 🌸 **Bougainvillea** (*Bougainvillea spectabilis*) — Vibrant paper-thin petal-like bracts

### 📅 3. Daily Rotating Expedition Tasks
- Automatically updates every morning according to your local calendar date (e.g. Wednesday, October 7).
- Features rotating day-of-week themes: Sunday Canopy Skywatch, Monday Sprout Emergence, Tuesday Living Textures, Wednesday Leaf Vein Surveys, Thursday Microhabitat Detective, Friday Three Greens Challenge, and Saturday Screenless Walks.
- Built-in daily streak counter and quick one-click check-ins.

### 🗺️ 4. Field Quests & Custom AI Mission Generator
- Sensory outdoor challenges encouraging tactile, auditory, and visual attention outdoors.
- Includes procedural quest generation via local Gemma AI and a "Surprise Me" randomized mission generator.
- Expedition preparation checklists before timer countdowns begin.

### 🎥 5. Field Stories & Video Journals
- **Curated Nature Video Journals:** Verified, embeddable YouTube field workshops from educators like John Muir Laws (*Introduction to Nature Journaling*), TED-Ed & Suzanne Simard (*How Trees Talk to Each Other*), CrashCourse Botany (*Meet the Plants*), and MinuteEarth (*Why Leaves Change Color in Fall*).
- **Direct YouTube Fallback:** Embedded responsive player with instant external link fallbacks.
- **Field Journal Writer:** Compose your own observational field essays or generate structured nature notes on-device using local AI.

### 🥾 6. Curated Trails & Interactive Trail Builder
- Offline trails catalog detailing route distance, terrain type, estimated duration, elevation gain, safety tips, and packing essentials.
- Interactive custom Trail Builder allowing users to map their own local walking circuits.

### 📖 7. Field Codex & Plant Comparison Engine
- Personal plant discovery registry tracking date, time, confidence level, and local photos.
- Interactive plant comparator analyzing similarities, morphology differences, and evolutionary traits between any two logged specimens.

### 🏆 8. Field Passport & Biodiversity Index
- Naturalist Tier progression and XP scoring.
- Comprehensive biodiversity profile assessing habitat variety and category distributions.

### 🌌 9. Living Nature Atmosphere
- Dynamic Ken Burns slow breathing cinematic camera drift across high-resolution wilderness environments.
- Real-time HTML5 Canvas particle simulation with floating bioluminescent spores and golden pollen drifting with organic sinusoidal wind turbulence.
- Shifting canopy God-rays and dual-speed horizontal mist layers.
- Custom slim emerald scrollbar and non-overlapping sidebar layout.

---

## 🔒 Privacy-First Philosophy

| Feature | NatureQuest | Traditional Nature Apps |
| :--- | :--- | :--- |
| **Vision AI Engine** | Local Gemma 3 (Ollama) | Cloud API (OpenAI / Google Vision) |
| **Photo Storage** | Local Browser Storage | Cloud Databases (AWS / Firebase) |
| **Internet Required** | ❌ No | ✅ Yes |
| **User Tracking** | ❌ Zero Telemetry | ✅ Analytics & Ad Trackers |
| **GPS Tracking** | ❌ None | ✅ Continuous Geolocation |

---

## 💻 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React Icons
- **Local AI Engine:** Ollama running Google Gemma 3 4B (`gemma3:4b`)
- **Offline Storage:** Browser LocalStorage (Zero external databases)
- **Networking:** Localhost reverse proxy (`/api/ollama` -> `http://127.0.0.1:11434`)

---

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (v18 or higher recommended)
2. **Ollama** installed on your computer. Download from [ollama.com](https://ollama.com/).
3. Pull the Gemma 3 4B model into Ollama:
```bash
ollama run gemma3:4b
```
*(Once downloaded, you can exit the terminal prompt; the background daemon will remain accessible at port 11434).*

### Installation & Launch

1. Clone or navigate to the repository directory:
```bash
cd dev2
```

2. Install dependencies:
```bash
npm install
```

3. Launch the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🧭 How to Play / Recommended Routine

1. **Step Outside:** Open NatureQuest on your laptop or device.
2. **Review Today's Task:** Check the Field Station for today's date-specific exploration prompt.
3. **Find a Plant:** Walk your neighborhood, yard, or park. Look for one of the 15 Milestone Target Species (like a Pine, Banyan, Neem, or Peepal tree).
4. **Take a Picture:** Use the Plant Scout optical lens or upload a photo from your files.
5. **Analyze Offline:** Let your local Gemma 3 model inspect the leaf structure, bark texture, and morphology.
6. **Satisfy Your Milestone:** Review your field report, claim experience points, unlock your species badge, and accept your next sensory quest.
7. **Put the Screen Away:** Disconnect and enjoy the outdoor world.

---

## 📄 License & Stewardship

Licensed under the [MIT License](LICENSE).  
Remember the primary law of naturalists: leave the natural world healthier than you found it. Never forage or consume unknown wild plants based solely on automated visual classification.