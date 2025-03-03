import "./global.css";
import styles from "./App.module.css";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main></main>
      </div>
    </>
  );
}

export default App;
