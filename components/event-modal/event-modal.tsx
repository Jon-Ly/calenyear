import { ChangeEvent, SyntheticEvent, useState } from "react"
import Event from "../../models/Event"
import Button from "../button"
import { IsNullOrEmpty } from "./event-modal-helper"
import styles from './event-modal.module.css'

interface EventModalProps {
    event?: Event
    onClose?: (action?: ModalAction, ...args: any) => any
}

export enum ModalAction {
    Submit,
    Cancel
}

export default function EventModal(props: EventModalProps) {
    const { event, onClose } = {...props}
    const [formData, setFormData] = useState<Event>({})

    function isFormValid() {
        return !IsNullOrEmpty(formData.name) && formData.startDate && formData.endDate
    }

    function onInputChange(event: ChangeEvent<HTMLInputElement>): void {
        setFormData((prevState) => {
            (prevState as any)[event.target.name] = event.target.value
            return {...prevState}
        })
    }

    function onSubmitClick(e: SyntheticEvent): void {
        e.preventDefault()
        if (isFormValid()) {
            if (onClose) {
                onClose(ModalAction.Submit)
            }
        } else {
            // TODO: Display error
        }
    }

    function onCancel(): void {
        if (onClose) {
            onClose(ModalAction.Cancel)
        }
    }

    return (
        <div className={styles.eventModalBackdrop}>
            <form onSubmit={onSubmitClick} className={styles.eventModal}>
                <label htmlFor='event-name'>Name</label>
                <input type='text' id='event-name' name='eventName' onChange={onInputChange} required/>
                
                <label htmlFor='event-start-date'>Start Date</label>
                <input type='date' id='event-start-date' name='eventStartDate' onChange={onInputChange} required/>

                <label htmlFor='event-end-date'>End Date</label>
                <input type='date' id='event-end-date' name='eventEndDate' onChange={onInputChange} required/>
                
                <div className={styles.eventModalActions}>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button type='submit'>OK</Button>
                </div>
            </form>
        </div>
    )
}