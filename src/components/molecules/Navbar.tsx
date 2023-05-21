import React, { Fragment } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Button from "../atoms/Button";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
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
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState<boolean>(true);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
  return (
    <Fragment>
      <div
        className={`fixed z-30 flex items-center justify-between sm:px-4 px-2 pl-2 pt-4 pb-6 lg:mx-2 md:mx-4  mt-4 overflow-hidden rounded-md md:w-11/12 mx-auto md:rounded-full md:px-10 backdrop-blur-2xl transition-all ease-in-out duration-600 ${
          visible ? "top-0" : "-top-36"
        } `}
      >
        <Logo />
        <div className="flex items-center gap-1 text-sm uppercase md:gap-8 sm:gap-4 font-baiMedium ">
          {navlist.map((item, key) => {
            return (
              <Link
                href={item.link}
                key={key}
                className=" group hover:text-red-600 rounded-t-xl"
              >
                <div className="px-2 py-2 text-xs transition duration-300 md:text-base">
                  {item.name}
                </div>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></span>
              </Link>
            );
          })}
          <Link href={"/login"} className="cursor-pointer group">
            <div className="p-3 py-2 pr-2 text-xs transition duration-300 md:text-base hover:text-red-600 rounded-t-xl">
              Login
            </div>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></span>
          </Link>

          <Link href={"/sell"}>
            <div
              className="w-full p-2 rounded-md text-whte bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
            hover:shadow-[0px_0px_10px_4px_rgba(239,_68,_68,_0.7)] duration-500 ease-in-out"
            >
              <div className="flex items-center justify-between w-full h-full gap-2 px-2 py-1 bg-white rounded-md md:px-4 md:py-2">
                <span className="hidden text-lg md:block">
                  <IoMdAdd className="text-xl font-bold" />
                </span>
                Sell
              </div>
            </div>
          </Link>
          <Button variant="primary" className="hidden sm:block">
            Contact Us
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
