import { useState } from "react";
import BaseButton from "../../ui/button";
import BaseInput from "../../ui/input";
import { Icon } from "../../ui/Icon";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import * as Yup from "yup";
import useForm from "../../../hooks/useForm";
import useRequest from "../../../hooks/useRequest";
import { signup } from "../../../../api/auth";
import regex from "../../../../utils/regex";
import toast from "react-hot-toast";

export default function Register() {
  const [click, setClick] = useState(false);
  const { makeRequest: signUpRequest, isLoading } = useRequest(signup);
  const navigate = useNavigate();

  const toggle = () => {
    setClick((click) => !click);
  };

  const { getFieldProps, handleSubmit } = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Email Address is required")
        .matches(regex.email, "Invalid Email"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          regex.password,
          "Password must contain at least 6 characters with at least one of each: uppercase, number and special"
        ),
    }),
    onSubmit: async (data) => {
      const [res, err] = await signUpRequest(data);
      if (err) {
        toast.error(err.message);
      }
      if (res) {
        navigate("/login");
      }
    },
  });

  return (
    <div className="login bg-gradient">
      <div className="app-container">
        <div className="login__content">
          <h3>Sign up</h3>
          <p className="text--xs login__content__description">
          </p>

          <form className="login__content__form" onSubmit={handleSubmit}>
            <div className="login__content__form__inputs">
              <BaseInput
                label="First name"
                placeholder="John"
                {...getFieldProps("firstname")}
              />
              <BaseInput
                label="Last Name"
                placeholder="Doe"
                {...getFieldProps("lastname")}
              />
              <BaseInput
                label="Email address"
                placeholder="example@fobework.com"
                {...getFieldProps("email")}
              />
              <div className="password-text">
                <BaseInput
                  label="Password"
                  type={click ? "text" : "password"}
                  placeholder="**********"
                  {...getFieldProps("password")}
                />

                <button type="button" onClick={toggle} className="eye">
                  <Icon name={`${click ? "eye-closed" : "eye-closed"}`} />
                </button>
              </div>
            </div>

            <BaseButton
              variant="primary"
              className="login__content__button"
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
            >
              Sign up
            </BaseButton>
          </form>
        </div>
      </div>
    </div>
  );
}
