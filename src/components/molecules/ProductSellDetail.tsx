import React, { useState, useRef, FC, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { MdCloudUpload } from "react-icons/md";
import shortid from "shortid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@/components/atoms/Button";
import Image from "next/image";
import { ProductType, ProductImageType } from "@/endpoints/product";
import { categories } from "utils/constant";
import axios from "axios";
import { useSelectedUser } from "@/hooks/state/useAppState";
import { useRouter } from "next/router";

import Address from "./Address";

type ProductSellDetailType = {
  product: Partial<ProductType>;
  // images: string[];
  setActiveStep: (value: number) => void;
  handleChange: (name: string, value: string) => void;
  handleImageChange: (data: ProductImageType) => void;
};

const ProductSellDetail: FC<ProductSellDetailType> = ({
  product: data,
  // images,
  setActiveStep,
  handleChange,
  handleImageChange,
}) => {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const [fileUploadedCount, setFileUploadedCount] = useState<number>(
    data?.images?.length || 0
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedfile, SetSelectedFile] = useState<ProductImageType[]>(
    data.images || []
  );
  const [user, _] = useSelectedUser();

  useEffect(() => {
    if (fileUploadedCount === selectedfile.length) {
      setLoading(false);
    }
  }, [fileUploadedCount]);

  const handleNext = () => {
    console.log("selected file upload", selectedfile.length, fileUploadedCount);
    console.log("user", user);

    if (user._id === "") {
      router.push("/auth");
    }
    if (selectedfile.length != fileUploadedCount) {
      setLoading(true);
      return;
    }
    setActiveStep(1);
    window?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const InputChange = (e: any) => {
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = async () => {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", "pqjqtcae");
        try {
          SetSelectedFile((preValue) => {
            return [
              ...preValue,
              {
                _id: shortid.generate(),
                filename: e.target.files[i].name,
                fileimage: reader.result as string,
              },
            ];
          });

          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dlv5hu0eq/image/upload",
            form
          );
          console.log("res came", res);
          // const uploaded = fileUploadedCount + 1;
          setFileUploadedCount((count) => count + 1);
          handleImageChange({
            _id: shortid.generate(),
            filename: e.target.files[i].name,
            fileimage: res.data.secure_url,
          });
          // handleImageChange({
          //   _id: shortid.generate(),
          //   filename: e.target.files[i].name,
          //   fileimage: res.data.secure_url,
          // });
        } catch (error) {
          console.log("went wrong", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const DeleteSelectFile = (id: string) => {
    const result = selectedfile.filter((data) => data._id !== id);
    SetSelectedFile(result);
    data.images = result;
    setFileUploadedCount((count) => count - 1);
  };

  // Data

  // const categories = [
  //   "Car",
  //   "Properties",
  //   "Mobile",
  //   "Bike",
  //   "Electronic & Appliances",
  //   "Furniture",
  //   "Fashion",
  //   "Art",
  //   "Others",
  // ];
  const owners = ["1st", "2nd", "3rd"];
  const conditions = [
    "Antique",
    "New",
    "Refurbished",
    "Used",
    "Open Box",
    "Old",
  ];

  return (
    <div className="flex flex-col w-full gap-6 p-4 ">
      <div className="flex flex-row w-full gap-6 p-2 bg-white md:p-6 rounded-xl">
        <div className="flex flex-col flex-1 gap-6">
          {loading && "Loading...."}
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
        <div className="flex-1">
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={5}
            fullWidth
            value={data.description}
            variant="outlined"
            color="primary"
            onChange={(e) => handleChange(e.target.value, "description")}
          />
        </div>
      </div>
      <div className="flex flex-col w-full gap-6 p-2 bg-white md:p-6 rounded-xl">
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
                accept="image/png, image/gif, image/jpeg" // hidden
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
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {selectedfile.map((data) => {
            const { _id, filename, fileimage } = data;
            return (
              <div className="flex gap-4 mt-2" key={_id}>
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
                  <p className="overflow-hidden font-semibold text-gray-600 font-baiMedium text-ellipsis ">
                    {filename}
                  </p>
                  <div className="file-actions">
                    <button
                      type="button"
                      className="text-sm text-gray-600 underline font-baiMedium"
                      onClick={() => DeleteSelectFile(_id)}
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
      <div className="flex flex-col w-full gap-6 p-2 bg-white md:p-6 rounded-xl">
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
                    <MenuItem value={item.name} key={key}>
                      {item.name}
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

        <Address update={false} />
      </div>

      <div className="flex flex-col justify-end">
        <div className="flex justify-end ">
          <Button
            variant="secondary"
            className="rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 hover:ring-transparent"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? "Please wait ..." : "Next"}
          </Button>{" "}
        </div>
        {loading && (
          <div className="flex items-end justify-end ">
            <p className="text-sm">
              Images are being processed: {fileUploadedCount}/
              {selectedfile.length}{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSellDetail;
