import typeLink from "../interfaces/typeLink";

const typeLinks:Array<Omit<Omit<typeLink,"currentType">,"userName">> =
[
    {
       type:"all",
    },
    {
        type:"played",
    },
    {
        type:"completed",
    },
    {
        type:"playing",
    },
    {
        type:"retired",
    },
    {
        type:"shelved",
    },
]

export default typeLinks