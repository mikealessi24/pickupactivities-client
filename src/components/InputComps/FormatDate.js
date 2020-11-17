import React from "react";

export default function FormatDate({ activity }) {
  const renderDate = activity.date.split("-").reverse();
  const formattedDate = `${renderDate[1]}/${renderDate[0]}/${renderDate[2]}`;
  return <div>{formattedDate}</div>;
}
