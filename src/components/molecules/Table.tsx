import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import Button from "../atoms/Button";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useUpdateUser } from "@/hooks/mutation/useUpdateOrder";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const OrderTable = ({ data, userType }: any) => {
  const columnHelper = createColumnHelper<any>();
  console.log("data", data);
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [statusInfo, setStatusInfo] = useState({
    order_status: "",
    payment_status: false,
    orderId: "",
  });

  const [updateModal, showUpdateModal] = useState<boolean>(false);
  const { mutate: proposeUpdate, isLoading } = useUpdateUser();
  const columns = [
    columnHelper.accessor((row) => row.product, {
      id: "Title",
      cell: (info) => {
        const product = info.getValue();
        return (
          <Link href={`/product/${product._id}`}>
            <div className="flex items-center justify-center gap-2 hover:text-gray-950">
              <div className="relative w-12 h-12 overflow-hidden rounded-full">
                <Image
                  src={product.images[0].fileimage}
                  alt={product.title}
                  fill
                  className="object-cover rounded-full"
                />
              </div>

              <p className="overflow-hidden text-ellipsis">{product.title}</p>
            </div>
          </Link>
        );
      },

      header: () => <span>Title</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: userType == "seller" ? "Buyer" : "Seller",
      cell: (info) => {
        const order = info.getValue();
        // console.log("seller", seller);
        const user = userType == "seller" ? order.buyer : order.seller;

        return (
          <Link href={`/profile/${user._id}`}>
            <div className="flex items-center justify-center transition-all duration-300 ease-in-out hover:text-black-700">
              {user.firstname} <FiArrowUpRight />
            </div>
          </Link>
        );
      },
      header: () => <span> {userType == "seller" ? "Buyer" : "Seller"}</span>,
    }),
    columnHelper.accessor((row) => row.totalAmount, {
      id: "Price",
      cell: (info) => <span>₹{info.getValue()}</span>,
      header: () => <span>Amount </span>,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "order_status",
      cell: (info) => {
        const statusValue = info.getValue();
        console.log(statusValue, "Pending", statusValue === "Pending");
        console.log(typeof statusValue, typeof "Pending");

        return (
          <span
            className={`overflow-hidden text-ellipsis py-2 px-4  rounded-full text-sm ${
              statusValue === "pending"
                ? "bg-red-200 text-red-600 "
                : "bg-green-200 text-green-600"
            }`}
          >
            {statusValue}
          </span>
        );
      },
      header: () => <span>Order Status</span>,
    }),

    columnHelper.accessor((row) => row.orderDate, {
      id: "created_at",
      cell: (info) => {
        const timestamp = new Date(info.getValue());
        const created_at = `${timestamp.getDate()}/${timestamp.getMonth()}/${timestamp.getFullYear()}`;
        return (
          <span
            className={`overflow-hidden text-ellipsis py-2 px-4  rounded-full text-sm `}
          >
            {created_at}
          </span>
        );
      },
      header: () => <span>Order Date</span>,
    }),

    columnHelper.accessor((row) => row.product.paymentReceived, {
      id: "payment_status",
      cell: (info) => {
        const status = info.getValue();
        return (
          <span
            className={`overflow-hidden text-ellipsis py-2 px-4  rounded-full text-sm ${
              status === true
                ? "bg-blue-200 text-blue-600 "
                : "bg-red-200 text-red-600 "
            }`}
          >
            {status === true ? "Completed" : "Pending"}
          </span>
        );
      },
      header: () => <span>Payment Status</span>,
    }),

    columnHelper.accessor((row) => row.product.addressFrom, {
      id: "departure",
      cell: (info) => {
        const departure = info.getValue();
        return (
          <div className="flex items-center justify-center py-2 ">
            <p className="overflow-hidden text-sm text-ellipsis">
              {departure.country},{departure.city},{departure.state}
            </p>
          </div>
        );
      },

      header: () => <span>Departure</span>,
    }),
    columnHelper.accessor((row) => row.product.addressTo, {
      id: "destination",
      cell: (info) => {
        const destination = info.getValue();
        return (
          <div className="flex items-center justify-center py-2 ">
            <p className="overflow-hidden text-sm text-ellipsis">
              {destination?.country},{destination?.city},{destination?.state}
            </p>
          </div>
        );
      },

      header: () => <span>Destination</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "Update",
      cell: (info) => {
        // return <span>{info.getValue()}</span>;
        const order = info.getValue();

        return (
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-center px-3 py-2 text-sm text-gray-200 transition-all duration-300 ease-in-out rounded-md bg-black-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
              onClick={() => {
                setSelectedOrder(order);
                setStatusInfo({
                  order_status: order.status,
                  payment_status: order.product.paymentReceived,
                  orderId: order._id,
                });
                showUpdateModal(true);
              }}
              title={
                userType === "buyer"
                  ? "Only seller can update"
                  : "Update status"
              }
              disabled={userType === "buyer"}
            >
              Update
            </button>
          </div>
        );
      },

      header: () => <span>Action</span>,
    }),
  ];
  const handleSubmit = async () => {
    if (
      selectedOrder.status === statusInfo.order_status &&
      selectedOrder.product.status === statusInfo.payment_status
    ) {
      console.log("already updated");
      return;
    }
    toast.success("Order updated");
    proposeUpdate(statusInfo, {
      onSuccess(result) {
        console.log("Order update succesfully", result);
        toast.success("Order updated");
      },
      onError(error) {
        console.log("Something went wrong", error);
        toast.success("Something went wrong");
      },
    });
    // if()
  };

  const handleUpdate = (
    value: string | boolean,
    type: "payment_status" | "order_status"
  ) => {
    setStatusInfo({
      ...statusInfo,
      [type]: value,
    });
  };
  const table = useReactTable({
    columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="w-full overflow-x-scroll ">
      <Modal
        open={updateModal}
        onClose={() => showUpdateModal(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: window.innerWidth > 600 ? 600 : 400,
            position: "relative",
          }}
        >
          <h2
            id="child-modal-title"
            className="text-3xl font-semibold text-center font-baiMedium"
          >
            SnapBid
          </h2>
          {selectedOrder && (
            <div className="mt-8">
              <div className="flex gap-5">
                <Image
                  src={selectedOrder.product.images[0].fileimage}
                  alt="product"
                  height={150}
                  width={200}
                />
                <div>
                  <p>{selectedOrder.product.title}</p>
                  <p className="capitalize">{selectedOrder.product.brand}</p>

                  <p className="text-2xl">{selectedOrder.totalAmount}</p>
                </div>
              </div>
              <div className="flex w-full gap-5 mt-5">
                <div className="flex-1 p-3 bg-gray-100 border-2 rounded-md border-black-800 place-content-center">
                  <p className="p-0 text-sm text-center border-b-2 border-white font-baiMedium">
                    Departure{" "}
                  </p>
                  <div className="grid grid-cols-2 font-sans">
                    <p className="text-center">
                      {selectedOrder.product.addressFrom.country}
                    </p>

                    <p className="text-center">
                      {selectedOrder.product.addressFrom.city}
                    </p>

                    <p className="text-center">
                      {selectedOrder.product.addressFrom.state}
                    </p>

                    <p className="text-center">
                      {selectedOrder.product.addressFrom.pincode}
                    </p>
                  </div>
                </div>
                <div className="flex-1 p-3 bg-gray-100 border-2 rounded-md border-black-800 place-content-center">
                  <p className="p-0 text-sm text-center border-b-2 font-baiMedium">
                    Destination{" "}
                  </p>
                  <div className="grid grid-cols-2">
                    <p className="text-center">
                      {selectedOrder.product.addressTo?.country}
                    </p>

                    <p className="text-center">
                      {selectedOrder.product.addressTo?.city}
                    </p>

                    <p className="text-center">
                      {selectedOrder.product.addressTo?.state}
                    </p>

                    <p className="text-center">
                      {selectedOrder.product.addressTo?.pincode}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <div>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Order Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      defaultValue={selectedOrder.status}
                      label="Order Status"
                      onChange={(e) =>
                        handleUpdate(e.target.value, "order_status")
                      }
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="canceled">Canceled</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Payment Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      defaultValue={
                        selectedOrder.product.paymentReceived
                          ? "received"
                          : "pending"
                      }
                      label="Payment Status"
                      onChange={
                        (e) => {
                          setStatusInfo({
                            ...statusInfo,
                            payment_status:
                              e.target.value === "pending" ? false : true,
                          });
                        }

                        // handleUpdate(e.target.value, "payment_status")
                      }
                    >
                      <MenuItem value={"received"}>Received</MenuItem>
                      <MenuItem value={"pending"}>Pending</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          )}

          <div className="w-full gap-10 mt-6 ">
            <Button
              onClick={handleSubmit}
              className="w-full hover:bg-black-600"
              disabled={isLoading}
            >
              {isLoading ? "Saving" : "Save"}
            </Button>
          </div>
        </Box>
      </Modal>
      <table className="w-full overflow-x-scroll min-w-[1200px]  rounded-xl">
        <thead className="w-full ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="grid !w-full grid-cols-9  font-baiMedium font-normal bg-gray-200 py-2 text-gray-600"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="w-full col-span-1">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="w-full overflow-x-scroll text-gray-500">
          {data && data.length == 0 && (
            <div>
              <p className="mt-10 text-2xl text-center">No orders</p>
            </div>
          )}
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="grid !w-full grid-cols-9  place-content-center items-center py-2  border-b-2 border-gray-200"
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className="w-full text-center capitalize min-w-[14ca0px] "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
