import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const employeeId = req.query.id

  if (req.method === 'DELETE') {
    handleDELETE(employeeId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// DELETE /api/booking/:id
async function handleDELETE(personId, res) {
  const post = await prisma.employee.delete({
    where: { id: Number(personId) },
  })
  res.json(post)
}
