import React from "react";
import cn from "classnames";
import s from "./Container.module.css";

interface Props {
  className?: string;
  children?: any;
  el?: HTMLElement;
  clean?: boolean;
}

const Container: React.FC<Props> = ({ children, className, el = "div", clean }) => {
  const rootClassName = cn(className, {
    [s.container]: !clean,
  });

  let Component: React.ComponentType<
    React.HTMLAttributes<HTMLDivElement>
  > = el as any;

  return <Component className={rootClassName}>{children}</Component>;
};

export default Container;
