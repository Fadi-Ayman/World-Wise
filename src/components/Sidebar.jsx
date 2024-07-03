import { Link,Outlet} from 'react-router-dom'
import styles from './Sidebar.module.css'
import AppNav from './AppNav'

function Sidebar() {
  
  return (
    <aside className={styles.sidebar}>
      <Link to='/' > <img src="/logo.png" alt="Logo" /> </Link>
      <AppNav />
      <Outlet/>
      <footer className={styles.footer}>
        <p className={styles.copyright} >
        &copy; Copyright {new Date().getFullYear()} By WorldWise Inc.
        </p>
      </footer>



    </aside>
  )
}

export default Sidebar
