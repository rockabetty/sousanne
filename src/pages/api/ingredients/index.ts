import { default as getIngredientsHandler } from '@domains/ingredients/inbound/getIngredients'
import { default as searchIngredientsHandler } from '@domains/ingredients/inbound/searchIngredients'
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    const { search } = req.query;
    if (!!search) {
        searchIngredientsHandler(req, res)
    } else {
        getIngredientsHandler(req, res)
    }
}

export default handler