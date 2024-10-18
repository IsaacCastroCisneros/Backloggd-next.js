import gameStatus from "@/types/gameStatus"
import score from "@/types/score"

export default interface review
{
    name: string,
    username: string,
    releaseDate: number,
    cover: string,
    score: score,
    status: gameStatus,
    platform: string
    slug:string
    review:string
}