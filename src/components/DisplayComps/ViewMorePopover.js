import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  typography: {},
}));

export default function ViewMorePopover({ deleteAct, editAct }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <img src="/viewMore.png" />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Typography className={classes.typography}>
          <div style={style.contentCont}>
            <Button onClick={() => editAct()}>
              <EditIcon />
              Edit
            </Button>
            <Button onClick={() => deleteAct()}>
              <DeleteIcon />
              Delete
            </Button>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}

const style = {
  contentCont: {
    width: "100px",
    dipslay: "flex",
    flexDirection: "column",
  },
};
