import NextAuth,{NextAuthOptions} from "next-auth"
import login from "@/server/login";
import CredentialsProvider from "next-auth/providers/credentials";
import logUser from "@/interfaces/logUser";
import user from "@/interfaces/user";

export const authOptions:NextAuthOptions = 
{
  
  providers: [
    CredentialsProvider(
      {
        type:'credentials',
        credentials:{
          email: { label: "email"},
          password: { label: "password"},
        },
        async authorize(credentials):Promise<user|null>
        { 

          const {err,res} =await login({user:credentials as logUser})

          if(err)
          {
            throw new Error( JSON.stringify({ errors: err, status: false }))
          }
         
          return res
        }
      }
    )
  ],
  session:
  {
    strategy:'jwt'
  },
  callbacks: {
    async session({ session, token }:{session:any,token:any}) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret:process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions)