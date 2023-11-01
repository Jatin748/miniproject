import { Reveal } from "@/components/Reveal";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="p-5">
      <div className="space-y-5 md:space-y-10 w-full p-5">
        <Reveal>
          <p className="text-2xl md:text-7xl tracking-wide capitalize text-black">
            A Medium for your Movie recommendations, Search for your favourite movies
            and shows here on <b>EPRNETS</b>. Explore now for free!&#128151;
          </p>
        </Reveal>
        <Reveal>
          <Link
            href="/Search"
            className="bg-black text-white hover:bg-transparent hover:text-black md:p-4 px-0 py-2 rounded-full flex flex-1 justify-center transition-all shadow-2xl tracking-wide border-2 border-black text-xl"
          >
            Explore Now!
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
