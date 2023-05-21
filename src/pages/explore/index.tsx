import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ProductCard from "@/components/molecules/ProductCard";
import React, { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
const index = () => {
  const [category, showCategory] = useState(false);
  const [location, showLocation] = useState(false);
  const [range, showRange] = useState(false);
  const categories = [
    {
      name: "Avatar",
      class: " text-yellow-600",
    },
    {
      name: "Car",
      class: " text-yellow-600",
    },
    {
      name: "Book",
      class: "text-red-600",
    },
    {
      name: "House",
      class: "text-green-600",
    },

    {
      name: "Others",
      class: " text-green-600",
    },
  ];
  const handleSearch = (query: string) => {};
  return (
    <div className="min-h-screen mt-24">
      <div className="flex flex-col sm:flex-row">
        {/* Categories */}
        <div className="flex flex-col w-full gap-2 mx-4 sm:w-1/5">
          <p className="mt-12 mb-6 text-4xl font-baibold">Filter</p>
          <div className="flex flex-row justify-center gap-8 sm:flex-col">
            <div className="flex-col cursor-pointer sm:flex-row">
              <div
                className="flex items-center justify-between text-2xl"
                onClick={() => showCategory(!category)}
              >
                <p className=" font-baiMedium">Categories</p>
                <p>
                  {category ? (
                    <AiOutlineArrowDown className="" />
                  ) : (
                    <AiOutlineArrowUp className="" />
                  )}
                </p>
              </div>
              <div className="flex flex-row flex-wrap gap-3 my-2 ml-4">
                {category &&
                  categories.map((item, key) => {
                    return (
                      <p
                        className={` font-baiMedium ${item.class} inline-block font-medium`}
                        key={key}
                      >
                        {item.name}
                      </p>
                    );
                  })}
              </div>
            </div>
            <div className="cursor-pointer ">
              <hr className="hidden my-2 sm:block" />
              <div
                className="flex items-center justify-between text-2xl"
                onClick={() => showLocation(!location)}
              >
                <p className=" font-baiMedium">Location</p>
                <p>
                  {location ? (
                    <AiOutlineArrowDown className="" />
                  ) : (
                    <AiOutlineArrowUp className="" />
                  )}
                </p>
              </div>
              <div className="flex flex-row flex-wrap gap-3 my-2 ml-4">
                {location && (
                  <div className="flex flex-row items-center justify-between flex-1 gap-4 font-baiMedium">
                    <input
                      type="text"
                      placeholder="location"
                      className="w-full p-4 border-2 outline-none border-black-700"
                    />
                    <Button
                      variant="secondary"
                      className="px-2 py-1 rounded-sm hover:ring-2"
                    >
                      Go
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="cursor-pointer ">
              <hr className="hidden my-2 sm:block" />
              <div
                className="flex items-center justify-between text-2xl"
                onClick={() => showRange(!range)}
              >
                <p className="font-baiMedium">Price</p>
                <p>
                  {range ? (
                    <AiOutlineArrowDown className="" />
                  ) : (
                    <AiOutlineArrowUp className="" />
                  )}
                </p>
              </div>
              <div className="flex flex-row flex-wrap gap-3 my-2 ml-4 font-baiMedium">
                {range && (
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-2 border-2 outline-none border-black-700"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-2 border-2 outline-none border-black-700"
                    />
                    <Button
                      variant="secondary"
                      className="px-2 py-1 rounded-sm hover:ring-2"
                    >
                      Go
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Product */}
        <div className="flex-1 mt-12 mb-6 ">
          <div className="flex flex-row items-center justify-between">
            <p className="text-4xl font-baibold">Top Gallery</p>
            <Input
              icon={<RiSearchLine size={24} className="ml-2 text-violet-600" />}
              type="text"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              placeholder="Search product"
              className="mx-2"
            />{" "}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mx-4 mt-6 md:gap-8 sm:gap-4">
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
