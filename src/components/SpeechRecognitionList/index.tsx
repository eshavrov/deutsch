import React from "react";
import cn from "classnames";
import { useSpring, animated as a } from "react-spring";

import SpeechRecognition, { useSpeechRecognition } from "utils/speech";
import useSound from "utils/sound";

import { useVoices } from "hooks/useVoices";
import { LANGUAGE, LANGUAGE_REGION } from "constants/index";

// @ts-ignore
import sfxErrorSound1 from "../../../static/sfx/0.mp3";
// @ts-ignore
// import sfxErrorSound2 from "../../../static/sfx/2.mp3";
// @ts-ignore
import sfxSoundOfSuccess from "../../../static/sfx/success-0.mp3";

import { animatedContainerStyle, animatendCardStyle } from "./animated";
import s from "./styles.module.css";

const tgtrimm = (str) =>
  str
    .replace(/ *\([^)]*\) */g, "")
    .replace(/[^a-zA-ZА-Яа-яЁё]/gi, "")
    .toLowerCase().trim();
const INTERVAL = 5000;

const SpeechRecognitionList = (props) => {
  const {
    dict: dictInitial = [],
    languages: [lang, langOrigin],
    nativeLanguage = LANGUAGE.RU,
  } = props;

  const [playErrorSound1] = useSound(sfxErrorSound1, { volume: 0.75 });
  const [playSoundOfSuccess] = useSound(sfxSoundOfSuccess, { volume: 0.75 });

  const [start, setStart] = React.useState(false);
  const { transcript, listening } = useSpeechRecognition();
  const [dict, setDict] = React.useState(dictInitial);
  const [timer, setTimer] = React.useState(0);
  const [mood, setMood] = React.useState(0);
  const [signal, toggleSignal] = React.useState(false);

  // const [{ st, xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }));
  const { signalState } = useSpring({
    signalState: signal ? 1 : 0,
    config: { duration: 750 },
  });

  const msgRef: any = React.useRef();
  const msgOriginalRef: any = React.useRef();

  const [indexLine, setIndexLine] = React.useState(-1);

  const { voices, originalVoices } = useVoices({
    nativeLanguage,
    lang,
    langOrigin,
  });

  const onSpeack = React.useCallback(() => {
    window.speechSynthesis;
    if (!msgRef.current) return;
    // setMood(0);
    // toggleSignal((state) => !state);

    voices.forEach((voice, i) => {
      setTimeout(() => {
        msgRef.current.voice = voice;
        msgRef.current.lang = lang;
        window.speechSynthesis.speak(msgRef.current);
      }, i * 1000);
    });

    setTimeout(() => {
      console.log("startListening");
      SpeechRecognition.startListening({
        language: LANGUAGE_REGION[langOrigin],
        continuous: false,
      });
      setTimer(Date.now());
    }, voices.length * 1000 + 1000);
  }, [voices, lang]);

  const onSpeackOriginal = React.useCallback(() => {
    window.speechSynthesis;
    if (!msgOriginalRef.current) return;

    originalVoices.forEach((voice, i) => {
      setTimeout(() => {
        msgOriginalRef.current.voice = voice;
        msgOriginalRef.current.lang = langOrigin;
        window.speechSynthesis.speak(msgOriginalRef.current);
      }, i * 1000);
    });
  }, [originalVoices, langOrigin]);

  React.useEffect(() => {
    const _indexLine = indexLine % dict.length;

    if (indexLine < 0 || dict.length === 0) return;

    const { phrase, translation } = dict[_indexLine];

    msgRef.current = new window.SpeechSynthesisUtterance(phrase);
    msgOriginalRef.current = new window.SpeechSynthesisUtterance(translation);
  }, [voices, originalVoices, indexLine, dict]);

  React.useEffect(() => {
    if (indexLine < 0 || dict.length === 0) return;

    onSpeack();
  }, [indexLine, dict]);

  const onStart = React.useCallback(() => {
    window.speechSynthesis;

    setIndexLine((i) => (i + 1) % dict.length);
    setStart(true);
  }, []);

  React.useEffect(() => {
    const _indexLine = indexLine % dict.length;
    if (_indexLine < 0 || dict.length === 0 || !dict[_indexLine]) return;

    const timeSpan = Date.now() - timer;

    if (listening && timeSpan > INTERVAL && timer !== 0) {
      setMood(-1);
      toggleSignal((state) => !state);

      console.log("***", listening, timeSpan, INTERVAL, timer);
      console.log("abortListening");
      SpeechRecognition.abortListening();
      setTimer(0);

      playErrorSound1();
      onSpeackOriginal();

      setTimeout(() => setIndexLine((i) => i + 1), 2000);
    } else if (listening) {
      const value = dict[_indexLine].translation;

      const isGood = value
        .split(",")
        .map(tgtrimm)
        .reduce(
          (acc, word) => acc || tgtrimm(transcript).includes(word),
          false
        );

      console.log(isGood);
      console.log(value, transcript);
      console.log(tgtrimm(transcript));

      console.log(value.split(",").map(tgtrimm));

      if (isGood) {
        console.log("+++", transcript, value);
        setMood(1);
        toggleSignal((state) => !state);

        console.log("abortListening");
        SpeechRecognition.abortListening();
        playSoundOfSuccess();
        setTimer(0);

        setDict((d) => (d.splice(_indexLine, 1), d));

        setIndexLine((i) => i + 1);
      }
    } else if (timer !== 0) {
      console.log("-- no", Date.now() - timer);
      console.log("startListening");
      SpeechRecognition.startListening({
        language: LANGUAGE_REGION[langOrigin],
        continuous: false,
      });
    }
  }, [transcript, listening, indexLine, timer, dict]);

  if (!start) {
    return <button onClick={onStart}>start</button>;
  }

  return (
    <a.div
      className={s.container}
      style={animatedContainerStyle({ mood, signalState })}
    >
      <table className={s.card}>
        <tbody>
          {dict.map(({ phrase, translation, id }, index) => {
            const selected = listening && index === indexLine % dict.length;

            return (
              <tr key={id} className={s.line}>
                <td className={s["cell-word"]}>
                  <span
                    className={cn(s.word, {
                      [s["word--selected"]]: selected,
                    })}
                  >
                    {phrase}
                  </span>
                </td>
                {/* <td className={s["cell-translated"]}>
                  <span
                    className={cn(s.translated, {
                      [s["translated--selected"]]: index === indexLine,
                    })}
                  >
                    {translation}
                  </span>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </a.div>
  );
};

export default SpeechRecognitionList;
