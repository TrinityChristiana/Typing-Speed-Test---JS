import '../styles/main.scss';

// DB
const sentenceArray = [
  "You'll see the rainbow bridge after it rains cats and dogs.",
  'I only enjoy window shopping when the windows are transparent.',
  'Flying fish flew by the space station.',
  'The fish listened intently to what the frogs had to say.',
  'Joyce enjoyed eating pancakes with ketchup.',
  'The Guinea fowl flies through the air with all the grace of a turtle.',
  'He excelled at firing people nicely.',
  'Karen realized the only way she was getting into heaven was to cheat.',
  'They ran around the corner to find that they had traveled back in time.',
  'The thick foliage and intertwined vines made the hike nearly impossible.',
  'I was fishing for compliments and accidentally caught a trout.',
  'Tomorrow will bring something new, so leave today as a memory.',
  'The light that burns twice as bright burns half as long.',
  'I know many children ask for a pony, but I wanted a bicycle with rockets strapped to it.',
  'Imagine his surprise when he discovered that the safe was full of pudding.',
];

let isTestRunning = false;

// Constants
const RANDOM_SENTENCE_EL_ID = 'random-sentence';
// const USER_INPUT_ID = 'user-input';

// Helpers
const Element = {
  get(id) {
    return document.getElementById(id);
  },
  set(id, html) {
    const el = Element.get(id);
    if (el) el.innerHTML = html;
  },
  append(id, html) {
    const el = Element.get(id);
    if (el) el.innerHTML += html;
  },
};

const grabRandomSentence = (sentences) => {
  const randInx = Math.floor(Math.random() * sentences.length);
  const selectedSentence = sentences[randInx];
  return selectedSentence;
};

function startTest() {
  if (isTestRunning) return;

  isTestRunning = true;

  const sentence = grabRandomSentence(sentenceArray);
  Element.set(RANDOM_SENTENCE_EL_ID, sentence);
  // Element.set(USER_INPUT_ID, sentence);
}

// function endTest() {}

startTest();

// Stretch Goals

// TODO: Hide and show button on stop and start!
// TODO: Add character counter on inpit (characters left)
// TODO: then also add their error coun there too@
