'use client'
import React from 'react'

export default function Detail({ params }: { params: { opts: string, cate: string, id: string } }) {
  return (
    <>
      <title>{`영화 상세`}</title>
      <meta name="description" content={`상세 정보`} />

      <p>Detail</p>
      <p>{JSON.stringify(params)}</p>
      <div className="flex flex-col mt-4 gap-4">
        <p className="text-lg font-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
        <p className="text-lg font-light">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
        <p className="text-lg font-bold">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
        <p className="text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
        <p className="text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
        <p className="text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione?</p>
      </div>

    </>
  )
}
