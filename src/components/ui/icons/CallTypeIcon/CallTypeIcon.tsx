import React from "react";
import incomingIcon from "@assets/icons/callTypes/incoming.svg";
import outgoingIcon from "@assets/icons/callTypes/outgoing.svg";
import missedIcon from "@assets/icons/callTypes/missed.svg";
import failedIcon from "@assets/icons/callTypes/failed.svg";
import styles from "./CallTypeIcon.module.scss";
import { CallStatus, InOutCallType } from "@/constants";

interface CallTypeIconProps {
  type: InOutCallType;
  status: CallStatus;
}

const CallTypeIcon: React.FC<CallTypeIconProps> = ({ type, status }) => {
  const getIcon = () => {
    if (status === CallStatus.Connected) {
      return type === InOutCallType.Incoming ? incomingIcon : outgoingIcon;
    }

    return type === InOutCallType.Incoming ? missedIcon : failedIcon;
  };

  return <img src={getIcon()} alt="Call Type" className={styles.icon} />;
};

export default CallTypeIcon;
