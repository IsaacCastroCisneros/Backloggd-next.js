import gameStatus from "@/types/gameStatus";
import score from "@/types/score";

export default interface reviewResponse 
{
  user_id:  number;
  score: score;
  review: string;
  status: gameStatus;
  platform:string
}