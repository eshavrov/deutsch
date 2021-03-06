import { FC, useState, useMemo, useRef, useEffect } from "react";
import cn from "classnames";
import { getRandomPairOfColors } from "lib/colors";

import s from "./Avatar.module.css";

interface Props {
  className?: string;
  children?: any;
}

const Avatar: FC<Props> = ({}) => {
  const [bg] = useState(useMemo(() => getRandomPairOfColors, []));
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.backgroundImage = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`;
    }
  }, [bg]);

  return (
    <div ref={ref} className={s.avatar}>
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  );
};

export default Avatar;
