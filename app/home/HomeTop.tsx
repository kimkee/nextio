'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules'; //,EffectFade 
import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import './HomeTop.scss';
import ui from '@/app/lib/ui';
import StarPoint from '@/app/components/StarPoint';
import Img from '@/app/components/Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default  function HomeTop({opts}:{opts:{media:string }}) {
  // console.log(opts);
  const page = Math.floor( Math.random() *3 )+1;
  const [mlist, setMlist] = useState<[any] | any>([]);
  const fetchMoive = (page:number)=>{
    ui.loading.show(`glx`);
   
    const fetchURL = `https://api.themoviedb.org/3/${opts.media}/now_playing?language=ko&page=${page}&sort_by=release_date.desc&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    axios.get( fetchURL ).then(res =>{
      console.log(res.data.results);
      setMlist( (prev:any) => [ ...prev , ...res.data.results ] );
      ui.loading.hide();
    }).catch(e=>{
      console.log(e);
      ui.loading.hide();
    }); 
  }
  
  const [swiper, setSwiper] = useState(null as any);
  const nexto = () => {
    if(swiper) swiper.slideTo( Math.floor( Math.random() *10 ) , 0 );
  };

  useEffect(() => {
    fetchMoive(page);
    nexto();
    
    window.addEventListener("scroll", scrollHome);
    return ()=>{
      window.removeEventListener("scroll", scrollHome);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[swiper]);

  const [topVal, setTopVal] = useState(0);
  const scrollHome = ()=> setTopVal(  ui.viewport.scrollTop() * 0.2 ) ;
  
  // console.log(MY_GLOBAL_VARIABLE);

  const togglePlayStop = () => {
    setPlayStop( !playStop );
    if(playStop) swiper.autoplay.start();
    else swiper.autoplay.stop();
  }
  const [playStop, setPlayStop] = useState(false);

  return(
    <>
      
      <section className={`sect mnTop`}>

        <div className="inr" id="slide">
          
          <Swiper className="swiper-wrapper swiper slide" 
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]} //EffectFade,
            spaceBetween={0}
            slidesPerView={1}
            // navigation
            loop={mlist.length > 10 ? true : false}
            effect={"fade"}
            // autoplay={false}
            autoplay={{ delay: 5000 ,waitForTransition:false, pauseOnMouseEnter: true ,disableOnInteraction: false}}
            wrapperTag="ul"
            pagination={{ 
              el: ".custom-pagination",
              clickable: true
             }}
            // scrollbar={{ draggable: true }}
            // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
            autoHeight={false}
            onSwiper={(swiper) => {
              // console.log("initialize swiper", swiper);
              setSwiper(swiper);
              swiper.slideTo( Math.floor( Math.random() *10 ) );
            }}
            onSlideChange={() => {/* console.log('slide change') */}}
          >
            {
              mlist.filter( (item:any, i:number) => i < 10 ).map( (data:any, idx:number) => {
                const img = `https://image.tmdb.org/t/p/w780${data.poster_path}`;
                return (
                  <SwiperSlide tag="li" key={idx}  className="swiper-slide pbox">
                    <Link className="box" href={`/home/${opts.media}/${data.id}`} scroll={false}>
                        <div className="pics" style={{transform:'translate3D(0rem , 0'+topVal+'px , 0rem)'}}>
                          <Img width={780} height={1170} src={`${img}`} alt={data.title} srcerr='/img/common/non_poster.png' loading='lazy' unoptimized={true} className='img' />
                        </div>
                        <div className="info">
                          <div className="star">
                            <StarPoint point={data.vote_average} opts={{ cls: 'text-lg' }} />
                          </div>
                          <div className="tit">{data.title}</div>
                        </div>
                        <div className="screen"></div>
                    </Link>
                  </SwiperSlide>
                )
              })
            }
            
            <div className="flex z-30 absolute bottom-1 left-0 right-0 items-center justify-center gap-2">
              <div className="custom-pagination !w-auto leading-none flex items-center"></div>
              { mlist.length > 1 &&
              <div className="flex items-center">
                <button className="play w-4 h-4 ring-1 ring-white/30 rounded-full inline-flex items-center justify-center -mx-0.5 text-white/60" 
                  onClick={togglePlayStop}
                  title={ playStop ? 'play' : 'pause' }
                >
                  {playStop ? <FontAwesomeIcon icon={['fas', 'play' ]} className='w-2 h-2 ml-0.5' /> : <FontAwesomeIcon icon={['fas', 'pause' ]} className='w-2 h-2' /> }
                </button> 
              </div> }
            </div>
            
          </Swiper>
        </div>
      </section>
    </>
  )
}