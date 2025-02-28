import styles from "./App.module.scss";
import CallsTable from "../components/ContentWrapper/CallsTable/CallsTable";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";

function App() {
  return (
    <>
      <main className={styles["main"]}>
        <ContentWrapper>
          <CallsTable />
        </ContentWrapper>
      </main>
    </>
  );
}

export default App;
