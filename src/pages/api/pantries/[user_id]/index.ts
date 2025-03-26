import {default as putRequestHandler} from '@domains/pantries/inbound/putAmountInPantry'

const handler: NextApiHandler = async (req, res): Promise<void> => {
  if (req.method == 'PUT') {
    putRequestHandler(req, res)
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;