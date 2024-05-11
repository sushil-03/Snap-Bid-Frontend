import React from "react";
import Image from "next/image";
import Link from "next/link";
const Logo = ({ showText = true }: { showText?: boolean }) => {
  return (
    <div className="relative w-20 h-16 md:w-20 md:h-20">
      <Link href={"/"}>
        <div className="flex flex-col">
          <div>
            <Image
              src="/images/logo.png"
              fill
              alt="logo"
              className="object-contain bg-transparent"
            />
          </div>
          {showText && (
            <div className="absolute md:bottom-3 bottom-0 ml-[4.5rem] ">
              <p className="font-baiMedium">SNAPBID</p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Logo;
