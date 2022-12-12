import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const bookingId = req.query.id

  if (req.method === 'DELETE') {
    handleDELETE(bookingId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// DELETE /api/booking/:id
async function handleDELETE(bookingId, res) {
  const post = await prisma.booking.delete({
    where: { id: Number(bookingId) },
  })
  res.json(post)
}
