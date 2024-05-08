import Input from "@/components/atoms/Input";
import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import { Formik, Form } from "formik";
import { RiLockPasswordLine, RiCharacterRecognitionFill } from "react-icons/ri";
import { ImMail3 } from "react-icons/im";
import { CgGhostCharacter } from "react-icons/cg";
import * as Yup from "yup";
import { RegisterType } from "@/endpoints/user";
import OtpInput from "react-otp-input";
import { useRegister } from "@/hooks/mutation/useRegister";
import Loader from "./Loader";
import axios from "axios";
import { IoRemoveOutline } from "react-icons/io5";
import { RiAccountPinBoxFill } from "react-icons/ri";

import toast from "react-hot-toast";

import { useRouter } from "next/router";
import { useSelectedUser } from "@/hooks/state/useAppState";
import { DecodedType } from "./Login";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

import { IoMdAddCircleOutline } from "react-icons/io";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { getOTP } from "@/hooks/mutation/useOTP";

type OTP_TYPE = {
  serverOTP: String;
  clientOTP: string;
  isShowOTP: Boolean;
  isVerified: Boolean;
};
const Register = ({ setLogin }: { setLogin: (data: boolean) => void }) => {
  const router = useRouter();
  const cookie = new Cookies();
  const [, setUser] = useSelectedUser();

  const [otp, setOTP] = useState<OTP_TYPE>({
    serverOTP: "",
    clientOTP: "",
    isShowOTP: false,
    isVerified: false,
  });
  // const [otp, setOTP] = useState<string>("");

  const registerInitialValues = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    avatar:
      "https://res.cloudinary.com/dlv5hu0eq/image/upload/v1714206020/e9o6pmmm1dm6fuq6unrd.png",

    // contact: "",
    // country: "",
    // state: "",
    // pincode: "",
  };
  const { mutate: proposeRegister, isLoading } = useRegister();
  const [registerData, setRegisterDate] = useState<RegisterType>(
    registerInitialValues
  );
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/dlv5hu0eq/image/upload/v1714206020/e9o6pmmm1dm6fuq6unrd.png"
  );
  const callSubmitAPI = async () => {
    proposeRegister(registerData, {
      onSuccess(result) {
        console.log("My result ", result);

        const decoded: DecodedType = jwtDecode(result.token);
        setUser({
          name: result.user.firstname,
          _id: result.user._id,
          token: result.token,
          address: result.user.address,
          avatar: result.user.avatar,
          selectedAddress: result.user.selectedAddress,
        });
        cookie.set("authorization", result, {
          expires: new Date(decoded.exp * 1000),
          path: "/",
        });
        toast.success("User register successfully ");
        router.push("/explore");
      },
      onError(error) {
        toast.error("Invalid Credential");
        console.log("Register error ", error);
      },
    });
  };
  const registerHandler = async (values: RegisterType) => {
    // if(otp!=)
    values.avatar = avatar;
    console.log("Register Called", values, avatar);
    await sendOTP(values.email);

    setRegisterDate(values);
    // callSubmitAPI(values)
  };
  const verifyOTP = async () => {
    console.log("--", otp);

    if (otp.clientOTP === otp.serverOTP) {
      console.log("calling upate");
      await callSubmitAPI();
    } else {
      toast.error("Otp doesn't match");
    }
  };

  const { mutate: proposeSendOTP, isLoading: isOTPLoading } = getOTP();
  const registerValidationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
    firstname: Yup.string().required("Required"),
    lastname: Yup.string(),
    avatar: Yup.string(),
  });
  if (isLoading) {
    return (
      <div className="h-[500px] ">
        <Loader />
      </div>
    );
  }
  const sendOTP = async (email: string) => {
    proposeSendOTP(email, {
      onSuccess(result) {
        console.log("result", result);
        // setOTP(result.otp);
        setOTP({
          ...otp,
          serverOTP: result.OTP,
          isShowOTP: true,
        });
      },
      onError(error) {
        console.log("OTP error", error);
      },
    });
  };
  const handleImageChange = (e: any) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      const form = new FormData();
      form.append("file", e.target.files[0]);
      form.append("upload_preset", "pqjqtcae");

      reader.onload = async () => {
        if (reader.readyState === 2) {
          setAvatarLoading(true);
          try {
            const res = await axios.post(
              "https://api.cloudinary.com/v1_1/dlv5hu0eq/image/upload",
              form
            );
            console.log("res came", res);
            setAvatar(res.data.secure_url);
          } catch (error) {
            console.log("error");
          } finally {
            setAvatarLoading(false);
          }
          // setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      // setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  if (otp.isShowOTP) {
    return (
      <div className="flex flex-col w-full gap-6 px-6 mx-0 rounded-md md:p-0">
        <div className="flex flex-col gap-4">
          <p className="p-4 text-2xl leading-9 text-center led md:text-4xl font-baibold">
            Verify OTP
          </p>

          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col items-center justify-center w-full gap-8 py-10 mt-5 bg-white rounded-md ">
              <div className="hidden sm:block">
                <OtpInput
                  value={otp.clientOTP}
                  onChange={(value) => setOTP({ ...otp, clientOTP: value })}
                  numInputs={4}
                  renderSeparator={
                    <span>
                      <IoRemoveOutline size={28} />
                    </span>
                  }
                  onPaste={(e) => {
                    setOTP({
                      ...otp,
                      clientOTP: e.clipboardData.getData("text"),
                    });
                  }}
                  inputStyle={{
                    width: "70px",
                    height: "50px",
                    outline: "none",
                    borderRadius: "10px",
                    marginRight: "10px",
                    marginLeft: "10px",
                    backgroundColor: "#f3f4f6",
                  }}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="block w-full px-4 sm:hidden">
                <Input
                  placeholder="OTP"
                  name="OTP"
                  Icon={RiAccountPinBoxFill}
                  fullWidth
                  value={otp.clientOTP}
                  onChange={(e) => {
                    setOTP({
                      ...otp,
                      clientOTP: e.target.value,
                    });
                  }}
                  className={`lg:pl-10 md:pl-8 !w-full`}
                  type="text"
                />
              </div>

              <div className="flex justify-between w-full px-4">
                <Button
                  type="submit"
                  variant="secondary"
                  className="mx-0 mb-2 !py-2 !px-4 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 disabled:bg-gray-400 disabled:hover:ring-transparent  text-sm"
                  disabled={isLoading || avatarLoading}
                  onClick={() =>
                    setOTP({
                      ...otp,
                      isShowOTP: false,
                    })
                  }
                >
                  Go Back
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  className="mx-0 mb-2 !py-2 !px-4 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 disabled:bg-gray-400 disabled:hover:ring-transparent  text-sm"
                  disabled={isLoading || avatarLoading}
                  onClick={verifyOTP}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between"></div>
      </div>
    );
  }
  return (
    <Formik
      initialValues={registerInitialValues}
      onSubmit={registerHandler}
      validationSchema={registerValidationSchema}
    >
      {(formik) => {
        console.log("formik", formik);

        return (
          <Form>
            <div className="flex flex-col items-center justify-center w-full gap-6 px-0 mx-auto rounded-md md:p-0">
              <div className="flex flex-col w-full gap-4">
                <p className="p-4 text-2xl leading-9 text-center led md:text-4xl font-baibold">
                  Welcome to our Battleground!
                </p>

                <div className="flex flex-col w-full gap-4 ">
                  <div className="flex flex-col justify-around gap-4 sm:flex-row">
                    <div className="flex flex-col flex-1">
                      <Input
                        {...formik.getFieldProps("firstname")}
                        placeholder="First Name"
                        name="firstname"
                        fullWidth
                        Icon={RiCharacterRecognitionFill}
                        className={`lg:pl-10 md:pl-8 ${
                          formik.errors.firstname && formik.touched.firstname
                            ? "!border-red-600 border-2 ring-4"
                            : ""
                        } `}
                        type="text"
                      />
                      <p className="mt-1 text-xs text-red-700 text-end">
                        {formik.touched.firstname
                          ? formik.errors.firstname
                          : ""}
                      </p>
                    </div>
                    <div className="flex flex-col flex-1">
                      <Input
                        {...formik.getFieldProps("lastname")}
                        placeholder="Last Name"
                        Icon={CgGhostCharacter}
                        name="lastname"
                        fullWidth
                        className={`lg:pl-10 md:pl-8${
                          formik.errors.lastname && formik.touched.lastname
                            ? "!border-red-600 border-2 ring-4"
                            : ""
                        } `}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex flex-col flex-1 gap-2">
                      <div className="flex flex-col flex-1">
                        <Input
                          Icon={ImMail3}
                          {...formik.getFieldProps("email")}
                          placeholder="@mail"
                          fullWidth
                          name="email"
                          className={`lg:pl-10 md:pl-8 !text-sm !py-3 ${
                            formik.errors.email && formik.touched.email
                              ? "!border-red-600  ring-4"
                              : ""
                          } `}
                          type="text"
                        />
                        <p className="mt-1 text-xs text-red-700 text-end">
                          {formik.touched.email ? formik.errors.email : ""}
                        </p>
                      </div>
                      <div className="flex flex-col ">
                        <Input
                          Icon={RiLockPasswordLine}
                          {...formik.getFieldProps("password")}
                          placeholder="Password"
                          name="password"
                          type="password"
                          fullWidth
                          className={`lg:pl-10 md:pl-8  !text-sm !py-3 ${
                            formik.errors.password && formik.touched.password
                              ? "!border-red-600  ring-4"
                              : ""
                          } `}
                        />
                        <p className="mt-1 text-xs text-red-700 text-end">
                          {formik.touched.password
                            ? formik.errors.password
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`border-2 border-gray-700 border-dashed sm:w-28 h-28 w-full rounded-md ${
                        avatarLoading && "bg-gray-300"
                      }`}
                    >
                      <div className="relative flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out border rounded-md ">
                        {avatar ? (
                          <div>
                            <Image
                              src={avatar}
                              fill
                              className="relative object-fit"
                              alt="profile"
                            />
                            <div
                              className="absolute right-0 p-1 bg-red-700 rounded-full top-1"
                              onClick={() => setAvatar("")}
                            >
                              <RxCross2 className="text-white" size={10} />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <input
                              name="avatar"
                              onChange={handleImageChange}
                              type="file"
                              disabled={avatarLoading}
                              accept="image/png, image/gif, image/jpeg" // hidden
                              className="absolute inset-0 opacity-0"
                            />
                            <div className="flex flex-col items-center justify-between ">
                              <IoMdAddCircleOutline size={28} />
                              <span className="text-xs">Profile</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-end w-full">
                <Button
                  type="submit"
                  variant="secondary"
                  className="mx-0 mb-2 !py-2 !px-4 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 disabled:bg-gray-400 disabled:hover:ring-transparent  text-sm"
                  disabled={isLoading || avatarLoading || isOTPLoading}
                >
                  Send OTP
                </Button>
              </div>
              <div>
                <span className="text-sm">Already have an account </span>
                <span
                  className="text-base cursor-pointer text-violet-600"
                  onClick={() => setLogin(true)}
                >
                  Login
                </span>{" "}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Register;
