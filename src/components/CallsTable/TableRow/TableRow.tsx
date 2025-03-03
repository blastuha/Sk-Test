import styles from "./TableRow.module.scss";
import { Call } from "@/models";
import { formatDateToTime } from "@/utils/formatDateToTime";
import CallTypeIcon from "@/components/ui/CallTypeIcon/CallTypeIcon";
import { formatDuration } from "@/utils/formatDuration";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";

const TableRow = ({ call }: { call: Call }) => {
  const { id, in_out, date, from_number, source, status, time, person_avatar } =
    call;

  return (
    <tr key={id} className={styles["calls-table__row"]}>
      <td className={styles["calls-table__cell"]}>
        <IconWrapper width={24} height={24}>
          <CallTypeIcon type={in_out} status={status} />
        </IconWrapper>
      </td>
      <td className={styles["calls-table__cell"]}>{formatDateToTime(date)}</td>
      <td className={styles["calls-table__cell"]}>
        <div className={styles["calls-table__user"]}>
          <img
            src={person_avatar}
            alt="avatar"
            className={styles["calls-table__avatar"]}
          />
        </div>
      </td>
      <td className={styles["calls-table__cell"]}>
        {formatPhoneNumber(from_number)}
      </td>
      <td className={styles["calls-table__cell"]}>{source}</td>
      <td className={styles["calls-table__cell"]}>{status}</td>
      <td className={styles["calls-table__cell"]}>{formatDuration(time)}</td>
    </tr>
  );
};

export default TableRow;
