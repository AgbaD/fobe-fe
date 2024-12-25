import { useState } from "react";
import BaseButton from "../../ui/button";
import BaseInput from "../../ui/input";
import { Icon } from "../../ui/Icon";
import "./index.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import regex from "../../../../utils/regex";
import useForm from "../../../hooks/useForm";
import * as Yup from "yup";
import useRequest from "../../../hooks/useRequest";
import { login } from "../../../../api/auth";
import { useAuthContext } from "../../../context/authContext";
import { toast } from "react-hot-toast";

export default function Login() {
  const [click, setClick] = useState(false);
  const { makeRequest: loginRequest, isLoading } = useRequest(login);
  const { setToken, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const toggle = () => {
    setClick((prev) => !prev);
  };

  const pathToNavigate = `${params.get("to") ?? "/"}`

  
  const { handleSubmit, getFieldProps } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email Address is required")
        .matches(regex.email, "Invalid Email"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (data) => {
      const [res, err] = await loginRequest(data);
      if (err) {
        toast.error(err.message);
      } // display error with toast

      if (res) {
        setToken(res.data.token);
        setUser(res.data.user);
        navigate(pathToNavigate);
      }
    },
  });

  return (
    <div className="login bg-gradient">
      <div className="app-container">
        <div className="login__content">
          <h3>Log in to your account</h3>
          <p className="text--xs login__content__description">
          </p>

          <form className="login__content__form" onSubmit={handleSubmit}>
            <div className="login__content__form__inputs">
              <BaseInput
                label="Email address"
                placeholder="example@fobework.com"
                {...getFieldProps("email")}
              />
              <div className="password-text">
                <BaseInput
                  label="Password"
                  type={click ? "text" : "password"}
                  placeholder="****************"
                  {...getFieldProps("password")}
                />

                <button type="button" onClick={toggle} className="eye">
                  <Icon name={`${click ? "eye-closed" : "eye-closed"}`} />
                </button>
              </div>
            </div>
            <div>
              <BaseButton
                variant="primary"
                className="login__content__button"
                isLoading={isLoading}
                disabled={isLoading}
                type="submit"
              >
                Sign in
              </BaseButton>
            </div>
          </form>

          <div className="forget-password">
            <p className="text--2xs">
              {" "}
              <span>Not registered?</span>{" "}
              <Link to="/register">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
