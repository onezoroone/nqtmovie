import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { Helmet } from "react-helmet";
import Loading from "../../Loading";
import styles from "./setting.module.css";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";

function Setting() {
    const [data, setData] = useState(null);
    const [active, setActive] = useState(0);
    const router = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const {user, setUser} = useStateContext();
    const [list,] = useState([
        {
            name: 'Thông tin chung',
            icon: 'bi-speedometer2',
        },
        {
            name: 'Thông tin tài khoản',
            icon: 'bi-person',
        },
        {
            name: 'Bình luận',
            icon: 'bi-chat-left-text',
        },
        {
            name: 'Gói',
            icon: 'bi-box',
        },
        {
            name: 'Đổi mật khẩu',
            icon: 'bi-key',
        }
    ]);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            axiosClient.get('/user')
            .then(res => {
                setData(res.data);
                setName(res.data.user.name);
            })
            .catch(() => router('/'));
        }
        fetchData();
    }, [router]);
    if(!data) return <Loading />
    const handleImageChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setImage(reader.result);
        }
        setSelectedFile(file);
        reader.readAsDataURL(file);
    }
    const handleUpdateInfo = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('avatar', selectedFile);
        axiosClient.post('/users/updateInfor', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            alert(res.data.message);
            setImage(null);
            setName("");
            setUser(res.data.user);
        })
        .catch((err) => alert(err.response.data.message));
    }
    return (  
        <>
        <Helmet>
            <title>Quản Lý Tài Khoản - {import.meta.env.VITE_BASE_NAME}</title>
        </Helmet>
        <div className="container py-5 rounded-1 mb-5" style={{background:'var(--bg-main)'}}>
            <div className="row text-white">
                <div className="col-lg-3 d-flex flex-column">
                    <div className="d-flex align-items-center gap-2 mb-3 px-2">
                        <img src={`/api/avatars/${JSON.parse(user).avatar}`} alt="avatrr" width="70px" height="70px" />
                        <h5 className="text-center text-uppercase text-break">{data.user.name}</h5>
                    </div>
                    <ul className="list-group bg-transparent border-0 mb-3">
                        {list.map((item, index) => (
                            <li key={index} onClick={() => setActive(index)} className={`${index == active ? styles.active : undefined} list-group-item py-3 bg-transparent border-0`}  style={{cursor:'pointer', fontSize:'18px'}}>
                                <div className="text-white d-flex align-items-center gap-2">
                                    <i className={`bi ${item.icon}`}></i>
                                    {item.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`col-lg-9 p-2 ${styles.group}`}>
                    {active == 0 && 
                    <div>
                        <h3 className="text-white text-uppercase position-relative bold fw-bold">Thông tin chung</h3>
                        <div className="mt-4">
                            <div className="row">
                                <div className={`${styles.infoGroup} col-md-6 mb-5`}>
                                    <div className="d-flex align-items-center">
                                        <h4>Thông tin tài khoản</h4>
                                        <div className="flex-1 d-flex justify-content-end align-items-center gap-1" style={{fontSize:'14px'}}>
                                            <span onClick={() => setActive(1)} style={{cursor:'pointer'}}>Chỉnh sửa</span>
                                            <i className="bi bi-arrow-right"></i>
                                        </div>
                                    </div>
                                    <div className={styles.groupChild}>
                                        <h5 className="text-white">Tên: {data.user.name}</h5>
                                        <div>Email: {data.user.email}</div>
                                        <div>Ngày tham gia: {new Date(data.user.created_at).toLocaleDateString('en-GB')}</div>
                                    </div>
                                </div>
                                <div className={`${styles.infoGroup} col-md-6`}>
                                    <div className="d-flex align-items-center">
                                        <h4>Gói</h4>
                                        <div className="flex-1 d-flex justify-content-end align-items-center gap-1" style={{fontSize:'14px'}}>
                                        <span onClick={() => setActive(3)} style={{cursor:'pointer'}}>Nâng cấp ngay</span>
                                            <i className="bi bi-arrow-right"></i>
                                        </div>
                                    </div>
                                    {data.user.role == "user" ?  
                                    <div className={styles.normal}>Gói cơ bản</div>
                                    : <div className={styles.gradient}>Premium</div>}
                                </div>
                            </div>
                        </div>
                    </div>}
                    {active == 1 && 
                    <div>
                        <h3 className="text-white text-uppercase position-relative bold fw-bold">Thông tin tài khoản</h3>
                        <form autoComplete="off" onSubmit={handleUpdateInfo}>
                            <div className="mb-2">
                                <label htmlFor="avatar" className={styles.preAvatar}>
                                    {image ? <img src={image} className="object-fit-cover w-100 h-100" alt="Avatar preview" /> : 'Avatar'}
                                </label>
                                <input type="file" id="avatar" className="d-none" onChange={handleImageChange} accept="image/*" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={data.user.email} disabled className={styles.input} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="name">Tên</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
                            </div>
                            <button className={styles.btn} type="submit">Cập nhật</button>
                        </form>
                    </div>}
                    {active == 2 && 
                    <div>
                        <h3 className="text-white text-uppercase position-relative bold fw-bold">Đánh giá</h3>
                        <table className="table table-striped mt-4" data-bs-theme="dark">
                            <thead>
                                <tr>
                                    <th>Thời gian</th>
                                    <th>Phim</th>
                                    <th>Nội dung</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.reviews.length != 0 && data.reviews.map((item, index) => (
                                    <tr key={index}>
                                        <td>{new Date(item.created_at).toLocaleDateString('en-GB')}</td>
                                        <td>{item.name}</td>
                                        <td>{item.review}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>    
                    </div>}
                    {active == 3 &&
                    <>
                    <h3 className="text-white text-uppercase position-relative bold fw-bold">trả phí</h3>
                    <div className="row justify-content-center gap-3 mt-4">
                        <div className={`${styles.plans} col-md-6`}>
                            <h2>Gói thường</h2>
                            <h4>Miễn phí</h4>
                            <img src="/normal.png" width="130px" height="170px" alt="normal" />
                            <div>
                                <i className="bi bi-check"></i>
                                <span>Quảng cáo</span>
                            </div>
                            <div>
                                <i className="bi bi-check"></i>
                                <span>Phim bị giới hạn</span>
                            </div>
                            <div>
                                <i className="bi bi-check"></i>
                                <span>Phim HD</span>
                            </div>
                        </div>
                        <div className={`${styles.plans} col-md-6`}>
                            <h2>Premium</h2>
                            <h4>1đ / tháng</h4>
                            <img src="/premium.png" width="130px" height="170px" alt="" />
                            <div>
                                <i className="bi bi-check"></i>
                                <span>Không quảng cáo</span>
                            </div>
                            <div>
                                <i className="bi bi-check"></i>
                                <span>Phim không bị giới hạn</span>
                            </div>
                            <div>
                                <i className="bi bi-check"></i>
                                <span>Phim HD</span>
                            </div>
                            <button className={`${styles.btnUpgrade} ${data.user.role !== "user" ? 'text-secondary' : 'text-dark'}`} onClick={() => alert('Vui lòng liên hệ Facebook ADMIN ở phía cuối')} disabled={data.user.role != "user"}>
                                {data.user.role == "user" ? 'Nâng cấp ngay' : 'Đang sử dụng gói này'}
                            </button>
                        </div>
                    </div>
                    </>}
                    {active == 4 &&
                    <div>
                        Đang cập nhật
                    </div>}
                </div>
            </div>
        </div>
        </>
    );
}

export default Setting;