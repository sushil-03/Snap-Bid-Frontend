import { FormControl } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import type { FC } from "react";
import React from "react";

import type { ProductSellDetailType } from "@/endpoints/product";

import Button from "../atoms/Button";

const ProductSellerDetail: FC<ProductSellDetailType> = ({
  product: data,
  setActiveStep,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="flex flex-col w-full gap-6 px-4 pt-4 md:w-3/4">
      <div className="flex flex-col gap-6 p-4 bg-white rounded-xl">
        <div className="flex w-full gap-6 ">
          <FormControl>
            <FormLabel id="demo-form-control-label-placement">
              Payment Method
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="top"
              value={data.paymentOption}
              onChange={(e) => handleChange(e.target.value, "paymentOption")}
            >
              <FormControlLabel
                label="Online Payment"
                control={<Radio />}
                value="online"
                className="p-3"
              />
              <FormControlLabel
                label="Cash on Delivery"
                control={<Radio />}
                value="offline"
              />
              <FormControlLabel
                label="Both"
                control={<Radio />}
                value="both"
                // label="End"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4 bg-white rounded-xl">
        <div className="flex w-full gap-6 ">
          <FormControl>
            <FormLabel id="demo-form-control-label-placement">
              Shipping Cost
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="top"
              value={data.shippingInfo}
              onChange={(e) => handleChange(e.target.value, "shippingInfo")}
            >
              <FormControlLabel
                label="Self Pickup"
                control={<Radio />}
                value="self"
                className="p-3"
              />
              <FormControlLabel
                label="Arrange Pickup(+500₹)"
                control={<Radio />}
                value="arrange"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="flex justify-between px-2">
        <Button
          variant="secondary"
          className="mb-2 rounded-md bg-violet-800 ring-violet-800 hover:bg-violet-600 hover:ring-transparent"
          onClick={() => {
            setActiveStep(1);
            window?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          Prev
        </Button>{" "}
        <Button
          variant="secondary"
          className="mb-2 rounded-md bg-violet-800 ring-violet-800 hover:bg-violet-600 hover:ring-transparent"
          onClick={() => {
            handleSubmit();
            window?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          Submit
        </Button>{" "}
      </div>
    </div>
  );
};

export default ProductSellerDetail;
