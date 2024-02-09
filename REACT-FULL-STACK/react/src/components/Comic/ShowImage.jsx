/* eslint-disable react/prop-types */
function ShowImage({contents}) {
    if (!contents || !Array.isArray(contents)) {
        return null;
      }
    return (
        <div className="area-show-content">
            <div className="comicDetails">
                {contents.map((data) => (
                <img key={data.id} className="image-details" src={data.link} alt="NQT COMIC" />
                ))}
            </div>
        </div>
     );
}

export default ShowImage;
