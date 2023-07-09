import React, { FC } from "react";
import Button from "../atoms/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { ProductType } from "@/endpoints/product";
type ProductBidType = Pick<
  ProductType,
  "startingBid" | "startingDate" | "startingTime" | "endingDate" | "endingTime"
>;

type ProductSellDetailType = {
  product: ProductBidType;
  setActiveStep: (value: number) => void;
  handleChange: (name: string | Date | Dayjs, value: string) => void;
};

const ProductBiddingDetail: FC<ProductSellDetailType> = ({
  product: data,
  setActiveStep,
  handleChange,
}) => {
  return (
    <div className="flex flex-col w-full gap-4 p-4 md:w-2/3 ">
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
              format="DD/MM/YYYY"
              value={dayjs(data.startingDate!)}
              onChange={(newValue) => {
                if (!newValue) return;
                handleChange(newValue, "startingDate");
              }}
              minDate={dayjs(new Date())}
            />

            <TimePicker
              label={"Starting Time"}
              value={dayjs(data.startingTime!)}
              onChange={(newValue) => {
                if (!newValue) return;

                // let time = newValue.toISOString();
                // console.log(time);

                handleChange(newValue, "startingTime");
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="flex justify-between px-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Ending Date"}
              views={["day"]}
              value={dayjs(data.endingDate)}
              // defaultValue={}
              format="DD/MM/YYYY"
              onChange={(newValue) => {
                if (!newValue) return;
                handleChange(newValue, "endingDate");
              }}
              minDate={dayjs(data.startingDate)}
            />
            <TimePicker
              label={"Ending Time"}
              value={dayjs(data.endingTime)}
              onChange={(newValue) => {
                if (!newValue) return;
                console.log("Ending TImmme");

                handleChange(newValue, "endingTime");
              }}
            />
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
