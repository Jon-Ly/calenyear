import CalendarEvents from "../../models/CalendarEvents"
import Event from '../../models/Event'
import OverlappingEvent from "../../models/OverlappingEvents"
import StyledEvent from "../../models/StyledEvent"

const millisecondsInYear = 86400000

// Section: Date Helpers

/**
 * 
 * @param date 
 * @returns The day of the year (1-365/366)
 */
export function GetDayOfYear(date: Date): number {
    const dateCopy = new Date(date)

    const firstDateOfYear = new Date().setFullYear(new Date().getFullYear(), 0, 1)
    const firstDayOfYearTimestamp = Math.floor(firstDateOfYear / millisecondsInYear)
    const todayTimestamp = Math.floor(dateCopy.getTime() / millisecondsInYear)

    return todayTimestamp - firstDayOfYearTimestamp + 1
}

/**
 * 
 * @param startDate 
 * @param endDate 
 * @returns The number of days between the dates
 */
export function GetDaySpan(startDate: Date, endDate: Date): number {
    const startDateTimestamp = Math.floor(new Date(startDate).getTime() / millisecondsInYear)
    const endDateTimestamp = Math.floor(new Date(endDate).getTime() / millisecondsInYear)

    return endDateTimestamp - startDateTimestamp
}

// Section: Event Block style calculation Helpers

/**
 * 
 * @param events
 * @returns The overlapping events with their corresponding styles
 */
export function CalculateEventStyles(events: Event[]): CalendarEvents {
    const result = new CalendarEvents()

    for(const event of events) {
        const currentOverlaps: StyledEvent[] = [new StyledEvent({event})]

        for(const e of events) { // find all overlaps
            if (IsOverlappingDates(event, e)) {
                currentOverlaps.push(new StyledEvent({event: e}))
            }
        }

        // check if the any of the overlapping items above already overlap other events
        const existingOverlapKey = GetExistingOverlapKey(currentOverlaps, result.overlappingEvents)

        // if so, see if you need to recalculate styles
        if (existingOverlapKey) {
            const existingOverlaps = result.overlappingEvents.get(existingOverlapKey)

            // recalculate styles if the currentOverlaps length is greater than any of the overlaps
            for(const existingOverlap of existingOverlaps?.events || []) {
                if (existingOverlaps && currentOverlaps.length >= existingOverlap.length - 1) {
                    // TODO: Recalculate all styles for overlapping events
                }
            }
        } else {
            const newKey = currentOverlaps.map(x => x.id).join('_')
            const overlaps: StyledEvent[][] = [currentOverlaps]
            result.overlappingEvents.set(newKey, new OverlappingEvent(overlaps, 100 / currentOverlaps.length))
        }
    }

    return result
}

function GetExistingOverlapKey(incomingOverlaps: StyledEvent[], existingOverlaps: Map<string, OverlappingEvent>): string {

    existingOverlaps.forEach((value: OverlappingEvent, key: string) => {
        for(const event of incomingOverlaps) {
            if (key.indexOf(event.id) != -1) {
                return key
            }
        }
    })

    return ''
}

function IsOverlappingDates(event1: Event, event2: Event): boolean {
    if (event1.startDate && event1.endDate && event2.startDate && event2.endDate) {
        const event1StartDate = new Date(event1.startDate)
        const event1EndDate = new Date(event1.endDate)
        const event2StartDate = new Date(event2.startDate)
        const event2EndDate = new Date(event2.endDate)

        return event1StartDate < event2EndDate && event1EndDate >= event2StartDate
    }

    return false
}