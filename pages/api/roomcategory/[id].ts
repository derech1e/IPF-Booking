import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const roomCategoryId = req.query.id

  if (req.method === 'DELETE') {
    handleDELETE(roomCategoryId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// DELETE /api/booking/:id
async function handleDELETE(roomCategoryId, res) {
  const post = await prisma.roomCategory.delete({
    where: { id: Number(roomCategoryId) },
  })
  res.json(post)
}
