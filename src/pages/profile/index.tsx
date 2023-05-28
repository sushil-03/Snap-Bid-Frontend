import Image from "next/image";
import React from "react";
import Rating from "@mui/material/Rating";
import { CiEdit } from "react-icons/ci";
const index = () => {
  return (
    <div className="min-h-screen pt-32 bg-stone-100 ">
      <div className="w-11/12 p-6 mx-auto rounded-md ">
        <p className="mb-4 text-2xl font-baiMedium">Account Settings</p>
        <div className="flex gap-8 bg-white rounded-md">
          <div className="flex flex-col gap-2 p-3 pr-6 m-3 text-gray-500 border-r-2 ">
            <span className="p-4 text-white bg-blue-500 rounded-md">
              My Profile
            </span>
            <span className="p-4 rounded-md">Bidding Info</span>
            <span className="p-4 rounded-md">Delivery Info</span>
          </div>
          <div className="flex-1 px-8 ">
            <p className="my-4 text-lg">My Profile</p>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center justify-between w-full p-4 shadow-xl rounded-xl bg-stone-50">
                <div className="flex items-center">
                  <Image
                    src="/images/profile/p1.png"
                    height={50}
                    width={100}
                    alt="image"
                  />
                  <div className="flex flex-col font-baiLight">
                    <span className="font-baiMedium">Sushil Rawat</span>
                    <span className="text-sm">User</span>
                    <span className="text-sm">
                      {" "}
                      <Rating name="read-only" value={3} readOnly />
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 p-2 bg-white border-2 rounded-full cursor-pointer font-baiMedium border-black-700">
                  <CiEdit size={25} /> Edit
                </div>
              </div>
              <div className="relative w-full p-4 shadow-xl rounded-xl bg-stone-50">
                <p className="my-4 text-lg">Personal Information</p>

                <div className="grid grid-cols-2 grid-rows-2 gap-4 font-baiMedium">
                  <div>
                    <p className="text-sm text-gray-400">First Name</p>
                    <p>Sushil</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Last Name</p>
                    <p>Sushil</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p>Sushil</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone Number</p>
                    <p>Sushil</p>
                  </div>
                </div>

                <div className="absolute flex items-center justify-center gap-2 p-2 bg-white border-2 rounded-full cursor-pointer top-10 right-5 font-baiMedium border-black-700">
                  <CiEdit size={25} /> Edit
                </div>
              </div>
              <div className="relative w-full p-4 shadow-xl rounded-xl bg-stone-50">
                <p className="my-4 text-lg">Address</p>

                <div className="grid grid-cols-3 grid-rows-1 gap-4 font-baiMedium">
                  <div>
                    <p className="text-sm text-gray-400">Country</p>
                    <p>India</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">City/State</p>
                    <p>Sushil</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Pin Code</p>
                    <p>Sushil</p>
                  </div>
                </div>

                <div className="absolute flex items-center justify-center gap-2 p-2 bg-white border-2 rounded-full cursor-pointer top-10 right-5 font-baiMedium border-black-700">
                  <CiEdit size={25} /> Edit
                </div>
              </div>
            </div>
          </div>
          {/* *******************************************BIDDDDDDDDDDDING */}
          {/* <div className="flex-1 px-8 ">
            <p className="my-4 text-lg">Bidding Info</p>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center justify-between w-full p-4 shadow-xl rounded-xl bg-stone-50">
                <div>
                  <p>Total Bidding</p>
                  <p>300</p>
                </div>
              </div>
              <div className="relative w-full p-4 shadow-xl rounded-xl bg-stone-50">
                <p className="my-4 text-lg">Personal Information</p>

                <div className="grid grid-cols-2 grid-rows-2 gap-4 font-baiMedium">
                  <div>
                    <p className="text-sm text-gray-400">First Name</p>
                    <p>Sushil</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Last Name</p>
                    <p>Sushil</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p>Sushil</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone Number</p>
                    <p>Sushil</p>
                  </div>
                </div>

                <div className="absolute flex items-center justify-center gap-2 p-2 bg-white border-2 rounded-full cursor-pointer top-10 right-5 font-baiMedium border-black-700">
                  <CiEdit size={25} /> Edit
                </div>
              </div>
              <div className="relative w-full p-4 shadow-xl rounded-xl bg-stone-50">
                <p className="my-4 text-lg">Address</p>

                <div className="grid grid-cols-3 grid-rows-1 gap-4 font-baiMedium">
                  <div>
                    <p className="text-sm text-gray-400">Country</p>
                    <p>India</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">City/State</p>
                    <p>Sushil</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Pin Code</p>
                    <p>Sushil</p>
                  </div>
                </div>

                <div className="absolute flex items-center justify-center gap-2 p-2 bg-white border-2 rounded-full cursor-pointer top-10 right-5 font-baiMedium border-black-700">
                  <CiEdit size={25} /> Edit
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default index;
