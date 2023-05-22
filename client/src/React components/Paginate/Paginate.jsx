import { useState, useEffect } from "react"
import Style from './Paginate.module.css'

const Paginate = ({handlePrev, handleNext, handleOnClick, pageNumbers, currentPage, maxPage})=>{

  const [prevBtn, setPrevBtn]=useState(true)
  const [nextBtn, setNextBtn]= useState(false)

  useEffect(() => {
    if (currentPage === 1) {
      setPrevBtn(true);
      setNextBtn(false);
    } else if (currentPage === maxPage) {
      setPrevBtn(false);
      setNextBtn(true);
    } else {
      setPrevBtn(false);
      setNextBtn(false);
    }
  }, [currentPage, maxPage]);


  return(
    <div>
      <button className={Style.lateralMov} key='P1' value={currentPage-1} onClick={handlePrev} disabled={prevBtn}>Prev</button>
      {pageNumbers?.map(e=><button className={Style.buttons} key={e} value={e} onClick={handleOnClick} disabled={currentPage===e}>{e}</button>)}
      <button className={Style.lateralMov} key='N1' value={currentPage+1}onClick={handleNext} disabled={nextBtn}>Next</button>
    </div>
  )
}
export default Paginate