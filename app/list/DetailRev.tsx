
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import ui from '@/app/lib/ui';
import Img from '@/app/components/Img';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';
import Link from 'next/link';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { use } from 'react';
import getUser from '@/app/getUser';

import Loading from '@/app/components/Loading';
import axios from 'axios';
import DetailRevSet from './DetailRevSet';
import DetailRevTxt from './DetailRevTxt';
import './DetailRev.css';
export default function ViewCtls({datas, postID, opts, user, myinfo}: {datas: any, postID: string, opts: any, user: any, myinfo: any}) {
  
  const [review, setReview] =  useState<any>(null);
  const fetchRev = `https://api.themoviedb.org/3/${opts}/${postID}/reviews?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const fetchReview = () => {
    axios.get( fetchRev ).then(response => {
      console.log("리뷰들" , response.data.results);
      setReview(response.data.results);
    }).catch( e => { console.log(e); });
  };

  const router = useRouter();

  const revText = useRef<HTMLTextAreaElement>(null);
  const revListBox = useRef<HTMLDivElement>(null);
  const revNumMax = 500;
  const [revNumNow, setRevNumNow] = useState(0)
  const autoheight = (e: any)=>{
    const $els = e.target;
    $els.style.height = "1px";
    const tboxS = $els.scrollHeight;
    $els.style.height = tboxS + "px";
    if(!revText.current) return
    const revTxtNow = revText.current?.value;
    setRevNumNow( ui.commas.add(revText.current?.value.length) );
      console.log( revText.current?.value );
      console.log( revText.current?.value.length , revNumMax  );
    if ( revTxtNow.length > revNumMax ) {
      $els.value = $els.value.slice(0, revNumMax );
      setRevNumNow( ui.commas.add(revText.current?.value.length) );
      ui.alert(`감상평은 ${revNumMax}글자 까지 입니다.`,{
        ycb: () => {}
      });      
    }
  }
  const checkLogin = ()=> { 
    if (user?.email) { return; }
    ui.confirm("로그인이 필요합니다.", {
      ycb: () => { router.push('/user/login'); return; },
      ccb: () => { return; },
      ybt: "로그인 하기",
      nbt: "닫기",
    });
  }

    
  const sendReview = async()=>{
    if(!revText.current) return
    if (revText.current.value.trim() == '') {
      revText.current.value = '';
      return;
    }
    console.log(myinfo);
    console.log(user);
    const insertData = { 
      user_num : myinfo?.id,
      user_name : myinfo?.username,
      updated_at : new Date().toISOString(),
      content : ui.textHtml( revText.current.value , "incode"),
      profile_picture : myinfo?.profile_picture, 
      provider : myinfo?.provider,
      email : myinfo?.email, 
      mvtv : opts,
      idmvtv : postID,
      title : datas.title || datas.name,
      poster_path : datas.poster_path,
      vote_average : datas.vote_average,
    }   
    console.table(insertData);  

    const { data, error } = await supabase.from('TMDB_REVIEW').insert([ insertData ]).select('*')
    if (error) {
      console.error("리뷰 입력 에러 Error inserting data:", error.message);
    } else {
      console.table("리뷰 입력 성공 Data inserted successfully:");
      console.table(data[0]);
      gethRevs();
      revText.current.value = '';
      revText.current.style.height = '';
      if(!revListBox.current) return
      revListBox.current.focus();
      setRevNumNow(0);
    }
  }

  const [reviewArr, setReviewArr] = useState<any>(null);
  const gethRevs = async ()=> {
    console.log(postID);
    const { data, error }  = await supabase.from('TMDB_REVIEW').select("*").eq('mvtv', opts).eq('idmvtv', postID).order('created_at', { ascending: false });
    if (error) {
      console.error("리뷰 조회 에러 Error selecting data:", error.message);
    }else{
      setReviewArr(data);
      console.table("리뷰 조회 성공 Data selected successfully:");
    }
  }
  const realtimeChannel = useRef<any>(null);
  const setupRealtimeListener = (tableName:string) => {
    realtimeChannel.current = supabase.channel(`public:${tableName}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
        gethRevs();
        console.log(`${tableName} 업데이트`);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to ${tableName} changes`);
        }
      });
  };
/* 
  const deleteReview = async (opts: string, postID: number) => {
    console.log(opts, postID);
    const { data, error }  = await supabase.from('TMDB_REVIEW').delete().eq('id', postID);
    if (error) {
      console.error("리뷰 삭제 에러 Error deleting data:", error.message);
    } else {
      console.table("리뷰 삭제 성공 Data deleted successfully:");
      gethRevs();
    }
  }
  
  const myRvText = useRef<HTMLTextAreaElement>(null);
  
  const editMode = (rvTxt: string, rvID: number) => {
    console.log(rvTxt, rvID);   
    document.querySelectorAll(`.rplist li .infs`).forEach(el => el.classList.remove("show"));
    document.querySelector(`.rplist li[data-idx="${rvID}"] .infs`)?.classList.add("show");
    const rvTbox = document.querySelector(`#myRvTex_${rvID}`) as HTMLTextAreaElement;
    rvTbox.value = ui.textHtml(rvTxt, "decode");
    rvTbox.focus();
  }
  const editCancel = () => {
    document.querySelectorAll(`.rplist li .infs`).forEach(el => el.classList.remove("show"));
  }
  
  const editReview = async(opts: string, rvID: number) => {
    console.log(opts, rvID);
    const text = document.querySelector(`#myRvTex_${rvID}`) as HTMLTextAreaElement;
    
    const content = ui.textHtml( text.value, "incode" );
    if (text.value.trim() == '') {
      ui.alert("댓글을 입력하세요", {
        ycb: () => {
          text.focus();
        }
      });
      return;
    }
    const updateData = {
      user_num : myinfo?.id,
      user_name : myinfo?.username,
      updated_at : new Date().toISOString(),
      content: content,
      profile_picture : myinfo?.profile_picture, 
      provider : myinfo?.provider,
      email : myinfo?.email, 
      mvtv : opts,
      idmvtv : postID,
      title : datas.title || datas.name,
      poster_path : datas.poster_path,
      vote_average : datas.vote_average,
    };
   
    const { data, error } = await supabase
    .from('TMDB_REVIEW')
    .update(updateData)
    .eq('id', rvID)
    .select()
            
    if (error) {
      console.error("리뷰 수정 에러 Error updating data:", error.message);
    } else {
      console.table("리뷰 수정 성공 Data updated successfully:");
      gethRevs();
      editCancel()
    }
  }
*/

  useEffect(() => {
    fetchReview();
    console.log(postID);
    // console.log(datas || '');
    gethRevs();
    setupRealtimeListener('TMDB_REVIEW');
    return () => {
      realtimeChannel.current.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[postID]);

  // console.log(review);


  if(!review) return null;
  return (
    <>

      <div className="sect revk" id='writeRev'>
        <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
          <h4 className="tts text-sm">리뷰</h4>
          <span className="num text-ss font-normal text-white/40"><i className="i">{revNumNow}</i> / <b className="n">{ui.commas.add(revNumMax)}</b></span>
        </div>
        <div className="form textarea">
          <textarea disabled={user===null} onInput={autoheight} onFocus={checkLogin} ref={revText} className="rtext"  
            placeholder={`${user?.email ? `감상평을 남겨보세요. (최대${revNumMax}자)`:`로그인 후 감상평을 남겨보세요.`}`}
          ></textarea>
          <div className="bts mt-1">
            <button type="button" className="btn sm btsend" disabled={ revNumNow < 1 } onClick={sendReview}>
              <FontAwesomeIcon icon={['fas', 'paper-plane']} /> <em>등록</em>
            </button>
          </div>
        </div>
      </div>
      <div className="sect revw  mt-2" ref={revListBox} tabIndex={-1}>
        {reviewArr ?
        <div className="ut-reply">
          <div className="rplist">
            <ul className="rlist b">
            {
              reviewArr &&
              reviewArr.map((rev:any,idx:number) => {
                const rvTxt = rev.content.replace(/\n/g, "<br>");
                return(
                  <li key={idx+'_'+rev.id} data-idx={idx+'_'+rev.id}  data-user-num={rev.user_num} className={rev?.user_id == user?.id ? "my" : ""}>
                  <DetailRevSet 
                    key={idx} rev={rev} datas={datas} opts={opts} 
                    rvTxt={rvTxt} postID={postID} user={user} myinfo={myinfo} 
                    autoheight={autoheight} gethRevs={gethRevs}
                  />
                
                  {
                  /* <div className="rpset">
                    <Link href={`/user/${rev.user_num}`} className="user">
                      <span className="pic">
                        <Img width={45} height={45} src={rev.profile_picture} srcerr='/img/common/user.png' alt="사진"  className="img" unoptimized={true} loading="eager" />
                      </span>
                    </Link>
                    <div className="infs">
                      <div className="name">
                        <Link href={`/user/${rev.user_num}`} className="nm">{rev.user_name}</Link>
                        <em className="mb">
                          { ui.postIsMod(rev.created_at, rev.updated_at) ? ui.timeForm(rev.updated_at,true) +' 수정됨' : ui.timeForm(rev.updated_at,true)}
                        </em>
                      </div>
                      <div className="desc">
                        <em className="time">{ui.dateForm(rev.created_at,'short')}</em>
                        { rev?.user_id == user?.id &&
                        <>
                        <button type="button" className="bt mod flex items-center justify-center" onClick={ ()=> { editMode(rvTxt, rev.id) } }>
                          <FontAwesomeIcon icon={['fas', 'edit']} />
                        </button>
                        <button type="button" className="bt del flex items-center justify-center" onClick={ ()=> ui.confirm('삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteReview(opts, rev.id)}) }>
                          <FontAwesomeIcon icon={['far', 'trash-can']} />
                        </button>
                        </>
                        }
                      </div>
                      <div data-ui="elips" className="mbox">
                        <div className="ment txt" dangerouslySetInnerHTML={{ __html: rvTxt }} ></div>
                      </div>
                      <div className={`medit textarea`}>
                        <textarea className="resize-none w-full outline-none" ref={myRvText}
                          onFocus={autoheight} onInput={ autoheight} id={`myRvTex_${rev.id}`}
                        ></textarea>
                        <div className="bts flex gap-1">
                          <button type="button" className="btn btn-xs btsend flex-1 w-full" onClick={ editCancel }>
                            <FontAwesomeIcon icon={['fas', 'close']} /> <em>취소</em>
                          </button>
                          <button type="button" className="btn btn-xs btsend flex-1 w-full" onClick={ ()=>{editReview(opts, rev.id)} } >
                            <FontAwesomeIcon icon={['fas', 'edit']} /> <em>수정</em>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */
                  }
                </li>
              )
            })}
            </ul>
          </div>
        </div>
        :
        null
        }
      </div>



      {review.length ?
      <div className="sect revw" id="writeRev">
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
