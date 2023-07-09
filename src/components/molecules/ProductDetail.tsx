import React from "react";
import { CgProfile } from "react-icons/cg";
import { ImLocation } from "react-icons/im";
import { BsFillCalendarDateFill } from "react-icons/bs";

const ProductDetail = ({ data }: any) => {
  const productDetail = {
    name: "Msg Title",
    category: "Electric",
    startingBid: "44333",
    currBid: "993333",
    owner: "2nd",
    location: "Raipur Dehradun",
    postingDate: "21-APR-23",
    remainingTime: "32:32:90",
    description:
      "I am selling my MG ZS EV bought on July 2022 since I am moving abroad. 2 free services left. Currently under 19000 km driven. If you want to drive an electric car, this is the car you would need. Excellent condition. I have also done a ceramic coating, topped up at 18500 km and one more free topup left.",
    images: [
      {
        url: "ipad.jpeg",
      },
      { url: "iphone.png" },
      { url: "iphone.png" },
      { url: "iphone.png" },
      { url: "iphone.png" },

      { url: "iphone.png" },
      {
        url: "ipad.jpeg",
      },
      { url: "lap.png" },
    ],
    condition: "Refurbished",
    bidder: [
      {
        userName: "anony",
        price: "449",
      },
      {
        userName: "anony",
        price: "449",
      },
      {
        userName: "anony",
        price: "449",
      },
      {
        userName: "anony",
        price: "449",
      },
      {
        userName: "anony",
        price: "449",
      },
      {
        userName: "anony",
        price: "449",
      },
      {
        userName: "anony",
        price: "449",
      },
      {
        userName: "anony",
        price: "449",
      },
      {
        userName: "anony",
        price: "449",
      },
      {
        userName: "anony",
        price: "449",
      },
      {
        userName: "anony",
        price: "449",
      },
    ],
  };
  return (
    <div className="flex flex-col items-center justify-start flex-1 gap-8 ">
      <div className="w-11/12 p-2 mx-auto md:p-4 shadow-3xl rounded-xl bg-stone-100 ">
        <p className="px-2 text-3xl sm:px-0 lg:text-5xl font-baibold">
          {data.title}
        </p>
        <p className="px-2 text-gray-600">Exclusive</p>
        <div className="flex gap-2 my-4 text-gray-600 uppercase">
          <p className="px-2 border-r border-gray-300">{data.condition}</p>
          <p>{data.category}</p>
        </div>
      </div>
      <div className="w-11/12 p-2 mx-auto md:p-4 shadow-3xl rounded-xl bg-stone-100">
        <p className="pb-2 text-2xl font-bold text-gray-600 border-b-2 border-gray-500 font-bai">
          Overview
        </p>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center justify-center gap-2 p-2 md:gap-4 md:p-4 ">
            <div>
              <CgProfile size={30} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Owner</p>
              <p className="text-lg md:text-2xl font-baibold">{data.owner}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-2 md:gap-4 md:p-4">
            <div>
              <ImLocation size={30} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="text-lg md:text-2xl font-baibold">
                {data.location}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 md:gap-4 md:p-4">
            <div>
              <BsFillCalendarDateFill size={30} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Posting date</p>
              <p className="text-lg md:text-2xl font-baibold">
                {new Date(data.createdAt).toDateString().slice(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 p-2 mx-auto mb-4 md:p-4 rounded-xl bg-stone-100 shadow-3xl">
        <p className="pb-2 text-2xl font-bold text-gray-600 border-b-2 border-gray-500 font-bai">
          Description
        </p>
        <div className="flex items-center justify-between gap-4">
          <p className="p-4 text-base text-gray-500 font-bai">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
