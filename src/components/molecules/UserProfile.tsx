import { Rating } from "@mui/material";
import React from "react";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
const MyProfile = () => {
  return (
    <div className="flex-1 px-4 md:px-8 ">
      <p className="my-4 text-lg">My Profile</p>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between w-full p-2 shadow-xl sm:p-4 flexcol md:flex-row rounded-xl bg-stone-50">
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
                <Rating
                  name="read-only"
                  value={3}
                  readOnly
                  className="text-lg smxt-sm"
                />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-2 px-3 bg-white border-2 rounded-full cursor-pointer font-baiMedium border-black-700">
            <CiEdit size={25} className="" /> Edit
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

          <div className="absolute flex items-center justify-center gap-2 p-2 bg-white border-2 rounded-full cursor-pointer sm:top-10 top-5 right-5 font-baiMedium border-black-700">
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

          <div className="absolute flex items-center justify-center gap-2 p-2 bg-white border-2 rounded-full cursor-pointer sm:top-10 top-5 right-5 font-baiMedium border-black-700">
            <CiEdit size={25} /> Edit
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
