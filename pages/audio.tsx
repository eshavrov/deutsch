import React from "react";

import AudioDictonary from "components/AudioDictonary";
import { LANGUAGE } from "constants/index";
import { getDictonary } from "constants/db";

const HomePage = (props) => {
  const { dict = [], nativeLanguage, languages } = props;


  return (
    <AudioDictonary
      dict={dict}
      nativeLanguage={nativeLanguage}
      languages={languages}
    />
  );
};

HomePage.getInitialProps = ({ query }) => {
  let nativeLanguage = LANGUAGE.RU;

  let languages =
    query.lang === LANGUAGE.RU
      ? [LANGUAGE.RU, LANGUAGE.DE]
      : [LANGUAGE.DE, LANGUAGE.RU];

  const dict = getDictonary({ languages, count: 10 });

  return { dict, languages, nativeLanguage };
};

export default HomePage;
