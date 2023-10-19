import { NextApiHandler } from "next"
import { getProductsByIngredient } from '../../../data/products'

const handler: NextApiHandler = async (req, res) => {
  try {
    let {ingredient} = req.query;
    const data = await getProductsByIngredient(ingredient);
    res.status(200).send(data)
  }
  catch (err) {
    res.status(500).send(err)
  }
}

export default handler