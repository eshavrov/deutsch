import React from "react";
import { useSpring, animated as a } from "react-spring";

import SpeechRecognition, { useSpeechRecognition } from "utils/speech";
import useSound from "utils/sound";
import { useWordStat, EVENT_STATUS } from "hooks/useWordStat";

// @ts-ignore
import sfxErrorSound1 from "../../../static/sfx/0.mp3";
// @ts-ignore
import sfxErrorSound2 from "../../../static/sfx/2.mp3";
// @ts-ignore
import sfxSoundOfSuccess from "../../../static/sfx/success-0.mp3";

import { Smile } from "components/Smile";
import { getWordAndVarants } from "helpers/words";
import { shortWord } from "helpers/shortWord";
import { useVoices } from "hooks/useVoices";
import { LANGUAGE, LANGUAGE_REGION } from "constants/index";

import s from "./styles.module.css";
import { animatedContainerStyle, animatendCardStyle } from "./animated";

const WordVariants = (props) => {
  const {
    dict = {},
    word: initialWord,
    variants: initialVariants = [],
    languages: [lang, langOrigin],
    nativeLanguage = LANGUAGE.RU,
  } = props;

  const msgRef: any = React.useRef();
  const msgOriginalRef: any = React.useRef();

  const [countVariants] = React.useState(initialVariants.length);
  const [variants, setVariants] = React.useState(initialVariants);
  const [mood, setMood] = React.useState(0);
  const [tryIndex, setTryIndex] = React.useState(0);
  const [btnStatus, setBtnStatus] = React.useState({});
  const [signal, toggleSignal] = React.useState(false);
  const [word, setWord] = React.useState(initialWord);

  const [{ st, xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }));
  const { signalState } = useSpring({
    signalState: signal ? 1 : 0,
    config: { duration: 750 },
  });

  const { voices, originalVoices } = useVoices({
    nativeLanguage,
    lang,
    langOrigin,
  });

  const { transcript, listening } = useSpeechRecognition();

  const [playErrorSound1] = useSound(sfxErrorSound1, { volume: 0.75 });
  const [playErrorSound2] = useSound(sfxErrorSound2, { volume: 0.75 });
  const [playSoundOfSuccess] = useSound(sfxSoundOfSuccess, { volume: 0.75 });

  const [wordStat, setWordStat] = useWordStat(word);

  const isGood = React.useMemo(() => {
    const _isGood = transcript.toUpperCase() === word.phrase.toUpperCase();
    if (_isGood) {
      setWordStat(EVENT_STATUS.WORDS_SPEECH_GOOD, { word });
    }

    return _isGood;
  }, [transcript, word]);

  React.useEffect(() => {
    const synth = window.speechSynthesis;

    if (synth) {
      msgRef.current = new window.SpeechSynthesisUtterance(word.phrase);
      msgOriginalRef.current = new window.SpeechSynthesisUtterance(
        word.translation
      );
    }
  }, []);

  React.useEffect(() => {
    msgRef.current = new window.SpeechSynthesisUtterance(word.phrase);
    msgOriginalRef.current = new window.SpeechSynthesisUtterance(
      word.translation
    );
  }, [voices, word]);

  React.useEffect(() => {
    if (isGood) {
      SpeechRecognition.stopListening();
      playSoundOfSuccess();
    }
  }, [isGood]);

  const onStartSpeechRecognition = React.useCallback(
    () =>
      SpeechRecognition.startListening({
        language: LANGUAGE_REGION[lang],
        continuous: false,
      }),
    [lang]
  );

  const onMove = React.useCallback(
    ({ clientX: x, clientY: y }) =>
      set({
        xy: [x - window.innerWidth / 2, y],
        st: y / 2,
      }),
    []
  );

  const onSpeackStart = React.useCallback(() => {
    if (!msgRef.current) return;

    msgRef.current.voice = voices[Math.round(Math.random())];
    msgRef.current.lang = lang;

    window.speechSynthesis.speak(msgRef.current);
  }, [voices, lang]);

  const onSpeack = React.useCallback(() => {
    if (!msgRef.current) return;

    voices.forEach((voice, i) => {
      setTimeout(() => {
        msgRef.current.voice = voice;
        msgRef.current.lang = lang;
        window.speechSynthesis.speak(msgRef.current);
      }, i * 1000);
    });

    originalVoices.forEach((voice, i) => {
      setTimeout(() => {
        msgOriginalRef.current.voice = voice;
        msgOriginalRef.current.lang = langOrigin;
        window.speechSynthesis.speak(msgOriginalRef.current);
      }, (i + voices.length + 1) * 1000);
    });
  }, [originalVoices, voices, lang, langOrigin]);

  const onClick = React.useCallback(
    (event) => {
      event.preventDefault();

      const { id } = event.target.dataset;

      if (id == null) {
        return;
      }

      toggleSignal((state) => !state);

      if (word.id === +id) {
        setWordStat(EVENT_STATUS.WORDS_GOOD, { word });
        setMood(1);
        onSpeack();
        setTimeout(onNext, 5000);
      } else {
        setWordStat(EVENT_STATUS.WORDS_OPPS, { word, w2: dict[id] });
        setBtnStatus((state) => ({ ...state, [id]: !state[id] }));
        setTryIndex((count) => count + 1);
        setMood(-1);

        if (tryIndex < 2 || Math.random() < 0.7) {
          playErrorSound1();
        } else {
          playErrorSound2();
        }
      }
    },
    [word, wordStat, tryIndex, playErrorSound1, playErrorSound2, dict]
  );

  const onNext = React.useCallback(() => {
    const { word: nextWord, variants: nextVariants } = getWordAndVarants(dict, {
      count: countVariants,
    });

    setBtnStatus({});
    setMood(-1);
    setTryIndex(0);
    setWord(nextWord);
    setVariants(nextVariants);
    onSpeackStart();
  }, []);

  const text = React.useMemo(() => {
    if (!listening) {
      return "Произнести";
    }

    if (transcript && transcript.length > 0) {
      return transcript;
    }

    return "Слушаю...";
  }, [transcript, listening]);

  const isToTellDisabled = isGood || listening || voices.length === 0;

  return (
    <a.div
      className={s.container}
      onMouseMove={onMove}
      style={animatedContainerStyle({ mood, signalState })}
    >
      <a.div
        className={s.card}
        style={animatendCardStyle({ mood, signalState })}
      >
        <Smile
          st={st}
          xy={xy}
          text={`${word.phrase}${isGood ? " ✓" : ""}`}
          onClick={onSpeackStart}
        />
        <div className={s.content}>
          <ul onClick={onClick} className={s.ul}>
            {variants.map((id) => {
              const isOpened = Boolean(btnStatus[id]);
              const title = isOpened ? shortWord(dict[id].translation) : "";

              return (
                <li key={id} data-id={id} className={s.btn} title={title}>
                  {shortWord(dict[id][isOpened ? "phrase" : "translation"])}
                </li>
              );
            })}
          </ul>
          <div className={s.help}>
            <button
              className={s.btnHelp}
              onClick={onSpeack}
              disabled={voices.length === 0}
            >
              Подсказать
            </button>

            <button
              className={s.btnHelp}
              onClick={onStartSpeechRecognition}
              disabled={isToTellDisabled}
            >
              {text}
            </button>
          </div>
        </div>
      </a.div>
    </a.div>
  );
};

export default WordVariants;
