
'use client';
import Link from 'next/link';
import type { Metadata } from 'next';
import { useParams, useRouter, useSearchParams  } from 'next/navigation';
import { HtmlHTMLAttributes, useEffect, useRef, useState  } from 'react';
import { use } from 'react';
import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import Img from '@/app/components/Img';
import ui from '@/app/lib/ui';
import './search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// export const runtime = 'edge';
// export const dynamicParams = false;

export default function Page() {
  const params = useParams();
  const id = params.id;
  const opts = params.opts;

  const searchParams = useSearchParams();
  
  
  const [keyword, keywordSet] = useState(searchParams.get('search') || '');
  const [schList, schListSet] = useState<any>([]);
  // const [page, setPage] = useState(1);
  let page = 1;
  const [cate, setCate] = useState<any>({});
  // const total;
  const getCate = async ()=>{
    
    await axios.get(`https://api.themoviedb.org/3/genre/${opts}/list?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`).then(res =>{
      // console.log(res.data.genres);  
      interface GenreMap {
        [key: number]: string;
      } 
      const mcate: GenreMap = {};
      res.data.genres.forEach( (d:any) => {
        mcate[d.id] = d.name
      });
      setCate(mcate);
      // console.log(mcate);
    }).catch( error =>{
      console.log(error);
      setCate({});
    });
  };
  // const keyword = "미녀";

  const [nowPage, nowPageSet] = useState({ "pge":0, "tot":0 })
  const [loadActive, loadActiveSet] = useState(``);
  const [loadHide, loadHideSet] = useState(``);
  const [loadError, loadErrorSet] = useState(``);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const fetchMoive = (page:number )=>{

    console.log( "검색어 " +keyword);
    console.log( "로드 " + page );
    if(!inputRef.current)return
    inputRef.current.value = keyword;
    const kwd = keyword || '';
    
    const fetchURL = `https://api.themoviedb.org/3/search/${opts}?language=ko&region=kr&page=${page}&query=${kwd}&sort_by=release_date.desc&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

    axios.get( fetchURL ).then(res =>{
      console.log(res.data);
      schListSet( (prevList:any) => [...prevList,...res.data.results] );
      console.log(page + "=== " + res.data.total_pages );
      callStat = true;
      console.log(callStat);
      ui.loading.hide();
      nowPageSet({ "pge":res.data.page, "tot":res.data.total_pages });
      if( res.data.total_pages <= page ) {
        callStat = false;
        loadHideSet("hide");
      }else{
        loadHideSet("");
      };
      loadActiveSet("");
      
    }).catch(e=>{
      console.log(e);
      ui.loading.hide();
      loadErrorSet("error");
    }); 
  }

  useEffect(() => {
    getCate();
    ui.loading.show(`glx`);
    fetchMoive(page);
    
    schListSet([]);
    !keyword && !document.querySelector(".pop-layer") && inputRef.current?.focus();
    window.addEventListener("scroll", scrollEvent);
    window.scrollTo(0, 0);
    showKwdList()

    return ()=>{
      
      window.removeEventListener("scroll", scrollEvent);
    }
    // eslint-disable-next-line
  },[keyword,opts]);


  // const [callStat, callStatSet] = useState(true);
  let callStat = true;
  const scrollEvent = ()=> {
    const wHt = ui.viewport.height();
    const docH = ui.viewport.docHeight();
    const scr = ui.viewport.scrollTop() + wHt + 10;
    console.log(callStat +" =  "+  page);
    if (docH <= scr && callStat === true) {
      console.log("바닥도착");
      // console.log( page);
      loadActiveSet("active");
      callStat = false;
      // console.log(callStat);
      if(ui.lock.stat) {
        callStat = true;
        return
      };
      setTimeout( ()=> {
        // setPage( page + 1 );
        page = page + 1;
        fetchMoive( page );
      } ,400 );
    }
  };
  

  // console.log(datas);
  // console.log(genr);
  // console.log(datas.results);
  // console.log(cate);
  // if (!cate) return null;
  // console.log(dlist);


  // let navigate = useNavigate();
  // const [stext ,stextSet]  = useState('');
  const goSearch = (e:any) => {
    if(!inputRef.current)return
    keywordSet( inputRef.current?.value );
    window.history.replaceState(null, '', `/search/${opts}?search=${inputRef.current?.value}`);
    schListSet([]);
    fetchMoive( 1 );
    e.preventDefault();
    saveKwdStorage(inputRef.current?.value);
    // keyWordBox.current.classList.remove("open");
  }
  const goRecentSearch = (txt:string)=>{
    if(!inputRef.current)return
    inputRef.current.value = txt;
    keywordSet( txt );
    window.history.replaceState(null, '', `/search/${opts}?search=${txt}`);
    // setMlist([]);
    // fetchMoive( 1,txt );
    const url = new URL(window.location.href);
    url.searchParams.set("search", txt);
    // keyWordBox.current.classList.remove("open");
  }
  // 검색어 입력란에 입력할때마다 실행되는 debounce 함수
  // wait ms 만큼 기다렸다가 func를 실행
  const debounce = (func: any, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return function (this: any, ...args: any[]) {
      const context = this;
      const later = function () {
        timeout = null;
        func.apply(context, args);
      };
      if (timeout !== null) { clearTimeout(timeout); }
      timeout = setTimeout(later, wait);
    };
  };
  // 입력란에 입력할때마다 실행되는 함수
  // 100ms만큼 기다렸다가 실행
  const onChange = debounce((event: any) => {
    // keyword state를 변경
    keywordSet(event.target.value );
    // schList state를 초기화
    schListSet([]);
    // url의 search string을 변경
    const url = new URL(window.location.href);
    url.searchParams.set("search", event.target.value);
    // console.log(url);
    // 브라우저의 주소를 변경
    window.history.replaceState(null, '', `/search/${opts}?search=${event.target.value}`);
    // // keyWordBox.current.classList.remove("open");
  }, 100);

  const keyWordBox = useRef(null);
  const schsForm = useRef(null);
  const [keywordList, keywordListSet] = useState<string[]>([]);
  const saveKwdStorage =(k:string) =>{
    const keyArr = JSON.parse( localStorage.getItem("keyword") || '["스타워즈","포레스트 검프"]' );
    k.trim() !== '' ? keyArr.unshift(k) : null;
    const nkeyArr = [...new Set(keyArr)].slice(0, 10) as string[];
    localStorage.setItem("keyword", JSON.stringify( nkeyArr ) )
    keywordListSet(nkeyArr );
  }

  const showKwdList =() =>{
    const keyArr = JSON.parse( localStorage.getItem("keyword") || '["스타워즈","포레스트 검프"]' );
    keywordListSet(keyArr);
  }

  const delRecentKwd =(txt:string) =>{
    const newArray = keywordList.filter(item => item !== txt);
    localStorage.setItem("keyword", JSON.stringify( newArray ) );
    keywordListSet(newArray);
    
    setTimeout(() => {
      if(!inputRef.current)return
        inputRef.current.focus()
      }
    );
    // return false;
  }
  const delFormText =() =>{
    if(!inputRef.current)return
    inputRef.current.value = "";
    inputRef.current.focus();
    keywordSet(``);
    window.history.replaceState(null, '', `/search/${opts}?search=`);
  }
  
  // console.log(mlist);
  // console.log(kwdLists);
  
  console.log(  inputRef.current?.value );
  



  return (
    <main className='p-0'>
      <div className="schs-form" ref={schsForm}>
        <div className="inr">
          <form className="form" onSubmit={ goSearch }>
            <div className="bts">
              <Link className="bt" href={`/search/movie?search=${keyword}`}>Movie</Link>
              <Link className="bt" href={`/search/tv?search=${keyword}`}>TV</Link>
            </div>
            <span className="input">
              <input type="text" placeholder="검색어를 입력하세요." 
                ref={inputRef}
                required maxLength={12}
                onChange={onChange}
                onInvalid={ (e)=> e.preventDefault() }
              />
              <button type="button" className="bt-del" title='삭제' onClick={delFormText} >
                <FontAwesomeIcon icon={['fas', 'xmark']} className='w-4 !h-4 align-middle' />
              </button>
            </span>
            <button type="submit" className="bt-sch" title='검색'>
              <FontAwesomeIcon icon={['fas', 'search']} className='w-5 !h-5 align-middle' />
            </button>
            
          </form>
        </div>
      </div>
      


      {keywordList.length > 0 &&
      <div className={`recent-kwds`} ref={keyWordBox}>
        <ul className="lst">
        { keywordList.map( kwd => {
          return (
            <li key={kwd}>
              <button className="kwd" type="button" onClick={ ()=> goRecentSearch(kwd) }>{kwd}</button>
              <button className="del" type="button" onClick={ ()=> delRecentKwd(kwd) }><FontAwesomeIcon icon={['fas', 'xmark']} className='w-4 !h-4 align-middle' /></button>
            </li>
          )
        }) }
        </ul>
      </div>
      }

      <div className='movie-list p-6' tabIndex={-1}>
      { 
      
      schList.length <= 0  ? 
        <div className="nodata">
          <i className="fa-solid fa-file-magnifying-glass"></i>
          { keyword ? <p> ‟{keyword}” 검색 결과가 없습니다.</p> : <p> 검색어를 입력하세요.</p> } 
        </div>
        :
        <>
        <ul className='list'>
        {
          schList.map((data:any, num:number) =>{
            return(
              <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                {/* <ItemA data={data} cate={cate} /> */}
                {data.title || data.name}
              </li>
            )
          })
        }
        </ul>

        { schList.length > 0 &&
        <div className={`ui-loadmore ${loadActive} ${loadHide}  ${loadError}`}>
          <em><i className="fa-duotone fa-spinner"></i></em>
          <button onClick={ ()=>{
            callStat = true;
            fetchMoive(page);
          }} type="button" className="btn-load" title="불러오기"><i className="fa-regular fa-rotate-right"></i></button>
        </div>
        }
        </>
      }     
      </div>
              
      <div className="page-set">
      { schList.length > 0 &&
          <div className="inr"><div className="pg"><i className="p">{nowPage.pge}</i> <i className="s">/</i> <i className="t">{nowPage.tot}</i></div></div>
      }
      </div>


      {/* <div className='flex gap-4'>{opts}
        <Link className='btn' href={`/search/movie/`}>MOVIE</Link>
        <Link className='btn' href={`/search/tv/`}>TV</Link>
      </div>

      <p>{`/search/${opts}`}</p>
      <ul className='grid grid-cols-2 gap-4 mt-4'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((idx) => (
          <li key={idx}>
            <Link
              className='border border-white/20 rounded-md p-4 h-40 flex flex-col gap-1 justify-center items-center text-md uppercase'
              href={`/search/${opts}/${idx}`}
              passHref
              scroll={false}
            >
              {opts} - {idx}
            </Link>
          </li>
        ))}
      </ul> */}
    </main>
  );
}
