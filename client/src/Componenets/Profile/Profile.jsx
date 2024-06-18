import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { updateUserProfile } from "../../Action/UserAction";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import "@mantine/dates/styles.css";
import { Button, Modal, Popover } from "@mantine/core";

const Profile = () => {
  const [value, setValue] = useState(null);
  const user = useSelector((state) => state?.authReducer?.authData?.user);
  const [opened, setOpened] = useState(false);
  const [edit, setEdit] = useState(false);

  const [userData, setUserData] = useState({
    username: user?.username,
    birthday: user?.birthday,
    gender: user?.gender,
  });
  const dispatch = useDispatch();

  // Gender Radio button change
  const handleOptionChange = (event) => {
    edit && setUserData({ ...userData, gender: event.target.value });
  };

  // handle name
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSaveDate = () => {
    setUserData({ ...userData, birthday: dayjs(value).format("DD/MM/YYYY") });
    setOpened(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(user._id, userData));
    setEdit(false);
  };

  return (
    <>
      <h1 className="text-center my-4 text-2xl font-semibold">
        Welcome! {user?.username}
      </h1>

      <div className=" px-10  rounded-lg shadow-lg grid grid-cols-2 gap-4 shadow-black/10 border-2 w-full max-h-screen p-5 ">
        <div className="col-span-2">
          {edit ? (
            <IoClose
              onClick={() => setEdit(false)}
              className="float-right cursor-pointer"
              size={20}
            />
          ) : (
            <FaRegEdit
              onClick={() => setEdit(true)}
              className="float-right cursor-pointer"
              size={20}
            />
          )}
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <span className="text-sm">Name</span>
          <input
            type="text"
            value={userData?.username}
            name="username"
            onChange={handleInput}
            readOnly={edit == false}
            className={` ${
              !edit && "cursor-not-allowed"
            } outline-none border-2 p-2 rounded-md bg-profile-input border-profile-input`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <span className="text-sm">Email</span>
          <input
            type="text"
            name="email"
            value={user?.email}
            readOnly
            className={` cursor-not-allowed
            }  outline-none border-2 p-2 rounded-md bg-profile-input border-profile-input`}
          />
        </div>

        <div className="col-span-1 grid grid-cols-4 gap-x-4">
          <h1 className="text-sm col-span-4 ">Birthday</h1>
          <input
            type="text"
            onClick={() => edit && setOpened(true)}
            readOnly
            value={userData.birthday}
            className={`${
              !edit ? "cursor-not-allowed" : "cursor-pointer"
            } col-span-4
             outline-none  border-2 p-2 rounded-md bg-profile-input border-profile-input`}
          />
          <Modal opened={opened} onClose={() => setOpened(false)} centered>
            <div className="flex justify-center items-center flex-col">
              <DatePicker value={value} onChange={setValue} />
            </div>
            <button
              className=" m-4 float-end bg-black text-white p-2 px-16 rounded-sm  border duration-300 hover:shadow-boxShadow1 border-black"
              onClick={handleSaveDate}
            >
              Save
            </button>
          </Modal>
        </div>
        <div className=" ">
          <h1 className="text-sm  mb-4">Gender</h1>
          <div className="mt-6 flex gap-10">
            <div className="flex justify-center gap-2 ">
              <input
                type="radio"
                className={`${!edit && "cursor-not-allowed"} h-6 w-6`}
                value="male"
                checked={"male" === userData.gender}
                onChange={handleOptionChange}
              />
              <label htmlFor="">Male</label>
            </div>
            <div className="flex justify-center gap-2 ">
              <input
                type="radio"
                className={`${!edit && "cursor-not-allowed"} h-6 w-6`}
                value="female"
                checked={"female" === userData.gender}
                onChange={handleOptionChange}
              />
              <label htmlFor="">Female</label>
            </div>
          </div>
        </div>
        {edit && (
          <div className="  col-span-2 flex justify-center items-center mt-8">
            <button
              onClick={handleSubmit}
              type="submit"
              className=" bg-black text-white p-2 px-16 rounded-sm  border duration-300 hover:shadow-boxShadow1 border-black"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
