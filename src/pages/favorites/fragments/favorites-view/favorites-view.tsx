import styles from './favorites-view.module.scss'
import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
// libs
import InfiniteScroll from 'react-infinite-scroll-component'
// components
import { Spinner } from '@/components/gallery/fragments/spinner'
import { Gallery } from '@/components/gallery'
// controllers
import { photosController } from '@/controllers/photosController'
// types
import type { Full } from 'unsplash-js/dist/methods/photos/types'

interface FavoritesViewProps {
  countElements?: number
  className?: string
}

export const FAVORITES_KEY = 'favorites'

const FavoritesView = ({ countElements = 8, className }: FavoritesViewProps) => {
  const [images, setImages] = useState<Full[]>([])
  const [hasMore, setHasMore] = useState(false)
  const countRef = useRef(0)

  const fetchMore = async () => {
    const { current } = countRef
    const raw = localStorage.getItem(FAVORITES_KEY)
    const ids = raw ? JSON.parse(raw) : []
    const selectedIds = ids.slice(current, current + countElements)

    if (selectedIds.length === 0) {
      setHasMore(false)
      return
    }

    const photos = await photosController.getMultiplePhotosByIds(selectedIds)
    countRef.current += countElements
    setImages((state) => [...state, ...photos])

    const remainingIds = ids.slice(countRef.current)
    setHasMore(remainingIds.length > 0)
  }

  useEffect(() => {
    const raw = localStorage.getItem(FAVORITES_KEY)
    const ids = raw ? JSON.parse(raw) : []

    if (ids.length > 0) {
      setHasMore(true)
      fetchMore()
    }
  }, [])

  if (!images.length && !hasMore) {
    return <p className={styles.empty}>Нет избранных фотографий</p>
  }

  return (
    <InfiniteScroll
      className={clsx(styles.infiniteScroll, className)}
      next={fetchMore}
      hasMore={hasMore}
      loader={<Spinner />}
      dataLength={images.length}
      scrollThreshold={0}
    >
      <Gallery images={images} />
    </InfiniteScroll>
  )
}

export { FavoritesView }
