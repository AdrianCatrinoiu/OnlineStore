import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserStart } from "../../redux/User/user.actions";
import "./styles.scss";
import FormInput from "../../forms/FormInput";
import Button from "../../forms/Button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SignUp = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, userErr } = useSelector(mapState);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };
  useEffect(() => {
    if (currentUser) {
      reset();
      navigate("/");
    }
  }, [currentUser]);
  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(
      signUpUserStart({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      })
    );
  };

  return (
    <div className="signup">
      <div className="wrap">
        <h2>SignUp</h2>

        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>Errors:{err}</li>;
            })}
          </ul>
        )}

        <div className="formWrap">
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type="text"
              name="firstName"
              value={firstName}
              placeholder="First Name"
              handleChange={(e) => setFirstName(e.target.value)}
            />
            <FormInput
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Last Name"
              handleChange={(e) => setLastName(e.target.value)}
            />
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={(e) => setPassword(e.target.value)}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm your password"
              handleChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit">Register</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
