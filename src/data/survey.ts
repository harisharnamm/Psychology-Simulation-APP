import type { SurveyQuestion } from '../types';

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'q1',
    text: 'How often do you make impulse purchases in real life? (1: Never, 5: Very Often)',
    type: 'likert'
  },
  {
    id: 'q2',
    text: 'Did the "Only X left in stock!" message influence your purchase decision?',
    type: 'yesno',
    condition: (state) => state.interactionLog.some(log => log.type === 'scarcity_trigger')
  },
  {
    id: 'q3',
    text: 'How much did the product ratings influence your choices? (1: Not at all, 5: Very much)',
    type: 'likert'
  },
  {
    id: 'q4',
    text: 'How likely are you to recommend this shopping experience to others? (1: Not likely, 5: Very likely)',
    type: 'likert'
  },
  {
    id: 'q5',
    text: 'Did you feel any pressure to make quick purchase decisions?',
    type: 'yesno'
  }
];
