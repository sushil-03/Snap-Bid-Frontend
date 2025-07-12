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
import FilterDropdownMenu from "./filter-dropdown-menu";

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

  // const searchByFilter:FC<FilterType> = ({category="", status=""}) => {
  // showFilter(false);
  // router.push(`/explore?cate=${category}?status=${status}`);
  // };

  if (!data) return <></>;
  return (
    <div className="min-h-screen mt-10 lg:mt-20 md:mt-14">
      <div className="flex flex-col sm:flex-row">
        {/* Categories */}
        {/* <div>
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
        </div> */}

        {/* Product */}
        <div className="flex-1 mx-2 mt-12 mb-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-0 ">
              <p className="pl-2 text-lg sm:pl-4 sm:text-2xl xs:text-xl md:text-4xl font-baibold">
                Top Gallery
              </p>
              <FilterDropdownMenu />
            </div>
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
