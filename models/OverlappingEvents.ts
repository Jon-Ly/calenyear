import StyledEvent from './StyledEvent'

class OverlappingEvents {
    events: Array<StyledEvent[]> // [[{A, B, C}, {D, B}, {E, B, F, G}]]
    width: number // px or %

    constructor(events: Array<StyledEvent[]>, width: number) {
        this.events = events
        this.width = width
    }
}

export default OverlappingEvents