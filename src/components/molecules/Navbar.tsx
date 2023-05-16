import React, { Fragment } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Button from "../atoms/Button";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import Input from "../atoms/Input";
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
  const [isOpen, setIsOpen] = useState<boolean>(true);
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
        className={`fixed z-30 flex items-center justify-between px-4 pt-4 pb-6 mx-2 mt-4 overflow-hidden rounded-md md:w-11/12 md:rounded-full md:px-10 backdrop-blur-2xl transition-all ease-in-out duration-600 ${
          visible ? "top-0" : "-top-36"
        } `}
      >
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-2 text-sm uppercase md:gap-8 sm:gap-4 font-baiMedium ">
          {navlist.map((item, key) => {
            return (
              <Link
                href={item.link}
                key={key}
                className=" group hover:bg-stone-100 rounded-t-xl"
              >
                <div className="px-2 py-2 text-xs transition duration-300 md:text-base">
                  {item.name}
                </div>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black-600 origin-bottom-left after:origin-right"></span>
              </Link>
            );
          })}
          <Link href={"/login"} className="cursor-pointer group">
            <div
              className="p-3 py-2 pr-2 text-xs transition duration-300 md:text-base hover:bg-stone-100 rounded-t-xl"
              onClick={() => setIsOpen(true)}
            >
              Login
            </div>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black-600 origin-bottom-left after:origin-right"></span>
          </Link>

          <Link href={"/sell"} className="">
            <div className="w-full p-2 rounded-md text-whte bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              <div className="flex items-center justify-between w-full h-full gap-2 px-2 py-1 bg-white rounded-md md:px-4 md:py-2">
                <span className="hidden text-lg md:block">
                  <IoMdAdd className="text-xl font-bold" />
                </span>
                <span>Sell</span>
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
