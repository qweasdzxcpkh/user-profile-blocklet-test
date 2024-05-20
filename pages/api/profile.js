// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
import prisma from '../../prisma/client';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // await prisma.profile.create({ data: req.body })
      const profile = await prisma.profile.findFirst();
      if (!profile) {
        res.status(404).end();
      }
      res.status(200).json(profile);
      break;
    case 'PUT':
      // TODO use yup or zodjs validate body payload
      const result = await prisma.profile.update({ where: { id: req.body.id }, data: req.body });
      res.status(200).json(result);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
