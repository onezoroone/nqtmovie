import { Helmet } from "react-helmet";

export default function NotFound({message}){
    return (
        <>
        <Helmet>
            <title>Không Tìm Thấy Trang</title>
        </Helmet>
        <div className="w-100 d-flex justify-content-center text-white align-items-center" style={{height:'80vh'}}>
            <div><h3>404 | {message ? message : "Oh No! Trang Không Tồn Tại."}</h3></div>
        </div>
        </>
    )
}