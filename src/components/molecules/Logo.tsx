import React from "react";
import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src="/images/logi.png"
        height={200}
        width={200}
        alt="logo"
        className="bg-transparent"
      />
    </Link>
  );
};

export default Logo;
