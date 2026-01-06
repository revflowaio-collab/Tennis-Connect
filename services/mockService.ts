
import { Court, User, CheckIn, SkillLevel } from '../types';

// Initial Mock Data
const MOCK_COURTS: Court[] = [
  {
    id: 'c1',
    name: "Central Park Tennis Center",
    address: "Central Park West & 96th St, New York, NY 10024",
    surfaceType: "Hard",
    hours: "6am - 10pm",
    playerCount: 3,
    amenities: ["Lights", "Pro Shop", "Restrooms", "Water"],
    description: "Iconic public courts in the heart of the city. High traffic, great for pick-up games.",
    imageUrl: "https://picsum.photos/800/400?random=1",
    lat: 40.793,
    lng: -73.964
  },
  {
    id: 'c2',
    name: "Golden Gate Park Courts",
    address: "Golden Gate Park, San Francisco, CA 94117",
    surfaceType: "Clay",
    hours: "Dawn - Dusk",
    playerCount: 1,
    amenities: ["Restrooms", "Water Fountain", "Parking"],
    description: "Beautiful setting within the park. Clay courts require reservation.",
    imageUrl: "https://picsum.photos/800/400?random=2",
    lat: 37.769,
    lng: -122.457
  },
  {
    id: 'c3',
    name: "Venice Beach Tennis",
    address: "1800 Ocean Front Walk, Venice, CA 90291",
    surfaceType: "Hard",
    hours: "6am - 9pm",
    playerCount: 5,
    amenities: ["Lights", "Beach View", "Parking"],
    description: "Play right next to the ocean. Windy conditions but amazing views.",
    imageUrl: "https://picsum.photos/800/400?random=3",
    lat: 33.985,
    lng: -118.473
  },
  {
    id: 'c4',
    name: "Wimbledon Common",
    address: "London, UK SW19 4UH",
    surfaceType: "Grass",
    hours: "8am - 8pm",
    playerCount: 0,
    amenities: ["Grass Courts", "Traditional", "Clubhouse"],
    description: "Experience the traditional grass courts.",
    imageUrl: "https://picsum.photos/800/400?random=4",
    lat: 51.435,
    lng: -0.214
  },
  {
    id: 'c5',
    name: "Flamingo Park Tennis",
    address: "1200 Meridian Ave, Miami Beach, FL 33139",
    surfaceType: "Clay",
    hours: "7am - 9pm",
    playerCount: 8,
    amenities: ["17 Courts", "Vending Machines", "Pro Shop"],
    description: "One of the premier tennis centers in South Beach.",
    imageUrl: "https://picsum.photos/800/400?random=5",
    lat: 25.782,
    lng: -80.137
  },
  {
    id: 'c6',
    name: "Caswell Tennis Center",
    address: "2312 Shoal Creek Blvd, Austin, TX 78705",
    surfaceType: "Hard",
    hours: "8am - 10pm",
    playerCount: 2,
    amenities: ["Lights", "Pro Shop", "Showers"],
    description: "Historical tennis center serving the Austin community since 1946.",
    imageUrl: "https://picsum.photos/800/400?random=6",
    lat: 30.291,
    lng: -97.749
  }
];

const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: "Alice Williams",
    phoneNumber: "+15550101",
    skillLevel: "Advanced",
    bio: "Played college tennis. Looking for hitting partners on weekends.",
    joinedAt: "2023-05-12",
    avatarUrl: "https://picsum.photos/100/100?random=10"
  },
  {
    id: 'u2',
    name: "Bob Chen",
    phoneNumber: "+15550102",
    skillLevel: "Intermediate",
    bio: "Improving my backhand. Love doubles.",
    joinedAt: "2023-08-20",
    avatarUrl: "https://picsum.photos/100/100?random=11"
  }
];

// In-memory storage simulation
let users = [...MOCK_USERS];
let courts = [...MOCK_COURTS];
let checkIns: CheckIn[] = [
  { userId: 'u1', courtId: 'c1', timestamp: new Date().toISOString() },
  { userId: 'u2', courtId: 'c1', timestamp: new Date().toISOString() },
];

export const MockService = {
  getCourts: async (query?: string): Promise<Court[]> => {
    await new Promise(r => setTimeout(r, query ? 800 : 300));
    
    let results = courts.map(c => ({
      ...c,
      playerCount: checkIns.filter(ci => ci.courtId === c.id && isRecent(ci.timestamp)).length
    }));

    if (query) {
      const q = query.toLowerCase().trim();
      results = results.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.address.toLowerCase().includes(q)
      );

      // If it looks like a 5-digit ZIP and no results found, "discover" a court there
      if (results.length === 0 && /^\d{5}$/.test(q)) {
        const discoveredCourt: Court = {
            id: `discovered-${Date.now()}`,
            name: `Local Community Court (${q})`,
            address: `Main Street, Area ${q}`,
            surfaceType: "Hard",
            hours: "7am - 9pm",
            playerCount: Math.floor(Math.random() * 4),
            amenities: ["Water", "Restrooms"],
            description: "A newly discovered local court in your searched area.",
            imageUrl: `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 100)}`,
            lat: 40.7128 + (Math.random() - 0.5) * 0.1, // Near NY if nothing else
            lng: -74.0060 + (Math.random() - 0.5) * 0.1
        };
        results = [discoveredCourt];
      }
    }

    return results;
  },

  getCourtById: async (id: string): Promise<Court | undefined> => {
    await new Promise(r => setTimeout(r, 200));
    return courts.find(c => c.id === id) || (id.startsWith('discovered-') ? {
        id,
        name: "Discovered Community Court",
        address: "Nearby Area",
        surfaceType: "Hard",
        hours: "7am - 9pm",
        playerCount: 1,
        amenities: ["Water"],
        description: "A public court found near your searched area.",
        imageUrl: "https://picsum.photos/800/400?random=99",
        lat: 40.7,
        lng: -74
    } as Court : undefined);
  },

  getPlayers: async (): Promise<User[]> => {
    await new Promise(r => setTimeout(r, 400));
    return users;
  },

  getActiveCheckInsForCourt: async (courtId: string): Promise<User[]> => {
    const recentCheckIns = checkIns.filter(ci => ci.courtId === courtId && isRecent(ci.timestamp));
    return recentCheckIns
      .map(ci => users.find(u => u.id === ci.userId))
      .filter((u): u is User => !!u);
  },

  checkIn: async (userId: string, courtId: string): Promise<void> => {
    checkIns = checkIns.filter(ci => !(ci.userId === userId && isRecent(ci.timestamp)));
    checkIns.push({ userId, courtId, timestamp: new Date().toISOString() });
  },

  sendOtp: async (phoneNumber: string) => true,
  verifyOtp: async (phoneNumber: string, otp: string) => otp === '123456',
  login: async (phoneNumber: string) => users.find(u => u.phoneNumber === phoneNumber)!,
  signup: async (data: any) => {
    const newUser = { ...data, id: `u${users.length + 1}`, joinedAt: new Date().toISOString(), avatarUrl: `https://picsum.photos/100/100?random=${users.length}` };
    users.push(newUser);
    return newUser;
  },
  updateProfile: async (userId: string, data: any) => {
    const idx = users.findIndex(u => u.id === userId);
    users[idx] = { ...users[idx], ...data };
    return users[idx];
  }
};

const isRecent = (isoString: string) => {
  const diffHours = (new Date().getTime() - new Date(isoString).getTime()) / (1000 * 60 * 60);
  return diffHours < 3;
};
