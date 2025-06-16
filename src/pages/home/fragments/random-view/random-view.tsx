import styles from './random-view.module.scss'
import { useEffect, useRef, useState } from 'react'
// libs
import InfiniteScroll from 'react-infinite-scroll-component'
// components
import { Spinner } from '@/components/gallery/fragments/spinner'
import { Gallery } from '@/components/gallery'
// controllers
import { photosController } from '@/controllers/photosController'
// types
import type { Random } from 'unsplash-js/dist/methods/photos/types'

interface RandomViewProps {
  countElements?: number
}

const RandomView = ({ countElements = 8 }: RandomViewProps) => {
  const [images, setImages] = useState<Random[]>([])
  const [hasMore, setHasMore] = useState(true)
  const seenIdsRef = useRef<Set<string>>(new Set())

  const fetchMore = async () => {
    const photos = await photosController.getRandomPhotos(countElements)

    if (photos.length === 0) {
      setHasMore(false)
      return
    }

    const filteredPhoto = photos.filter((photo) => !seenIdsRef.current.has(photo.id))

    filteredPhoto.forEach((item) => seenIdsRef.current.add(item.id))

    setTimeout(() => {
      setImages((state) => [...state, ...filteredPhoto])
    }, 200)
  }

  useEffect(() => {
    fetchMore()
  }, [])

  return (
    <InfiniteScroll
      className={styles.infiniteScroll}
      next={fetchMore}
      hasMore={hasMore}
      loader={<Spinner />}
      dataLength={images.length}
    >
      <Gallery images={images} />
    </InfiniteScroll>
  )
}

export { RandomView }
