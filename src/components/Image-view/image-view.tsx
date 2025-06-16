import styles from './image-view.module.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { clsx } from 'clsx'
// utils
import { downloadImage } from '@/utils/download-image'
import { FAVORITES_KEY } from '@/pages/favorites/fragments/favorites-view'
// types
import type { Full } from 'unsplash-js/dist/methods/photos/types'

interface ImageViewProps {
  className?: string
  photo: Full
}

const ImageView = ({ photo, className }: ImageViewProps) => {
  const { id, urls, user } = photo
  const [isFavorite, setIsFavorite] = useState(false)

  console.log(photo)

  const checkFavorite = () => {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return false
    const ids: string[] = JSON.parse(raw)
    return ids.includes(id)
  }

  const handleAddFavorite = () => {
    const raw = localStorage.getItem(FAVORITES_KEY)
    const ids: string[] = raw ? JSON.parse(raw) : []

    if (!ids.includes(id)) {
      ids.push(id)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids))
      setIsFavorite(true)
    }
  }

  const handleRemoveFavorite = () => {
    const raw = localStorage.getItem(FAVORITES_KEY)
    const ids: string[] = raw ? JSON.parse(raw) : []

    const filtered = ids.filter((item) => item !== id)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
    setIsFavorite(false)
  }

  const handleClick = () => {
    isFavorite ? handleRemoveFavorite() : handleAddFavorite()
  }

  useEffect(() => {
    const isFavorite = checkFavorite()
    setIsFavorite(isFavorite)
  }, [])

  return (
    <div className={clsx(styles.view, className)}>
      <div className={styles.backgroundBlock}>
        <img className={styles.imageBackgroundBlock} src={urls.full} alt="" />
      </div>

      <div className={styles.content}>
        <div className={`container`}>
          <div className={styles.wrapper}>
            <div className={styles.control}>
              <div className={styles.user}>
                <img className={styles.avatar} src={user.profile_image.large} alt="" />
                <div className={styles.wrapperText}>
                  <p className={styles.fullName}>{user.name}</p>
                  <Link className={styles.nickName} to={user.links.html} target="_blank">
                    <span>{`@${user.username}`}</span>
                  </Link>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={clsx(styles.favorites, {
                    [styles['favorites--active']]: isFavorite,
                  })}
                  onClick={handleClick}
                ></button>
                <button className={styles.download} onClick={() => downloadImage(id)}>
                  <span>Download</span>
                </button>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={urls.full} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ImageView }
