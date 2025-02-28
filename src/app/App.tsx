import styles from "./App.module.scss";
import ContentWrapper from "../components/containers/ContentWrapper/ContentWrapper";
import CallsContainer from "../components/containers/CallsContainer";

function App() {
  return (
    <>
      <main className={styles["main"]}>
        <ContentWrapper>
          <CallsContainer />
        </ContentWrapper>
      </main>
    </>
  );
}

export default App;
