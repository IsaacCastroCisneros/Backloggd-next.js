import gameCardData from "@/interfaces/gameCardData"
import platform from "@/interfaces/platform"
import user from "@/interfaces/user"

interface props extends Omit<gameCardData,"platforms"> 
{
  user:user
}

interface byPlatforms extends props
{
  platforms:Array<platform>
  state:"byPlatforms"
}
interface byPlatformsIds extends props
{
  platformsId:Array<string>
  state:"byPlatformsIds"
}

type logFormProps = byPlatforms | byPlatformsIds

export default logFormProps