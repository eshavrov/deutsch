import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";

// noinspection HtmlRequiredTitleElement
/**
 * Is only rendered on the server side and not on the client side
 *
 * @see https://github.com/vercel/next.js/#custom-document
 */
class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {


    return (
      <Html lang="ru">
        <Head />
        <body className="preload-transitions">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
