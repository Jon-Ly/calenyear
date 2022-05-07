import React from "react"
import { useEffect, useState } from "react"
import styles from './calendar.module.css'
import { GetMonthString } from "./calendar-helper"
import Event from '../../models/Event'
import EventBlock from "../event-block/event-block"

interface CalendarProps {
    events?: Event[]
}

export default function Calendar(props: CalendarProps) {
    const { events } = {...props}
    const [dates, setDates] = useState<Date[]>([])

    useEffect(() => {
        initializeDates()
    }, [])

    function initializeDates(): void {
        const currentYear = new Date().getFullYear()
        const date = new Date()
        date.setDate(1)
        date.setMonth(0)

        const result = []

        while(currentYear === date.getFullYear()) {
            result.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }

        setDates(result)
    }

    function isToday(date: Date): boolean {
        return date.getMonth() == new Date().getMonth() && date.getDate() == new Date().getDate();
    }

    function MonthText(date: Date): React.ReactNode {
        if (date.getDate() === 1) {
            return (
                <div key={`month-${date.getMonth()}`} className={styles.monthText}>
                    {GetMonthString(date)}
                </div>
            )
        } else {
            return <></>
        }
    }

    return (
        <div className={styles.calendarContainer}>
            {
                dates.map((date, index) => (
                    <div key={`${date.getMonth()}-${date.getDate()}`} className={styles.monthContainer}>
                        {MonthText(date)}
                        <div className={styles.divider}></div>
                        {
                            isToday(date) ? (
                                <a id='today' className={`${styles.dayText} ${styles.todayHighlight}`}>{date.getDate()}</a>
                            ) : (
                                <div className={styles.dayText}>
                                    {date.getDate()}
                                </div>
                            )
                        }
                    </div>
                ))
            }
            {
                events?.map((event, index) => (
                    <EventBlock key={`${event.name} + ${index}`} event={event}/>
                ))
            }
        </div>
    )
}