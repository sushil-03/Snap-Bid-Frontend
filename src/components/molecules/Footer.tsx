import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="p-4 text-center bg-gray-100 md:mt-16 sm:mt-8 font-baiMedium">
      <div className="flex items-center justify-center gap-3 md:gap-16 sm:gap-8 ">
        <div className="">
          <Logo />
        </div>
        <div className="flex gap-4 sm:gap-6">
          <p>About</p>
          <p>Privacy Policy</p>
          <p>Resource</p>
        </div>
      </div>
      <hr className="w-4/6 mx-auto my-4" />
      <div>Copyright @ 2023 BidConnect</div>
    </div>
  );
};

export default Footer;
