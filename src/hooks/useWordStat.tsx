import { useLocalStorage } from "./useLocalStorage";

const KEYS = {
  WORD_VARIANTS: "w",
  WORDS_SPEECH: "a",
  SPEECH_RECOGNITION_LIST: "l",
};

const STAT_INIT = {
  [KEYS.WORD_VARIANTS]: 0, // угадать визуально
  [KEYS.WORDS_SPEECH]: 0, // произнести в словах,
  [KEYS.SPEECH_RECOGNITION_LIST]: 0, // правильно произнести перевод
};

const POINT = {
  GOOD: 0.5,
  OPPS: -1,
  W2_OPPS: -0.25,

  SPEECH_RECOGNITION_LIST_GOOD: 1,
  SPEECH_RECOGNITION_LIST_OPPS: -0.25,
};

const EVENT_STATUS = {
  WORDS_GOOD: 1,
  WORDS_OPPS: -1,
  WORDS_SPEECH_GOOD: 2,
  SPEECH_RECOGNITION_LIST_GOOD: 3,
  SPEECH_RECOGNITION_LIST_OPPS: -3,
};

const getKeyName = (word) => (word?.phrase ? `__${word.phrase}` : undefined);

const calc = (value, point) => (value || 0) + point;

const useWordStat = (word) => {
  const [state, setState, setKeyValue] = useLocalStorage(
    getKeyName(word),
    STAT_INIT
  );

  const setWordStat = (status, options: { w2?: any } = {}) => {
    switch (status) {
      case EVENT_STATUS.WORDS_GOOD: {
        setState({
          ...state,
          [KEYS.WORD_VARIANTS]: calc(state[KEYS.WORD_VARIANTS], POINT.GOOD),
        });
        break;
      }

      case EVENT_STATUS.WORDS_SPEECH_GOOD: {
        setState({
          ...state,
          [KEYS.WORDS_SPEECH]: calc(state[KEYS.WORDS_SPEECH], 1),
        });
        break;
      }

      case EVENT_STATUS.WORDS_OPPS: {
        const { w2 } = options;
        setState({
          ...state,
          [KEYS.WORD_VARIANTS]: calc(state[KEYS.WORD_VARIANTS], POINT.OPPS),
        });

        setKeyValue(getKeyName(w2), STAT_INIT, (prevState) => ({
          ...prevState,
          [KEYS.WORD_VARIANTS]: calc(
            prevState[KEYS.WORD_VARIANTS],
            POINT.W2_OPPS
          ),
        }));
        break;
      }

      case EVENT_STATUS.SPEECH_RECOGNITION_LIST_GOOD: {
        setState({
          ...state,
          [KEYS.SPEECH_RECOGNITION_LIST]: calc(
            state[KEYS.SPEECH_RECOGNITION_LIST],
            POINT.SPEECH_RECOGNITION_LIST_GOOD
          ),
        });
        break;
      }

      case EVENT_STATUS.SPEECH_RECOGNITION_LIST_OPPS: {
        setState({
          ...state,
          [KEYS.SPEECH_RECOGNITION_LIST]: calc(
            state[KEYS.SPEECH_RECOGNITION_LIST],
            POINT.SPEECH_RECOGNITION_LIST_OPPS
          ),
        });
        break;
      }

      default: {
      }
    }
  };

  return [state, setWordStat];
};

export { useWordStat, EVENT_STATUS };
