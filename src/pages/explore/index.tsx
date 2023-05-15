import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ProductCard from "@/components/molecules/ProductCard";
import React, { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

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
  return (
    <div className="min-h-screen mt-24">
      <div className="flex gap-3">
        {/* Categories */}
        <div className="flex flex-col w-1/6 gap-2">
          <p className="mt-12 mb-6 text-4xl font-baibold">Filter</p>
          <div className="cursor-pointer ">
            <div
              className="flex items-center justify-between text-2xl"
              onClick={() => showCategory(!category)}
            >
              <p className=" font-bai">Categories</p>
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
                      className={` font-OrbitronMedium ${item.class} inline-block font-medium`}
                      key={key}
                    >
                      {item.name}
                    </p>
                  );
                })}
            </div>
          </div>
          <hr className="my-2" />
          <div className="cursor-pointer ">
            <div
              className="flex items-center justify-between text-2xl"
              onClick={() => showLocation(!location)}
            >
              <p className=" font-bai">Location</p>
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
                <div className="flex flex-row items-center justify-start gap-4">
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
          <hr className="my-2" />
          <div className="cursor-pointer ">
            <div
              className="flex items-center justify-between text-2xl"
              onClick={() => showRange(!range)}
            >
              <p className=" font-bai">Price</p>
              <p>
                {range ? (
                  <AiOutlineArrowDown className="" />
                ) : (
                  <AiOutlineArrowUp className="" />
                )}
              </p>
            </div>
            <div className="flex flex-row flex-wrap gap-3 my-2 ml-4">
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
        {/* Product */}
        <div className="flex-1 mt-12 mb-6">
          <div className="flex flex-row items-center justify-between">
            <p className="text-4xl font-baibold">Top Gallery</p>
            <p>
              {" "}
              <Input
                type="text"
                placeholder="Search product"
                className="py-2 pl-10 pr-4 border-2 rounded-md outline-none border-black-600 font-baiMedium"
              />{" "}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 mt-6">
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
