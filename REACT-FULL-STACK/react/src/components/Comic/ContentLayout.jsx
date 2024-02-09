/* eslint-disable react/prop-types */
import { useStateContext } from '../../contexts/ContextProvider';
import TabContent from './TabContent'
export default function ContentLayout({data, security}){
    const {user } = useStateContext();
    const userInfor = JSON.parse(user);
  return(
    <div className="col-md-8 p-0 main-content bg-light">

      <ul className="nav nav-tab nav-pills" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="pills-hotnew-tab" data-bs-toggle="pill" data-bs-target="#pills-hotnew" type="button" role="tab" aria-controls="pills-hotnew" aria-selected="true">Truyện hot mới cập nhật</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="pills-oldest-tab" data-bs-toggle="pill" data-bs-target="#pills-oldest" type="button" role="tab" aria-controls="pills-oldest" aria-selected="false">Mới nhất</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="pills-trending-tab" data-bs-toggle="pill" data-bs-target="#pills-trending" type="button" role="tab" aria-controls="pills-trending" aria-selected="false">Đang hot</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="pills-mostviews-tab" data-bs-toggle="pill" data-bs-target="#pills-mostviews" type="button" role="tab" aria-controls="pills-mostviews" aria-selected="false">Xem nhiều</button>
        </li>
        {(user && (userInfor.permission =="admin" || userInfor.permission =="private")) &&
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-private-tab" data-bs-toggle="pill" data-bs-target="#pills-private" type="button" role="tab" aria-controls="pills-private" aria-selected="false">Không có gì</button>
            </li>
        }
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-hotnew" role="tabpanel" aria-labelledby="pills-hotnew-tab">
          <TabContent tabData={data}></TabContent>
        </div>
        <div className="tab-pane fade" id="pills-oldest" role="tabpanel" aria-labelledby="pills-oldest-tab">
          <TabContent tabData={data}></TabContent>
        </div>
        <div className="tab-pane fade" id="pills-trending" role="tabpanel" aria-labelledby="pills-trending-tab">
          <TabContent tabData={data}></TabContent>
        </div>
        <div className="tab-pane fade" id="pills-mostviews" role="tabpanel" aria-labelledby="pills-mostviews-tab">
          <TabContent tabData={data}></TabContent>
        </div>
        {(user && userInfor.permission =="admin") &&
            <div className="tab-pane fade" id="pills-private" role="tabpanel" aria-labelledby="pills-private-tab">
            <TabContent tabData={security}></TabContent>
          </div>
        }
      </div>
    </div>
  )
}
