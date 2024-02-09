import { Link } from "react-router-dom";
import unidecode from "unidecode";
/* eslint-disable react/prop-types */
function ListMovie({LMovies}) {
    return (
        <>
            <div className="list-movie m-1" style={{marginRight: '20',userSelect: 'none'}}>
                {LMovies.map((LMovie) => (
                <div className="movie-box position-relative w-100" key={LMovie.id}>
                    <img src={LMovie.img} alt={LMovie.name} className="w-100 object-fit-cover" title={LMovie.name} />
                    <h5 className="title-name text-uppercase text-white p-1" style={{textAlign:'center'}}>
                        {LMovie.name}
                    </h5>
                    <div className="position-absolute box-episode text-white rounded-circle" style={{width: '50px', height: '50px', textAlign: 'center', lineHeight: '50px'}}>
                        {LMovie.episode}
                    </div>
                    <Link to={`/movie/${unidecode(LMovie.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${LMovie.id}`} className="position-absolute play-button align-items-center">
                        <div className="position-absolute p-2 rounded title-episode">Lượt xem: {LMovie.views}</div>
                        <i className="bi bi-play-circle fs-1"></i>
                    </Link>
                </div>
                ))}
            </div>
        </>
     );
}

export default ListMovie;
