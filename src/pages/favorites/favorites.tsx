import styles from './favorites.module.scss'
import { FavoritesView } from '@/pages/favorites/fragments/favorites-view'

const Favorites = () => {
  return (
    <div className={styles.favorites}>
      <h1 className={styles.title}>Избранное</h1>

      <div className={`container`}>
        <FavoritesView />
      </div>
    </div>
  )
}

export { Favorites }
