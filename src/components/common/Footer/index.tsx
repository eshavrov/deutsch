import { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import getSlug from "lib/get-slug";
import { Logo, Container } from "components/ui";
import { I18nWidget } from "components/common";
import s from "./Footer.module.css";
import type { Page } from '@framework/api/operations/get-all-pages'


interface Props {
  className?: string;
  children?: any;
  pages?: Page[]
}

const LEGAL_PAGES = ["terms-of-use", "shipping-returns", "privacy-policy"];

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages, legalPages } = usePages(pages);
  const rootClassName = cn(className, s.footer);

  return (
    <footer className={rootClassName}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.item}>
            <Link href="/">
              <a className={s["logo-link"]}>
                <span className={s["logo-wrapper"]}>
                  <Logo />
                </span>
                <span>Simulator zum Deutschlernen</span>
              </a>
            </Link>
          </div>
          <div className={s.item}>
            <ul className={s.list}>
              <li className={s["list-item"]}>
                <Link href="/audio">
                  <a className={s["list-item-link"]}>Запоминаем!</a>
                </Link>
              </li>
              <li className={s["list-item"]}>
                <Link href="/words">
                  <a className={s["list-item-link"]}>Угадай слова!</a>
                </Link>
              </li>
              <li className={s["list-item"]}>
                <Link href="/new">
                  <a className={s["list-item-link"]}>Тест на слух!</a>
                </Link>
              </li>

              {sitePages.map((page) => (
                <li key={page.url} className={s["list-item"]}>
                  <Link href={page.url!}>
                    <a className={s["list-item-link"]}>{page.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.item}>
            <ul className={s.list}>
              {legalPages.map((page) => (
                <li key={page.url} className={s["list-item"]}>
                  <Link href={page.url!}>
                    <a className={s["list-item-link"]}>{page.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-6 flex items-start lg:justify-end text-primary">
            <div className="flex space-x-6 items-center h-10">
              <I18nWidget />
            </div>
          </div>
        </div>
        <div className="py-12 flex flex-col md:flex-row justify-between items-center space-y-4">
          <div>
            <span>&copy; 2021</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

function usePages(pages?: Page[]) {
  const { locale } = useRouter();
  const sitePages: Page[] = [];
  const legalPages: Page[] = [];

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url);

      if (!slug) return;
      if (locale && !slug.startsWith(`${locale}/`)) return;

      if (isLegalPage(slug, locale)) {
        legalPages.push(page);
      } else {
        sitePages.push(page);
      }
    });
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder),
  };
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug);

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0);
}

export default Footer;
