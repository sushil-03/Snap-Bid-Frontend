import React, { FC, useState } from "react";
import Button from "../atoms/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { ProductType } from "@/pages/sell";

type ProductSellDetailType = {
  setActiveStep: (value: number) => void;
  setProduct: (value: ProductType) => void;
};
type ProductBidType = {
  startingBid: string;
  startingDate: Dayjs | null;
  startingTime: Dayjs | null;
  endingDate: Dayjs | null;
};
const ProductBiddingDetail: FC<ProductSellDetailType> = ({
  setActiveStep,
  setProduct,
}) => {
  const initialValues = {
    startingBid: "",
    startingDate: dayjs(new Date()),
    startingTime: dayjs(new Date()),
    endingDate: dayjs(new Date()),
  };
  const handleChange = (value: string, name: string) => {
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };
  const [data, setData] = useState<ProductBidType>(initialValues);
  const handleSubmit = () => {};
  return (
    <div className="flex flex-col w-2/3 gap-4 p-4 ">
      <div className="flex flex-col gap-4 p-4 bg-white rounded-xl">
        <div className="flex w-full gap-6 ">
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Starting Bid
            </InputLabel>
            <OutlinedInput
              value={data.startingBid}
              type="number"
              onChange={(e) => handleChange(e.target.value, "startingBid")}
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Starting Bid"
            />
          </FormControl>
        </div>
        <div className="flex justify-between w-full px-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Starting Date"}
              views={["day"]}
              value={data.startingDate}
              defaultValue={dayjs(new Date())}
              // onChange={(newValue) => handleChange(newValue, "startingDate")}
              onChange={(newValue) => {
                if (!newValue) return;
                console.log("TEST", newValue?.toISOString().split("T")[0]);
                // handleChange(newValue.toISOString().split("T")[0],"startingDate")
              }}
              minDate={dayjs(new Date())}
            />

            <TimePicker
              label={"Starting Time"}
              value={data.startingTime}
              defaultValue={dayjs(new Date())}
              disablePast
              onChange={(newValue) => {
                console.log(
                  "STTTime",
                  newValue?.toDate().toString().split(" ")[4]
                );
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="flex justify-between px-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={"Ending Date"} views={["day"]} />
            <TimePicker label={"Ending Time"} />
          </LocalizationProvider>
        </div>
      </div>
      <div className="flex justify-between px-2">
        <Button
          variant="secondary"
          className="mb-2 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 hover:ring-transparent"
          onClick={() => {
            setActiveStep(0);
            window?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          Prev
        </Button>{" "}
        <Button
          variant="secondary"
          className="mb-2 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 hover:ring-transparent"
          onClick={() => {
            setActiveStep(2);
            window?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          Next
        </Button>{" "}
      </div>
    </div>
  );
};

export default ProductBiddingDetail;
