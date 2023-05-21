import React, { useState, useRef, FC } from "react";
import TextField from "@mui/material/TextField";
import { MdCloudUpload } from "react-icons/md";
import shortid from "shortid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@/components/atoms/Button";
import Image from "next/image";
import { ProductType } from "@/pages/sell";

type ImageTypes = {
  id: string;
  filename: string;
  filetype: string;
  fileimage: string;
  datetime: string;
  filesize: string;
}[];

type ProductSellDetailType = {
  setActiveStep: (value: number) => void;
  setProduct: (value: ProductType) => void;
};

const ProductSellDetail: FC<ProductSellDetailType> = ({
  setActiveStep,
  setProduct,
}) => {
  const initialValues = {
    brand: "",
    title: "",
    description: "",
    images: [{}],
    category: "",
    owner: "",
    condition: "",
    location: "",
  };
  const [data, setData] = useState(initialValues);
  // images
  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedfile, SetSelectedFile] = useState<ImageTypes>([]);

  const handleChange = (value: string, name: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const filesizes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const InputChange = (e: any) => {
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = () => {
        SetSelectedFile((preValue) => {
          return [
            ...preValue,
            {
              id: shortid.generate(),
              filename: e.target.files[i].name,
              filetype: e.target.files[i].type,
              fileimage: reader.result as string,
              datetime:
                e.target.files[i].lastModifiedDate.toLocaleString("en-IN"),
              filesize: filesizes(e.target.files[i].size),
            },
          ];
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const DeleteSelectFile = (id: string) => {
    const result = selectedfile.filter((data) => data.id !== id);
    SetSelectedFile(result);
  };

  const submitDetail = () => {
    data.images = selectedfile;
    console.log("Detailss....");
    console.log(data);

    // setProduct((test: ProductType)=>{
    //   return {
    //     ...test,
    //     brand:data.brand
    //   }
    // })
    //  setProduct(()=>{
    //   return {
    //     ...data
    //   }
    // })
  };
  // Data
  const categories = [
    "Car",
    "Properties",
    "Mobile",
    "Bike",
    "Electronic & Appliances",
    "Furniture",
    "Fashion",
    "Art",
  ];
  const owners = ["1st", "2nd", "3rd"];
  const conditions = ["Antique", "New", "Refurbished", "Used", "Open Box"];
  return (
    <div className="flex flex-col w-full gap-6 p-4 md:w-3/4">
      <div className="flex flex-col w-full gap-6 p-3 bg-white rounded-xl">
        <div className="flex gap-6">
          <TextField
            id="outlined-basic"
            label="Brand"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ padding: 4 }}
            onChange={(e) => handleChange(e.target.value, "brand")}
            value={data.brand}
          />
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            color="primary"
            fullWidth
            style={{ padding: 2, borderRadius: 4 }}
            value={data.title}
            onChange={(e) => handleChange(e.target.value, "title")}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={8}
            fullWidth
            value={data.description}
            variant="outlined"
            color="primary"
            className=""
            onChange={(e) => handleChange(e.target.value, "description")}
          />
        </div>
      </div>
      <div className="flex flex-col w-full gap-6 p-3 bg-white rounded-xl">
        <div className="w-full ">
          {/* Image div */}
          <p className="py-1 text-gray-600 ">Upload atleast 6 images</p>
          <div
            className={`group grid border-2 border-dashed rounded-lg cursor-pointer place-items-center border-violet-600 h-52  `}
            onClick={() => {
              imageRef.current?.click();
            }}
          >
            <div className="flex flex-col items-center justify-center pb-3">
              <input
                type="file"
                id="fileupload"
                // accept="image/*"
                ref={imageRef}
                onChange={InputChange}
                multiple
                // hidden
                className="w-2/3 opacity-0 input-field"
              />
              <MdCloudUpload
                size={50}
                className="text-violet-600 group-hover:text-violet-800"
              />
              <div className="flex gap-2">
                <span className="text-gray-600">Drag and Drop or </span>{" "}
                <span className="underline">Choose your file</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 ">
          {selectedfile.map((data) => {
            const { id, filename, fileimage, datetime, filesize } = data;
            return (
              <div className="flex gap-4 mt-2" key={id}>
                <div className="">
                  <Image
                    src={fileimage}
                    alt=""
                    height={100}
                    width={100}
                    className="overflow-hidden rounded-md"
                  />
                </div>
                <div className="file-detail">
                  <p className="font-semibold text-gray-600 font-baiMedium ">
                    {filename}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span>Size : {filesize}</span>
                    <span className="ml-2">Modified Time : {datetime}</span>
                  </p>
                  <div className="file-actions">
                    <button
                      type="button"
                      className="text-sm text-gray-600 underline font-baiMedium"
                      onClick={() => DeleteSelectFile(id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col w-full gap-6 p-3 bg-white rounded-xl">
        <div className="flex w-full gap-6 ">
          <div className="flex-1">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" className="">
                Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.category}
                fullWidth
                label="Categories"
                onChange={(e) => handleChange(e.target.value, "category")}
                className=""
              >
                {categories.map((item, key) => {
                  return (
                    <MenuItem value={item} key={key}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="flex-1">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" className="">
                Owner
              </InputLabel>
              <Select
                labelId="owerlabel-id"
                id="owner-id"
                value={data.owner}
                label="Owner"
                onChange={(e) => handleChange(e.target.value, "owner")}
                className=""
              >
                {owners.map((item, key) => {
                  return (
                    <MenuItem value={item} key={key}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="flex-1">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" className="">
                Condition
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.condition}
                label="Condition"
                onChange={(e) => handleChange(e.target.value, "condition")}
                className=""
              >
                {conditions.map((item, key) => {
                  return (
                    <MenuItem value={item} key={key}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>

        <div>
          <TextField
            id="outlined-multiline-static"
            label="Location"
            fullWidth
            value={data.location}
            onChange={(e) => handleChange(e.target.value, "location")}
            variant="outlined"
            color="primary"
            className=""
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="secondary"
          className="mb-2 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 hover:ring-transparent"
          onClick={() => {
            submitDetail();
            setActiveStep(1);
            window?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          Next
        </Button>{" "}
      </div>
    </div>
  );
};

export default ProductSellDetail;
