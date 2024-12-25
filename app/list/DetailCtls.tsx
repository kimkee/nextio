import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import ui from '@/app/lib/ui';
import Loading from '@/app/components/Loading';
import { Myinfo as MyinfoType, User as UserType } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { supabase } from '@/app/supabase';
import { usePathname } from 'next/navigation';
import getUser from '@/app/getUser';

export default function ViewCtls({datas,postID, opts}: {datas: any, postID: string, opts: any}) {

  const params = useParams();
  const router = useRouter();
  const shareLink = ()=> {
    const surl = `${location.href}`;
    navigator.clipboard.writeText(surl);
    // ui.alert(`<b>${parentTit}</b><br> URL 주소를 복사했습니다 <br> <a class="under" href="${surl}" target="_blank">${surl}</a>`)
    const datatitle = datas.title || datas.name;
    if (navigator.share) {
      navigator.share({
        title: datatitle,
        text: datatitle +' 를 공유합니다.',
        url: surl,
      })
      .then(() => {
        console.log('공유 성공');
        
      })
      .catch((error) => {
        // ui.alert('공유 실패:'+ error)
        console.error('공유 실패:', error);
      });
    } else {
      ui.alert(`<b>${datatitle}</b><br> URL 주소를 복사했습니다 <br> <a class="under" href="${surl}" target="_blank">${surl}</a>`)
      console.log('Web Share API를 지원하지 않습니다.');
    }
  }

  const [myinfo, setMyinfo] = useState<MyinfoType>(null as any);
  const [isScrap, setIsScrap] = useState<boolean | null>(null);
  const [isDimBtn, setIsDimBtn] = useState(true);
  const [myscrap, setMyscrap] = useState<any>(null);
  const getMyScrap = async (user_id: any, postID: any)=> {
    if(!user_id) {
      setIsDimBtn(false)
      return
    };
    setIsDimBtn(true);
    console.log(user_id);
    const { data, error }  = await supabase.from('TMDB_SCRAP').select("*")
      .eq('idmvtv', postID)
      .eq('mvtv', opts)
      .eq('user_num', user_id);
    if (error) {
      console.error("내 스크랩 조회 에러 Error selecting data:", error.message);
    }else{
      setMyscrap(data);
      setIsScrap(data.length > 0);
      console.log(data);
      console.table("내 스크랩 조회 성공 Data selected successfully:");
      setIsDimBtn(false);
      
    }
  }

  const likeTog = async (e: any)=> {
    console.log(myinfo?.email);
    if (!myinfo?.email) {
      ui.confirm(`로그인이 필요합니다.<br>로그인페이지로 이동하시겠습니까? `,{
        ycb: () => {
          router.push(`/user/login?returnUrl=${location.href}`);
        },
        ncb: () => { }
      });
      return
    }


    const btn = e.currentTarget;
    const scraped =  btn.classList.contains('on');
    console.log(scraped);
    // return
    console.log(myinfo?.email);
    if (!myscrap) return;
    if( isScrap == false ){  
      const insertData = {
        user_num : myinfo?.id,
        idmvtv: datas.id,
        mvtv: opts,
        title: datas.title || datas.name,
        poster_path: datas.poster_path,
        vote_average: datas.vote_average,
        release_date: datas.release_date || datas.first_air_date,
      }
      setIsDimBtn(true);
      console.table(insertData);
      const { data, error } = await supabase.from('TMDB_SCRAP').insert([ insertData ]).select('*')
      if (error) {
        console.error("SCRAP 입력 에러 :", error.message);
      } else {
        setTimeout(() => {
          console.table("SCRAP 입력 성공");
          console.table(data);
          setIsScrap(true);
          setIsDimBtn(false);
        }, 500);
      }

      return

    }else{
      console.log("이미스크랩 되었음");
      setIsDimBtn(true);
      const { error } = await supabase.from('TMDB_SCRAP').delete()
        .eq('user_num', myinfo?.id)
        .eq('idmvtv', datas.id)
        .eq('mvtv', opts);
      if (error) {
        console.error("SCRAP 삭제 에러 :", error.message);
      }else{
        setTimeout(() => {
          console.table("SCRAP 삭제 성공");
          setIsScrap(false);
          setIsDimBtn(false);
        }, 500);
      }
    }
    
  }

  const inputReply = (e: any)=> {
    const isPop = !!e.target.closest(".poptents");
    console.log(`isPop ${isPop}`);
    const boxScroll = isPop ? ".popup>.pbd>.pct" : "body,html";
    const $writeRev = document.querySelector("#writeRev") as HTMLElement;
    if($writeRev){
      const rvPosTop = $writeRev.offsetTop;
      console.log(rvPosTop);
      ui.scrollTo( boxScroll, rvPosTop , 200, ()=>{ console.log("도착"); });
    }
    
  }
  useEffect(() => {
    getUser().then((data) => {
      console.log(data?.myinfo); // 얻은 사용자 데이터를 사용하세요
      setMyinfo(data?.myinfo);
      return data?.myinfo
    }).then(data => {
      console.log(data);
      getMyScrap(data?.id, postID);
    });
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <>
    <div className="dins mt-5 h-8 flex ring-white/10 ring-1 rounded-sm justify-center overflow-hidden gap-0">
      <button type="button" 
        className={`bt bt-scrap  disabled:opacity-50 inline-flex justify-center items-center bg-black/40 w-full text-ss gap-1 ring-white/10 ring-1 px-3`}
        onClick={likeTog} disabled={isDimBtn}
      >
        {false ?(<Loading opts={{type:'glx', cls:''}}/>) 
        :(<><FontAwesomeIcon icon={['fas', 'bookmark']} className={`w-4 !h-4 align-middle ${isScrap ? 'on text-primary' : 'off'}`} /><em className='-mt-0.5'>스크랩</em></>)}
      </button>
      <button type="button" onClick={inputReply} className="bt inline-flex justify-center items-center bg-black/40 w-full text-ss gap-1 ring-white/10 ring-1 px-3">
        <FontAwesomeIcon icon={['far', 'pen-to-square']} className={`w-4 !h-4 align-middle`} /><em className='-mt-0.5'>리뷰</em>
      </button>
      <button type="button" onClick={shareLink} className="bt inline-flex justify-center items-center bg-black/40 w-full text-ss gap-1 ring-white/10 ring-1 px-3">
        <FontAwesomeIcon icon={['fas', 'share-nodes']} className={`w-4 !h-4 align-middle`} /><em className='-mt-0.5'>공유</em>
      </button>
    </div>
    </>
  )
}
