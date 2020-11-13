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
import FormatAddress from "../../components/InputComps/FormatAddress";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    height: "100%",
    overflowY: "scroll",
  },
});

export default function ActivityTable({ signedIn, setSelected, user }) {
  const [activities, setActivities] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const resp = await axios.post("http://localhost:4000/get-all-hosted", {
          token,
          user,
        });
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
        <Table stickyHeader className={classes.table} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Activity</TableCell>
              <TableCell align="center">Host</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <>
                {activity.completed === "yes" ? (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <span
                        role="img"
                        aria-label="person"
                        style={{
                          fontSize: "22px",
                          position: "relative",
                          left: "10px",
                        }}
                      >
                        ✅
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {activity.title}
                    </TableCell>
                    <TableCell>@{activity.host}</TableCell>
                    <TableCell align="right">{activity.date}</TableCell>
                    <TableCell align="right">{activity.time}</TableCell>
                    <TableCell align="right">
                      <FormatAddress activity={activity} />
                    </TableCell>
                    <TableCell align="right">
                      {activity.completed === "yes" ? "Complete" : "Active"}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={activity.id}>
                    {activity.host === signedIn.username ? (
                      <>
                        <TableCell>
                          <Checkbox onChange={() => setSelected(activity.id)} />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {activity.title}
                        </TableCell>
                        <TableCell>@{activity.host}</TableCell>
                        <TableCell align="right">{activity.date}</TableCell>
                        <TableCell align="right">{activity.time}</TableCell>
                        <TableCell align="right">
                          {" "}
                          <FormatAddress activity={activity} />
                        </TableCell>
                        <TableCell align="right">
                          {activity.completed === "yes" ? "Complete" : "Active"}
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>
                          <div className="participantLogo-container">
                            <img src="/participantLogo.png" />
                          </div>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {activity.title}
                        </TableCell>
                        <TableCell>@{activity.host}</TableCell>
                        <TableCell align="right">{activity.date}</TableCell>
                        <TableCell align="right">{activity.time}</TableCell>
                        <TableCell align="right">
                          {" "}
                          <FormatAddress activity={activity} />
                        </TableCell>
                        <TableCell align="right">
                          {activity.completed === "yes" ? "Complete" : "Active"}
                        </TableCell>
                      </>
                    )}
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
