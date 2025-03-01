import incomingIcon from "@assets/icons/callTypes/incoming.svg";
import outgoingIcon from "@assets/icons/callTypes/outgoing.svg";
import missedIcon from "@assets/icons/callTypes/missed.svg";
import failedIcon from "@assets/icons/callTypes/outgoing.svg";
import styles from "./CallTypeIcon.module.scss";

const CallTypeIcon = ({ type, status }: { type: number; status: string }) => {
  const getIcon = () => {
    if (status === "missed") return missedIcon;
    if (status === "failed") return failedIcon;
    return type === 1 ? incomingIcon : outgoingIcon;
  };

  return <img src={getIcon()} alt="Call Type" className={styles.icon} />;
};

export default CallTypeIcon;
