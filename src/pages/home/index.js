import { Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import { Main } from "./styled";
const HomePage = () => {
  return (
    <Main>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="welcome">
        <Typography variant="h3">
          Welcome to MNP & Call Managememt System
        </Typography>
      </div>
    </Main>
  );
};

export default HomePage;
