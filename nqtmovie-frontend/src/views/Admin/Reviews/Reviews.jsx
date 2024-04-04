import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Loading from "../../Loading";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import axiosClient from "../../../axios-client";
import { Rating } from 'primereact/rating';
import { useStateContext } from '../../../contexts/ContextProvider';
        
function Reviews() {
    const [deleteReview, setDeleteReview] = useState(false);
    const [review, setReview] = useState({});
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const {toast} = useStateContext();
    const dt = useRef(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [reload, setReload] = useState(false);
    useEffect(()=>{
        axiosClient.get("reviews/getAllReviews")
        .then((res) => {
            setData(res.data);
        })
    },[reload])
    if(!data) return <Loading />

    const hideDialog = () => {
        setDeleteReview(false);
    };

    const confirmDelete = (review) => {
        setReview(review);
        setDeleteReview(true);
    };
    const handleDeleteReview = async () => {
        setLoading(true);
        await axiosClient.post("/reviews/deleteReview",{
            id: review.id
        }).then((response) => {
            toast.current.show({severity:'success', summary: 'Thành công', detail:response.data, life: 3000});
        })
        setReload(!reload);
        setLoading(false);
        setDeleteReview(false);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="bi bi-trash" className="rounded-5" outlined severity="danger" onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Quản lý đánh giá</h4>
            <span className="p-input-icon-left">
                <i className="bi bi-search fs-5" style={{marginTop:'-0.9rem'}} />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Tìm kiếm..." />
            </span>
        </div>
    );

    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="Không" className="rounded-3" icon="bi bi-times" style={{marginRight: '10px'}} outlined onClick={hideDialog} />
            <Button loading={loading} label="Có" className="rounded-3" icon="bi bi-check" onClick={handleDeleteReview} />
        </React.Fragment>
    );

    const verifiedBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };
    return (  
        <div>
        <Helmet>
            <title>{`List Reviews - ${import.meta.env.VITE_BASE_NAME}`}</title>
            <meta property="og:title" content={`List Reviews - ${import.meta.env.VITE_BASE_NAME}`} />
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div>
            <DataTable ref={dt} value={data} selection={selectedUsers} onSelectionChange={(e) => setSelectedUsers(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Đang hiển thị {first} đến {last} của {totalRecords} lượt đánh giá" globalFilter={globalFilter} header={header}>
                <Column selectionMode="multiple" ></Column>
                <Column field="id" header="ID" sortable style={{ minWidth: '0.5rem' }}></Column>
                <Column field="nameUser" header="Tên người dùng" ></Column>
                <Column field="name" header="Phim"></Column>
                <Column field="review" header="Đánh giá" style={{ minWidth: '20rem' }}></Column>
                <Column field="rating" header="Sao" sortable body={verifiedBodyTemplate} />
                <Column field="created_at" header="Đăng ngày"></Column>
                <Column body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
        </div>
        <Dialog visible={deleteReview} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Xác nhận" modal className="p-fluid" footer={deleteDialogFooter} onHide={hideDialog}>
            <div className="confirmation-content">
                <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem', marginRight:'15px' }} />
                <span>
                    Bạn có chắc chắn muốn xóa đánh giá này?
                </span>
            </div>
        </Dialog>
    </div>
    );
}

export default Reviews;