

export default function Loading({ opts }: { opts: any }) {
 

  return (
  <>
    { opts.type == 'glx' && 
    <span className={`ui-loading ui-load-glx ${opts.cls}`}>
      <span className="gbx">
          <em className="bx">
              <i></i> <i></i><i></i> <i></i>
          </em>
      </span>
    </span>}
    { opts.type == 'dot' && 
    <span className={`ui-loading ui-loading-dot ${opts.cls}`}>
      <div className="bx"><em><i></i></em></div>
    </span>}
  </>
  )
}