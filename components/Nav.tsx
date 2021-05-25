import React from "react";

export const Nav = () => {
  return (
    <div
      className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
      id="menu"
    >
      <nav>
        <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
          <li>
            <a
              className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
              href="/"
            >
              Index
            </a>
          </li>
          <li>
            <a
              className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
              href="/pokemon/1"
            >
              Detail
            </a>
          </li>
          <li>
            <a
              className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
              href="/favourites"
            >
              Favourites
            </a>
          </li>
          <li>
            <a
              className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
              href="/battleArena"
            >
              Battle Arena
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
