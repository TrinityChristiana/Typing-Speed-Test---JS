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

let state = {
  isTestRunning: false,
  selectedSentence: '',
  startTime: null,
  timerInterval: null,
};

// Constants
const RANDOM_SENTENCE_EL_ID = 'random-sentence';
const USER_INPUT_ID = 'user-input';

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
  addEventListener(id, eventType, handler) {
    const el = Element.get(id);
    if (el) el.addEventListener(eventType, handler);
  },
};
const updateState = (newState) => {
  const prevState = { ...state };
  state = { ...prevState, ...newState };
};

const grabRandomSentence = (sentences) => {
  const randInx = Math.floor(Math.random() * sentences.length);
  const selectedSentence = sentences[randInx];
  return selectedSentence;
};

const calculateSpeed = () => {
  const el = Element.get('user-input');
  const inputValue = (el.value || '').trim();

  const words = inputValue ? inputValue.split(' ') : 0;
  const wordCount = words.length;
  const minutes = state.elapsedMil / 60000;
  const wpm = minutes > 0 ? Math.floor(wordCount / minutes) : 0;

  return wpm;
};

function endTest() {
  const { isTestRunning } = state;
  if (!isTestRunning) return;
  updateState({ isTestRunning: false });

  Element.get(USER_INPUT_ID).disabled = true;
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    updateState({ timerInterval: null });
  }

  Element.set('typing-speed', calculateSpeed());
}

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);

  const seconds = totalSeconds % 60;
  let secondString = seconds.toString();
  if (secondString.length < 2) {
    secondString = `0${seconds.toString()}`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  let minuteString = minutes.toString();
  if (minuteString.length < 2) {
    minuteString = `0${minutes.toString()}`;
  }

  return `${minuteString}:${secondString}`;
};

const updateTimer = () => {
  if (!state.startTime) {
    return;
  }
  const elapsedMil = Date.now() - state.startTime;
  updateState({ elapsedMil });

  const timeString = formatTime(elapsedMil);
  Element.set('timer', timeString);
};

const startTimer = () => {
  const timerInterval = setInterval(updateTimer, 1000);

  updateState({ startTime: Date.now(), timerInterval });
};

// Event Handlers
const handleUserInput = (e) => {
  const { value } = e.target;
  const { selectedSentence } = state;

  if (value === selectedSentence) endTest();
};

function startTest() {
  if (state.isTestRunning) return;

  const sentence = grabRandomSentence(sentenceArray);
  updateState({ isTestRunning: true, selectedSentence: sentence });

  Element.addEventListener(USER_INPUT_ID, 'input', handleUserInput);
  Element.addEventListener(USER_INPUT_ID, 'paste', (e) => e.preventDefault());
  Element.addEventListener(USER_INPUT_ID, 'drop', (e) => e.preventDefault());

  Element.set(RANDOM_SENTENCE_EL_ID, sentence);

  startTimer();
}

startTest();

// Stretch Goals

// TODO: Hide and show button on stop and start!
// TODO: Add character counter on inpit (characters left)
// TODO: then also add their error coun there too
