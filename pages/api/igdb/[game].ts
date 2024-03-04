import gameCardData from '@/interfaces/gameCardData'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import { isArray } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{res:Array<gameCardData>}>
) 
{
  const {game} = req.query

  if(isArray(game))return
  const games = await getFullGameIGDB({game})

  res.status(200).json({res:games})
}