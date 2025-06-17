import styles from './not-found.module.scss'

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Страница не найдена :(</p>
    </div>
  )
}

export { NotFound }
