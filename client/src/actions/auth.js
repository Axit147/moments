import * as api from "../api";

import Swal from "sweetalert2";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: "AUTH", data });
    navigate("/");
  } catch (error) {
    // alert(error.response.data.message);
    Swal.fire({
      title: "Error!",
      text: error.response.data.message,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: "AUTH", data });
    navigate("/");
  } catch (error) {
    // alert(error.response.data.message);
    Swal.fire({
      title: "Error!",
      text: error.response.data.message,
      icon: "question",
      confirmButtonText: "Ok",
    });
  }
};
