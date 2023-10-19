import { NextApiHandler } from "next"
import { getProducts } from '../../../data/products'

const handler: NextApiHandler = async (req, res) => {
  try {
    const data = await getProducts()
    res.status(200).send(data)
  }
  catch (err) {
    res.status(500).send(err)
  }
}

export default handler