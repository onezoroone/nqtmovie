import { Link } from "react-router-dom"
import unidecode from "unidecode"
/* eslint-disable react/prop-types */
function RankingLayout({tabData}){
  return(
    <>
      <ul className="content-ranking clearfix">
      {tabData.map((tab, index) => (
        <li key={tab.id}>
          <span className="number-top">{index + 1}</span>
          <img src={tab.image} title={tab.title} alt={tab.name} style={{width: '80px'}} />
          <div className='infor-comic'>
            <Link to={`${unidecode(tab.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${tab.id}`} className='h-auto'>
              <h3 className='title-comic fs-5'>{tab.name}</h3>
            </Link>
            <span>
              <Link to={`${unidecode(tab.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${tab.id}`} className='chapter-comic'>
                Chapter {tab.totalchap}
              </Link>
            </span>
          </div>
        </li>
      ))}
      </ul>
    </>
  )
}

export default RankingLayout
