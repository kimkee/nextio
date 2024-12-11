'use client'
import Image from 'next/image'
import React from 'react'
import Img from '@/app/components/Img';

export default function Detail({ params }: { params: { opts: string, cate: string, id: string } }) {
  return (
    <>
      <title>{`${ params.opts == 'movie' ? "영화" : "TV"} : ${params.id} 상세 정보`}</title>
      <meta name="description" content={`상세 정보`} />

      <p>Detail - {params.opts}</p>
      <p>{JSON.stringify(params)}</p>
        <div className="grid grid-cols-4 gap-2">
          <Img width={300} height={450}  src='http://image.tmdb.org/t/p/w300/zTgjeblxSLSvomt6F6UYtpiD4n7.jpg' alt='extio' srcerr='/img/common/non_poster.png' className='w-full h-auto' />
          <Img width={300} height={450}  src='http://image.tmdb.org/t/p/w300/kmP6viwzcEkZeoi1LaVcQemcvZh.jpg' alt='extio' srcerr='/img/common/non_poster.png' className='w-full h-auto' />
          <Img width={300} height={450}  src='http://image.tmdb.org/t/p/w300/zTgjeblxSLSvomt6F6UYtpiD4n7.jpg' alt='extio' srcerr='/img/common/non_poster.png' className='w-full h-auto' />
          <Img width={300} height={450}  src='http://image.tmdb.org/t/p/w300/zTgjeblxSLSvomt6F6UYtpiD4n7.jpg' alt='extio' srcerr='/img/common/non_poster.png' className='w-full h-auto' />
          <Img width={300} height={450}  src='http://image.tmdb.org/t/p/w300/zTgjeblxSLSvomt6F6UYtpiD4n7.jpg' alt='extio' srcerr='/img/common/non_poster.png' className='w-full h-auto' />
          <Img width={300} height={450}  src='http://image.tmdb.org/t/p/w300/kmP6viwzcEkZeoi1LaVcQemcvZh.jpg' alt='extio' srcerr='/img/common/non_poster.png' className='w-full h-auto' />
        </div>
      <div className="flex flex-col mt-4 gap-4">
        

        {/* <Image width={256} height={54}  src='/img/logo_nextd.png' alt='extio'  className='w-20 h-auto' onError={({ currentTarget }) => {
          currentTarget.src = `/img/common/non_poster.png`;
        }}/> */}
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
