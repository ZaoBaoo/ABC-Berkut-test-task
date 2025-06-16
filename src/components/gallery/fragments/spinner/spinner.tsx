import styles from './spinner.module.scss'
// icons
import SpinnerIcon from '@/assets/icons/spinner.svg?react'
import { clsx } from 'clsx'

interface Props {
  className?: string
}

const Spinner = ({ className }: Props) => (
  <div className={clsx(styles.wrapper, className)}>
    <SpinnerIcon className={styles.spinner} />
  </div>
)

export { Spinner }
