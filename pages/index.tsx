import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import ActionContainer from '../components/action-container/action-container'
import Button from '../components/button/button'
import Calendar from '../components/calendar'
import EventModal, { ModalAction } from '../components/event-modal/event-modal'
import YearDropdown from '../components/year-dropdown/year-dropdown'
import Event from '../models/Event'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [events, setEvents] = useState<Event[]>()
    const [year, setYear] = useState<number>(new Date().getFullYear())

    useEffect(() => {
        fetchEvents()
    }, [year])
    
    async function fetchEvents(): Promise<void> {
      await fetch('http://localhost:3000/api/event')
          .then(res => res.json())
          .then((result: Event[]) => setEvents(result))
    }

    function jumpToToday(): void {
        if (window.location) {
            window.location.href = '/#today'
        } else if (global.location) {
            global.location.href = '/#today'
        }
    }

    function toggleModal(): void { setIsModalOpen(!isModalOpen) }

    function onModalClose(action?: ModalAction) {
        if (action == ModalAction.Submit) {
            // TODO: Save to storage
        } else if (action == ModalAction.Cancel) {
            toggleModal()
        }
    }

    return (
      <div>
        <main className={styles.mainContent}>
            <Calendar events={events}/>
        </main>
        <ActionContainer>
            <YearDropdown year={year} onChange={setYear}/>
            <Button onClick={toggleModal} fullWidth>
              Add Event
            </Button>
            <Button onClick={jumpToToday} fullWidth>
              Today
            </Button>
        </ActionContainer>
        {
            isModalOpen && <EventModal onClose={onModalClose}/>
        }
      </div>
    )
}

export default Home
