import React, { Fragment } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import { useSelectedUser } from "@/hooks/state/useAppState";
import Cookies from "universal-cookie";
import { IoIosArrowDown } from "react-icons/io";
import toast from "react-hot-toast";

const Navbar = () => {
  const cookie = new Cookies();
  const [user, setUser] = useSelectedUser();
  const [showAllLinks, setShowLinks] = useState(false);

  const navlist = [
    // {
    //   name: "Home",
    //   link: "/",
    // },
    // {
    //   name: "Why Us",
    //   link: "/why",
    // },
    {
      name: "Explore",
      link: "/explore",
    },
    // {
    //   name: "Orders",
    //   link: "/orders",
    // },
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
        className={`fixed z-50 flex  justify-between sm:px-4  px-2  pt-4 pb-6  transform -translate-x-1/2  left-1/2   md:mt-4 mt-0 sm:w-11/12 w-full mx-auto  bg-[#f6f6f6]  transition-all ease-in-out duration-600 md:h-24 h-20 items-center rounded-md  md:rounded-full ${
          visible ? "top-0" : "md:-top-36 "
        } `}
      >
        <Logo />
        <div
          className={`flex justify-center items-center  gap-1 text-sm uppercase md:gap-8 sm:gap-4 font-baiMedium `}
        >
          {navlist.map((item, key) => {
            return (
              <Link
                href={item.link}
                key={key}
                className="z-40 hidden lg:block group hover:text-red-600 rounded-t-xl"
              >
                <div className="px-2 py-2 text-xs transition duration-300 md:text-base">
                  {item.name}
                </div>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></span>
              </Link>
            );
          })}

          {!user || user.name !== "" ? (
            <div className="items-center hidden gap-4 lg:flex">
              <Link
                href={"/orders"}
                className="z-40 group hover:text-red-600 rounded-t-xl"
              >
                <div className="px-2 py-2 text-xs transition duration-300 md:text-base">
                  Orders
                </div>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></span>
              </Link>
              <div className="items-center hidden gap-1 text-sm uppercase sm:flex md:gap-8 sm:gap-4 font-baiMedium">
                <Link
                  href={`/profile/${user._id}`}
                  className="w-20 md:w-40 sm:w-32"
                >
                  <div className="flex items-center justify-between gap-3 px-2 bg-white border-2 border-red-400 rounded-md cursor-pointer profile-dropdown hover:bg-red-50">
                    <div className="flex items-center flex-1 gap-3 ">
                      <div className="relative w-12 h-12 rounded-full">
                        <Image
                          src={user.avatar}
                          fill
                          alt="profile"
                          className="hidden rounded-full sm:block"
                        />
                      </div>
                      <p className="p-2 sm:p-0">{user.name}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <Link href={"/auth"} className="cursor-pointer group">
              <div className="p-3 text-xs transition duration-300 md:text-base hover:text-red-600 rounded-t-xl">
                Login
              </div>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></span>
            </Link>
          )}

          <Link href={user._id ? "/sell" : "/auth"}>
            <div
              className="sm:block hidden w-full p-2 rounded-md text-whte bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
            hover:shadow-[0px_0px_10px_4px_rgba(239,_68,_68,_0.7)] duration-500 ease-in-out"
            >
              <div className="flex items-center justify-between w-full h-full gap-2 px-2 py-1 bg-white rounded-md md:px-3 md:py-2">
                <span className="hidden text-lg md:block">
                  <IoMdAdd className="text-xl font-bold" />
                </span>
                Sell
              </div>
            </div>
          </Link>
          <div className="">
            {user.avatar && (
              <div className="relative block lg:hidden">
                <div
                  className="relative transition-all duration-500 ease-in-out bg-gray-200 rounded-md cursor-pointer w-[95px] sm:w-20 hover:bg-gray-300 p-1"
                  onClick={() => setShowLinks(!showAllLinks)}
                >
                  <div className="relative flex w-10 h-10 p-2 overflow-hidden rounded-full sm:w-12 sm:h-12 ">
                    <Image
                      alt={user.name}
                      src={user.avatar}
                      fill
                      className="object-contain "
                    />
                  </div>
                  <IoIosArrowDown
                    size={20}
                    className="absolute right-1 top-4"
                  />
                </div>
                {showAllLinks && (
                  <div
                    className="fixed inset-0 w-screen h-screen "
                    onClick={() => {
                      console.log("called");

                      setShowLinks(() => false);
                      console.log("wha", showAllLinks);
                    }}
                  ></div>
                )}
                {showAllLinks && (
                  <div
                    className={`absolute right-0 z-50 mt-4  transition-all ease-out duration-300`}
                  >
                    <div className="flex flex-col w-[150px] gap-2 bg-slate-200 shadow-2xl px-4 py-4 rounded-md">
                      <Link href={`/explore`} className="cursor-pointer group">
                        <div className="text-sm transition duration-300 md:text-base hover:text-red-600 rounded-t-xl">
                          Explore
                        </div>
                        <p className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></p>
                      </Link>
                      <Link
                        href={user._id ? "/sell" : "/auth"}
                        className="cursor-pointer group"
                      >
                        <div className="text-sm transition duration-300 md:text-base hover:text-red-600 rounded-t-xl">
                          Sell
                        </div>
                        <p className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></p>
                      </Link>
                      <Link href={"/orders"} className="cursor-pointer group">
                        <div className="text-sm transition duration-300 md:text-base hover:text-red-600 rounded-t-xl">
                          Orders
                        </div>
                        <p className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></p>
                      </Link>
                      <Link
                        href={`/profile/${user._id}`}
                        className="cursor-pointer group"
                      >
                        <div className="text-sm transition duration-300 md:text-base hover:text-red-600 rounded-t-xl">
                          Profile
                        </div>
                        <p className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></p>
                      </Link>
                      <div
                        className="cursor-pointer group"
                        onClick={() => {
                          setUser({
                            name: "",
                            _id: "",
                            token: "",
                            avatar: "",
                            selectedAddress: -1,
                            address: [],
                          });
                          cookie.remove("authorization", {
                            path: "/",
                          });

                          toast.success("User Logout Successfully");
                          location.reload();
                        }}
                      >
                        <div className="text-sm transition duration-300 md:text-base hover:text-red-600 rounded-t-xl">
                          Logout
                        </div>
                        <p className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-600 origin-bottom-left after:origin-right"></p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
