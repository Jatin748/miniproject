import Link from "next/link";
import React from "react";
import { Reveal } from "./Reveal";

const Header = () => {
  return (
    <nav className="flex flex-2 justify-between items-center md:p-14 p-5 md:py-10 border-2 border-r-0 border-l-0 border-t-0 border-black">
      <Reveal>
        <Link className="text-xl md:text-3xl font-bold uppercase" href="/">
          eprnets
        </Link>
      </Reveal>
    </nav>
  );
};

export default Header;
