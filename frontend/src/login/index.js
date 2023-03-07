import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../redux/actions/authActions";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // SET ERRORS
  const [stateError, setStateError] = useState("");
  // GET STATE FROM STORE
  const { user, errorLogin, isAuthenticated } = useSelector(
    (state) => state.user
  );
  console.log(user)
  // DISPLAY OR HIDDEN PASSWORD
  const [displayPw, setDisplayPw] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    phone: "",
    dayOfBirth: "",
    fullName: "",
  };
  const submitForm = async (values) => {
    await dispatch(authLogin(values.email, values.password));

  };
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // VALIDATE EMAIL
    if (!values.email) {
      errors.email = "! Email must be filled out";
    } else if (!regex.test(values.email)) {
      errors.email = "! Invalid email format";
    } else if (values.email.length > 30) {
      errors.email = "! Email incorrect";
    }
    // VALIDATE PASSWORD
    if (!values.password) {
      errors.password = "! Password must be filled out";
    } else if (values.password.length > 30) {
      errors.password = "! Password incorrect";
    }
    return errors;
  };

  useEffect(() => {
    if (errorLogin) {
      setStateError(errorLogin);
    }
  }, [errorLogin]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/update/${user._id}`);
    }
  },[isAuthenticated, navigate, user._id])

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
        } = formik;
        return (
          <div className="login-box">
            <form className="form-group" onSubmit={handleSubmit}>
              <div className="title">
                <h1>Login</h1>
                <p className={`${stateError ? "errs" : ""}`}>{stateError}</p>
              </div>
              <div className="user-box">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`${errors.email ? "is-error" : ""}`}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="example@kyanon.digital"
                />
                {errors.email && touched.email && (
                  <span className="error">{errors.email}</span>
                )}
              </div>
              <div className="user-box">
                <label htmlFor="password">Password:</label>
                <input
                  type={`${displayPw === true ? "text" : "password"}`}
                  name="password"
                  id="password"
                  className={`${errors.password ? "is-error" : ""}`}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="*******"
                />
                {errors.password && touched.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <div className="footer-box">
                <div className="checkbox">
                  <input
                    onClick={() => setDisplayPw(!displayPw)}
                    type="checkbox"
                    id="checkbox"
                    name="checkbox"
                  />
                  <label htmlFor="checkbox">Show password</label>
                </div>
                <div className="btn-submit">
                  <button type="submit">Sign in</button>
                </div>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default Login;
