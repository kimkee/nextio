'use client'
import React, { useEffect, useState } from 'react'; //useState, useEffect
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'
import clsx from 'clsx';

import { supabase } from '@/app/supabase.js'; 
import Image from 'next/image';


export default function Header() {
  
  // const location = useLocation();
  const pathname = usePathname();
    return (
    <>
      <header className={`header`}>
        <div className="inr">
          <div className="ldt">
          
            {
              <h1 className="logo"> <Link href={`/home/`} className="btlogo"><i className="fa-brands fa-vuejs"></i></Link></h1> 
              
            }
            
            {/* {store2.state.userInfo.stat+""} */}

          </div>
          <div className="rdt">
            {/*            
            { ( user?.id && myinfo?.id) ?
              <NavLink to={`/user/${myinfo.id}`} className={"user"}> 
                <span className="pic"><img alt="" className="img" src={ myinfo.profile_picture} /></span>
                <span className="txt">{ myinfo.username }</span>
              </NavLink>
            :
              <NavLink to={`/user/signin`} className={"bt login"}><i className="fa-regular fa-user"></i><em>Login</em></NavLink>
            }
            */}
            
            
            {/* <button type="button" className="bt usr"><i className="fa-regular fa-users"></i><b>회원들</b></button> */}
            <button type="button" className="bt gnb"><i className="fa-regular fa-bars"></i><b>메뉴</b></button>
          </div>
        </div>
      </header>
    </>
  )
}
