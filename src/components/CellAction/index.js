import React from "react";
import { Preview, Edit, DeleteForever } from "@mui/icons-material";
import { COLOR_GREEN_LIGHT, COLOR_EDIT } from "constants/index";
import { Main } from "./styled";
const CellAction = (props) => {
  const {
    viewAble = true,
    editAble = true,
    deleteAble = true,
    handleEdit,
  } = props;
  return (
    <Main>
      {viewAble && <Preview sx={{ color: COLOR_GREEN_LIGHT }} />}
      {editAble && (
        <Edit
          sx={{ color: COLOR_EDIT }}
          onClick={handleEdit}
          style={{ cursor: "pointer" }}
        />
      )}
      {deleteAble && <DeleteForever />}
    </Main>
  );
};

export default CellAction;
