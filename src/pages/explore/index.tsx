import Button from "@/components/atoms/Button";
import Loader from "@/components/molecules/Loader";
import ProductCard from "@/components/molecules/ProductCard";
import { getProducts } from "@/hooks/query/getProduct";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { PiPaperPlaneRightDuotone } from "react-icons/pi";
import { categories } from "@/utils/constant";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import Input from "@/components/atoms/Input";
// import { RiSearchLine } from "react-icons/ri";
// type FilterType={
//   category?: string |"";
//   status?: string|"";
// }
const index = () => {
  const [isCategory, showCategory] = useState(false);
  const router = useRouter();
  console.log(router.query);
  const category = router.query.cate as string;
  // const [isStatus, showStatus] = useState(false);
  // const status = router.query.status as string;
  const { data, isLoading } = getProducts((category as string) || "");
  const [filter, showFilter] = useState(false);
  const [location, showLocation] = useState(false);
  // const [range, showRange] = useState(false);

  if (isLoading) {
    return (
      <div className="relative">
        <Loader />
      </div>
    );
  }
  // const handleSearch = (query: string) => {};
  const searchByCategory = (category: string) => {
    showFilter(false);
    router.push(`/explore?cate=${category}`);
  };
  // const searchByFilter:FC<FilterType> = ({category="", status=""}) => {
  // showFilter(false);
  // router.push(`/explore?cate=${category}?status=${status}`);
  // };

  if (!data) return <></>;
  return (
    <div className="min-h-screen mt-24">
      <div className="flex flex-col sm:flex-row">
        {/* Categories */}
        <div>
          <button
            className="fixed z-50 p-4 text-white bg-black-300 md:hidden"
            onClick={() => {
              showFilter(!filter);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <PiPaperPlaneRightDuotone size={24} className="z-50 " />
          </button>
        </div>

        <div
          className={`md:static  absolute flex flex-col w-full gap-2  md:w-1/5 transition-all ease-in-out duration-300  z-30 bg-[#f6f6f6 min-h-screen ${
            filter
              ? "translate-x-0"
              : "-translate-x-full mx-0  md:translate-x-0"
          }`}
        >
          <p className="px-4 mt-12 mb-6 text-4xl font-baibold">Filter</p>
          <div className="flex flex-col justify-center gap-8 ">
            <div className="flex-col cursor-pointer sm:flex-row">
              <div
                className="flex items-center justify-between px-4 text-xl sm:text-2xl"
                onClick={() => showCategory(!isCategory)}
              >
                <p className=" font-baiMedium">Categories</p>
                <p>
                  {isCategory ? (
                    <AiOutlineArrowDown className="" />
                  ) : (
                    <AiOutlineArrowUp className="" />
                  )}
                </p>
              </div>
              <div className="">
                {isCategory && (
                  <div className="flex flex-row flex-wrap gap-3 px-4 mx-10 my-2 ml-4">
                    <FormControl sx={{ m: 1 }} className="w-80 ">
                      <InputLabel id="demo-simple-select-helper-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={category}
                        label="Product"
                        onChange={(e) => {
                          // searchByFilter({category:e.target.value});
                          searchByCategory(e.target.value as string);
                        }}
                      >
                        <MenuItem value="">All</MenuItem>
                        {categories.map((item, key) => {
                          return (
                            <MenuItem value={item.name} key={key}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                )}
              </div>
            </div>
            <div className="px-4 cursor-pointer">
              <hr className="hidden my-2 sm:block" />
              <div
                className="flex items-center justify-between text-xl sm:text-2xl"
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
                      className="w-full px-1 py-2 border-2 outline-none sm:p-4 border-black-700"
                    />
                    <Button
                      variant="secondary"
                      className="p-4 rounded-sm md:p-2 hover:ring-0 hover:ring-offset-0"
                    >
                      Go
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* <div className="px-4 cursor-pointer">
              <hr className="hidden sm:block" />
              <div
                className="flex items-center justify-between text-xl sm:text-2xl"
                onClick={() => showStatus(!isStatus)}
              >
                <p className="font-baiMedium">Status</p>
                <p>
                  {isStatus ? (
                    <AiOutlineArrowDown className="" />
                  ) : (
                    <AiOutlineArrowUp className="" />
                  )}
                </p>
              </div>
              <div className="flex flex-row flex-wrap w-full gap-3 my-2 ml-4 font-baiMedium">
                {isStatus && (
                  <div className="flex items-center justify-between w-full gap-6 md:gap-3">
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="All"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="pending"
                          control={<Radio />}
                          label="Pending"
                        />
                        <FormControlLabel
                          value="active"
                          control={<Radio />}
                          label="Active"
                        />
                        <FormControlLabel
                          value="trasaction"
                          control={<Radio />}
                          label="Transaction"
                        />
                        <FormControlLabel
                          value="expired"
                          control={<Radio />}
                          label="Expired"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
        {/* Product */}
        <div className="flex-1 mx-2 mt-12 mb-6">
          <div className="flex flex-row items-center justify-between">
            <p className="pl-4 text-2xl md:text-4xl font-baibold">
              Top Gallery
            </p>
            {/* <Input icon={<RiSearchLine className="ml-2 text-violet-600" />}
              type="text"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              placeholder="Search product"
              className="mx-0 border-2 sm:mx-2 border-violet-800 md:pl-16"
            />{" "} */}
          </div>
          <div className="flex flex-wrap items-center justify-center flex-grow w-full gap-4 mt-6 md:gap-8 lg:gap-10">
            {data &&
              data.products.map((item: any, key: number) => {
                return (
                  <ProductCard
                    key={key}
                    productData={item}
                    classname="w-11/12 md:w-1/3 xl:w-3/12 sm:w-1/3 min-w-max"
                  />
                );
              })}
            {data && data.products && data.products.length == 0 && (
              <div>
                <Player
                  autoplay
                  loop
                  src="https://assets6.lottiefiles.com/packages/lf20_m9JXjh.json "
                  style={{ height: "300px", width: "300px", scale: 4 }}
                >
                  <Controls
                    visible={false}
                    buttons={["play", "repeat", "frame", "debug"]}
                  />
                </Player>
                <p className="text-3xl text-center font-OrbitronMedium">
                  No Product
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
