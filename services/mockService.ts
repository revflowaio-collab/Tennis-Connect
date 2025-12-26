
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
  { userId: 'u1', courtId: 'c3', timestamp: new Date(Date.now() - 86400000).toISOString() }, // Yesterday
];

// Service Methods
export const MockService = {
  getCourts: async (): Promise<Court[]> => {
    await new Promise(r => setTimeout(r, 500)); // Simulate latency
    return courts.map(c => ({
      ...c,
      playerCount: checkIns.filter(ci => ci.courtId === c.id && isRecent(ci.timestamp)).length
    }));
  },

  getCourtById: async (id: string): Promise<Court | undefined> => {
    await new Promise(r => setTimeout(r, 300));
    return courts.find(c => c.id === id);
  },

  getPlayers: async (): Promise<User[]> => {
    await new Promise(r => setTimeout(r, 500));
    return users;
  },

  getActiveCheckInsForCourt: async (courtId: string): Promise<User[]> => {
    await new Promise(r => setTimeout(r, 300));
    const recentCheckIns = checkIns.filter(ci => ci.courtId === courtId && isRecent(ci.timestamp));
    return recentCheckIns
      .map(ci => users.find(u => u.id === ci.userId))
      .filter((u): u is User => !!u);
  },

  checkIn: async (userId: string, courtId: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 300));
    // Remove previous active check-in for this user to avoid duplicates
    checkIns = checkIns.filter(ci => !(ci.userId === userId && isRecent(ci.timestamp)));
    checkIns.push({ userId, courtId, timestamp: new Date().toISOString() });
  },

  // Auth Methods
  sendOtp: async (phoneNumber: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    // In a real app, this sends SMS. Here we just accept any number.
    return true; 
  },

  verifyOtp: async (phoneNumber: string, otp: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    // Hardcoded OTP for demo
    return otp === '123456';
  },

  login: async (phoneNumber: string): Promise<User> => {
    await new Promise(r => setTimeout(r, 500));
    const user = users.find(u => u.phoneNumber === phoneNumber);
    if (!user) throw new Error("User not found");
    return user;
  },

  signup: async (data: Omit<User, 'id' | 'joinedAt'>): Promise<User> => {
    await new Promise(r => setTimeout(r, 800));
    const existing = users.find(u => u.phoneNumber === data.phoneNumber);
    if (existing) throw new Error("User already exists");

    const newUser: User = {
      ...data,
      id: `u${users.length + 1}`,
      joinedAt: new Date().toISOString(),
      avatarUrl: `https://picsum.photos/100/100?random=${users.length + 20}`
    };
    users.push(newUser);
    return newUser;
  },
  
  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
      await new Promise(r => setTimeout(r, 500));
      const index = users.findIndex(u => u.id === userId);
      if (index === -1) throw new Error("User not found");
      
      users[index] = { ...users[index], ...data };
      return users[index];
  }
};

// Helper to check if check-in is recent (e.g., last 3 hours)
const isRecent = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  return diffHours < 3;
};
