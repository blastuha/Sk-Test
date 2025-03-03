import styles from "./TableRow.module.scss";
import { Call } from "@/models";
import { formatDateToTime } from "@/utils/formatDateToTime";
import CallTypeIcon from "@/components/ui/CallTypeIcon/CallTypeIcon";
import { formatDuration } from "@/utils/formatDuration";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

const TableRow = ({ call }: { call: Call }) => {
  const {
    id,
    in_out,
    date,
    // from_number,
    source,
    status,
    time,
    person_avatar,
    errors,
    partner_data,
  } = call;

  return (
    <tr key={id} className={styles["calls-table__row"]}>
      <td className={styles["calls-table__cell"]}>
        <IconWrapper width={24} height={24}>
          <CallTypeIcon type={in_out} status={status} />
        </IconWrapper>
      </td>
      <td className={styles["calls-table__cell"]}>
        <span className={styles["call-time"]}>{formatDateToTime(date)}</span>
      </td>
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
        <span className={styles["call-number"]}>
          {formatPhoneNumber(partner_data.phone)}
        </span>
      </td>
      <td className={styles["calls-table__cell"]}>
        <span>{source}</span>
      </td>
      <td className={styles["calls-table__cell"]}>
        {errors.includes("Скрипт не использован") && (
          <span className={styles["error-text"]}>Скрипт не использован</span>
        )}
      </td>
      <td className={styles["calls-table__cell"]}>
        <span className={styles["call-duration"]}>{formatDuration(time)}</span>
      </td>
    </tr>
  );
};

export default TableRow;
