import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import { Checkbox } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../../style/table.css";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    height: "100%",
    border: "1px solid blue",
    overflowY: "scroll",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ActivityTable({ signedIn, setSelected }) {
  const [activities, setActivities] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const resp = await axios.post(
          "http://localhost:4000/get-activities-hosted",
          {
            token,
          }
        );
        setActivities(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [activities]);

  const classes = useStyles();

  // want to select more than one item at a time
  function select(id) {
    const arr = [];
    arr.push(id);
  }

  return (
    <div className="table">
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {activities.map((activity) => (
              <>
                {activity.completed === "yes" ? (
                  <TableRow key={activity.id}>
                    <TableCell></TableCell>
                    <TableCell component="th" scope="row">
                      {activity.title}
                    </TableCell>
                    <TableCell align="right">{activity.date}</TableCell>
                    <TableCell align="right">{activity.time}</TableCell>
                    <TableCell align="right">location</TableCell>
                    <TableCell align="right">
                      {activity.completed === "yes" ? "Complete" : "Active"}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <Checkbox
                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                        // checked={rowCount > 0 && numSelected === rowCount}
                        onChange={() => setSelected(activity.id)}
                        // inputProps={{ "aria-label": "select all desserts" }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {activity.title}
                    </TableCell>
                    <TableCell align="right">{activity.date}</TableCell>
                    <TableCell align="right">{activity.time}</TableCell>
                    <TableCell align="right">location</TableCell>
                    <TableCell align="right">
                      {activity.completed === "yes" ? "Complete" : "Active"}
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
