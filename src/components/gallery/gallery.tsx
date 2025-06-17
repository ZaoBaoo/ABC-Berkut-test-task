import styles from './gallery.module.scss'
import { Link } from 'react-router'
// types
import type { Basic, Random } from 'unsplash-js/dist/methods/photos/types'

interface GalleryProps {
  images: Random[] | Basic[]
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <div className={styles.innerImages}>
      {images.map((image) => (
        <Link to={`/photos/${image.id}`} key={image.id}>
          <img className={styles.imageCard} src={image.urls.regular} alt="" />
        </Link>
      ))}
    </div>
  )
}

export { Gallery }
