const useToken = () => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const headers = { Authorization: `Bearer ${token}` };
  return { headers };
};

export default useToken;
