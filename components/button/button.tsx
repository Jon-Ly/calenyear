import React from 'react'
import styles from './button.module.css'

interface ButtonProps {
    children?: React.ReactNode,
    onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
    outline?: boolean,
    className?: string
    type?: 'button' | 'submit' | 'reset' | undefined,
    fullWidth?: boolean
}

export default function Button(props: ButtonProps) {
    const { children, onClick, outline, className, type, fullWidth } = {...props}

    function getButtonStyle(): string {
        return outline ? styles.btnOutline : styles.btnPrimary
    }

    function getClassNames(): string {
        let result = [className, styles.btn]
        result.push(outline ? styles.btnOutline : styles.btnPrimary)
        result.push(fullWidth ? styles.fullWidth : '')

        return result.join(' ')
    }

    return (
        <button type={type ?? 'button'} onClick={onClick} className={getClassNames()}>
            {children}
        </button>
    )
}