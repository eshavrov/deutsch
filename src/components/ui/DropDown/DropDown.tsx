import React from "react";
import cn from "classnames";

import s from "./DropDown.module.css";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange?: (...args: any[]) => any;
  items: any[];
  isDisabled?: boolean;
}

const DropDown: React.FC<Props> = (props) => {
  const {
    className,
    children,
    items: initialItems,
    onChange,
    isDisabled = false,
    value,
    ...rest
  } = props;

  const [items] = React.useState(initialItems);
  const _onChange = (event) => {
    if (!onChange) {
      return;
    }
    onChange(event.target.value);
  };

  return (
    <select disabled={isDisabled} value={value} onChange={_onChange}>
      {items.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
