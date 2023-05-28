import React, { useState } from "react";
import Image from "next/image";
import Login from "@/components/molecules/Login";
import Register from "@/components/molecules/Register";

const index = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="h-full">
      <div className="mt-44"></div>
      <div className="flex items-center justify-between lg:w-4/5 p-8 mx-auto w-11/12 m-10  border-2 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-xl font-baiMedium">
        <div className="relative hidden w-1/4 h-40 mx-4 md:inline-block md:w-1/2 md:h-96">
          <Image src={`/images/test.jpg`} fill alt="image"></Image>
        </div>
        {login ? (
          <Login setLogin={setLogin} />
        ) : (
          <Register setLogin={setLogin} />
        )}
      </div>
    </div>
  );
};

export default index;
