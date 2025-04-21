import { default as getStoresHandler } from '@domains/stores/inbound/getStores'
import { default as postStoreHandler } from '@domains/stores/inbound/postStore'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method == 'POST') {
    postStoreHandler(req, res)
  } else {
    getStoresHandler(req, res)
  }
}

export default handler
