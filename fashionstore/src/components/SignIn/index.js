import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStartAction } from "../../redux/User/user.actions";
import "./styles.scss";
import FormInput from "../../forms/FormInput";
import Button from "../../forms/Button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  //at sign-in
  useEffect(() => {
    if (currentUser) {
      resetForm();
      navigate("/");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStartAction({ email, password }));
  };

  const googleHandleSignIn = () => {
    // dispatch(signInWithGoogleAction);
  };

  return (
    <div className="signin">
      <div className="wrap">
        <h2>Login</h2>
        <div className="formWrapper">
          <form onSubmit={handleSubmit}>
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
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
