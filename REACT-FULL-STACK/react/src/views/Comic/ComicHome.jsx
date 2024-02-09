import {useEffect, useState} from "react";
import SlideLayout from '../../components/Comic/SlideLayout.jsx';
import ContentLayout from '../../components/Comic/ContentLayout.jsx';
import RightContent from '../../components/Comic/RightContent.jsx';
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";
import Footer from "../../components/Comic/Footer.jsx";
export default function Home(){
    const [data, setData] = useState();
    const {dataComic} = useStateContext();
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await axiosClient.post('/getprivate');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        document.title = 'Trang chủ | NQTCOMIC.ID.VN - Kho truyện tranh online chất lượng hàng đầu';
    }, []);
    const {allcomics ,slides, top} = dataComic;
  return(
    <>
      <SlideLayout data={slides}></SlideLayout>
      <div className="container" style={{marginTop: '10px'}}>
        <div className="row">
          <ContentLayout data={allcomics} security={data}></ContentLayout>
          <RightContent tabData={top}></RightContent>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
