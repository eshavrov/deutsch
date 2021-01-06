import React from "react";
import { useSpring, animated as a } from "react-spring";

import SpeechRecognition, { useSpeechRecognition } from "../utils/speech";
import useSound from "../utils/sound";

import boopSfx1 from "../static/sfx/0.mp3";
import boopSfx2 from "../static/sfx/2.mp3";
import boopSfx3 from "../static/sfx/1.mp3";

import { verbs } from "../src/verbs";

import { Smile } from "../src/components/Smile";
import s from "../src/styles.module.css";
import { getWordAndVarants } from "../helpers/words";

const LOCALSTORAGE_USER_INFO = "__USER_INFO__";

const LANG_ORIGINAL = "ru";
const REGEXP_LANG_ORIGINAL_VOICE = new RegExp(LANG_ORIGINAL, "i");

const LANG = "de";
const REGEXP_LANG_DEUTSCH_VOICE = new RegExp(LANG, "i");

const getUserInfo = () => {
  const state = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_INFO));

  if (!state) {
    return {
      actions: {},
    };
  }

  return state;
};

const dict = verbs.slice();

const HomePage = (props) => {
  const { word: initialWord, variants: initialVariants = [] } = props;
  const [{ st, xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }));
  const [play] = useSound(boopSfx1, { volume: 0.75 });
  const [play2] = useSound(boopSfx2, { volume: 0.75 });
  const [play3] = useSound(boopSfx3, { volume: 0.75 });

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

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  console.log("listening", listening);
  const msgRef: any = React.useRef();
  const msgOriginalRef: any = React.useRef();

  const [voices, setVoices] = React.useState([]);
  const [originalVoices, setVoiceOriginal] = React.useState([]);

  React.useEffect(() => {
    const userInfo = getUserInfo();
    var synth = window.speechSynthesis;

    if (synth) {
      msgRef.current = new window.SpeechSynthesisUtterance(word.value);

      msgOriginalRef.current = new window.SpeechSynthesisUtterance(
        word.description
      );

      const v = () => {
        const _voices = synth.getVoices();

        setVoices(
          _voices.filter(({ lang }) => REGEXP_LANG_DEUTSCH_VOICE.test(lang))
        );

        setVoiceOriginal(
          _voices.filter(({ lang }) => REGEXP_LANG_ORIGINAL_VOICE.test(lang))
        );
      };

      synth.addEventListener("voiceschanged", v);

      return () => {
        synth.removeEventListener("voiceschanged", v);
      };
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
    msgRef.current.lang = "de";
    window.speechSynthesis.speak(msgRef.current);
  }, [voices]);

  const onSpeack = React.useCallback(() => {
    if (!msgRef.current) return;
    msgRef.current.voice = voices[0];
    msgRef.current.lang = "de";
    window.speechSynthesis.speak(msgRef.current);

    setTimeout(() => {
      msgRef.current.voice = voices[1];
      window.speechSynthesis.speak(msgRef.current);
    }, 1000);

    setTimeout(() => {
      msgOriginalRef.current.voice =
        originalVoices[Math.floor(Math.random() * originalVoices.length)];
      window.speechSynthesis.speak(msgOriginalRef.current);
    }, 2000);
  }, [originalVoices, voices]);

  const onClick = React.useCallback(
    (event) => {
      event.preventDefault();

      // console.log("boopSfx", boopSfx);
      const { id } = event.target.dataset;
      console.log(id, event);

      // console.log(word.id, id);
      toggleSignal((state) => !state);

      if (word.id === +id) {
        console.log("YES");
        setMood(1);
        onSpeack();
        setTimeout(onNext, 3000);
        // onNext();
      } else {
        setBtnStatus((state) => ({ ...state, [id]: !state[id] }));

        setCount((count) => count + 1);
        setMood(-1);

        if (count < 2 || Math.random() < 0.7) {
          play();
        } else {
          play2();
        }
      }
    },
    [word, count, play, play2]
  );

  const onStartSpeechRecognition = React.useCallback(
    () =>
      SpeechRecognition.startListening({
        language: "de-DE",
        continuous: false,
      }),
    []
  );

  const isGood = React.useMemo(() => {
    console.log(transcript);
    return transcript.toUpperCase() === word.value.toUpperCase();
  }, [transcript, word]);

  React.useEffect(() => {
    if (isGood) {
      SpeechRecognition.stopListening();
      play3();

      console.log("stop!");
    }
  }, [isGood]);

  const onNext = React.useCallback(() => {
    const { word: nextWord, variants: nextVariants } = getWordAndVarants(
      dict,
      4
    );

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

HomePage.getInitialProps = () => {
  const { word, variants } = getWordAndVarants(dict, 4);

  return { word, variants };
};

export default HomePage;
