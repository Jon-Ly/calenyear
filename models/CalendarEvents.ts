import OverlappingEvents from './OverlappingEvents'

export default class CalendarEvents {
    overlappingEvents: Map<string, OverlappingEvents>

    constructor(overlappingEvents?: Map<string, OverlappingEvents>) {
        this.overlappingEvents = overlappingEvents ?? new Map<string, OverlappingEvents>()
    }
}