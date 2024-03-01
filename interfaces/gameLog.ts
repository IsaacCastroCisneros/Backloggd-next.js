import score from "@/components/Score/types/score"

export default interface gameLog
{
  status:"played"|"shelved"|"completed"|"retired"|"abandoned"|"playing"|"none"
  review:string
  platform:string
  score:score
}