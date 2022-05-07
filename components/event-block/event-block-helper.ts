const millisecondsInYear = 86400000

export function GetDayOfYear(date: Date): number {
    const dateCopy = new Date(date)

    const firstDateOfYear = new Date().setFullYear(new Date().getFullYear(), 0, 1)
    const firstDayOfYearTimestamp = Math.floor(firstDateOfYear / millisecondsInYear)
    const todayTimestamp = Math.floor(dateCopy.getTime() / millisecondsInYear)

    return todayTimestamp - firstDayOfYearTimestamp
}

export function GetDaySpan(startDate: Date, endDate: Date): number {
    const startDateCopy = new Date(startDate)
    const endDateCopy = new Date(endDate)

    const startDateTimestamp = Math.floor(startDateCopy.getTime() / millisecondsInYear)
    const endDateTimestamp = Math.floor(endDateCopy.getTime() / millisecondsInYear)

    return endDateTimestamp - startDateTimestamp
}