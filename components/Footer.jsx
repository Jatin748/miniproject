import Link from "next/link";
import React from "react";
import { Reveal } from "./Reveal";

const Footer = () => {
  return (
    <footer className="flex p-4 md:p-14 items-center border-2 border-black border-r-0 border-l-0 border-b-0">
      {/* div left start */}
      <div>
        <Reveal>
          <div>
            <Link href="/" className="text-xl md:text-3xl font-bold uppercase">
              Eprnets
            </Link>
          </div>
        </Reveal>
      </div>
      {/* div left end */}
      <Reveal>
        <div className="flex justify-end items-center">
          <span className="flex items-center text-sm md:text-base gap-2">
            Hosted On{" "}
            <Link
              href="https://www.netlify.com/"
              target="_blank"
              className="font-medium underline md:text-xl"
            >
              Netlify
            </Link>
          </span>
        </div>
      </Reveal>
    </footer>
  );
};

export default Footer;
