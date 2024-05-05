import React from "react";
const ProductDetail = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center justify-start flex-1 gap-8 ">
      <div className=" p-2 md:mx-auto w-[96%] md:w-11/12 mx-2 md:p-4 shadow-3xl rounded-xl bg-stone-100 ">
        <p className="px-2 text-3xl sm:px-0 lg:text-5xl font-baibold">
          {data.title}
        </p>
        <p className="px-2 text-gray-600">Exclusive</p>
        <div className="flex gap-2 my-4 text-gray-600 uppercase">
          <p className="px-2 border-r border-gray-300">{data.condition}</p>
          <p>{data.category}</p>
        </div>
      </div>
      <div className="w-[96%] md:w-11/12 p-2 mx-auto md:p-4 shadow-3xl rounded-xl bg-stone-100">
        <p className="pb-2 text-2xl font-bold text-gray-600 border-b-2 border-gray-500 font-bai">
          Overview
        </p>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center justify-center gap-2 p-2 md:gap-4 md:p-4 ">
            <div className="">
              <div className="flex gap-2">
                <div className="text-sm text-gray-600">Owner</div>
              </div>
              <p className="text-base md:text-lg lg:text-2xl font-baibold">
                {data.owner}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-2 md:gap-4 md:p-4">
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="text-base md:text-lg lg:text-2xl font-baibold">
                {data.addressFrom.country},{data.addressFrom.city},
                {data.addressFrom.state}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 md:gap-4 md:p-4">
            <div>
              <p className="text-sm text-gray-600">Posting date</p>
              <p className="text-base md:text-lg lg:text-2xl font-baibold">
                {new Date(data.createdAt).toDateString().slice(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[96%] md:w-11/12 p-2 mx-auto mb-4 md:p-4 rounded-xl bg-stone-100 shadow-3xl">
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
