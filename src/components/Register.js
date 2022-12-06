import React, { useEffect, useState } from "react";
import { Grid, TextField, Paper, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegisterAction, userGoogleAuthAction } from "../actions/User";
import { GoogleLogin } from "react-google-login";
import { ClIENt_ID } from "../constants/global";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, loading } = useSelector((state) => state.userInfo);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, loading, navigate]);

  const inputHandle = (e) => {
    let { name, value } = e.target;
    if (name === "userName") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submit = async () => {
    if (email && password) {
      dispatch(userRegisterAction({ email, password }));
    } else {
      alert("somthing went wrong");
    }
  };

  const responseSuccesGoogle = (response) => {
    console.log("google success :", response);

    dispatch(userGoogleAuthAction(response));
  };

  const responseErrorGoogle = (response) => {
    console.log("google error :", response);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={4} sx={{ padding: "50px", margin: "20px" }}>
        <h2 align="center">Register page</h2>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              onChange={inputHandle}
              name="userName"
              type={"email"}
              label="Username"
              value={email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={inputHandle}
              label="Password"
              name="password"
              type={"password"}
              value={password}
            />
          </Grid>
          <Grid item xs={12}>
            <GoogleLogin
              theme="dark"
              clientId={ClIENt_ID}
              buttonText="SIGN UP WITH GOOGLE"
              onSuccess={responseSuccesGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Grid>
          <Grid item xs={12}>
            <h6
              align="end"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              alleady have account ?
            </h6>
            <Button onClick={submit} fullWidth variant="contained">
              {" "}
              register{" "}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Register;
