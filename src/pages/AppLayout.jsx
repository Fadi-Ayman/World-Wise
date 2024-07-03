import Sidebar from '../components/Sidebar'
import styles from './AppLayout.module.css'
import Map from '../components/Map'

function AppLayout() {
  return (
    <main  className={styles.app}>
      <Sidebar />
      <Map />
    </main>
  )
}

export default AppLayout
