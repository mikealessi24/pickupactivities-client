import React from "react";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function SimpleSnackbar({ status, setStatus }) {
  const [open, setOpen] = React.useState(false);
  console.log(status);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setStatus(undefined);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={true}
        autoHideDuration={4000}
        onClose={handleClose}
        // TransitionComponent={() => SlideTransition()}
      >
        <Alert onClose={handleClose} severity={status.type}>
          {status.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
