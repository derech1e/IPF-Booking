import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// POST /api/booking
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, comment } = req.body
    const result = await prisma.roomCategory.create({
        data: {
            name: title,
            comment: comment,
        },
    })
    res.json(result)
}
