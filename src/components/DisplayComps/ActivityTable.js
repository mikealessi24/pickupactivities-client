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
import FormatTime from "../../components/InputComps/FormatTime";
import FormatDate from "../InputComps/FormatDate";
import { actionButton } from "aws-amplify";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    height: "100%",
    overflowY: "scroll",
    backgroundColor: "#fafafa",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },
});

export default function ActivityTable({ signedIn, setSelected, user, filter }) {
  const [activities, setActivities] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    (async function () {
      const route =
        filter === "host"
          ? "http://localhost:4000/get-all-hosted"
          : "http://localhost:4000/get-all-participated";
      console.log("THE USER", user);
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const resp = await axios.post(route, {
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

  function setAction(id) {
    setSelected(id);
    setChecked(true);
  }

  function unsetAction() {
    setSelected(undefined);
    setChecked(false);
  }

  return (
    <div className="table">
      <TableContainer className={classes.container}>
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
                <TableRow key={activity.id}>
                  <>
                    {activity.completed === "yes" ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        {activity.host === signedIn.username ? (
                          <>
                            <TableCell>
                              {checked === false ? (
                                <Checkbox
                                  onChange={() => setAction(activity.id)}
                                />
                              ) : (
                                <Checkbox onChange={() => unsetAction()} />
                              )}
                            </TableCell>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </>
                    )}
                  </>
                  <TableCell component="th" scope="row">
                    {activity.title}
                  </TableCell>
                  <TableCell>@{activity.host}</TableCell>
                  <TableCell align="right">
                    <FormatDate activity={activity} />
                  </TableCell>
                  <TableCell align="right">
                    <FormatTime activity={activity} />
                  </TableCell>
                  <TableCell align="right">
                    <FormatAddress activity={activity} />
                  </TableCell>
                  <TableCell align="right">
                    {activity.completed === "yes" ? "Complete" : "Active"}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
