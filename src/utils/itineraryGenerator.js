import { v4 as uuidv4 } from 'uuid';

const DESTINATION_DB = {
  california: [
    { city: "San Francisco", ratio: 0.4, acts: ["Walk the Golden Gate Bridge", "Tour Alcatraz Island", "Explore Fisherman's Wharf", "Ride the Cable Cars"] },
    { city: "Los Angeles", ratio: 0.3, acts: ["Hollywood Walk of Fame", "Griffith Observatory at Sunset", "Santa Monica Pier", "Universal Studios"] },
    { city: "San Diego", ratio: 0.3, acts: ["Discover Balboa Park", "Relax at La Jolla Cove", "Visit the San Diego Zoo", "Explore Gaslamp Quarter"] }
  ],
  newyork: [
    { city: "Manhattan", ratio: 0.6, acts: ["Statue of Liberty & Ellis Island", "Central Park Stroll", "Times Square & Broadway Show", "Top of the Rock Observatory"] },
    { city: "Brooklyn", ratio: 0.4, acts: ["Walk the Brooklyn Bridge", "Explore DUMBO", "Williamsburg Food Tour", "Coney Island Boardwalk"] }
  ],
  japan: [
    { city: "Tokyo", ratio: 0.4, acts: ["Shibuya Crossing & Hachiko", "Senso-ji Temple in Asakusa", "Tsukiji Outer Market", "Akihabara Electronics district"] },
    { city: "Kyoto", ratio: 0.4, acts: ["Fushimi Inari Taisha", "Arashiyama Bamboo Grove", "Kinkaku-ji (Golden Pavilion)", "Gion District Walking Tour"] },
    { city: "Osaka", ratio: 0.2, acts: ["Dotonbori Street Food", "Osaka Castle", "Universal Studios Japan", "Umeda Sky Building"] }
  ],
  italy: [
    { city: "Rome", ratio: 0.4, acts: ["Colosseum & Roman Forum", "Vatican Museums & Sistine Chapel", "Trevi Fountain", "Pantheon Tour"] },
    { city: "Florence", ratio: 0.3, acts: ["Uffizi Gallery", "Duomo (Cathedral of Santa Maria del Fiore)", "Ponte Vecchio", "Piazzale Michelangelo sunset"] },
    { city: "Venice", ratio: 0.3, acts: ["Gondola Ride on Grand Canal", "St. Mark's Basilica", "Doge's Palace", "Rialto Bridge explore"] }
  ],
  france: [
    { city: "Paris", ratio: 0.5, acts: ["Eiffel Tower climbing", "Louvre Museum Tour", "Notre-Dame Cathedral", "Montmartre & Sacré-Cœur"] },
    { city: "Nice", ratio: 0.3, acts: ["Promenade des Anglais", "Vieux Nice (Old Town)", "Castle Hill viewpoints", "Beach relaxation day"] },
    { city: "Lyon", ratio: 0.2, acts: ["Vieux Lyon & Traboules", "Basilica of Notre-Dame de Fourvière", "Parc de la Tête d'Or", "Bouchon culinary experience"] }
  ]
};

// Generic fallback data for unsupported countries
const GENERIC_ACTS = [
  "Historical City Center Guided Tour",
  "Visit the National Museum",
  "Local Cuisine Tasting Experience",
  "Explore the Main Shopping District",
  "Relax at the Principal Urban Park",
  "Panoramic Viewpoint Photography",
  "Evening Cultural Performance or Show",
  "Day Trip to Nearby Nature Reserve",
  "Architectural Highlights Walking Tour",
  "Sunset Cruise or Scenic Walk"
];

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const generateStops = (destinationInput, totalDays) => {
  if (totalDays < 1) totalDays = 1;
  const normalizedQuery = destinationInput.toLowerCase().replace(/[^a-z]/g, '');
  
  let match = null;
  // Soft matching
  Object.keys(DESTINATION_DB).forEach(key => {
    if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
      match = key;
    }
  });

  let stopsData = [];

  if (match) {
    // We have hardcoded data
    const template = DESTINATION_DB[match];
    
    template.forEach((item, index) => {
      // Calculate days based on ratio, ensure at least 1 day if totalDays >= template length
      let days = Math.round(totalDays * item.ratio);
      if (days < 1 && totalDays >= template.length) days = 1;
      
      if (days > 0) {
        stopsData.push({
          city: item.city,
          days: days,
          actsPool: shuffleArray(item.acts)
        });
      }
    });
  } else {
    // GENERIC ALGORITHM for "All Countries"
    // We will generate 1 stop for short trips, multiple for long trips
    const numStops = totalDays > 7 ? 3 : totalDays > 3 ? 2 : 1;
    const daysPerStop = Math.floor(totalDays / numStops);
    let remainingDays = totalDays;

    for (let i = 0; i < numStops; i++) {
      let d = (i === numStops - 1) ? remainingDays : daysPerStop;
      remainingDays -= d;

      stopsData.push({
        city: i === 0 ? `Capital City of ${destinationInput}` : 
              i === 1 ? `Coastal/Cultural Hub` : `Scenic Region`,
        days: d,
        actsPool: shuffleArray(GENERIC_ACTS)
      });
    }
  }

  // Adjust total days to exactly match due to rounding
  const generatedDays = stopsData.reduce((sum, stop) => sum + stop.days, 0);
  if (generatedDays !== totalDays && stopsData.length > 0) {
    const diff = totalDays - generatedDays;
    stopsData[0].days += diff; // Add or subtract diff to first stop
    if (stopsData[0].days <= 0) stopsData[0].days = 1; 
  }

  // Build the final schema
  let finalStops = [];
  stopsData.forEach(s => {
    if(s.days <= 0) return;
    
    let dailyPlan = [];
    for (let dayAct = 1; dayAct <= s.days; dayAct++) {
      // Pull varying acts 
      let actText = s.actsPool[(dayAct - 1) % s.actsPool.length];
      dailyPlan.push({
        dayNumber: dayAct,
        title: actText,
        desc: `Experience the best of ${s.city} with curated sightseeing and local dining.`
      });
    }

    finalStops.push({
      id: uuidv4(),
      city: s.city,
      days: s.days,
      dailyPlan: dailyPlan
    });
  });

  return finalStops;
};
