import favorite from "../interfaces/favorite"

interface props
{
    favorites:Array<favorite>
    newFavorite:favorite|Array<favorite>
}

export default function updatingFavoritesByIndex({favorites,newFavorite}:props):Array<favorite>
{
    const newFavorites=[...favorites]

    if(Array.isArray(newFavorite))
    {
        newFavorite.forEach(fav=>
            {
                const index=favorites.findIndex(myFav=>myFav.pos===fav.pos)
                newFavorites[index]=fav
            })
        return newFavorites
    }

    const index=favorites.findIndex(fav=>fav.pos===newFavorite.pos)
    newFavorites[index]=newFavorite
    return newFavorites
}