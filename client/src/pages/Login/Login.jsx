import React, { useEffect, useState } from "react";
import { login ,signup} from "../../Action/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../Componenets/Navbar/Navbar";


const Login = () => {
  const [isSignup, setSignup] = useState(false);
  const {errorMessage } = useSelector((state) => state.authReducer)
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

  const handleSubmit =async (event) =>  {

    event.preventDefault();
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);
    const nameError = validateName(data.Name);
    setErrors({ email: emailError, password: passwordError, name: nameError });
    if (!emailError && !passwordError) {
      if (isSignup) {
        
        dispatch(signup(data))
        
      } else {
        dispatch(login(data))
        
      }
    }else{
      console.log("error");
    }
  };
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }else{
      // navigate(-1)
    }
  }, [errorMessage, dispatch]);

  return (
    <div>
      <div className="  flex flex-row bg-[url(./login_bg_2.jpeg)]    justify-center items-center w-screen h-screen">
        <div
          className={` w-96  ${
            isSignup
              ? "min-h-[31rem] max-h-[45rem]"
              : "min-h-[25rem] max-h-[30rem]"
          }   mt-10 rounded-lg pb-4 bg-black/15   backdrop-blur-sm shadow-2xl shadow-black`}
        >
          <div className="bg-[url(./login_bg_2.jpeg)] h-20 p-0 rounded-xl rounded-b-none bg-no-repeat bg-cover"></div>
          <div className="   p-2 px-10 ">
            {isSignup ? (
              <form action="" className=" text-white space-y-5" onSubmit={handleSubmit}>
                <div className=" flex flex-col gap-2">
                  <h1>Name</h1>
                  <div className="p-2 bg-white rounded-md px-3">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="username"
                      value={data.username}
                      placeholder="Username"
                      className="bg-white border-none w-full outline-none text-black font-semibold"
                    />
                  </div>
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className=" flex flex-col gap-2">
                  <h1>Email</h1>
                  <div className="p-2 bg-white rounded-md px-3">
                    <input
                      type="email"
                      onChange={handleChange}
                      name="email"
                      value={data.email}
                      placeholder="Email"
                      className="bg-white border-none w-full outline-none text-black font-semibold"
                    />
                  </div>
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className=" flex flex-col gap-2">
                  <h1>Password</h1>
                  <div className="p-2 bg-white rounded-md px-3">
                    <input
                      type="password"
                      onChange={handleChange}
                      name="password"
                      value={data.password}
                      placeholder="Password"
                      className="bg-white border-none w-full outline-none text-black font-semibold"
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
                      className=" border-none w-full outline-none text-white font-semibold"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <form action="" className=" text-white space-y-5" onSubmit={handleSubmit}>
                <div className=" flex flex-col gap-2">
                  <h1>Email</h1>
                  <div className="p-2 bg-white rounded-md px-3">
                    <input
                      type="email"
                      onChange={handleChange}
                      name="email"
                      value={data.email}
                      required
                      placeholder="Email"
                      className="bg-white border-none w-full outline-none text-black font-semibold"
                    />
                  </div>
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className=" flex flex-col gap-2">
                  <h1>Password</h1>
                  <div className="p-2 bg-white rounded-md px-3">
                    <input
                      type="password"
                      onChange={handleChange}
                      name="password"
                      value={data.password}
                      required
                      placeholder="Password"
                      className="bg-white border-none w-full outline-none text-black font-semibold"
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
  );
};

export default Login;
