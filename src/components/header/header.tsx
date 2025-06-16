import styles from './header.module.scss'
import { Link, useMatch } from 'react-router'
import { clsx } from 'clsx'
// routes
import { ROUTE_PATHS } from '@/routes/paths'
// images
import Logo from '@/assets/images/logo.svg?react'
import FavoritesIcon from '@/assets/icons/favorites-white-icon.svg?react'
import MagnifierIcon from '@/assets/icons/magnifier-white-icon.svg?react'
// fragments
import { Search } from './fragments/search'

const Header = () => {
  const isHomePage = useMatch(ROUTE_PATHS.home)

  return (
    <header className={styles.header}>
      <div className={`container`}>
        <div className={clsx(styles.wrapper, !isHomePage && styles['wrapper--small'])}>
          <Link to={ROUTE_PATHS.home}>
            <Logo className={clsx(styles.logo, !isHomePage && styles['logo--small'])} />
          </Link>
          <nav className={styles.nav}>
            {!isHomePage && (
              <Link className={styles.link} to={ROUTE_PATHS.home}>
                <MagnifierIcon className={styles.magnifierIcon} />
                <span>Поиск</span>
              </Link>
            )}

            <Link className={styles.link} to={ROUTE_PATHS.favorites}>
              <FavoritesIcon className={styles.favoritesIcon} />
              <span>Избранное</span>
            </Link>
          </nav>
        </div>
      </div>
      {isHomePage && <Search />}
    </header>
  )
}

export { Header }
