import { game } from "@/interfaces/game"
import favoritePosition from "@/types/favoritePosition"

interface defaultProps
{
    game_id:string
    user_id:string
} 

interface gameMinimal extends defaultProps
{
    type:"minimal"
}
interface gameScore extends defaultProps
{
    score:number
    type:"score"
}
interface gameStatus extends defaultProps
{
    status:status
    type:"status"
}

interface gameFavorite extends defaultProps
{
    favorite:boolean
    favorite_position:{new:favoritePosition,old:favoritePosition}
    type:"favorite"
}

interface gameNoId extends Omit<game, 'id'>
{
   type:"fullGame"
}

type gameLoginProps = gameNoId|gameMinimal|gameFavorite|gameScore|gameStatus

export default gameLoginProps