import Jcrool from './JcroolClass';
const x = {
  a: { a: { a: { a: { wil: 'hi', won: 'hi' } } } },
  b: { b: { b: { b: {} } } },
  c: { c: { c: { c: {} } } },
  d: { d: { d: { d: {} } } },
  e: { e: { e: { e: {} } } },
};
const searcher = new Jcrool(x);

searcher
  .addBullseye('Lexi')
  .addTwin('Cartheon')
  .addTwin('Sandrus')
  .addCouple(['Faith', 'Austin']);
