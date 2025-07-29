export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: string;
  activity_level?: string;
  primary_goal?: string;
  dietary_restrictions?: string;
  medical_conditions?: string;
  equipment_available?: string[];
}

export interface RecommendationRequest {
  symptoms: string;
  context?: string;
} 