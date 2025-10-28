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
  'These are the things that I want from a relationship.',
  'She knew they were going to sabotage her, but she had no way to stop them.',
  'The contents of the box are listed on the label.',
  'He took a thirty-minute shower, and by the time he stepped out, his fingers were as wrinkled as prunes.',
  'In France, she accidentally bought a pepperoni pizza when she meant to get cheese.',
  'It was so cold that no one wanted to go outside.',
  'I have a feeling that something big is about to happen.',
  "Besides not eating much, they won't ever chew on your electric cords.",
  'She loved first dates because it was a great way to meet cool people.',
  'Tom has a pain in his big toe on his right foot.',
  'When one considers the issue from a different perspective, the answer seems to change.',
  'The chocolate chip cookies smelled so good that I ate one without asking.',
  'Selling hand-made objects is the main source of income for locals.',
  "She liked online dating apps because they didn't require you to meet people in-person.",
  'She dreamed of one day having the flexibility to take a day off whenever she felt sick.',
  "Let's all just take a moment to breathe, please!",
  'The dog chased the cat around the block four times.',
  'On her birthday, she decided to skip work, and instead got on a plane to Wisconsin.',
  'The orange tree in her backyard was blown away by the hurricane.',
  "I've been able to cure my neighbor's sick cat.",
  'She had always liked the look of leather pants but was too insecure to wear them herself.',
  "Mike's mother lived in a big city before she married.",
  'I prefer walking to driving in a big city like Tokyo.',
  'A wand gets its magic from the intention of its wielder.',
  'Tom works for a big advertising firm in Boston.',
  "The camping trip was so awesome that I didn't want to come home.",
  "There's a good chance it'll rain tomorrow.",
  'The Soviet Union: goes from a backwards agrarian society to the Space Age in 50 years, while almost single-handedly defeating the Nazis.',
  "I have no doubt that you're going to nail this interview.",
  'I am in a hurry today because I was working out for too long.',
  'Her mom was a musical theater actress, which got her interested in singing.',
  "Steve doesn't have to go if he doesn't want to.",
  'Learning about other countries history is fun.',
  'There were elements of his singing voice that reminded her of JC from N-Sync.',
  'My biggest problem is deciding what I should do next.',
  "Let's all just take a moment to breathe, please!",
  'She was determined to summit Mount Everest before she turned twenty-nine.',
  'Their impressive literacy skills must be mentioned.',
  'The grocery store wrote the weekly sales on poster board and taped them up in their windows.',
  'She loved to visit new coffeeshops, especially when they were cheap.',
  "His mom was so upset that he knew he couldn't tell her the truth.",
  'She appreciated all the time people spent on her.',
  'My boyfriend prefers to watch movie trailers instead actual movies.',
  'She got Taco Bell for lunch to try to cheer herself up, but it only made her more upset.',
  'She sat next to a mom with a baby on the train, and the baby threw up on her.',
  "Tom can't forget the time he and Mary had their first argument.",
  'Judith Jarvis Thompson is the best philosopher of all time.',
  "She did it knowing it was wrong; knowing he wouldn't do as he promised, that her work was useless, that he was going to kill again anyway.",
  'Tom took a big breath and blew out the candles.',
  'All the bikes locked up outside the subway station are missing either a wheel or a seat.',
  'She dreamed of one day having the flexibility to take a day off whenever she felt sick.',
  'Social media is amazing because in some ways it finally put the control of information directly into the hands of the people.',
  'The cafe is empty aside from an old man reading a book about Aristotle.',
  'She did not want to deal with the New York City bureaucracy.',
  'She went to the doctor when she felt aches in her left calf.',
  "Let's all just take a moment to breathe, please!",
  "I've been able to cure my neighbor's sick cat.",
  'They wrote the specials on the chalkboard in multi-colored chalks.',
  'My sister likes to eat cheese on her peanut butter sandwich and pickles on her ice cream.',
];
const defaultState = {
  isTestRunning: false,
  selectedSentence: '',
  triesPerWord: null,
  startTime: null,
  timerInterval: null,
};

let state = defaultState;

// Constants
const RANDOM_SENTENCE_EL_ID = 'random-sentence';
const USER_INPUT_ID = 'user-input';
const TIMER_ID = 'timer';
const TYPING_SPEED_ID = 'typing-speed';
const TYPING_ACCURACY_ID = 'typing-accuracy';
const START_BUTTON_ID = 'start-button';
const STOP_BUTTON_ID = 'stop-button';

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

const calculateTotalAccuracy = () => {
  const accuracy = state.triesPerWord.reduce(
    (p, c) => (p + c.accuracy) / 2,
    100
  );

  return `${Math.floor(accuracy)}%`;
};

function endTest() {
  const { isTestRunning } = state;
  if (!isTestRunning) return;

  Element.get(START_BUTTON_ID).style.display = 'block';
  Element.get(STOP_BUTTON_ID).style.display = 'none';
  Element.get(USER_INPUT_ID).disabled = true;

  updateState({ isTestRunning: false });

  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    updateState({ timerInterval: null });
  }

  Element.set(TYPING_SPEED_ID, calculateSpeed());
  Element.set(TYPING_ACCURACY_ID, calculateTotalAccuracy());
  Element.get(START_BUTTON_ID).focus({ preventScroll: true });
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
  Element.set(TIMER_ID, timeString);
};

const startTimer = () => {
  const timerInterval = setInterval(updateTimer, 1000);
  updateState({ startTime: Date.now(), timerInterval });
};

// Event Handlers
const handleUserInput = (e) => {
  const { value } = e.target;
  const { selectedSentence } = state;
  const { triesPerWord = [] } = state;
  const prevTriesPerWord = [...triesPerWord];
  const currentWordindx = value.trim().split(' ').length - 1;

  if (String(value).endsWith(' ') || String(value).endsWith('\n')) {
    const sentenceSplit = selectedSentence.split(' ');
    prevTriesPerWord[currentWordindx].tries += 1;

    const { word } = prevTriesPerWord[currentWordindx];
    const currentWord = value.trim().split(' ').slice(-1)[0];
    if (currentWord !== word) {
      const newSentence = sentenceSplit.slice(0, currentWordindx).join(' ');
      // eslint-disable-next-line operator-linebreak
      Element.get('user-input').value =
        currentWordindx > 0 ? `${newSentence} ` : newSentence;
    } else if (String(value).endsWith('\n')) {
      Element.get('user-input').value = value.trim();
    }
  }

  if (value === selectedSentence) {
    prevTriesPerWord[currentWordindx].tries += 1;
  }

  if (prevTriesPerWord[currentWordindx].tries) {
    // eslint-disable-next-line operator-linebreak
    prevTriesPerWord[currentWordindx].accuracy =
      100 / prevTriesPerWord[currentWordindx].tries;
  }

  updateState({ triesPerWord: prevTriesPerWord });

  if (value === selectedSentence) {
    endTest();
  }
};

const resetSpace = () => {
  Element.get(START_BUTTON_ID).style.display = 'none';
  Element.get(STOP_BUTTON_ID).style.display = 'block';
  const userInputEl = Element.get(USER_INPUT_ID);
  Element.set(TIMER_ID, '00:00');
  Element.set(TYPING_SPEED_ID, '-');
  Element.set(TYPING_ACCURACY_ID, '-');
  userInputEl.value = '';

  updateState(defaultState);
  userInputEl.disabled = false;
  userInputEl.focus();
};

function startTest() {
  if (state.isTestRunning) return;

  resetSpace();
  const sentence = grabRandomSentence(sentenceArray);
  updateState({
    isTestRunning: true,
    selectedSentence: sentence,
    triesPerWord: sentence
      .split(' ')
      .map((word) => ({ word, tries: 0, accuracy: 0 })),
  });

  Element.addEventListener(USER_INPUT_ID, 'input', handleUserInput);
  Element.addEventListener(USER_INPUT_ID, 'paste', (e) => e.preventDefault());
  Element.addEventListener(USER_INPUT_ID, 'drop', (e) => e.preventDefault());

  Element.set(RANDOM_SENTENCE_EL_ID, sentence);

  startTimer();
}

const events = () => {
  Element.addEventListener(START_BUTTON_ID, 'click', startTest);
  Element.addEventListener(START_BUTTON_ID, 'keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.repeat) return; // ignore key held down
      e.preventDefault(); // prevent Space from scrolling
      startTest();
    }
  });
  Element.addEventListener(STOP_BUTTON_ID, 'click', endTest);
};

const startApp = () => {
  events();
  Element.get(START_BUTTON_ID).focus({ preventScroll: true });
};

startApp();
// Stretch Goals

// TODO: Add character counter on inpit (characters left)
// TODO: then also add their error coun there too
