import useLogin from "@/hooks/useLogin";
import axios from "axios";
import Link from "next/link";
import * as React from "react";
import LoginButton from "./LoginButton";

/**
 * The props for the Navbar component.
 */
export interface IAppProps {}

/**
 * The Navbar component.
 */
export default async function Navbar(props: IAppProps) {
  return (
    <header className="px-4 lg:px-6 h-14 w-full flex items-center absolute top-0 left-0 bg-[#172f39] overflow-hidden shadow">
      {/* Logo */}
      <Link className="flex items-center justify-center" href="/">
        <img
          src="https://64.media.tumblr.com/44fe84f359eb2f71955496c3e7e9aa40/tumblr_pl2q17lSiN1uhw068o1_r1_1280.gifv"
          className="h-16 w-20 mr-2 rounded-full object-contain"
        />
        <h1 className="text-2xl font-bold text-white">BITS BIDS</h1>
      </Link>

      {/* Navigation links */}
      <nav className="text-white ml-auto flex gap-4 sm:gap-6 z-20">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/products"
        >
          Products
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/chat"
        >
          Messages
        </Link>
        <LoginButton />
      </nav>
    </header>
  );
}

/**
 * The IconMountain component.
 * @param props The component props.
 */
function IconMountain(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}