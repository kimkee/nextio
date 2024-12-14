import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

export default function ViewElips({overview}: {overview: string}) {
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
  useEffect(() => {
    txtOverflow();
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <>
    <div data-open={isOverviewOpen} ref={overviewRef} className={`my-5 relative pb-4`} onClick={ togOverView } onKeyUp={ e=> e.key ==="Enter" ? togOverView() : null  } tabIndex={0}> 
      <div ref={txtRef} className={`text-sm  text-[#aaa] cursor-pointer leading-normal ${isOverviewOpen ? '':' line-clamp-3 '}`}>
        {overview}
        { 
          
          <span className={`btn-tog inline-flex items-center justify-center
              ${!isOverviewOpen ? 'absolute left-1/2 -bottom-2 transform -translate-x-1/2' : ''}
              ${isOverFlow ? '':'hidden'}
            `}
          >
            { isOverviewOpen
              ? <><FontAwesomeIcon icon={['fas', 'caret-up']} className='w-3 h-3 text-primary ml-1' /> <span className='sr-only'>숨기기</span></>
              : <span className={`text-primary py-1 text-12`}><span>More</span> <FontAwesomeIcon icon={['fas', 'caret-down']} className='w-3 h-3 absolute left-1/2 transform -translate-x-1/2 -bottom-1.5' /></span>
            }
          </span>
        
        }
      </div>
    </div>
    </>
  )
}
