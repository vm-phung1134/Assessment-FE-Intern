/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./style.scss";
import { getOneUser, updateOneUser } from "../redux/actions/authActions";
import { Link, useParams } from "react-router-dom";

function UpdateUser() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const { user} = useSelector((state) => state.user);
  const initialValues = {
    email: user.email,
    phone: user.phone,
    dayOfBirth: user.dayOfBirth,
    fullName: user.fullName,
  };
  const submitForm = async (values) => {
    await dispatch(updateOneUser(user._id, values))
    alert("Update user successfully");
  }
  const validate = (values) => {
    let errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    // validate for email
    if (!values.email) {
      errors.email = "! Email must be filled out";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "! Invalid email format";
    } else if (values.email.length > 30) {
      errors.email = "! Email incorrect";
    }
    // validate for phone
    if (!values.phone) {
      errors.phone = "! Phone must be filled out";
    } else if (!regexPhone.test(values.phone)) {
      errors.phone = "! Invalid phone format";
    } else if (values.phone.length > 30) {
      errors.phone = "! Phone incorrect";
    }
    return errors;
  };

  useEffect(() => {
    dispatch(getOneUser(id));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
      enableReinitialize
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
          <div className="update-box">
            <form className="form-group" onSubmit={handleSubmit}>
              <div className="title">
                <h1>Profile</h1>
              </div>
              <div className="user-box">
                <label htmlFor="fullName">Full name:</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="user-box">
                <label htmlFor="dayOfBirth">Day of birth:</label>
                <input
                  type="text"
                  name="dayOfBirth"
                  id="dayOfBirth"
                  value={values.dayOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="user-box">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  id="email2"
                  className={`${errors.email ? "is-error" : ""}`}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <span className="error">{errors.email}</span>
                )}
              </div>
              <div className="user-box">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className={`${errors.phone ? "is-error" : ""}`}
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone && (
                  <span className="error">{errors.phone}</span>
                )}
              </div>
              <div className="footer-box">
                <Link to="/">
                  <div className="btn-cancel">
                    <p>Cancel</p>
                  </div>
                </Link>
                
                <div className="btn-submit">
                  <button type="submit">Update</button>
                </div>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default UpdateUser;
