import { Helmet } from "react-helmet";

export default function NotFound({message}){
    return (
        <>
        <Helmet>
            <title>Không Tìm Thấy Trang</title>
        </Helmet>
        <div className="d-flex justify-content-center text-white align-items-center text-center" style={{height:'80vh', width:'100vw'}}>
            <div><h3>404 | {message ? message : "Oh No! Trang Không Tồn Tại."}</h3></div>
        </div>
        </>
    )
}