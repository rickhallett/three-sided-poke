import React from "react";

export const NavMenuToggleButton = () => {
  return (
    <React.Fragment>
      <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
        <svg
          className="fill-current text-gray-900"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />
    </React.Fragment>
  );
};
