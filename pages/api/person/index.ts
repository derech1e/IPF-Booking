import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// POST /api/booking
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { firstname, lastname, comment } = req.body
    const result = await prisma.person.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            comment: comment,
        },
    })
    res.json(result)
}
