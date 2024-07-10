import styles from './NoData.module.css'

function NoData({data}) {

  return (
    <div className={styles.NoData}>
      There Is No {data}, Checkout Map And Add More {data === 'Countries' ? '' : data} 😊
    </div>
  )
}

export default NoData
