export interface DemographicData {
  age: string;
  gender: string;
  shoppingFrequency: string;
  preferredCategories: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  currentPrice: number;
  stock: number;
  image: string;
  rating: number;
  sales: number;
}

export interface ExperimentState {
  currentStep: 'welcome' | 'demographics' | 'shopping' | 'checkout' | 'survey';
  demographics: DemographicData | null;
  cart: Product[];
  viewedProducts: Set<string>;
  interactionLog: InteractionEvent[];
  startTime: number;
}

export interface InteractionEvent {
  type: string;
  timestamp: number;
  details: Record<string, any>;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'likert' | 'yesno';
  condition?: (state: ExperimentState) => boolean;
}

// Add missing types
export interface Scene {
  id: string;
  title: string;
  description: string;
  isEnding: boolean;
  gifUrl?: string;
  choices: Choice[];
}

export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  impact?: {
    confidence?: number;
    anxiety?: number;
    stress?: number;
  };
}

export interface GameState {
  anxiety: number;
  confidence: number;
  stress: number;
}
