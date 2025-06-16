import styles from './view-images.module.scss'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
// utils
import { scrollToBlock } from '@/utils/scroll-to-block'
// components
import { RandomView } from '@/pages/home/fragments/random-view'
import { SearchView } from '@/pages/home/fragments/search-view'

export type Mode = 'random' | 'search' | null

const ViewImages = () => {
  const [mode, setMode] = useState<Mode>(null)
  const [searchParams] = useSearchParams()

  const query = searchParams.get('q') || ''

  const handleScrollUp = () => {
    scrollToBlock('body')
  }

  useEffect(() => {
    if (query) {
      setMode('search')
    } else {
      setMode('random')
    }
  }, [query])

  return (
    <div className={styles.view}>
      {mode === 'random' && <RandomView />}
      {mode === 'search' && <SearchView query={query} />}

      <button className={styles.actionTop} onClick={handleScrollUp}></button>
    </div>
  )
}

export { ViewImages }
