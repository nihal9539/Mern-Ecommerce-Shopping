import React, { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, signup } from "../../Action/AuthAction";
const LoginModel = ({ modelOpen }) => {
  const [isSignup, setSignup] = useState(false);
  const { errorMessage } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    e.preventDefault();
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const validateEmail = (value) => {
    if (!value.trim()) {
      return <h1 className="text-red-500  text-right">Email is required</h1>;
    }
    return null;
  };
  const validateName = (value) => {
    if (value && !value.trim()) {
      return <h1 className="text-red-500  text-right">Name is required</h1>;
    }
    return null;
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return <h1 className="text-red-500  text-right">Password is required</h1>;
    } else if (value.length < 6) {
      return (
        <h1 className="text-red-500  text-right">
          Password must be at least 6 characters
        </h1>
      );
    }
    return null;
  };
  const handleAuth = () => {
    setSignup(!isSignup);
    setData({
      email: "",
      username: "",
      password: "",
    });
    setErrors({
      email: "",
      password: "",
      name: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);
    const nameError = validateName(data.Name);
    setErrors({ email: emailError, password: passwordError, name: nameError });
    if (!emailError && !passwordError) {
      if (isSignup) {
        dispatch(signup(data));
        errorMessage
          ? toast.error(errorMessage)
          : document.getElementById("my_modal_1").close();
      } else {
        dispatch(login(data));
        errorMessage
          ? toast.error(errorMessage)
          : document.getElementById("my_modal_1").close();
      }
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage, dispatch]);
  const handleModelClose = () => {
    setData({
      email: "",
      username: "",
      password: "",
    });
    setErrors({
      email: "",
      password: "",
      name: "",
    });
  };
  if (modelOpen) {
    return (
      <dialog id="my_modal_1" className="modal ">
        <div
          className={`modal-box bg-white rounded-md  ${
            isSignup ? "min-h-[70vh]" : "min-h-[60vh]"
          } flex flex-col justify-center items-center`}
        >
          <div className=" flex justify-between w-full">
            <span className="text-xl font-semibold ">Welcome to FASHIONUX</span>
            <form method="dialog">
              <button onClick={handleModelClose}>
                <TfiClose />
              </button>
            </form>
          </div>
          {/* login */}
          <div className="  flex justify-center w-full  items-center pt-16  ">
            <div className={` w-full  `}>
              <div className="p-2 px-10 ">
                {isSignup ? (
                  <form
                    action=""
                    className=" text-white space-y-6 "
                    onSubmit={handleSubmit}
                  >
                    <div className=" flex flex-col gap-2">
                      <div className="p-2.5 bg-white border-2 border-black rounded-md px-3">
                        <input
                          type="text"
                          onChange={handleChange}
                          name="username"
                          value={data.username}
                          placeholder="Username"
                          className="placeholder-gray-700 bg-white  border-none w-full outline-none text-black font-semibold"
                        />
                      </div>
                      {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className=" flex flex-col gap-2">
                      {/* <h1 className="text-black">Email</h1> */}
                      <div className="p-2.5 bg-white border-2 border-black rounded-md px-3">
                        <input
                          type="email"
                          onChange={handleChange}
                          name="email"
                          value={data.email}
                          placeholder="Email"
                          className="placeholder-gray-700 bg-white border-none w-full outline-none text-black font-semibold"
                        />
                      </div>
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className=" flex flex-col gap-2">
                      {/* <h1 className="text-black">Password</h1> */}
                      <div className="p-2.5 bg-white border-2 border-black rounded-md px-3">
                        <input
                          type="password"
                          onChange={handleChange}
                          name="password"
                          value={data.password}
                          placeholder="Password"
                          className="placeholder-gray-700 bg-white border-none w-full outline-none text-black font-semibold"
                        />
                      </div>
                      {errors.password && (
                        <p className="error">{errors.password}</p>
                      )}
                    </div>
                    <div className=" space-y-0">
                      <p
                        onClick={handleAuth}
                        className="text-black text-sm font-semibold hover:cursor-pointer"
                      >
                        Already have an account ?
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2">
                      <div className="p-3.5 bg-black rounded-md ">
                        <input
                          type="submit"
                          className="cursor-pointer border-none w-full outline-none text-white font-semibold"
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <form
                    action=""
                    className=" text-white space-y-5"
                    onSubmit={handleSubmit}
                  >
                    <div className=" flex flex-col gap-2">
                      {/* <h1 className="text-black">Email</h1> */}
                      <div className="p-3 bg-white border-2 border-black rounded-md px-3">
                        <input
                          type="email"
                          onChange={handleChange}
                          name="email"
                          value={data.email}
                          placeholder="Email"
                          className="placeholder-gray-700 bg-white border-none w-full outline-none text-black font-semibold"
                        />
                      </div>
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className=" flex flex-col gap-2">
                      {/* <h1 className="text-black">Password</h1> */}
                      <div className="p-3 bg-white border-2 border-black rounded-md px-3">
                        <input
                          type="password"
                          onChange={handleChange}
                          name="password"
                          value={data.password}
                          placeholder="Password"
                          className="placeholder-gray-700 bg-white border-none w-full outline-none text-black font-semibold"
                        />
                      </div>
                      {errors.password && (
                        <p className="error">{errors.password}</p>
                      )}
                    </div>
                    <div className=" space-y-0">
                      <p
                        onClick={handleAuth}
                        className="text-black text-sm font-semibold hover:cursor-pointer"
                      >
                        Don't have an account ?
                      </p>
                    </div>
                    <div className=" flex flex-col gap-2">
                      <div className="p-3.5 bg-black rounded-md ">
                        <input
                          type="submit"
                          className="cursor-pointer border-none w-full outline-none text-white font-semibold"
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    );
  }
};

export default LoginModel;
