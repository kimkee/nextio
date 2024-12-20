
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import ui from '@/app/lib/ui';
import Img from '@/app/components/Img';
import Loading from '@/app/components/Loading';
import axios from 'axios';
import DetailRevTxt from './DetailRevTxt';
import './DetailRev.css';
export default function ViewCtls({datas, postID, opts}: {datas: any, postID: string, opts: any}) {
  
  const [review, setReview] =  useState<any>(null);
  const fetchRev = `https://api.themoviedb.org/3/${opts}/${postID}/reviews?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const fetchReview = () => {
    axios.get( fetchRev ).then(response => {
      console.log("리뷰들" , response.data.results);
      setReview(response.data.results);
    }).catch( e => { console.log(e); });
  };


  useEffect(() => {
    fetchReview();
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if(!review) return null;
  return (
    <>
      {review.length ?
      <div className="sect revw mt-2">
        <div className="ut-reply">
          <div className="rplist">
            
            <ul className="rlist a">
            {
              review &&
              review.map((rev: any,idx: number) => {
                const avatar = rev.author_details.avatar_path || "";
                const nImg = 'https://image.tmdb.org/t/p/w45_and_h45_face/'+avatar ;
                const rvTxt = rev.content.replace(/\n/g, "<br>");
                return(
                <li key={idx}>
                  <div className="rpset">
                    <div className="user">
                      <span className="pic">
                        <Img width={45} height={45} src={nImg} srcerr='/img/common/user.png' alt="사진"  className="img" />
                      </span>
                    </div>
                    <div className="infs">
                      <div className="name">
                        <em className="nm">{rev.author_details.name || rev.author_details.username}</em>
                      </div>
                      <div className="desc">
                        <em className="time">{ ui.dateForm( new Date( rev.created_at) ) }</em>
                      </div>
                      <DetailRevTxt rvTxt={rvTxt} />
                    </div>
                  </div>
                </li>
                )
              })
            }
            
            </ul>
            
          </div>
        </div>
      </div>
      :null}
    </>
  )
}
