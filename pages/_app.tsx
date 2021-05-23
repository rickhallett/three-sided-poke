// import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import React from 'react';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  console.log('page', pageProps)
  return (
    <React.Fragment>
      <div className="container mx-auto px-4">
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  );
}

export default MyApp;
