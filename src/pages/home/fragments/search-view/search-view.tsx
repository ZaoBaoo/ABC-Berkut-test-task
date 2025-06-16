import styles from './search-view.module.scss'
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
// components
import { Spinner } from '@/components/gallery/fragments/spinner'
import { Gallery } from '@/components/gallery'
// controllers
import { photosController } from '@/controllers/photosController'
// types
import type { Basic } from 'unsplash-js/dist/methods/photos/types'

interface RandomViewProps {
  countElements?: number
  query: string
}

const SearchView = ({ query, countElements = 8 }: RandomViewProps) => {
  const [images, setImages] = useState<Basic[]>([])
  const [hasMore, setHasMore] = useState(true)
  const countRef = useRef(1)

  const fetchMore = async () => {
    if (query) {
      const photos = await photosController.searchPhotos({ query, page: countRef.current, perPage: countElements })

      countRef.current += 1

      if (photos.length === 0) return setHasMore(false)

      setTimeout(() => {
        setImages((state) => [...state, ...photos])
      }, 200)
    }
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

export { SearchView }
