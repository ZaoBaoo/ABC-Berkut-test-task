import styles from './search.module.scss'
import { useSearchParams } from 'react-router'
import { type ChangeEvent, useState } from 'react'
// icons
import MagnifierIcon from '@/assets/icons/magnifier-black-icon.svg?react'

const Search = () => {
  const [value, setValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const setQuery = () => {
    if (value) {
      searchParams.set('q', value)
    } else {
      searchParams.delete('q')
    }

    setSearchParams(searchParams)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setQuery()
    }

    if (e.key === 'Backspace' && value.length <= 1) {
      setSearchParams({})
    }
  }

  return (
    <div className={styles.search}>
      <div className={styles.content}>
        <label className={styles.label} htmlFor="search">
          <input
            className={styles.input}
            value={value}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
            type="search"
            id="search"
            placeholder="Поиск"
          />
          <button className={styles.button} onClick={setQuery}>
            <MagnifierIcon className={styles.magnifierIcon} />
          </button>
        </label>
      </div>
      <div className={styles.decorLine}></div>
    </div>
  )
}

export { Search }
