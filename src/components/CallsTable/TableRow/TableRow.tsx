import styles from "./TableRow.module.scss";
import { Call } from "@/models";
import { formatDateToTime } from "@/utils/formatDateToTime";
import CallTypeIcon from "@/components/ui/CallTypeIcon/CallTypeIcon";

const TableRow = ({ call }: { call: Call }) => {
  const {
    id,
    in_out,
    date,
    from_number,
    source,
    status,
    time,
    person_avatar,
    person_name,
    person_surname,
  } = call;

  return (
    <tr key={id} className={styles["calls-table__row"]}>
      <td className={styles["calls-table__cell"]}>
        <CallTypeIcon type={in_out} status={status} />
      </td>
      <td className={styles["calls-table__cell"]}>{formatDateToTime(date)}</td>
      <td className={styles["calls-table__cell"]}>
        <div className={styles["calls-table__user"]}>
          <img
            src={person_avatar}
            alt="avatar"
            className={styles["calls-table__avatar"]}
          />
          <span className={styles["calls-table__name"]}>
            {person_name} {person_surname}
          </span>
        </div>
      </td>
      <td className={styles["calls-table__cell"]}>{from_number}</td>
      <td className={styles["calls-table__cell"]}>{source || "—"}</td>
      <td className={styles["calls-table__cell"]}>{status}</td>
      <td className={styles["calls-table__cell"]}>{time}</td>
    </tr>
  );
};

export default TableRow;
