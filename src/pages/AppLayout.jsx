import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import ProtectionRoutes from "./ProtectionRoutes";

function AppLayout() {
  return (
    <main className={styles.app}>
      <ProtectionRoutes>
        <Sidebar />
        <Map />
      </ProtectionRoutes>
    </main>
  );
}

export default AppLayout;
