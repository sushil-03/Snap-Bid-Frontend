import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Controls, Player } from "@lottiefiles/react-lottie-player";

const UserBidding = ({ data }: any) => {
  const [state, setState] = useState("Product");
  const renderNoProduct = () => {
    return (
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
        <p className="text-3xl text-center font-OrbitronMedium">No Product</p>
      </div>
    );
  };
  const renderProduct = (products: any) => {
    return (
      <div className="flex w-full gap-4 mx-2 mt-8 xl:gap-8">
        {products.map((item: any) => {
          return (
            <ProductCard
              productData={item.product}
              classname="w-5/6 md:w-8/12 lg:w-1/2 2xl:w-1/4 xl:w-1/3 min-w-max"
            />
          );
        })}
      </div>
    );
  };
  const renderData = () => {
    if (state === "Product") {
      if (data.products.length == 0) {
        return renderNoProduct();
      } else {
        return renderProduct(data.products);
      }
    } else {
      if (data.bidWon.length == 0) {
        return renderNoProduct();
      } else {
        return renderProduct(data.bidWon);
      }
    }
  };
  return (
    <div className="flex-1 px-3 md:px-8 ">
      <div className="flex flex-col gap-4 my-8">
        <div className="flex items-center w-full px-2 py-6 shadow-xl md:p-4 justify-evenly rounded-xl bg-stone-50">
          <div className="flex flex-col items-center jus">
            <p className="text-sm font-baiMedium">Your Product</p>
            <p className="text-xl xl:text-5xl md:text-3xl font-baibold">
              {data.products.length}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-baiMedium">Bid Won</p>
            <p className="text-xl xl:text-5xl md:text-3xl font-baibold">
              {data.bidWon.length}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-baiMedium"> Revenue</p>
            <p className="text-xl xl:text-5xl md:text-3xl font-baibold">
              {data.revenue}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 my-8">
          <div className="w-full p-4 shadow-xl justify-evenly rounded-xl bg-stone-50">
            <div>
              <FormControl sx={{ m: 1 }} className="md:w-80 sm:w-72">
                <InputLabel id="demo-simple-select-helper-label">
                  Product
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={state}
                  label="Product"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                >
                  <MenuItem value="Product">My Products</MenuItem>
                  <MenuItem value="Won">Won Product</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>{renderData()}</div>
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
