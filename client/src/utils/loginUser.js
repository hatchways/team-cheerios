import axios from "axios";

const loginUser = async (user) => {
    try {
      const res = await axios.post("/api/auth", user);
      localStorage.setItem("HatchwayToken", res.data.token);
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      return res.data.user;
    } catch (err) {
      console.error(err);
    }
  };
  

  export default loginUser;