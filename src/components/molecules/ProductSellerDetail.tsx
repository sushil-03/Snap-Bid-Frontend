import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  TextField,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { MuiTelInput } from "mui-tel-input";

import React, { useState, FC } from "react";
import Button from "../atoms/Button";
import { ProductType } from "@/pages/sell";
type ProductSellDetailType = {
  setActiveStep: (value: number) => void;
  setProduct: (value: ProductType) => void;
};

const ProductSellerDetail: FC<ProductSellDetailType> = ({ setActiveStep }) => {
  const [phone, setPhone] = useState("+91");
  const handleChange = (newValue: string) => {
    console.log(newValue);

    setPhone(newValue);
  };
  const handleSubmit = () => {};
  return (
    <div className="flex flex-col w-3/4 gap-6 px-4 pt-4">
      <div className="flex flex-col gap-6 p-4 bg-white rounded-xl">
        <div className="flex w-full gap-6 ">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ padding: 2 }}
            className=""
          />
          <MuiTelInput fullWidth value={phone} onChange={handleChange} />
        </div>
        <div className="flex w-full gap-6 ">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ padding: 2 }}
            className=""
          />
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ padding: 2 }}
            className=""
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
            className=""
          />
          <TextField
            id="outlined-basic"
            label="ZIP"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ padding: 2 }}
            className=""
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
