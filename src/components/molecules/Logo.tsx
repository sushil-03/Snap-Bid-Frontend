import React from "react";
import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <div className="relative h-16 md:w-56 md:h-20 w-36">
      <Link href={"/"}>
        <Image
          src="/images/logi.png"
          fill
          alt="logo"
          className="object-contain bg-transparent"
        />
      </Link>
    </div>
  );
};

export default Logo;
