import axios from "axios";

export const registerUser = (username, email, password) => {
  return axios({
    method: "POST",
    url: "http://localhost:3000/auth/register",
    data: {
      username,
      email,
      password,
    },
  });
};
