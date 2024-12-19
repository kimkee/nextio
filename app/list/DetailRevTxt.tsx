import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import ui from '@/app/lib/ui';

export default function ViewElips({rvTxt}: {rvTxt: string}) {
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
    rvTxt = rvTxt.replace(/<br>/g, '<br class="hidden">');
  }
  useEffect(() => {
    txtOverflow();
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
    <div data-ui="elips" className="mbox">
      <div 
        className={`ment txt ${ !isOverviewOpen && 'line-clamp-3'}`} 
        data-open={isOverviewOpen} 
        ref={overviewRef} onClick={togOverView}
        dangerouslySetInnerHTML={{ __html: rvTxt }}
        onKeyUp={ e=> e.key ==="Enter" ? togOverView() : null  }
        tabIndex={0}
      ></div>
    </div>
    </>
  )
}
