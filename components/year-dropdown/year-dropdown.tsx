import { ChangeEvent, useEffect, useState } from "react"
import styles from './year-dropdown.module.css'

interface YearDropdownProps {
    year?: number
    onChange?: (newYear: number) => any
}

export default function YearDropdown(props: YearDropdownProps) {
    const { year, onChange } = {...props}
    const [years, setYears] = useState<number[]>([])

    useEffect(() => {
        initializeYears()
    }, [])

    function initializeYears() {
        const currentDate = new Date()
        const startYear = currentDate.getFullYear()
        const result = []

        for(let i = startYear; i < startYear + 11; i++) {
            result.push(i)
        }

        setYears(result)
    }

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
        if (onChange) {
            onChange(parseInt(event.target.value))
        }
    }

    return (
        <select onChange={onSelectChange} value={year} className={styles.yearDropdown}>
            {
                years.map((year, index) => (
                    <option key={`${year}-option`} value={year}>{year}</option>
                ))
            }
        </select>
    )
}