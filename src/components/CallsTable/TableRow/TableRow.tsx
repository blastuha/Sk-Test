import React, { useState } from "react";
import styles from "./TableRow.module.scss";
import { Call } from "@/models";
import { formatDateToTime } from "@/utils/formatDateToTime";
import CallTypeIcon from "@/components/ui/icons/CallTypeIcon/CallTypeIcon";
import { formatDuration } from "@/utils/formatDuration";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { InOutCallType, CallStatus } from "@/constants";
import AudioMessage from "@/components/ui/AudioMessage/AudioMessage";
import Badge from "@/components/ui/Badge/Badge";

interface TableRowProps {
  call: Call;
}

const TableRow: React.FC<TableRowProps> = ({ call }) => {
  const {
    id,
    in_out,
    date,
    source,
    status,
    time,
    person_avatar,
    errors,
    partner_data,
    record,
    partnership_id,
  } = call;

  const [isHovered, setIsHovered] = useState(false);

  const [audioPlaying, setAudioPlaying] = useState(false);

  return (
    <tr
      key={id}
      className={styles["calls-table__row"]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className={styles["calls-table__cell"]}>
        <IconWrapper width={24} height={24}>
          <CallTypeIcon
            type={in_out as InOutCallType}
            status={status as CallStatus}
          />
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
        {errors.includes("Скрипт не использован") ? (
          <span className={styles["error-text"]}>Скрипт не использован</span>
        ) : (
          record && <Badge text="Отлично" variant="excellent" />
        )}
      </td>
      <td className={styles["calls-table__cell"]}>
        {record ? (
          isHovered || audioPlaying ? (
            <AudioMessage
              time={formatDuration(time)}
              record={record}
              partnershipId={partner_data?.id || partnership_id}
              onPlayingChange={setAudioPlaying}
            />
          ) : (
            <span className={styles["call-duration"]}>
              {formatDuration(time)}
            </span>
          )
        ) : null}
      </td>
    </tr>
  );
};

export default TableRow;
