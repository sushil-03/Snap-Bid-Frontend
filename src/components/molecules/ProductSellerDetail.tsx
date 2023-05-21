import { FormControl, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { MuiTelInput } from "mui-tel-input";

import React, { FC } from "react";
import Button from "../atoms/Button";
import { ProductType } from "@/pages/sell";
import { Dayjs } from "dayjs";
type ProductSellDetailType = {
  product: Partial<ProductType>;
  setActiveStep: (value: number) => void;
  handleChange: (name: string | Dayjs, value: string) => void;
};

const ProductSellerDetail: FC<ProductSellDetailType> = ({
  product: data,
  setActiveStep,
  handleChange,
}) => {
  return (
    <div className="flex flex-col w-full gap-6 px-4 pt-4 md:w-3/4">
      <div className="flex flex-col gap-6 p-4 bg-white rounded-xl">
        <div className="flex w-full gap-6 ">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            color="primary"
            fullWidth
            value={data.sellerName}
            style={{ padding: 2 }}
            onChange={(e) => handleChange(e.target.value, "sellerName")}
            className=""
          />
          <MuiTelInput
            fullWidth
            value={data.sellerPhone}
            onChange={(newVal) => handleChange(newVal, "sellerPhone")}
          />
        </div>
        <div className="flex w-full gap-6 ">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ padding: 2 }}
            value={data.sellerEmail}
            onChange={(e) => handleChange(e.target.value, "sellerEmail")}
          />
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ padding: 2 }}
            value={data.sellerCity}
            onChange={(e) => handleChange(e.target.value, "sellerCity")}
          />
        </div>
        <div className="flex w-full gap-6">
          <TextField
            id="outlined-basic"
            label="State"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ padding: 2 }}
            value={data.sellerState}
            onChange={(e) => handleChange(e.target.value, "sellerState")}
          />
          <TextField
            id="outlined-basic"
            label="ZIP"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ padding: 2 }}
            value={data.sellerZip}
            onChange={(e) => handleChange(e.target.value, "sellerZip")}
          />
        </div>
      </div>
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
              value={data.paymentInfo}
              onChange={(e) => handleChange(e.target.value, "paymentInfo")}
            >
              <FormControlLabel
                label="Online Payment"
                control={<Radio />}
                value="Online"
                className="p-3"
              />
              <FormControlLabel
                label="Cash on Delivery"
                control={<Radio />}
                value="COD"
              />
              <FormControlLabel
                label="POS on Delivery"
                control={<Radio />}
                value="POS"
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
                label="Arrange Pickup(+10$)"
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
          className="mb-2 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 hover:ring-transparent"
          onClick={() => {
            setActiveStep(1);
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
          Submit
        </Button>{" "}
      </div>
    </div>
  );
};

export default ProductSellerDetail;
