import gameCardData from '@/interfaces/gameCardData'
import score from '@/types/score'

interface finalGame extends gameCardData
{
  score:score
}

interface props
{
    igdbGames:Array<any>
    games:Array<any>
}

export default function getFinalGames({igdbGames,games}:props) 
{
    let finalGames:Array<finalGame>=[]

  igdbGames.forEach(igdbGame=>(games.forEach(myGame=>
    {
      if(igdbGame.id === myGame.game_id)
      {
        const finalGame:finalGame= {...igdbGame,score:myGame.score}
        finalGames = [...finalGames,finalGame]
      }
    })))

  return finalGames
}
