import React from 'react'

function Detail({params}:any) {
  return (
    <div>
        <p>Detail</p>
        <p>{JSON.stringify(params)}</p>
        <div className="flex flex-col mt-4 gap-4">
            <p className="text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
            <p className="text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
            <p className="text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
            <p className="text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
            <p className="text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
            <p className="text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
        </div>
    </div>
  )
}

export default Detail