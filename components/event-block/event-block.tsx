import styles from './event-block.module.css'
import Event from '../../models/Event'
import { GetDayOfYear, GetDaySpan } from './event-block-helper'

interface EventBlockProps {
    event: Event,
    gridColumns: number
}

export default function EventBlock(props: EventBlockProps) {
    const { event, gridColumns } = {...props}

    function getPositionStyles() {
        if (event.startDate && event.endDate) {
            const todayDayOfYear = GetDayOfYear(event.startDate)
            const eventTimeSpanDays = GetDaySpan(event.startDate, event.endDate)

            const styles =  { 
                gridColumnStart: 1,
                gridColumnEnd: gridColumns,
                gridRowStart: todayDayOfYear,
                gridRowEnd: todayDayOfYear + eventTimeSpanDays
            }

            return styles;
        }

        return {}
    }

    return (
        <div className={styles.eventBlock} style={getPositionStyles()}>
            {event.name}
        </div>
    )
}