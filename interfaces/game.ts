import gameLog from "./gameLog"

export interface game extends gameLog
{
    id:string
    game_id:string
    user_id:string
    list_id:string|null
} 


