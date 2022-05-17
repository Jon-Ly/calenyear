import type { NextApiRequest, NextApiResponse } from 'next'
import Event from '../../models/Event'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Event[]>
  ) {
    res.status(200).json(mockData)
}

const today = new Date()
today.setDate(today.getDate() + 1)
const nextDay = new Date(today)
today.setDate(today.getDate() + 3)
const farDay = new Date(today)
today.setDate(today.getDate() + 10)
const fartherDay = new Date(today)

const mockData: Event[] = [
    { id: 'hello', name: "Event 1.0", startDate: new Date(), endDate: nextDay, overlaps: []},
    { id: 'hello', name: "Event 2.0", startDate: nextDay, endDate: farDay, overlaps: []},
    { id: 'hello', name: "Event 3.0", startDate: farDay, endDate: fartherDay, overlaps: []}
]