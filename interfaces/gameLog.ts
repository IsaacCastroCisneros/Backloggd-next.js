import score from "@/types/score"
import gameStatus from "@/types/gameStatus"

export default interface gameLog
{
  status:gameStatus
  review:string
  platform:string
  score:score
}