import { NextApiHandler } from "next"
import { getIngredients } from '../../../data/ingredients'

const handler: NextApiHandler = async (req, res) => {
  try {
    const data = await getIngredients()
    console.log("Data")
    console.log(data)
    res.status(200).send(data)
  }
  catch (err) {
    console.log(err)
    res.status(501).send(err)
  }
}

export default handler