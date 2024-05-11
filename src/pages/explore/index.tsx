import Loader from "@/components/molecules/Loader";
import { getProducts } from "@/hooks/query/getProduct";
import { useRouter } from "next/router";
import React, { useState } from "react";
// import { BsFillSendFill } from "react-icons/bs";

import { PiPaperPlaneRightDuotone } from "react-icons/pi";
import { categories, statusList } from "utils/constant";
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
  const category = router.query.cate as string;
  const status = router.query.status as string;
  const { data, isLoading } = getProducts({
    category: (category as string) || "",
    search: query || "",
    page: 1,
    status: status || "",
  });
  // useEffect(() => {
  //   setMyda(data);
  // }, [data]);
  // console.log("myyyyyyyyyyyy", myda);

  // useEffect(() => {
  //   if (query) {
  //     if (category) {
  //       if (status) {
  //         router.push(
  //           `/explore?cate=${category}&search=${query}&status=${status}`,
  //           {}
  //         );
  //       } else {
  //         router.push(`/explore?cate=${category}&search=${query}`, {});
  //       }
  //     } else {
  //       if (status) {
  //         router.push(`/explore?search=${query}&status=${status}`, {});
  //       } else {
  //         router.push(`/explore?search=${query}`, {});
  //       }
  //     }
  //   } else if (category) {
  //     if (status) {
  //       router.push(`/explore?cate=${category}&status=${status}`, {});
  //     } else {
  //       router.push(`/explore?cate=${category}`, {});
  //     }
  //   } else {
  //     console.log("statu", status);

  //     if (status) {
  //       router.push(`/explore?status=${status}`, {});
  //     } else {
  //       router.push(`/explore`, {});
  //     }
  //     // setCount((count) => count + 1);
  //     // router.push(`/explore`);
  //     // refetch({ queryKey: ["products", "", "", 1] });
  //   }
  // }, [query, category, status]);

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
    if (!category || category === "") {
      if (!status || status === "") {
        router.push("/explore");
      } else {
        router.push(`/explore?status=${status}`);
      }
    } else {
      if (!status || status === "") {
        router.push(`/explore?cate=${category}`);
      } else {
        router.push(`/explore?cate=${category}&status=${status}`);
      }
    }
  };
  const searchByStatus = (status: string) => {
    showFilter(false);
    console.log("statul", status);

    if (!status || status === "") {
      if (!category || category === "") {
        router.push("/explore");
      } else {
        router.push(`/explore?cate=${category}`);
      }
    } else {
      if (!category || category === "") {
        console.log("11");
        router.push(`/explore?status=${status}`);
      } else {
        router.push(`/explore?cate=${category}&status=${status}`);
      }
    }
  };
  // const searchByFilter:FC<FilterType> = ({category="", status=""}) => {
  // showFilter(false);
  // router.push(`/explore?cate=${category}?status=${status}`);
  // };

  if (!data) return <></>;
  return (
    <div className="min-h-screen mt-10 lg:mt-20 md:mt-14">
      <div className="flex flex-col sm:flex-row">
        {/* Categories */}
        <div>
          <button
            className="fixed z-50 p-2 mt-24 text-white md:p-4 bg-black-300 xl:hidden"
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
          <div className="flex flex-col justify-center gap-4 ">
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
            <div className="flex-col cursor-pointer sm:flex-row">
              <div className="w-full">
                <div className="flex flex-row flex-wrap w-full gap-3 ">
                  <FormControl sx={{ m: 1 }} className="w-full ">
                    <InputLabel id="demo-simple-select-helper-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={status}
                      label="Status"
                      onChange={(e) => {
                        // searchByFilter({category:e.target.value});
                        searchByStatus(e.target.value as string);
                      }}
                    >
                      <MenuItem value="">All</MenuItem>
                      {statusList.map((item, key) => {
                        return (
                          <MenuItem value={item} key={key}>
                            {item == "Pending" ? "Not Started" : item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Product */}
        <div className="flex-1 mx-2 mt-12 mb-6">
          <div className="flex flex-row items-center justify-between">
            <p className="pl-2 text-lg sm:pl-4 sm:text-2xl xs:text-xl md:text-4xl font-baibold">
              Top Gallery {status}
            </p>
            <Input
              // icon={<RiSearchLine className="ml-2 text-violet-600" />}
              Icon={ImSearch}
              iconClass="!block"
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
            {data && <InfiniteScrollProduct data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
