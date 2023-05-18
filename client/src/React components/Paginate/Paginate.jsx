import { useState, useEffect } from "react"


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
      <button key='P1' value={currentPage-1} onClick={handlePrev} disabled={prevBtn}>Prev</button>
      {pageNumbers?.map(e=><button key={e} value={e} onClick={handleOnClick} disabled={currentPage===e}>{e}</button>)}
      <button key='N1' value={currentPage+1}onClick={handleNext} disabled={nextBtn}>Next</button>
    </div>
  )
}
export default Paginate