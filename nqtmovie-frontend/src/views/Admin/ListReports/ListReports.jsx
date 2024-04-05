import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Loading from "../../Loading";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import axiosClient from "../../../axios-client";
import { useStateContext } from '../../../contexts/ContextProvider';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
        
function ListReports() {
    const [editReport, setEditReport] = useState(false);
    const [report, setReport] = useState({});
    const [selectedCategories, setSelectedCategories] = useState(null);
    const {toast, setCountReports} = useStateContext();
    const dt = useRef(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [reload, setReload] = useState(false);
    const [ingredient, setIngredient] = useState('');
    useEffect(()=>{
        axiosClient.get("/reports/getAllReports")
        .then((res) => {
            setData(res.data);
        })
    },[reload])
    if(!data) return <Loading />

    const hideDialog = () => {
        setEditReport(false);
    };

    const save = (report) => {
        setReport(report);
        setIngredient(report.fixed)
        setEditReport(true);
    };
    const handleEditReport = async () => {
        setLoading(true);
        await axiosClient.post("/reports/editReport",{
            id: report.id,
            fixed: ingredient
        }).then((response) => {
            toast.current.show({severity:'success', summary: 'Thành công', detail:response.data, life: 3000});
            setCountReports(count => count - 1);
        }).catch(() => {
            toast.current.show({severity:'error', summary: 'Thất bại', detail:"Lỗi gì đó", life: 3000});
        })
        setReload(!reload);
        setLoading(false);
        setEditReport(false);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="bi bi-pencil" className="rounded-5" outlined severity="success" onClick={() => save(rowData)} />
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="d-flex flex-wrap gap-2">
                <Button label="Xóa" icon="bi bi-plus" disabled className="rounded-2 text-white" severity="danger" />
            </div>
        );
    };

    const header = (
        <div className="d-flex p-3 flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Báo cáo lỗi phim</h4>
        </div>
    );

    const saveDialogFooter = (
        <React.Fragment>
            <Button label="Đóng" className="rounded-3" icon="bi bi-x" style={{marginRight: '10px'}} outlined onClick={hideDialog} />
            <Button loading={loading} label="Lưu" className="rounded-3" icon="bi bi-check" onClick={handleEditReport} />
        </React.Fragment>
    );

    return (  
        <div>
        <Helmet>
            <title>{`List Categories - ${import.meta.env.VITE_BASE_NAME}`}</title>
            <meta property="og:title" content={`List Reviews - ${import.meta.env.VITE_BASE_NAME}`} />
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div>
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
            <DataTable ref={dt} value={data} selection={selectedCategories} onSelectionChange={(e) => setSelectedCategories(e.value)}
                    dataKey="created_at" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Đang hiển thị {first} đến {last} của {totalRecords} báo cáo" header={header}>
                <Column selectionMode="multiple" ></Column>
                <Column field="name" sortable header="Phim"></Column>
                <Column field="ep_number" sortable header="Tập"></Column>
                <Column field="content" sortable header="Nội dung"></Column>
                <Column field="fixed" sortable header="Đã sửa"></Column>
                <Column field="created_at" sortable header="Ngày báo"></Column>
                <Column field="updated_at" sortable header="Ngày sửa"></Column>
                <Column body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
        <Dialog visible={editReport} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Sửa" modal className="p-fluid" footer={saveDialogFooter} onHide={hideDialog}>
            <div className="confirmation-content d-flex flex-column gap-2">
                <div className="d-flex gap-2 align-items-center">
                    <RadioButton inputId="ingredient1" name="fixed" value="True" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'True'} />
                    <label htmlFor="ingredient1" className="ml-2">Đã sửa</label>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <RadioButton inputId="ingredient2" name="fixed" value="False" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'False'} />
                    <label htmlFor="ingredient2" className="ml-2">Chưa sửa</label>
                </div>
            </div>
        </Dialog>
    </div>
    );
}

export default ListReports;