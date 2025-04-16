import { acceptGetOnly } from "@errors/methodgatekeeper"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

const getStoresHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    acceptGetOnly(req, res)
    const stores = await getStores();
    if (stores.success) {
        res.status(200).send(stores.data)
    }
    res.status(500).send(stores.error)
}

export default getStoresHandler