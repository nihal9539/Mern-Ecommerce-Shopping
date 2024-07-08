import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProduct } from "../../../Action/ProductAction";
import { DataTable } from "mantine-datatable";
import sortBy from "lodash/sortBy";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import { Edit, EyeIcon, Trash2 } from "lucide-react";
import { ActionIcon, Box, Checkbox, Group, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
const DataTableComponenet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { products, loading } = useSelector((state) => state.productReducer);
  const PAGE_SIZES = [15, 20, 25];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [deleteButtonId, setDeleteButtonId] = useState("");
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(products.slice(0, pageSize));
  const [searchQuery, setSearchQuery] = useState("");
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "name",
    direction: "asc",
  });

  // Fetching Product
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(products.slice(from, to));
  }, [page, pageSize]);

  // New

  const handleSortStatusChange = (status) => {
    setPage(1);
    setSortStatus(status);
  };

  //

  // Sorting and serachng filter
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    // new
    var filteredCompanies = products.filter(
      (company) =>
        company.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company._id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    //
    let currentPageRecords = filteredCompanies.slice(from, to);
    currentPageRecords = sortBy(currentPageRecords, sortStatus.columnAccessor);
    if (sortStatus.direction === "desc") {
      currentPageRecords = currentPageRecords.reverse();
    }
    setRecords(currentPageRecords);
  }, [sortStatus, searchQuery,products]);

  // delete model open
  const handeleDeleteButton = (id) => {
    console.log(id);
    setDeleteButtonId(id);
    document.getElementById("my_modal_2").showModal();
  };
  // delete confirm button
  const handleDeleteOk = () => {
    dispatch(deleteProduct(deleteButtonId))
      dispatch(getAllProduct());
    document.getElementById("my_modal_2").close();
  };
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };
  const handleSelectAllChange = () => {
    if (selectedRows.length === products.length || selectedRows.length !== 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(products.map((order) => order._id));
    }
  };

  const isSelectedAll = selectedRows.length === products.length;
  return (
    <>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 5px",
        }}
        className="border rounded-lg mt-2 p-10"
      >
        <TextInput
          placeholder="Search..."
          className="w-72 mb-4"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        <DataTable
          columns={[
            {
              accessor: "select",
              title: (
                <Checkbox
                  checked={isSelectedAll || selectedRows.length !== 0}
                  onChange={handleSelectAllChange}
                  indeterminate={
                    selectedRows.length < products.length &&
                    selectedRows.length !== 0
                  }
                />
              ),
              textAlign: "left",

              render: (order) => (
                <Checkbox
                  checked={selectedRows.includes(order._id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(order._id);
                  }}
                />
              ),
            },
            {
              accessor: "_id",
              ellipsis: true,

              width: "20%",
              sortable: true,
            },
            {
              accessor: "Image",
              ellipsis: true,
              width: "20%",
              render: (products) => (
                <img src={products?.image[0]?.url} className="w-10 h-10" alt="" />
              ),
            },
            {
              accessor: "productname",
              ellipsis: true,
              width: "20%",
              sortable: true,
            },
            {
              accessor: "subTitle",
              sortable: true,
              ellipsis: true,
              width: 200,
            },
            {
              accessor: "description",
              sortable: true,
              ellipsis: true,
              width: 300,
            },
            {
              accessor: "gender",
              sortable: true,
              ellipsis: true,
            },
            {
              accessor: "price",
              sortable: true,
              ellipsis: true,
            },
            {
              accessor: "Quantity",
              ellipsis: true,
              
              render: (products) =>
                products
                  ? products.sizes.reduce(
                      (total, size) => total + size?.quantity,
                      0
                    )
                  : null,
            },

            {
              accessor: "actions",
              title: <Box mx={6}>Actions</Box>,
              textAlign: "center",
              render: (product) => (
                <Group gap={4} justify="right" wrap="nowrap">
                  <ActionIcon
                    size="md"
                    variant="subtle"
                    color="green"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${product._id}`)
                    }}
                  >
                    <EyeIcon size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    variant="subtle"
                    color="blue"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`edit-product/${product._id}`);
                    }}
                  >
                    <Edit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    variant="subtle"
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();

                      handeleDeleteButton(product._id);
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
          minHeight={400}
          
          withTableBorder
          records={records}
          fetching={loading}
          totalRecords={products.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          paginationActiveBackgroundColor={"black"}
        />
      </div>
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

export default DataTableComponenet;
