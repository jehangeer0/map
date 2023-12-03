import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const CustomMarkerIcon = () => {
  return (
    <div style={{ color: "#007BFF", fontSize: "24px" }}>
      <FontAwesomeIcon icon={faMapMarkerAlt} />
    </div>
  );
};

export default CustomMarkerIcon;
