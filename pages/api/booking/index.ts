import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// POST /api/booking
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, comment, room, from, until, employee } = req.body
    const result = await prisma.booking.create({
        data: {
            title: title,
            comment: comment,
            from: from,
            until: until,
            employee: { connect: { id: employee } },
            room: { connect: { id: room } },
        },
    })
    res.json(result)
}
