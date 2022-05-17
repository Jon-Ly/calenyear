import React from "react"
import { useEffect, useState } from "react"
import styles from './calendar.module.css'
import { GetMonthString, GetDaysInTheYear } from "./calendar-helper"
import Event from '../../models/Event'
import EventBlock from "../event-block/event-block"

interface CalendarProps {
    events?: Event[],
    year: number
}

export default function CalendarGrid(props: CalendarProps) {
    const { events, year } = {...props}
    const [dates, setDates] = useState<Date[]>([])
    const calendarRowCount = GetDaysInTheYear(year)
    const flexGap = 1.5 // rem
    const textHeight = 20 // px
    const columns = 12
    const calendarRowStyle = `repeat(${calendarRowCount}, calc(${flexGap}rem + ${textHeight}px))`
    const calendarColumnStyle = `repeat(${columns}, 1fr)`

    useEffect(() => {
        initializeDates()
    }, [])

    function initializeDates(): void {
        const date = new Date(`${year}-01-01T00:00:00`)

        const result = []

        while(year === date.getFullYear()) {
            result.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }

        setDates(result)
    }

    function IsToday(date: Date): boolean {
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
            return null
        }
    }

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.calendar}>
                {
                    dates.map((date, index) => (
                        <div key={`${date.getMonth()}-${date.getDate()}`} className={styles.monthContainer}>
                            {MonthText(date)}
                            <div className={styles.divider}></div>
                            {
                                IsToday(date) ? (
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
            </div>
            <div className={styles.calendarGrid} style={{gridTemplateRows: `${calendarRowStyle}`}}>
                {
                    events?.map((event, index) => (
                        <EventBlock key={`${event.name} + ${index}`} event={event} gridColumns={columns}/>
                    ))
                }
            </div>
        </div>
    )
}