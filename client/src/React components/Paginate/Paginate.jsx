const Paginate = ({
  gamesPerPage,
  allVideogamesSliced,
  paginado,
  previousPage,
  nextpage
 })=>{
  let pageNumbers=[]
  let max= Math.ceil(allVideogamesSliced/gamesPerPage)

  for (let i = 0; i < max; i++) {
    pageNumber.push(i++);  
  }

  return(
    <div>
        <nav className="dropdownmenu">
          <ul>
            <li onClick={()=>paginado(currentPage-1)}>
                <a>Prev</a>
            </li>
            {pageNumbers && pageNumbers.map(num=>{
              <li key={num}>
                <li onClick={()=>paginado(num)}>
                  <a >{num}</a>
                </li>
              </li>
            })}
            <li onClick={()=>paginado(currentPage+1)}>
              <a >Next|</a>
            </li>
          </ul>
          <hr />
          <hr />
          <hr />
          <hr />
        </nav>
    </div>
  )
 }
 export default Paginate