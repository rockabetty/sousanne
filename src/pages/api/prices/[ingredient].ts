import { NextApiHandler } from "next"
import { getPricesForIngredient } from '../../../data/prices'

const handler: NextApiHandler = async (req, res) => {
  try {
    let {ingredient} = req.query;
    const data = await getPricesForIngredient(ingredient);
    res.status(200).send(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export default handler