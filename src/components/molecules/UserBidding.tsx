import React from "react";

const UserBidding = ({ data: any }) => {
  return (
    <div className="flex-1 px-8 ">
      <p className="my-4 text-lg">Bidding Info</p>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center w-full p-4 shadow-xl justify-evenly rounded-xl bg-stone-50">
          <div className="flex flex-col items-center jus">
            <p className="text-sm font-baiMedium">Total Bidding</p>
            <p className="text-5xl font-baibold">300</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-baiMedium">Bid Won</p>
            <p className="text-5xl font-baibold">300</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-baiMedium">Total Revenue</p>
            <p className="text-5xl font-baibold">300</p>
          </div>
        </div>
        {/* <div className="relative w-full p-4 shadow-xl rounded-xl bg-stone-50">
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
              </div> */}
      </div>
    </div>
  );
};

export default UserBidding;
