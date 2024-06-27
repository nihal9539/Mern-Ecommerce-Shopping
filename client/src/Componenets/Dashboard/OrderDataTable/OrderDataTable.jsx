import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changingOrderStatus,
  deleteOrder,
  getAllOrder,
} from "../../../Action/OrderAction";
import {
  ActionIcon,
  Box,
  Checkbox,
  Group,
  Select,
  TextInput,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import sortBy from "lodash/sortBy";
import { EyeIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const OrderDataTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allOrders, loading } = useSelector((state) => state.orderReducer);

  console.log(allOrders);
  useEffect(() => {
    dispatch(getAllOrder());
  }, []);
  const PAGE_SIZES = [15, 20, 25];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [deleteButtonId, setDeleteButtonId] = useState("");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState(allOrders.slice(0, pageSize));
  const [searchQuery, setSearchQuery] = useState("");
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "name",
    direction: "asc",
  });

  // Fetching Product

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setOrders(allOrders.slice(from, to));
  }, [page, pageSize]);

  // New
  const handleSortStatusChange = (status) => {
    setPage(1);
    setSortStatus(status);
  };

  //
  const [statusFilter, setStatusFilter] = useState("All");

  // Sorting
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    let filteredOrders = allOrders;
    switch (statusFilter) {
      case "Pending":
        filteredOrders = allOrders.filter(
          (order) => order.orderStatus === "Pending"
        );
        break;
      case "Processing":
        filteredOrders = allOrders.filter(
          (order) => order.orderStatus === "Processing"
        );
        break;
      case "Shipped":
        filteredOrders = allOrders.filter(
          (order) => order.orderStatus === "Shipped"
        );
        break;
      case "Delivered":
        filteredOrders = allOrders.filter(
          (order) => order.orderStatus === "Delivered"
        );
        break;
      default:
        break;
    }
    let currentPageRecords = filteredOrders.slice(from, to);
    currentPageRecords = sortBy(currentPageRecords, sortStatus.columnAccessor);
    if (sortStatus.direction === "desc") {
      currentPageRecords = currentPageRecords.reverse();
    }
    setOrders(currentPageRecords);
  }, [page, pageSize, allOrders, sortStatus, statusFilter]);
  // delete model open
  const handeleDeleteButton = (id) => {
    console.log(id);
    setDeleteButtonId(id);
    document.getElementById("my_modal_2").showModal();
  };
  // delete confirm button
  const handleDeleteOk = () => {
    dispatch(deleteOrder(deleteButtonId)).then(() => {
      dispatch(getAllOrder());
    });
    document.getElementById("my_modal_2").close();
  };

  //
  const [orderStatuses, setOrderStatuses] = useState([]);
  const handleStatusChange = (orderId, value) => {
    setOrderStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: value,
    }));
    // const status = { status: value };
    dispatch(changingOrderStatus(orderId, { status: value }));
  };
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };
  const handleSelectAllChange = (e) => {
    if (selectedRows.length === orders.length || selectedRows.length !== 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(orders.map((order) => order._id));
    }
  };

  const isSelectedAll = selectedRows.length === orders.length;

  return (
    <>
      <Helmet>
        <title>Order Management</title>
        <meta
          name="description"
          content="Manage all customer orders, update statuses, and view details."
        />
      </Helmet>
      <section aria-labelledby="order-management-section">
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 5px",
          }}
          className="border rounded-lg mt-2 p-10"
        >
          <div className="flex mb-4  justify-between">
            <TextInput
              placeholder="Search..."
              className="w-72 "
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
            />
            <Group position="apart">
              <Select
                data={["All", "Pending", "Processing", "Shipped", "Delivered"]}
                value={statusFilter}
                className="w-36"
                onChange={(value) => setStatusFilter(value)}
              />
            </Group>
          </div>
          <DataTable
            columns={[
              {
                //   accessor: "select",
                accessor: "actions",

                title: (
                  <Checkbox
                    checked={isSelectedAll || selectedRows.length !== 0}
                    onChange={handleSelectAllChange}
                    indeterminate={
                      selectedRows.length < orders.length &&
                      selectedRows.length !== 0
                    }
                  />
                ),
                render: (order) => (
                  <Checkbox
                    checked={selectedRows.includes(order._id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(order._id);
                    }}
                    aria-label={`Select order ${order._id}`}
                  />
                ),
              },
              {
                accessor: "_id",
                ellipsis: true,
                width: "20%",
                sortable: true,
                title: "Order ID",
              },

              {
                accessor: "user",
                ellipsis: true,
                render: (order) => (
                  <div>
                    <h1 className="font-semibold text-xs">
                      {order?.userId?.username}
                    </h1>
                    <p className="text-gray-700 text-xs">
                      {order?.userId?.email}
                    </p>
                  </div>
                ),
                sortable: true,
              },
              {
                accessor: "Order Time",
                sortable: true,
                ellipsis: true,
                render: (order) => (
                  <div>
                    <div className="font-semibold text-xs">
                      {format(new Date(order.createdAt), "yyyy-MM-dd ")}
                    </div>
                    <div className="text-gray-700 text-xs">
                      {format(new Date(order.createdAt), "hh:mm:ss a")}
                    </div>
                  </div>
                ),
              },
              {
                accessor: "Total",
                sortable: true,
                ellipsis: true,
                render: (order) =>
                  `₹ ${order?.orderItems?.reduce(
                    (total, item) =>
                      total + parseInt(item.quantity) * item.price,
                    0
                  )}`,
              },
              {
                accessor: "quantity",
                sortable: true,
                ellipsis: true,
                render: (order) =>
                  order.orderItems.reduce(
                    (total, item) => total + parseInt(item.quantity),
                    0
                  ),
              },
              {
                accessor: "orderStatus",
                render: (order) => (
                  <Select
                    key={order._id}
                    data={["Pending", "Processing", "Shipped", "Delivered"]}
                    value={orderStatuses[order._id] || order.orderStatus}
                    className="w-32 selection:bg-red-500"
                    onChange={(value) => handleStatusChange(order._id, value)}
                    placeholder="Select status"
                    aria-label={`Change status of order ${order._id}`}
                  />
                ),
              },

              {
                accessor: "actions",
                title: <Box mx={6}>Actions</Box>,
                textAlign: "right",

                render: (order) => (
                  <Group justify="center" wrap="nowrap">
                    <ActionIcon
                      size="md"
                      variant="subtle"
                      color="green"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`${order._id}`);
                      }}
                      aria-label={`View order ${order._id}`}
                    >
                      <EyeIcon size={16} />
                    </ActionIcon>
                    <ActionIcon
                      size="md"
                      variant="subtle"
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        handeleDeleteButton(order._id);
                      }}
                    >
                      <Trash2 size={16} />
                    </ActionIcon>
                  </Group>
                ),
              },
            ]}
            backgroundColor={"white"}
            sortStatus={sortStatus}
            onSortStatusChange={handleSortStatusChange}
            maxHeight={600}
            minHeight={300}
            withTableBorder
            records={orders}
            fetching={loading}
            totalRecords={allOrders.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
            paginationActiveBackgroundColor={"black"}
          />
        </div>
      </section>
      <dialog id="my_modal_2" className="modal  w-screen h-screen ">
        <div
          className={`modal-box bg-white rounded-md  
            min-h-[35vh]
          flex flex-col `}
        >
          <div>
            <h1 className="font-bold text-xl">Comfirmation needed</h1>
            <hr className="my-2 border-black/30 border rounded-full" />
          </div>

          <div className="flex-grow flex  items-center">
            <h1 className="font-semibold text-lg ">
              You Sure you want to delete this item?
            </h1>
          </div>
          <div className=" ">
            <hr className="my-2 border-black/30 border rounded-full" />
            <div className="float-end flex gap-2">
              <div
                onClick={() => document.getElementById("my_modal_2").close()}
                className="  w-full hover:shadow-boxShadow1 px-5  duration-300 border-gray-800 font-semibold border cursor-pointer text-black p-2 text-center rounded-lg"
              >
                Cancel
              </div>
              <div
                onClick={handleDeleteOk}
                className=" bg-black w-full hover:shadow-boxShadow1 px-5  duration-300 border-black border-2 cursor-pointer text-white p-2 text-center rounded-lg"
              >
                Ok
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default OrderDataTable;
