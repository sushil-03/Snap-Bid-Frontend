import React, { FC } from "react";
import Button from "../atoms/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { ProductType } from "@/endpoints/product";
type ProductBidType = Pick<
  ProductType,
  | "startingBid"
  | "startingDate"
  | "startingTime"
  | "endingDate"
  | "endingTime"
  | "timeToPay"
  | "enable_email"
  | "bidIncrement"
>;

type ProductSellDetailType = {
  product: ProductBidType;
  setActiveStep: (value: number) => void;
  handleChange: (name: string | Date | Dayjs | Boolean, value: string) => void;
};

const ProductBiddingDetail: FC<ProductSellDetailType> = ({
  product: data,
  setActiveStep,
  handleChange,
}) => {
  return (
    <div className="flex flex-col w-full gap-4 p-2 md:p-4 lg:w-2/3 md:w-4/5">
      <div className="flex flex-col gap-6 p-2 bg-white md:p-4 rounded-xl">
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
                <InputAdornment position="start">₹</InputAdornment>
              }
              label="Starting Bid"
            />
            <p className="text-xs text-gray-500">
              Note: Incase of stripe payment bidding will contain 2% processing
              fee and tax
            </p>
          </FormControl>
        </div>
        <div className="flex justify-between w-full gap-3 px-2 md:gap-10 ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Starting Date"}
              views={["day"]}
              className="flex-1"
              format="DD/MM/YYYY"
              value={dayjs(data.startingDate!)}
              onChange={(newValue) => {
                if (!newValue) return;
                handleChange(newValue, "startingDate");
              }}
              minDate={dayjs(new Date())}
            />

            <TimePicker
              className="flex-1"
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
        <div className="flex justify-between gap-3 px-2 md:gap-10 ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Ending Date"}
              views={["day"]}
              value={dayjs(data.endingDate)}
              // defaultValue={}
              format="DD/MM/YYYY"
              className="flex-1"
              onChange={(newValue) => {
                if (!newValue) return;
                handleChange(newValue, "endingDate");
              }}
              minDate={dayjs(data.startingDate)}
            />
            <TimePicker
              label={"Ending Time"}
              value={dayjs(data.endingTime)}
              className="flex-1"
              onChange={(newValue) => {
                if (!newValue) return;
                console.log("Ending TImmme");

                handleChange(newValue, "endingTime");
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="flex flex-row justify-between w-full gap-3 mx-1 md:gap-10 ">
          <div className="flex-1">
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Time to pay
              </InputLabel>
              <OutlinedInput
                value={data.timeToPay}
                type="number"
                onChange={(e) => handleChange(e.target.value, "timeToPay")}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">hour</InputAdornment>
                }
                label="Time to pay"
              />
            </FormControl>
            <p className="pl-1 text-xs text-gray-500">
              Bidder payment timeframe for each user.
            </p>
          </div>
          <div className="flex-1">
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Bid Increment
              </InputLabel>
              <OutlinedInput
                value={data.bidIncrement}
                type="number"
                onChange={(e) => handleChange(e.target.value, "bidIncrement")}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Bid Increment"
              />
            </FormControl>
            <p className="pl-1 text-xs text-gray-500">
              Note: Minimum Bid increment
            </p>
          </div>
        </div>
        <div className="px-2">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(data.enable_email)}
                  onChange={(e) => {
                    handleChange(e.target.checked, "enable_email");
                    // console.log(e.target.checked);
                  }}
                />
              }
              label="Enable sending email to bidder"
            />
          </FormGroup>
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
