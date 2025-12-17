export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  skillLevel: SkillLevel;
  bio?: string;
  joinedAt: string;
  avatarUrl?: string;
}

export interface Court {
  id: string;
  name: string;
  address: string;
  surfaceType: 'Hard' | 'Clay' | 'Grass' | 'Carpet';
  hours: string;
  playerCount: number;
  imageUrl: string;
  amenities: string[];
  description: string;
  lat: number;
  lng: number;
}

export interface CheckIn {
  userId: string;
  courtId: string;
  timestamp: string;
  user?: User; // Joined data
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}