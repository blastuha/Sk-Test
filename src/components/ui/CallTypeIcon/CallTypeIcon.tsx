import incomingIcon from "@assets/icons/callTypes/incoming.svg";
import outgoingIcon from "@assets/icons/callTypes/outgoing.svg";
import missedIcon from "@assets/icons/callTypes/missed.svg";
import styles from "./CallTypeIcon.module.scss";
import { CallStatus, InOutCallType } from "@/constants";

interface CallTypeIconProps {
  type: InOutCallType;
  status: CallStatus;
}

const CallTypeIcon = ({ type, status }: CallTypeIconProps) => {
  const getIcon = () => {
    if (status === CallStatus.Missed) {
      return missedIcon;
    }
    return type === InOutCallType.Incoming ? incomingIcon : outgoingIcon;
  };

  return <img src={getIcon()} alt="Call Type" className={styles.icon} />;
};

export default CallTypeIcon;
