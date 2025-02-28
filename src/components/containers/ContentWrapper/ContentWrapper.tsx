import styles from "./ContentWrapper.module.scss";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles["container"]}>{children}</div>;
};

export default ContentWrapper;
