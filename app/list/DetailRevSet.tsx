import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import ui from '@/app/lib/ui';
import Link from 'next/link';
import Img from '@/app/components/Img';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';
export default function ViewElips({datas, opts, rvTxt, rev, postID, user, myinfo, autoheight, gethRevs}: {datas: any, opts: any, rvTxt: string, rev: any, postID: any, user: any, myinfo: any, autoheight: any, gethRevs: any}) {
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean | null>(null);
  const togOverView = () => setIsOverviewOpen( !isOverviewOpen );

  const overviewRef = useRef<HTMLDivElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);

  const [isOverFlow, setIsOverFlow] = useState<boolean | null>(null);
  const txtOverflow = () =>{
    const elipsElem = overviewRef.current;
    if (!elipsElem) {return}
    const txtElem = txtRef.current;
    if (!txtElem) {return}
    const txtHeight = txtElem.offsetHeight;
    const scrollHeight = txtElem.scrollHeight;
    // console.log("scrollHeight == ", scrollHeight, ".txtHeight == ", txtHeight);
    txtHeight < scrollHeight ? setIsOverFlow(true) : setIsOverFlow(false);
  }
  if(!isOverviewOpen){
    rvTxt = rvTxt.replace(/<br>/g, '\n');
  }

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
    setIsOverviewOpen(true);
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
        ycb: () =>  text.focus() 
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


  useEffect(() => {
    txtOverflow();
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
    
    <div className="rpset">
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
          <button type="button" className="bt del flex items-center justify-center" onClick={ ()=> ui.confirm('리뷰를 삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteReview(opts, rev.id)}) }>
            <FontAwesomeIcon icon={['far', 'trash-can']} />
          </button>
          </>
          }
        </div>
        <div data-ui="elips" className="mbox">
          <div className={`ment txt ${ !isOverviewOpen && 'line-clamp-3'}`}
            data-open={isOverviewOpen} 
            ref={overviewRef} onClick={togOverView}
            dangerouslySetInnerHTML={{ __html: rvTxt }}
            onKeyUp={ e=> e.key ==="Enter" ? togOverView() : null  }
            tabIndex={0}
          ></div>
        </div>
        <div className={`medit textarea`}>
          <textarea className="resize-none w-full outline-none align-middle mb-2" ref={myRvText}
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
    </div>
    
    </>
  )
}
