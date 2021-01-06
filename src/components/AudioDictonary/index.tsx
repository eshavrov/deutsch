import React from "react";
import cn from "classnames";
import { useSpring, animated as a } from "react-spring";

import SpeechRecognition, { useSpeechRecognition } from "utils/speech";
import useSound from "utils/sound";

// @ts-ignore
import sfxErrorSound1 from "../../../static/sfx/0.mp3";
// @ts-ignore
import sfxErrorSound2 from "../../../static/sfx/2.mp3";
// @ts-ignore
import sfxSoundOfSuccess from "../../../static/sfx/1.mp3";

import { getWordAndVarants } from "helpers/words";
import { shortWord } from "helpers/shortWord";
import { useVoices } from "hooks/useVoices";
import { LANGUAGE, LANGUAGE_REGION } from "constants/index";

import s from "./styles.module.css";
import { animatedContainerStyle, animatendCardStyle } from "./animated";

const WordVariants = (props) => {
  const {
    dict = [],

    languages: [lang, langOrigin],
    nativeLanguage = LANGUAGE.RU,
  } = props;

  const msgRef: any = React.useRef();
  const msgOriginalRef: any = React.useRef();

  const [indexLine, setIndexLine] = React.useState(-1);

  const { voices, originalVoices } = useVoices({
    nativeLanguage,
    lang,
    langOrigin,
  });

  const [playErrorSound1] = useSound(sfxErrorSound1, { volume: 0.75 });
  const [playErrorSound2] = useSound(sfxErrorSound2, { volume: 0.75 });
  const [playSoundOfSuccess] = useSound(sfxSoundOfSuccess, { volume: 0.75 });

  const onSpeack = React.useCallback(() => {
    if (!msgRef.current) return;
    console.log("speak");

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

  React.useEffect(() => {
    if (indexLine < 0) return;

    const [word, translated] = dict[indexLine];

    msgRef.current = new window.SpeechSynthesisUtterance(word);
    msgOriginalRef.current = new window.SpeechSynthesisUtterance(translated);
  }, [voices, originalVoices, indexLine, dict]);

  React.useEffect(() => {
    onSpeack();
    const id = setTimeout(
      () => setIndexLine((i) => (i + 1) % dict.length),
      8000
    );

    return () => clearTimeout(id);
  }, [indexLine]);

  const onClick = React.useCallback((event) => {
    event.preventDefault();

    const { id } = event.target.dataset;

    if (id == null) {
      return;
    }
  }, []);

  return (
    <a.div className={s.container}>
      <table className={s.card}>
        <tbody>
          {dict.map(([word, translated], index) => {
            return (
              <tr key={index} className={s.line}>
                <td className={s["cell-word"]}>
                  <span
                    className={cn(s.word, {
                      [s["word--selected"]]: index === indexLine,
                    })}
                  >
                    {word}
                  </span>
                </td>
                <td className={s["cell-translated"]}>
                  <span
                    className={cn(s.translated, {
                      [s["translated--selected"]]: index === indexLine,
                    })}
                  >
                    {translated}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </a.div>
  );
};

export default WordVariants;
