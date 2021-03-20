import { useState } from "react";
import { saveDataToLocalStorage } from "../common/Util.jsx";

const useForm = (validate) => {
  const [values, setValues] = useState({ username: "", difficultyLevel: "1" });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    if (errors.username) setErrors(errors.username, "");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    saveDataToLocalStorage("username", values.username);
    saveDataToLocalStorage("difficultyLevel", values.difficultyLevel);
    setErrors(validate(values));
    if (values.username.length > 0) {
      window.history.pushState({}, "", "/game-page");
      const redirectEvent = new PopStateEvent("popstate");
      window.dispatchEvent(redirectEvent);
    }
  };
  return { handleChange, handleSubmit, values, errors };
};
export default useForm;
