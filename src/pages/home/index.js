import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Main } from "./styled";
const HomePage = () => {
  const { getHotline } = useDispatch().hotline;
  const { getVirtualNumber } = useDispatch().virtualNumber;
  const { getTrunkManagement, searchGroup } = useDispatch().trunkManagement;
  const { getCustomer } = useDispatch().customer;

  useEffect(() => {
    getHotline();
    getVirtualNumber();
    getTrunkManagement();
    searchGroup();
    getCustomer();
  }, []);
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
