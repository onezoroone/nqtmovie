import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Loading from "../../Loading";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import axiosClient from "../../../axios-client";
import { useStateContext } from '../../../contexts/ContextProvider';
function ListRequests() {
    const [deleteRequest, setDeleteRequest] = useState(false);
    const [request, setRequest] = useState({});
    const {toast} = useStateContext();
    const dt = useRef(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [reload, setReload] = useState(false);
    useEffect(()=>{
        axiosClient.get("/requests/getAllRequests")
        .then((res) => {
            setData(res.data);
        })
    },[reload])
    if(!data) return <Loading />

    const hideDialog = () => {
        setDeleteRequest(false);
    };

    const confirmDelete = (request) => {
        setRequest(request);
        setDeleteRequest(true);
    };

    const handleDeleteRequest = async () => {
        setLoading(true);
        await axiosClient.post("/requests/deleteRequest",{
            id: request.id
        }).then((response) => {
            toast.current.show({severity:'success', summary: 'Thành công', detail:response.data, life: 3000});
        }).catch(() => {
            toast.current.show({severity:'error', summary: 'Thất bại', detail:"Lỗi không biết.", life: 3000});
        })
        setReload(!reload);
        setLoading(false);
        setDeleteRequest(false);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="bi bi-trash" className="rounded-5" outlined severity="danger" onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="d-flex flex-wrap gap-2 p-2 align-items-center justify-content-between">
            <h4 className="m-0">Yêu cầu phim</h4>
        </div>
    );

    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="Không" className="rounded-3" icon="bi bi-x" style={{marginRight: '10px'}} outlined onClick={hideDialog} />
            <Button loading={loading} label="Có" className="rounded-3" icon="bi bi-check" onClick={handleDeleteRequest} />
        </React.Fragment>
    );

    return (  
        <div>
        <Helmet>
            <title>{`List Requests - ${import.meta.env.VITE_BASE_NAME}`}</title>
            <meta property="og:title" content={`List Requests - ${import.meta.env.VITE_BASE_NAME}`} />
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div>
            <DataTable ref={dt} value={data}
                    dataKey="name" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Đang hiển thị {first} đến {last} của {totalRecords} yêu cầu" header={header}>
                <Column field="id" header="Mã"></Column>
                <Column field="name" header="Phim" style={{ minWidth: '40rem' }}></Column>
                <Column field="created_at" sortable header="Ngày yêu cầu"></Column>
                <Column body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
        <Dialog visible={deleteRequest} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Xác nhận" modal className="p-fluid" footer={deleteDialogFooter} onHide={hideDialog}>
            <div className="confirmation-content">
                <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem', marginRight:'15px' }} />
                <span>
                    Bạn có chắc chắn muốn xóa yêu cầu này?
                </span>
            </div>
        </Dialog>
    </div>
    );
}

export default ListRequests;