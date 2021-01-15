import React, { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import { useTheme } from "next-themes";

import useCart from "@framework/cart/use-cart";
import useUser from "@framework/use-user";
import { Result, Moon, Sun } from "components/icons";
import { useUI } from "components/ui/context";
import DropdownMenu from "./DropdownMenu";
import s from "./UserNav.module.css";
import { Avatar } from "components/common";

interface Props {
  className?: string;
}

const countItem = (count: number, item: any) => count + item.quantity;
const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count);

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  // const { data } = useCart();
  const data = null;
  const { data: user } = useUser();
  // const user = null;
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI();
  const itemsCount = Object.values(data?.line_items ?? {}).reduce(
    countItems,
    0
  );
  const { theme, setTheme } = useTheme();

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li
            className={s.item}
            onClick={() => {
              theme === "dark" ? setTheme("light") : setTheme("dark");
            }}
          >
            {theme == "dark" ? (
              <Moon width={20} height={20} />
            ) : (
              <Sun width="20" height={20} />
            )}
          </li>

          <li className={s.item}>
            <Link href="/result">
              <a
                onClick={closeSidebarIfPresent}
                aria-label="Result"
                className={s.result}
              >
                <Result />
              </a>
            </Link>
          </li>
          <li className={s.item}>
            {user ? (
              <DropdownMenu />
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNav;
