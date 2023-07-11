import Input from "@/components/atoms/Input";
import React from "react";
import Button from "@/components/atoms/Button";
import { Formik, Form } from "formik";
import { RiLockPasswordLine, RiCharacterRecognitionFill } from "react-icons/ri";
import { ImMail3 } from "react-icons/im";
import { AiFillPhone, AiTwotonePushpin } from "react-icons/ai";
import { CgGhostCharacter } from "react-icons/cg";
import * as Yup from "yup";
import { RegisterType } from "@/endpoints/user";
import { useRegister } from "@/hooks/mutation/useRegister";
import Loader from "./Loader";
import { GiBlackFlag } from "react-icons/gi";
import { TbBuildingEstate } from "react-icons/tb";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelectedUser } from "@/hooks/state/useAppState";
import { DecodedType } from "./Login";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
const Register = ({ setLogin }: { setLogin: (data: boolean) => void }) => {
  const router = useRouter();
  const cookie = new Cookies();
  const [, setUser] = useSelectedUser();
  const registerInitialValues = {
    email: "sushil33@gmail.com",
    firstname: "Sushil",
    lastname: "rawat",
    contact: "9185343434",
    password: "sushil@gmail.com",
    country: "India",
    state: "Uk",
    pincode: "123456",
  };
  const { mutate: proposeRegister, isLoading } = useRegister();

  const registerHandler = (values: RegisterType) => {
    console.log("Register Called", values);
    proposeRegister(values, {
      onSuccess(result) {
        console.log("My result ", result);

        const decoded: DecodedType = jwtDecode(result.token);
        setUser({
          name: result.user.firstname,
          _id: result.user._id,
          token: result.token,
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
  const registerValidationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    contact: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Formik
      initialValues={registerInitialValues}
      onSubmit={registerHandler}
      validationSchema={registerValidationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <div className="flex flex-col w-full gap-6 px-6 mx-0 rounded-md lg:p-0">
              <div className="flex flex-col gap-4">
                <p className="p-4 text-2xl text-center text-transparent md:text-4xl bg-gradient-to-r from-violet-600 to-orange-600 bg-clip-text font-baibold">
                  Welcome to our Battleground!
                </p>

                <div className="flex flex-col gap-2 ">
                  <div className="flex flex-col justify-around gap-4 sm:flex-row">
                    <div className="flex flex-col flex-1">
                      <label htmlFor="firstname" className="text-violet-600">
                        First Name
                      </label>
                      <Input
                        {...formik.getFieldProps("firstname")}
                        placeholder="First Name"
                        name="firstname"
                        fullWidth
                        icon={
                          <RiCharacterRecognitionFill
                            size={23}
                            className="text-violet-800 "
                          />
                        }
                        className={`pl-1 ${
                          formik.errors.firstname && formik.touched.firstname
                            ? "border-red-600 border-2 hover:ring-transparent"
                            : "border-violet-800 border-2"
                        } `}
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label htmlFor="name" className="text-violet-600">
                        Last Name
                      </label>
                      <Input
                        {...formik.getFieldProps("lastname")}
                        placeholder="Last Name"
                        icon={
                          <CgGhostCharacter
                            size={23}
                            className="text-violet-800"
                          />
                        }
                        name="lastname"
                        fullWidth
                        className={`pl-1 ${
                          formik.errors.lastname && formik.touched.lastname
                            ? "border-red-600 border-2 hover:ring-transparent"
                            : "border-violet-800 border-2"
                        } `}
                        type="text"
                      />
                    </div>
                  </div>
                  {/* <div className="flex justify-around gap-4">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="country" className="text-violet-600">
                      Country
                    </label>
                    <Input
                      icon={
                        <GiBlackFlag
                          size={20}
                          className="mr-1 text-violet-800"
                        />
                      }
                      {...formik.getFieldProps("country")}
                      placeholder="Country"
                      fullWidth
                      name="country"
                      className={` ${
                        formik.errors.country && formik.touched.country
                          ? "border-red-600 border-2 hover:ring-transparent"
                          : "border-violet-800 border-2"
                      } `}
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="contact" className="text-violet-600">
                      Pin Code
                    </label>
                    <Input
                      icon={
                        <AiTwotonePushpin
                          size={22}
                          className="text-violet-800"
                        />
                      }
                      {...formik.getFieldProps("pincode")}
                      placeholder="pincode Code"
                      fullWidth
                      name="pincode"
                      className={` ${
                        formik.errors.pincode && formik.touched.pincode
                          ? "border-red-600 border-2 hover:ring-transparent"
                          : "border-violet-800 border-2"
                      } `}
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="contact" className="text-violet-600">
                      State
                    </label>
                    <Input
                      icon={
                        <TbBuildingEstate
                          size={22}
                          className="text-violet-800"
                        />
                      }
                      {...formik.getFieldProps("state")}
                      placeholder="State"
                      fullWidth
                      name="state"
                      className={` ${
                        formik.errors.state && formik.touched.state
                          ? "border-red-600 border-2 hover:ring-transparent"
                          : "border-violet-800 border-2"
                      } `}
                      type="text"
                    />
                  </div>
                </div> */}
                  <div className="flex justify-around gap-4">
                    <div className="flex flex-col flex-1">
                      <label htmlFor="email" className="text-violet-600">
                        Email
                      </label>
                      <Input
                        icon={
                          <ImMail3 size={20} className="mr-1 text-violet-800" />
                        }
                        {...formik.getFieldProps("email")}
                        placeholder="@mail"
                        fullWidth
                        name="email"
                        className={` ${
                          formik.errors.email && formik.touched.email
                            ? "border-red-600 border-2 hover:ring-transparent"
                            : "border-violet-800 border-2"
                        } `}
                        type="text"
                      />
                    </div>
                    {/* <div className="flex flex-col flex-1">
                    <label htmlFor="contact" className="text-violet-600">
                      Contact
                    </label>
                    <Input
                      icon={
                        <AiFillPhone size={22} className="text-violet-800" />
                      }
                      {...formik.getFieldProps("contact")}
                      placeholder="Phone Numebr"
                      fullWidth
                      name="contact"
                      className={` ${
                        formik.errors.contact && formik.touched.contact
                          ? "border-red-600 border-2 hover:ring-transparent"
                          : "border-violet-800 border-2"
                      } `}
                      type="string"
                    />
                  </div> */}
                  </div>

                  <div className="flex flex-col ">
                    <label htmlFor="password" className="text-violet-600">
                      Password
                    </label>
                    <Input
                      icon={
                        <RiLockPasswordLine
                          size={23}
                          className="text-violet-800"
                        />
                      }
                      {...formik.getFieldProps("password")}
                      placeholder="Password"
                      name="password"
                      type="password"
                      fullWidth
                      className={` ${
                        formik.errors.password && formik.touched.password
                          ? "border-red-600 border-2 hover:ring-transparent"
                          : "border-violet-800 border-2"
                      } `}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="pl-8 ">
                  <span className="text-sm">Already have a account </span>
                  <span
                    className="text-base cursor-pointer text-violet-600"
                    onClick={() => setLogin(true)}
                  >
                    Log in
                  </span>{" "}
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  className="mx-8 mb-2 rounded-md bg-violet-800 hover:bg-violet-600 ring-violet-800 disabled:bg-gray-400 disabled:hover:ring-transparent "
                  disabled={isLoading}
                >
                  Register
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Register;
