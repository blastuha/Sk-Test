import React from "react";
import styles from "./CallsTable.module.scss";

const CallsTable = () => {
  return (
    <table className={styles["calls-table"]}>
      <thead className={styles["calls-table__head"]}>
        <tr className={styles["calls-table__row"]}>
          <th className={styles["calls-table__header"]}>Тип</th>
          <th className={styles["calls-table__header"]}>Время</th>
          <th className={styles["calls-table__header"]}>Сотрудник</th>
          <th className={styles["calls-table__header"]}>Звонок</th>
          <th className={styles["calls-table__header"]}>Источник</th>
          <th className={styles["calls-table__header"]}>Оценка</th>
          <th className={styles["calls-table__header"]}>Длительность</th>
        </tr>
      </thead>
      <tbody className={styles["calls-table__body"]}>
        <tr className={styles["calls-table__row"]}>
          <td className={styles["calls-table__cell"]}>19:00</td>
          <td className={styles["calls-table__cell"]}>19:00</td>
          <td className={styles["calls-table__cell"]}>
            <div className={styles["calls-table__user"]}>
              <img
                src="/images/avatar1.jpg"
                alt="Avatar"
                className={styles["calls-table__avatar"]}
              />
              <span className={styles["calls-table__name"]}>Иванов Иван</span>
            </div>
          </td>
          <td className={styles["calls-table__cell"]}>+7 (965) 537-12-12</td>
          <td className={styles["calls-table__cell"]}>Robusta</td>
          <td className={styles["calls-table__cell"]}>
            <span
              className={`${styles["calls-table__status"]} ${styles["calls-table__status--success"]}`}
            >
              Отлично
            </span>
          </td>
          <td className={styles["calls-table__cell"]}>12:06</td>
        </tr>

        <tr className={styles["calls-table__row"]}>
          <td className={styles["calls-table__cell"]}>17:30</td>
          <td className={styles["calls-table__cell"]}>
            <div className={styles["calls-table__user"]}>
              <img
                src="/images/avatar2.jpg"
                alt="Avatar"
                className={styles["calls-table__avatar"]}
              />
              <span className={styles["calls-table__name"]}>Петров Петр</span>
            </div>
          </td>
          <td className={styles["calls-table__cell"]}>+7 (950) 123-45-67</td>
          <td className={styles["calls-table__cell"]}>Robusta</td>
          <td className={styles["calls-table__cell"]}>
            <span
              className={`${styles["calls-table__status"]} ${styles["calls-table__status--error"]}`}
            >
              Скрипт не используется
            </span>
          </td>
          <td className={styles["calls-table__cell"]}>12:06</td>
        </tr>

        <tr className={styles["calls-table__row"]}>
          <td className={styles["calls-table__cell"]}>15:27</td>
          <td className={styles["calls-table__cell"]}>
            <div className={styles["calls-table__user"]}>
              <img
                src="/images/avatar3.jpg"
                alt="Avatar"
                className={styles["calls-table__avatar"]}
              />
              <span className={styles["calls-table__name"]}>Сидоров Сидор</span>
            </div>
          </td>
          <td className={styles["calls-table__cell"]}>+7 (999) 666-77-88</td>
          <td className={styles["calls-table__cell"]}>Google</td>
          <td className={styles["calls-table__cell"]}>
            <span
              className={`${styles["calls-table__status"]} ${styles["calls-table__status--neutral"]}`}
            >
              Плохо
            </span>
          </td>
          <td className={styles["calls-table__cell"]}>10:15</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CallsTable;
