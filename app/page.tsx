import get from "@/server/get";


export default async function Home() {

  const {res}= JSON.parse( await get({query:"select * from users"})) 

  console.log(res[0].username)

  return (
    <article className="mt-[4rem]">
      
        <span className="text-[2rem] text-[#fff]">
          {
          res[0].username
          }
        </span>
  
      <h1 className="text-[#fff] text-[6rem] font-bold">Backloggd</h1>
      <span className="text-text4 text-[32px] font-medium">
        Discover, collect, analyze your games
      </span>
    </article>
  );
}
