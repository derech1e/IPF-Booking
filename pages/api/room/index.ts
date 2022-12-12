import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// POST /api/booking
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { name, comment, primaryplaces, secondaryplaces, roomcategory } = req.body
    const result = await prisma.room.create({
        data: {
            name: name,
            comment: comment,
            primaryplaces: primaryplaces,
            secondaryplaces: secondaryplaces,
            roomcategory: { connect: { id: roomcategory } }
        },
    })
    res.json(result)
}
