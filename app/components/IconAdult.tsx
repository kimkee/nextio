// 성인 인증 마크
export default function IconAdult({opts}: any) {
  const className = opts?.cls || ''
  return (
  <>
    {
    <span className={
      `z-1 text-xt bg-red-800 text-white rounded-full w-5 h-5 pb-0.5 leading-none
        overflow-hidden inline-flex justify-center items-center align-middle
        ${className}
      `}>
      19
    </span>
    }
  </>  
  )
}