import gameLog from "@/interfaces/gameLog"
import platform from "../../../interfaces/platform"

export default interface config
{
  values:gameLog
  platformsIgdb:Array<platform>
  loading:boolean
  firstTime:boolean
  firstValue:gameLog
  err:boolean
}