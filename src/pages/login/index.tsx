import Input from "@/components/atoms/Input";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
const index = () => {
  const [auth, setAuth] = useState(false);
  return (
    <div className="h-full min-h-screen ">
      <div className="mt-52"></div>
      <div className="flex items-center justify-around rounded-xl font-baiMedium ">
        <Image
          src={`/images/register.jpg`}
          height={500}
          width={500}
          alt=""
          className="w-1/3"
        ></Image>
        {auth ? (
          <div className="flex flex-col w-1/4 gap-6 p-8 border-2 rounded-md border-black-600">
            <div className="flex flex-col gap-4 ">
              <p className="text-4xl text-center text-transparent bg-gradient-to-r from-violet-600 to-orange-600 bg-clip-text font-baibold">
                Welcome to our Battleground!
              </p>
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <Input
                  placeholder="name"
                  fullWidth
                  className="px-2 py-4 pl-4 border-violet-800"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="Email">Email</label>
                <Input
                  placeholder="@mail"
                  fullWidth
                  className="px-2 py-4 pl-4 border-violet-800"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <Input
                  placeholder="password"
                  type="password"
                  className="px-2 py-4 pl-4 border-violet-800"
                />
              </div>
            </div>
            <div>
              <Button
                variant="secondary"
                className="mb-2 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800"
              >
                Register
              </Button>
              <span className="text-sm">Already have a account </span>
              <span
                className="text-base cursor-pointer text-violet-600"
                onClick={() => setAuth(false)}
              >
                Log in
              </span>{" "}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-1/4 gap-6 p-8 border-2 rounded-md border-black-600">
            <p className="text-4xl text-center text-transparent bg-gradient-to-r from-violet-600 to-orange-600 bg-clip-text font-baibold">
              Welcome Back
            </p>
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col">
                <label htmlFor="Email">Email</label>
                <Input
                  placeholder="@mail"
                  fullWidth
                  className="px-2 py-4 pl-4 border-violet-800"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <Input
                  placeholder="password"
                  type="password"
                  className="px-2 py-4 pl-4 border-violet-800"
                />
              </div>
            </div>
            <div>
              <Button
                variant="secondary"
                className="mb-2 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800"
              >
                Log in
              </Button>
              <span className="text-sm">Don't have a account </span>
              <span
                className="text-base cursor-pointer text-violet-600"
                onClick={() => setAuth(true)}
              >
                Register
              </span>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
