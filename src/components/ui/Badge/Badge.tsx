import styles from "./Badge.module.scss";

type BadgeVariant = "bad" | "good" | "excellent";

const Badge = ({
  text,
  variant = "good",
}: {
  text: string;
  variant: BadgeVariant;
}) => {
  return (
    <div className={`${styles.badge} ${styles[variant]}`}>
      <span>{text}</span>
    </div>
  );
};

export default Badge;
