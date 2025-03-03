import styles from "./Badge.module.scss";

type BadgeVariant = "bad" | "good" | "excellent";

const Badge = ({
  text,
  variant = "good",
}: {
  text: string;
  variant: BadgeVariant;
}) => {
  return <span className={`${styles.badge} ${styles[variant]}`}>{text}</span>;
};

export default Badge;
