import React from "react";
import { useSpring, animated as a } from "react-spring";

import SpeechRecognition, { useSpeechRecognition } from "../../../utils/speech";
import useSound from "../../../utils/sound";

// @ts-ignore
import sfxErrorSound1 from "../../../static/sfx/0.mp3";
// @ts-ignore
import sfxErrorSound2 from "../../../static/sfx/2.mp3";
// @ts-ignore
import sfxSoundOfSuccess from "../../../static/sfx/1.mp3";

import { Smile } from "../../../src/components/Smile";
import { getWordAndVarants } from "../../../helpers/words";

import { useVoices } from "../../../hooks/useVoices";

import { LANGUAGE, LANGUAGE_REGION } from "../../constants";

import s from "../../../src/styles.module.css";

const WordVariants = (props) => {
  const {
    dict = [],
    word: initialWord,
    variants: initialVariants = [],
    count: countVariants,
    languages: [lang, langOrigin],
    nativeLanguage = LANGUAGE.RU,
  } = props;

  const { voices, originalVoices } = useVoices({
    nativeLanguage,
    lang,
    langOrigin,
  });

  const onStartSpeechRecognition = React.useCallback(
    () =>
      SpeechRecognition.startListening({
        language: LANGUAGE_REGION[lang],
        continuous: false,
      }),
    [lang]
  );

  const [{ st, xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }));
  const [playErrorSound1] = useSound(sfxErrorSound1, { volume: 0.75 });
  const [playErrorSound2] = useSound(sfxErrorSound2, { volume: 0.75 });
  const [playSoundOfSuccess] = useSound(sfxSoundOfSuccess, { volume: 0.75 });

  const [mood, setMood] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [btnStatus, setBtnStatus] = React.useState({});
  const [signal, toggleSignal] = React.useState(false);

  const { signalState } = useSpring({
    signalState: signal ? 1 : 0,
    config: { duration: 750 },
  });

  const onMove = React.useCallback(
    ({ clientX: x, clientY: y }) =>
      set({
        xy: [x - window.innerWidth / 2, y],
        st: y / 2,
      }),
    []
  );

  const [word, setWord] = React.useState(initialWord);
  const [variants, setVariants] = React.useState(initialVariants);

  const { transcript, listening } = useSpeechRecognition();
  const msgRef: any = React.useRef();
  const msgOriginalRef: any = React.useRef();

  React.useEffect(() => {
    const synth = window.speechSynthesis;

    if (synth) {
      msgRef.current = new window.SpeechSynthesisUtterance(word.value);
      msgOriginalRef.current = new window.SpeechSynthesisUtterance(
        word.description
      );
    }
  }, []);

  React.useEffect(() => {
    msgRef.current = new window.SpeechSynthesisUtterance(word.value);
    msgOriginalRef.current = new window.SpeechSynthesisUtterance(
      word.description
    );
  }, [voices, word]);

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
        msgOriginalRef.current.lang = lang;
        window.speechSynthesis.speak(msgOriginalRef.current);
      }, (i + voices.length + 1) * 1000);
    });
  }, [originalVoices, voices, lang]);

  const onClick = React.useCallback(
    (event) => {
      event.preventDefault();

      const { id } = event.target.dataset;

      if (id == null) {
        return;
      }

      toggleSignal((state) => !state);

      if (word.id === +id) {
        setMood(1);
        onSpeack();
        setTimeout(onNext, 5000);
      } else {
        setBtnStatus((state) => ({ ...state, [id]: !state[id] }));
        setCount((count) => count + 1);
        setMood(-1);

        if (count < 2 || Math.random() < 0.7) {
          playErrorSound1();
        } else {
          playErrorSound2();
        }
      }
    },
    [word, count, playErrorSound1, playErrorSound2]
  );

  const isGood = React.useMemo(() => {
    return transcript.toUpperCase() === word.value.toUpperCase();
  }, [transcript, word]);

  React.useEffect(() => {
    if (isGood) {
      SpeechRecognition.stopListening();
      playSoundOfSuccess();
    }
  }, [isGood]);

  const onNext = React.useCallback(() => {
    const { word: nextWord, variants: nextVariants } = getWordAndVarants(dict, {
      count: countVariants,
    });

    setBtnStatus({});
    setMood(-1);
    setCount(0);
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
      style={{
        background:
          mood === -1
            ? signalState.interpolate({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [
                  "rgba(0,0,0,0)",
                  "rgba(184, 12, 43,0.97)",
                  "rgba(160, 2, 37,0.9)",
                  "rgba(184, 12, 43,1)",
                  "rgba(160, 2, 37,0.9)",
                  "rgba(160, 2, 37,0.97)",
                  "rgba(184, 12, 43,0.67)",
                  "rgba(0,0,0,0)]",
                ],
              })
            : mood === 1
            ? signalState.interpolate({
                range: [0, 0.5, 1],
                output: [
                  "rgba(40,195,138,1)",
                  "#01915c",
                  "rgba(40,195,138,1)]",
                ],
              })
            : "rgba(0,0,0,0)]",
      }}
    >
      <a.div
        className={s.card}
        style={{
          transform:
            mood === -1
              ? signalState
                  .interpolate({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                  })
                  .interpolate((x) => `scale(${x})`)
              : signalState
                  .interpolate({
                    range: [0, 0.5, 1],
                    output: [1, 1.15, 1],
                  })
                  .interpolate((x) => `scale(${x})`),
        }}
      >
        <Smile
          st={st}
          xy={xy}
          text={`${word.value}${isGood ? " ✓" : ""}`}
          onClick={onSpeackStart}
        />
        <div className={s.content}>
          <ul onClick={onClick} className={s.ul}>
            {variants.map((id) => {
              const isOpened = Boolean(btnStatus[id]);
              const title = isOpened ? dict[id][1].split(",")[0] : "";

              return (
                <li key={id} data-id={id} className={s.btn} title={title}>
                  {dict[id][isOpened ? 0 : 1].split(",")[0]}
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
