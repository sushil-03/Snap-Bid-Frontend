import React from "react";
import Button from "../atoms/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

const ProductBiddingDetail = ({
  setActiveStep,
}: {
  setActiveStep: (value: number) => void;
}) => {
  return (
    <div className="flex flex-col w-2/3 gap-4 p-4 ">
      <div className="flex flex-col gap-4 p-4 bg-white rounded-xl">
        <div className="flex w-full gap-6 ">
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Starting Bid
            </InputLabel>
            <OutlinedInput
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
            <DatePicker label={"Starting Date"} views={["day"]} />
            <TimePicker label={"Starting Time"} />
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
