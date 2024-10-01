import React, { Dispatch, FormEvent, SetStateAction } from 'react'
import listItem from '../../interfaces/listItem'
import Separator from '@/components/Separator'
import LabedInput from '@/components/LabedInput'
import LabedTextarea from '@/components/LabedTextarea'
import Label from '@/components/Label'
import Searcher from './components/Searcher'
import Button from '@/components/Button'
import Card from './components/Card'
import listData from '../../interfaces/listData'

interface props
{
    list:Array<listItem>
    submittingForm:(e:FormEvent<HTMLFormElement>)=>void
    setList:Dispatch<SetStateAction<Array<listItem>>>
    handleDeleteItemList:(id:string)=>void
    listData?:listData
}

export default function ListForm(props:props) 
{
    const listDataDefault:listData= {
      id: 0,
      user_id: 0,
      name: "",
      description: "",
      slug: "",
    }

    const{list,submittingForm,setList,handleDeleteItemList,listData=listDataDefault}=props

    const{name,description}=listData

    return (
      <>
        <h1 className="text-[28px] text-text4 font-medium">
          Editing your list
        </h1>
        <Separator className="my-[.3rem]" />
        <div className="mb-[2rem]">
          <form
            id="list"
            action=""
            onSubmit={submittingForm}
            className="mb-[1rem]"
          >
            <LabedInput
              label="List Name"
              props={{
                input: { name: "name", defaultValue: name },
                container: { className: "mb-[.3rem]" },
              }}
            />
            <LabedTextarea
              label="Description"
              props={{
                textarea: { name: "description", defaultValue: description },
              }}
            />
          </form>
          <Label>Add a game</Label>
          <div className="max-w-[100%] justify-between flex">
            <div className="max-w-[20rem] flex-1">
              <Searcher setList={setList} list={list} />
            </div>
            <Button form="list">Create List</Button>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(5,1fr)] gap-[.7rem] mob1:grid-cols-[repeat(3,1fr)]">
          {list.map((item) => (
            <Card
              handleDeleteItemList={handleDeleteItemList}
              key={item.listId}
              imgUrl={item.cover}
              {...item}
            />
          ))}
        </div>
      </>
    );
}