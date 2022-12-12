import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const personCategoryId = req.query.id

  if (req.method === 'DELETE') {
    handleDELETE(personCategoryId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// DELETE /api/booking/:id
async function handleDELETE(personCategoryId, res) {
  const post = await prisma.personCategory.delete({
    where: { id: Number(personCategoryId) },
  })
  res.json(post)
}
