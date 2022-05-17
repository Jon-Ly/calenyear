export default class Event {
    id: string
    name?: string
    startDate?: Date
    endDate?: Date
    overlaps: Event[]

    constructor(id?: string) {
        this.id = id || ''
        this.overlaps = []
    }
}