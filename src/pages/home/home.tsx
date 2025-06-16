import styles from './home.module.scss'
// components
import { ViewImages } from '@/pages/home/fragments/view-images'

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={'container'}>
        <ViewImages />
      </div>
    </div>
  )
}

export { Home }
