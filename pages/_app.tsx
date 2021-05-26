// import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Nav } from "../components/Nav";
import { NavBarRightIcons } from "../components/NavBarRightIcons";
import { NavMenuToggleButton } from "../components/NavMenuToggleButton";
import { ThreeSidedCubeLogo } from "../components/ThreeSidedCubeLogo";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/nav.css" />
        {/* <script src="https://unpkg.com/pokeapi-js-wrapper/dist/index.js" /> */}
        {/* <script src="pokeapi-js-wrapper-sw.js" /> */}
        {/* <script src="pokedexWrapper.js" /> */}
      </Head>
      <div className="container mx-auto px-4 text-gray-400">
        <ThreeSidedCubeLogo />

        <nav
          id="header"
          className="w-full sm:w-11/12 md:w-full z-30 top-0 py-1"
        >
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
            <NavMenuToggleButton />
            <Nav />
            <NavBarRightIcons />
          </div>
        </nav>

        <Component {...pageProps} />
      </div>
    </React.Fragment>
  );
}

export default MyApp;
