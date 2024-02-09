import { Link } from "react-router-dom";
import unidecode from "unidecode";
/* eslint-disable react/prop-types */
const TabContent = ({ tabData }) => {
    if (!tabData || !Array.isArray(tabData)) {
        return null;
      }
  return(
    <>
      <ul className='list-content clearfix'>
      {tabData.map((tab) => (
          <li key={tab.id} className="comic-hover">
            <Link to={`${unidecode(tab.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${tab.id}`} title={tab.name} data-id={tab.id}>
              <div className="image-comic">
                <div className="comic-hot"></div>
                <img src={tab.image} alt={tab.name} title={tab.name} />
              </div>
              <span className='time-comic'>50 phút &nbsp;<i className='bi bi-eye-fill'></i> 2</span>
            </Link>
            <a href="#">
              <h3 className='title-comic'>{tab.name}</h3>
            </a>
            <span className='star-comic'><img src="./rating-5.png" alt="" /></span>
            <span className='chapter-comic'><a href="">Chapter {tab.totalchap}</a></span>
          </li>
          ))}
        </ul>
    </>
  )
}

export default TabContent
