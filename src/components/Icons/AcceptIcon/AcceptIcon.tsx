import React from 'react'
import { IconProps } from '../Icon';
import styles from './AcceptIcon.module.scss'

const AcceptIcon: React.FC<IconProps> = ({onClick}) => {
  return (
    <div className={styles.btn} onClick={onClick}>
      <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <g fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 20 L12 28 30 4" />
        </g>
    </svg>
    </div>
  )
}

export default AcceptIcon