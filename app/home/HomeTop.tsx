
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

import ui from '@/app/lib/ui';
import StarPoint from '@/app/components/StarPoint';

export default  function HomeTop({opts}:{opts:{media:string }}) {
  // console.log(opts);
  const page = Math.floor( Math.random() *3 )+1;
  const [mlist, setMlist] = useState<[any] | any>([]);
  const fetchMoive = (page:number)=>{
    ui.loading.show(`glx`);
   
    const fetchURL = `https://api.themoviedb.org/3/${opts.media}/now_playing?language=ko&page=${page}&sort_by=release_date.desc&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    axios.get( fetchURL ).then(res =>{
      console.log(res.data.results);
      setMlist( res.data.results );
      // console.log( mlist );
      console.log(page + "=== " + res.data.total_pages );
      
      ui.loading.hide();
      if( res.data.total_pages <= page ) {
        document.querySelector(".ui-loadmore")?.classList.add("hide");
      };
    }).catch(e=>{
      console.log(e);
      ui.loading.hide();
      document.querySelector(".ui-loadmore")?.classList.add("error");
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

  return(
    <>
      
      <section className="sect mnTop">

        <div className="inr" id="slide">
          
          <Swiper className="swiper-wrapper swiper slide" 
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]} //EffectFade,
            spaceBetween={0}
            slidesPerView={1}
            // navigation
            loop={true}
            effect={"fade"}
            autoplay={false}
            // autoplay={{ delay: 3000 ,waitForTransition:false, pauseOnMouseEnter: true ,disableOnInteraction: false}}
            wrapperTag="ul"
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
            autoHeight={false}
            onSwiper={(swiper) => {
              console.log("initialize swiper", swiper);
              setSwiper(swiper);
              swiper.slideTo( Math.floor( Math.random() *10 ) );
            }}
            onSlideChange={() => {/* console.log('slide change') */}}
          >
            {
              mlist.filter( (item:any, i:number) => i < 10 ).map( (data:any, idx:number) => {
                const img = `//image.tmdb.org/t/p/w780${data.poster_path}`;
                return (
                  <SwiperSlide tag="li" key={idx}  className="swiper-slide pbox">
                    <div className="box" /* href={`/home/${opts.media}/${data.id}`} */>
                        <div className="pics" style={{transform:'translate3D(0rem , 0'+topVal+'px , 0rem)'}}>
                          <img src={`${img}`} alt="" className='img' onError={ui.error.poster} />
                        </div>
                        <div className="info">
                          <div className="star">
                            <StarPoint point={data.vote_average} opts={opts} />
                          </div>
                          <div className="tit">{data.title}</div>
                        </div>
                        <div className="screen"></div>
                    </div>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      </section>
    </>
  )
}