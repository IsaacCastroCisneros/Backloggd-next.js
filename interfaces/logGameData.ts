import gameLog from "./gameLog";
import platform from "./platform";

export default interface logGameData extends gameLog
{
  platformsIGDB:Array<platform>
}