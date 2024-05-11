import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="p-4 text-center bg-gray-100 border-t-2 font-baiMediumw">
      <div className="flex items-center justify-center gap-3 md:gap-16 sm:gap-8">
        <div className="">
          <Logo showText={false} />
        </div>
        <div className="flex gap-4 sm:gap-6">
          <p>About</p>
          <p className="hidden sm:block">Privacy Policy</p>
          <p>Resource</p>
        </div>
      </div>
      <hr className="w-4/6 mx-auto my-4" />
      <div className="hidden text-red-600 text-yellow-600 text-green-600 text-teal-600 bg-red-400 bg-yellow-400 bg-green-400 bg-teal-400 bg-violet-400 text-violet-600 bg-lime-400 text-lime-600"></div>
      <div>Copyright @ 2023 BidConnect</div>
    </div>
  );
};

export default Footer;
