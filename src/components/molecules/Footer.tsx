import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="p-8 mt-16 text-center text-white bg-black-600 font-OrbitronMedium">
      <div className="flex items-center justify-center gap-16">
        <div>
          <Logo />
        </div>
        <div className="flex gap-6">
          <p>About</p>
          <p>Privacy Policy</p>
          <p>Resource</p>
          <p>Blog</p>
        </div>
      </div>
      <hr className="w-4/6 mx-auto my-4" />
      <div>Copyright @ 2023 BidConnect</div>
    </div>
  );
};

export default Footer;
