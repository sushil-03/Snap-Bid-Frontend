import React, { Fragment } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Button from "../atoms/Button";
const Navbar = () => {
  const navlist = [
    {
      name: "Home",
      link: "/",
    },
    // {
    //   name: "Why Us",
    //   link: "/why",
    // },
    {
      name: "Explore",
      link: "/explore",
    },
    // {
    //   name: "How it work",
    //   link: "/work",
    // },
    // {
    //   name: "About",
    //   link: "/about",
    // },
  ];
  return (
    <Fragment>
      <div className="absolute flex items-center justify-between w-full pt-4 pb-6">
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-8 text-sm uppercase font-orbitron ">
          {navlist.map((item, key) => {
            return (
              <Link href={item.link} key={key} className="group">
                <div className="py-2 pr-2 transition duration-300 group-hover:bg-white/60">
                  {item.name}
                </div>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black-600 origin-bottom-left after:origin-right"></span>
              </Link>
            );
          })}
          <Link href={"/Login"} className="group">
            <div className="py-2 pr-2 transition duration-300 group-hover:bg-white/60">
              Login
            </div>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black-600 origin-bottom-left after:origin-right"></span>
          </Link>

          <Link href={"/Login"} className="">
            <div className="w-full p-2 rounded-md text-whte bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              <div className="w-full h-full px-4 py-2 bg-white rounded-md">
                <span className="text-lg">+</span> Sell
              </div>
            </div>
          </Link>
          <Button variant="primary">Contact Us</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
