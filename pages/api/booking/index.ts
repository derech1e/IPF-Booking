import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// POST /api/booking
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, comment, room, from, until, person } = req.body
    const result = await prisma.booking.create({
        data: {
            title: title,
            comment: comment,
            room: { connect: { id: room } },
            from: from,
            until: until,
            person: { connect: { id: person } }
        },
    })
    res.json(result)
}
