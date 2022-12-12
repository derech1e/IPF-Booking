import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const roomId = req.query.id

  if (req.method === 'DELETE') {
    handleDELETE(roomId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// DELETE /api/booking/:id
async function handleDELETE(roomId, res) {
  const post = await prisma.room.delete({
    where: { id: Number(roomId) },
  })
  res.json(post)
}
