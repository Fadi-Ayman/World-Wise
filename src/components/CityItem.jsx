import { Link } from 'react-router-dom'
import { useCities } from '../contexts/CityProvider'
import styles from './CityItem.module.css'
import { formatDate } from './City'
import { convertToEmoji } from './Form';


function CityItem({emoji,name,date,id,position}) {
  const {deleteCity} = useCities()
  const {lat,lng} = position


  return (
    <Link to={`/applayout/city/${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <p className={styles.name}>{name}</p>
      <p className={styles.date}>{formatDate(date)}</p>
      <button onClick={(e)=>{
        e.preventDefault()
        deleteCity(id)}} 
        className={styles.deleteBtn}>&times;</button>
    </Link>
  )
}

export default CityItem
