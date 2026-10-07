// Daily outdoor exploration tasks rotated automatically by date

export const DAILY_TASKS_BY_DAY = [
  {
    day: 'Sunday',
    theme: 'Canopy & Sunlight',
    title: 'The Sunday Canopy Skywatch',
    description: 'Step outside and locate the tallest mature tree in your area. Look directly upward into the canopy for 2 minutes to observe how sunlight and wind move through the branch network.',
    category: 'OBSERVATION',
    duration: '10 min',
    reward: 50,
    hint: 'Notice whether adjacent mature crowns touch or maintain a narrow gap of crown shyness.'
  },
  {
    day: 'Monday',
    theme: 'New Growth & Emergence',
    title: 'Monday Sprout & Seedling Check',
    description: 'Look closely at the lowest ground layer along footpath seams or lawn borders to find three emerging sprouts or newly unfurled leaves.',
    category: 'PLANTS',
    duration: '12 min',
    reward: 50,
    hint: 'Notice the difference in texture between initial seed leaves and true foliage.'
  },
  {
    day: 'Tuesday',
    theme: 'Living Textures',
    title: 'Tuesday Sensory Bark Survey',
    description: 'Gently touch the trunk bark of two different trees and feel the texture difference without peeling or tearing living wood.',
    category: 'SENSORY',
    duration: '15 min',
    reward: 50,
    hint: 'Close your eyes for 30 seconds and feel vertical fissures with your fingertips.'
  },
  {
    day: 'Wednesday',
    theme: 'Vascular Architecture',
    title: 'Wednesday Leaf Vein Survey',
    description: 'Pick up one fallen leaf, hold it up to daylight, and follow the secondary branching veins that feed chlorophyll to the leaf margins.',
    category: 'BOTANY',
    duration: '10 min',
    reward: 50,
    hint: 'Midrib veins provide structural stability during high wind gusts.'
  },
  {
    day: 'Thursday',
    theme: 'Microhabitats & Moss',
    title: 'Thursday Microhabitat Detective',
    description: 'Find a north-facing stone, brick masonry seam, or shaded tree base to observe living moss colonies.',
    category: 'EXPLORATION',
    duration: '15 min',
    reward: 50,
    hint: 'Mosses lack deep root systems and absorb moisture directly through their green leaf-like scales.'
  },
  {
    day: 'Friday',
    theme: 'Color & Chlorophyll',
    title: 'Friday Three Greens Challenge',
    description: 'Locate three entirely distinct shades of green on outdoor foliage within fifty meters of your doorstep.',
    category: 'PHOTOGRAPHY',
    duration: '15 min',
    reward: 60,
    hint: 'Compare bright lime new growth, deep evergreen needles, and pale dusty sage leaves.'
  },
  {
    day: 'Saturday',
    theme: 'Screenless Exploration',
    title: 'Saturday 20-Minute Mindful Walk',
    description: 'Take a twenty-minute continuous outdoor walk and put your device in your pocket until the observation walk is complete.',
    category: 'OUTDOOR',
    duration: '20 min',
    reward: 75,
    hint: 'Pay attention to ambient birdsong, wind temperature, and ground soil dampness.'
  }
];

export function getTodayTask() {
  const today = new Date();
  const dayIndex = today.getDay(); // 0 to 6
  const baseTask = DAILY_TASKS_BY_DAY[dayIndex];

  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const dateKey = today.toISOString().slice(0, 10);

  return {
    ...baseTask,
    dateString,
    dateKey
  };
}
