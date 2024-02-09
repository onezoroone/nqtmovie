/* eslint-disable react/prop-types */
import { useState } from "react";
import RankingLayout from "./RankingLayout";
function RightContent({tabData}){
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSwitchToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      const linkElement = document.getElementById('dark-theme-link');
      linkElement.remove();
    } else {
      const linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('type', 'text/css');
      linkElement.setAttribute('href', './src/assets/css/dark.css');
      linkElement.setAttribute('id', 'dark-theme-link');
      document.head.appendChild(linkElement);
    }
  };

  const handleBtnChangeCLClick = () => {
    handleSwitchToggle();
  };
  return(
    <div className="col-md-4 left-container">
      <label htmlFor="" className="switchBtn">
        <input type="checkbox" role="switch" checked={isDarkMode} onChange={handleSwitchToggle} className="switchLight d-none" />
        <div className="btnChangeCL" onClick={handleBtnChangeCLClick}>
          Đổi giao diện
        </div>
      </label>
      <div className="right-row-container">
        <h4 className="text-uppercase title-history">Lịch sử</h4>
        <div className="content-right-container">
          <span>Bạn chưa có lịch sử đọc</span>
        </div>
      </div>
      <div className="right-row-container">
        <h4 className="text-uppercase title-history">BẢNG XẾP hạng</h4>
        <div className="content-right-container">
          <ul className="nav nav-tab nav-pills nav-justified" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="pills-weekly-tab" data-bs-toggle="pill" data-bs-target="#pills-weekly" type="button" role="tab" aria-controls="pills-weekly" aria-selected="true">Top tuần</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-monthly-tab" data-bs-toggle="pill" data-bs-target="#pills-monthly" type="button" role="tab" aria-controls="pills-monthly" aria-selected="false">Top tháng</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-yearly-tab" data-bs-toggle="pill" data-bs-target="#pills-yearly" type="button" role="tab" aria-controls="pills-yearly" aria-selected="false">Top năm</button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-weekly" role="tabpanel" aria-labelledby="pills-weekly-tab">
              <RankingLayout tabData={tabData}></RankingLayout>
            </div>
            <div className="tab-pane fade" id="pills-monthly" role="tabpanel" aria-labelledby="pills-monthly-tab">
              <RankingLayout tabData={tabData}></RankingLayout>
            </div>
            <div className="tab-pane fade" id="pills-yearly" role="tabpanel" aria-labelledby="pills-yearly-tab">
              <RankingLayout tabData={tabData}></RankingLayout>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightContent;
