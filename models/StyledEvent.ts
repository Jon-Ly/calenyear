import Event from "./Event";

export default class StyledEvent extends Event {
    gridTemplateColumn?: number
    gridTemplateRow?: number

    constructor(
        {gridTemplateColumn, gridTemplateRow, event}:
        {gridTemplateColumn?: number, gridTemplateRow?: number, left?: number, top?: number, event?: Event}
    ) {
        super()
        Object.assign(this, event)
        this.gridTemplateColumn = gridTemplateColumn
        this.gridTemplateRow = gridTemplateRow
    }
}