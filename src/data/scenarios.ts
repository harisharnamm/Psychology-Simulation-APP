import type { Scene } from '../types';

export const scenarios: Scene[] = {
  start: {
    id: 'start',
    title: 'First Day at University',
    description: 'You arrive at your first psychology lecture. The hall is packed with students.',
    isEnding: false,
    choices: [
      {
        id: '1a',
        text: 'Sit at the front of the lecture hall',
        nextSceneId: 'front_row',
        impact: { confidence: 10, anxiety: 5 }
      },
      {
        id: '1b',
        text: 'Find a seat at the back',
        nextSceneId: 'back_row',
        impact: { anxiety: -5, confidence: -5 }
      },
      {
        id: '1c',
        text: 'Look for someone familiar to sit with',
        nextSceneId: 'search_friend',
        impact: { stress: -5, confidence: 5 }
      }
    ]
  },
  front_row: {
    id: 'front_row',
    title: 'Front Row Seat',
    description: 'The professor asks a question to the class. You know the answer.',
    isEnding: false,
    choices: [
      {
        id: '2a',
        text: 'Raise your hand and answer',
        nextSceneId: 'participate',
        impact: { confidence: 15, anxiety: 5 }
      },
      {
        id: '2b',
        text: 'Stay quiet and take notes',
        nextSceneId: 'quiet',
        impact: { anxiety: -5, confidence: -5 }
      }
    ]
  },
  // Add more scenarios...
  participate: {
    id: 'participate',
    title: 'Active Participation',
    description: 'Your answer was correct! The professor acknowledges your contribution.',
    isEnding: true,
    choices: []
  }
};
