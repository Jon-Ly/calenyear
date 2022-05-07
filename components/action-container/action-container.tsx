import React from 'react'
import styles from './action-container.module.css'

interface ActionContainerProps {
    header?: string,
    children?: React.ReactNode
}

export default function ActionContainer(props: ActionContainerProps) {
    const { children, header } = {...props}

    return (
        <div className={styles.actionContainer}>
            <h3>{header ? header : 'Actions'}</h3>
            {children}
        </div>
    )
}