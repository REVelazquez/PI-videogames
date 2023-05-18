const {useState } = require("react")

const Paginate = ({handlePrev, handleNext, handleOnClick, pageNumbers, currentPage, nextBtn, prevBtn})=>{

  return(
    <div>
      <button key='P1' value={currentPage-1} onClick={handlePrev} disabled={prevBtn}>Prev</button>
      {pageNumbers?.map(e=><button key={e} value={e} onClick={handleOnClick}>{e}</button>)}
      <button key='N1' calue={currentPage+1}onClick={handleNext} disabled={nextBtn}>Next</button>
    </div>
  )
}
export default Paginate