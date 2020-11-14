import React from "react";

export default function FormatTime({ activity }) {
  const [formattedTime, setFormattedTime] = React.useState(undefined);
  console.log("edit time", activity);
  React.useEffect(() => {
    const time = activity.time;
    const split = time.split(":");
    if (split[0] > 0 && split[0] <= 12) {
      const newTime1 = `${split[0]}:${split[1]} AM`;
      setFormattedTime(newTime1);
    } else {
      const subtract = split[0] - 12;
      const newTime2 = `${subtract}:${split[1]} PM`;
      setFormattedTime(newTime2);
    }
  }, [activity.time]);

  return <>{formattedTime}</>;
}
