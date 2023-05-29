import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="p-4 text-center bg-gray-100 md:mt-16 sm:mt-8 font-baiMedium">
      <div className="flex items-center justify-center gap-3 md:gap-16 sm:gap-8 ">
        <div className="">
          <Logo />
          {/* <div className="text-xl font-bold text-transparent uppercase lg:text-4xl sm:text-2xl font-baibold bg-gradient-to-r from-red-500 via-violet-600 to-orange-500 bg-clip-text">
            Bid Connect
          </div> */}
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
