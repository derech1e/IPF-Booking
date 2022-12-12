import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// POST /api/booking
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { name, comment } = req.body
    const result = await prisma.personCategory.create({
        data: {
            name: name,
            comment: comment,
        },
    })
    res.json(result)
}
