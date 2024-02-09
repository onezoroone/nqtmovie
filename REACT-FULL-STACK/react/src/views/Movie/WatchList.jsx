import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import ListMovie from "../../components/Movie/ListMovie";
import { useStateContext } from "../../contexts/ContextProvider";

function AllMovie() {
    const [data, setData] = useState([]);
    const {idUser} = useStateContext();
    useEffect(() => {
        const fetchData = async () => {
        try{
            const response = await axiosClient.post(`/getWatchlist/${idUser}`);
            setData(response.data);
        }catch(error){
            console.log(error)
        }
        document.title = "Danh sách phim xem sau"
    };
    fetchData();
    }, [idUser])
    return (
        <>
            <div style={{height: '100px'}}></div>
            <h1 className="text-white d-flex justify-content-center mb-3">Danh sách xem sau</h1>
            <ListMovie LMovies={data}></ListMovie>
        </>
    );
}

export default AllMovie;
