import Loader from "@/components/molecules/Loader";
import { getProducts } from "@/hooks/query/getProduct";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

import { PiPaperPlaneRightDuotone } from "react-icons/pi";
import { categories } from "@/utils/constant";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Input from "@/components/atoms/Input";
import { ImSearch } from "react-icons/im";
import InfiniteScrollProduct from "@/components/molecules/InfiniteScrollProduct";
import { useDebounce } from "use-debounce";

// type FilterType = {
//   category?: string | "";
//   status?: string | "";
// };
const index = () => {
  // const [isCategory, showCategory] = useState(false);
  const router = useRouter();
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 750);
  const [count, setCount] = useState<number>(0);
  const category = router.query.cate as string;
  const { data, isLoading } = getProducts({
    category: (category as string) || "",
    search: query || "",
    page: 1,
  });
  // useEffect(() => {
  //   setMyda(data);
  // }, [data]);
  // console.log("myyyyyyyyyyyy", myda);

  useEffect(() => {
    if (query) {
      if (category) {
        router.push(`/explore?cate=${category}&search=${query}`, {});
      } else {
        router.push(`/explore?search=${query}`);
      }
    } else {
      console.log("qer", query, category);
      if (category) {
        setCount((count) => count + 1);
        router.push(`/explore?cate=${category}`);
      } else {
        setCount((count) => count + 1);
        router.push(`/explore`);
        // refetch({ queryKey: ["products", "", "", 1] });
      }
    }
  }, [query, category]);
  // const [isStatus, showStatus] = useState(false);
  // const status = router.query.status as string;

  const [filter, showFilter] = useState(false);
  console.log("Checking data", data);

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
    if (category === "") {
      router.push("/explore");
    } else {
      router.push(`/explore?cate=${category}`);
    }
  };
  // const searchByFilter:FC<FilterType> = ({category="", status=""}) => {
  // showFilter(false);
  // router.push(`/explore?cate=${category}?status=${status}`);
  // };

  if (!data) return <></>;
  return (
    <div className="min-h-screen lg:mt-24 md:mt-16 mt-14">
      <div className="flex flex-col sm:flex-row">
        {/* Categories */}
        <div>
          <button
            className="fixed z-50 p-2 text-white md:p-4 bg-black-300 xl:hidden"
            onClick={() => {
              showFilter(!filter);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <PiPaperPlaneRightDuotone className="z-50 text-xl" />
          </button>
        </div>

        <div
          className={`xl:static   absolute flex flex-col w-full gap-2 xl:w-[200px] transition-all ease-in-out duration-300  z-30 bg-[#f6f6f6] min-h-screen ${
            filter
              ? "translate-x-0"
              : "-translate-x-full mx-0  xl:translate-x-0"
          }`}
        >
          <p className="px-4 mt-12 mb-2 text-4xl font-baibold">Filter</p>
          <div className="flex flex-col justify-center gap-8 ">
            <div className="flex-col cursor-pointer sm:flex-row">
              <div className="w-full">
                <div className="flex flex-row flex-wrap w-full gap-3 ">
                  <FormControl sx={{ m: 1 }} className="w-full ">
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
              </div>
            </div>
            <div className="px-2 cursor-pointer ">
              {/* <hr className="hidden my-2 sm:block" />
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
              </div> */}
              <div className="flex flex-row flex-wrap w-full gap-3 ">
                <div className="relative flex flex-row items-center justify-between flex-1 w-full gap-1 font-baiMedium">
                  <input
                    type="text"
                    placeholder="location"
                    className="w-full px-1 !pr-10  text-sm border border-[#bdbdbd] outline-none sm:p-4"
                  />
                  <button className="absolute right-0 h-full px-6 transition-all duration-500 ease-in-out bg-blue-900 rounded-sm hover:bg-blue-800 md:p-2 ">
                    <BsFillSendFill color="white" />
                  </button>
                </div>
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
            <p className="pl-2 text-lg sm:pl-4 sm:text-2xl xs:text-xl md:text-4xl font-baibold">
              Top Gallery
            </p>
            <Input
              // icon={<RiSearchLine className="ml-2 text-violet-600" />}
              Icon={ImSearch}
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              placeholder="Search product"
              className="!py-2 !text-sm !pl-10"
              // className="mx-0 border-2 sm:mx-2 border-violet-800 "
            />{" "}
          </div>
          {/* <div className="flex flex-wrap items-center justify-center flex-grow w-full gap-4 mt-6 md:gap-8 lg:gap-10"> */}
          <div className="items-center w-full mx-auto">
            {data && <InfiniteScrollProduct data={data} count={count} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
