import React, { Fragment } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Button from "../atoms/Button";
import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import { useSelectedUser } from "@/hooks/state/useAppState";
import { toast } from "react-toastify";
const Navbar = () => {
  const [user, setUser] = useSelectedUser();
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
  const [showProfile, setShowProfile] = useState(false);
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
  const handleLogout = () => {
    setUser("");
    toast.success("User Logout Successfully");
  };
  return (
    <Fragment>
      <div
        className={`fixed z-50 flex  justify-between sm:px-4 px-2 pl-2 pt-4 pb-6  transform -translate-x-1/2  left-1/2   mt-4 overflow-hidden  w-11/12 mx-auto  backdrop-blur-2xl transition-all ease-in-out duration-600 h-24 items-center rounded-md  md:rounded-full ${
          visible ? "top-0" : "-top-36"
        } `}
      >
        <Logo />
        <div
          className={`flex ${
            !showProfile && "items-center "
          }  gap-1 text-sm uppercase md:gap-8 sm:gap-4 font-baiMedium `}
        >
          {navlist.map((item, key) => {
            return (
              <Link
                href={item.link}
                key={key}
                className="z-40 group hover:text-red-600 rounded-t-xl"
              >
                <div className="px-2 py-2 text-xs transition duration-300 md:text-base">
                  {item.name}
                </div>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></span>
              </Link>
            );
          })}
          {user ? (
            <div className="flex gap-1 text-sm uppercase md:gap-8 sm:gap-4 font-baiMedium">
              <button onClick={handleLogout} className="cursor-pointer group">
                <div className="p-3 py-2 pr-2 text-xs transition duration-300 md:text-base hover:text-red-600 rounded-t-xl">
                  Logout
                </div>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></span>
              </button>
              <Link href={"/profile"} className="w-40">
                <label
                  htmlFor="profile2"
                  className="flex items-center justify-between px-2 border-2 border-red-400 rounded-md cursor-pointer profile-dropdown hover:bg-red-50"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <div className="flex items-center flex-1 ">
                    <Image
                      src="/images/profile/p1.png"
                      height={50}
                      width={50}
                      alt="profile"
                    />
                    <span>John Doe</span>
                  </div>
                </label>
              </Link>
            </div>
          ) : (
            <Link href={"/auth"} className="p-3 py-2 pr-2 cursor-pointer group">
              <div className="text-xs transition duration-300 md:text-base hover:text-red-600 rounded-t-xl">
                Login
              </div>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></span>
            </Link>
          )}

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
          {/* <Button
            variant="primary"
            className="hidden sm:block whitespace-nowrap"
          >
            Contact Us
          </Button> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
