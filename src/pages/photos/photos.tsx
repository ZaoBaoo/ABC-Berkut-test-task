import styles from './photos.module.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
// components
import { ImageView } from '@/components/Image-view'
// controllers
import { photosController } from '@/controllers/photosController'
// types
import type { Full } from 'unsplash-js/dist/methods/photos/types'

const Photos = () => {
  const [photo, setPhoto] = useState<Full>()
  const { id } = useParams<{ id?: string }>()

  useEffect(() => {
    if (!id) return

    photosController.getPhotoById(id).then(setPhoto)
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <div className={styles.photos}>{photo && <ImageView photo={photo} />}</div>
}

export { Photos }
