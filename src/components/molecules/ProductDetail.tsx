import React from "react";
import { CgProfile } from "react-icons/cg";
import { ImLocation } from "react-icons/im";
import { BsFillCalendarDateFill } from "react-icons/bs";

// type ProductDetailType = {
//   name: string;
//   category: string;
//   startingBid: string;
//   currBid: string;
//   owner: string;
//   location: string;
//   postingDate: string;
//   remainingTime: string;
//   description: string;
//   images: {
//     url: string;
//   }[];
//   condition: string;
//   bidder: {
//     profile: string;
//     link: string;
//     userName: string;
//     email: string;
//     price: string;
//   }[];
// } ;

const ProductDetail = () => {
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
    <div className="flex flex-col items-center justify-start flex-1 gap-8">
      <div className="w-full p-4 rounded-xl bg-stone-100">
        <p className="text-5xl font-baibold">{productDetail.name}</p>
        <p className="px-2 text-gray-600">Exclusive</p>
        <div className="flex gap-2 my-4 text-gray-600 uppercase">
          <p className="px-2 border-r border-gray-300">
            {productDetail.condition}
          </p>
          <p>{productDetail.category}</p>
        </div>
      </div>
      <div className="w-full p-4 rounded-xl bg-stone-100">
        <p className="pb-2 text-2xl font-bold text-gray-600 border-b-2 border-gray-500 font-bai">
          Overview
        </p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-center gap-4 p-4">
            <div>
              <CgProfile size={30} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Owner</p>
              <p className="text-2xl font-baibold">{productDetail.owner}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 p-4">
            <div>
              <ImLocation size={30} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="text-2xl font-baibold">{productDetail.location}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-4">
            <div>
              <BsFillCalendarDateFill size={30} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Posting date</p>
              <p className="text-2xl font-baibold">
                {productDetail.postingDate}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 rounded-xl bg-stone-100">
        <p className="pb-2 text-2xl font-bold text-gray-600 border-b-2 border-gray-500 font-bai">
          Description
        </p>
        <div className="flex items-center justify-between gap-4">
          <p className="p-4 text-base text-gray-500">
            {productDetail.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
