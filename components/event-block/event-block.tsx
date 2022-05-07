import styles from './event-block.module.css'
import Event from '../../models/Event'
import { useEffect } from 'react'
import { GetDayOfYear, GetDaySpan } from './event-block-helper'

interface EventBlockProps {
    event: Event
}

export default function EventBlock(props: EventBlockProps) {
    const { event } = {...props}

    useEffect(() => {
        console.log(event)
    }, [])

    function getPositionStyles() {
        const offsetToNextDay = 2.75 // rem
        const firstDayOffset = 1.5 // rem
        const startLeftOffset = 2 // rem
        const heightIncrements = 2.76 // rem

        if (event.startDate && event.endDate) {
            const todayDayOfYear = GetDayOfYear(event.startDate)
            const eventTimeSpanDays = GetDaySpan(event.startDate, event.endDate)

            const top = firstDayOffset + (todayDayOfYear * offsetToNextDay)
            const left = startLeftOffset
            const height = heightIncrements * eventTimeSpanDays

            return { 
                top: `${top}rem`, 
                left: `${left}rem`,
                height: `${height}rem`
            }
        }

        return {}
    }

    return (
        <div className={styles.eventBlock} style={getPositionStyles()}>
            {event.name}
        </div>
    )
}