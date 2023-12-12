import user from "../../../interfaces/logUser"

export default interface fullUser extends user
{
  userName:string
  passwordRetry:string
}