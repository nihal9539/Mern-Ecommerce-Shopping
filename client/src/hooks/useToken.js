import { toast } from "react-toastify";

const useToken = () => {
  const userString = localStorage.getItem("user");
  let userObject = null;
  let token = null;

  try {
    userObject = JSON.parse(userString); // May throw an error
  } catch (error) {
    toast.error(error);
  }

  // Check if user object and token exist
  if (userObject && userObject.token) {
    token = userObject.token;
  }
  const headers = { Authorization: `Bearer ${token}` };
  return { headers };
};

export default useToken;
