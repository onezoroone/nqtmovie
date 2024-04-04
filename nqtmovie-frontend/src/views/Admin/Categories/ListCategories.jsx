import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Loading from "../../Loading";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import axiosClient from "../../../axios-client";
import { useStateContext } from '../../../contexts/ContextProvider';
import { Toolbar } from 'primereact/toolbar';

function ListCategories() {
    const [deleteCategory, setDeleteCategory] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [category, setCategory] = useState({});
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const {toast} = useStateContext();
    const dt = useRef(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [reload, setReload] = useState(false);
    const [value, setValue] = useState('');
    useEffect(()=>{
        axiosClient.get("categories/getAllCategories")
        .then((res) => {
            setData(res.data);
        })
    },[reload])
    if(!data) return <Loading />

    const hideDialog = () => {
        setDeleteCategory(false);
        setNewCategory(false);
    };

    const confirmDelete = (category) => {
        setCategory(category);
        setDeleteCategory(true);
    };

    const openDialog = () => {
        setNewCategory(true);
    }
    const handleDeleteCategory = async () => {
        setLoading(true);
        await axiosClient.post("/categories/deleteCategory",{
            name: category.name
        }).then((response) => {
            toast.current.show({severity:'success', summary: 'Thành công', detail:response.data, life: 3000});
        }).catch(() => {
            toast.current.show({severity:'error', summary: 'Thất bại', detail:"Thể loại đang được sử dụng.", life: 3000});
        })
        setReload(!reload);
        setLoading(false);
        setDeleteCategory(false);
    }

    const handleNewCategory = async () => {
        if(value != ""){
            setLoading(true);
            await axiosClient.post("/categories/newCategory", {
                name: value
            }).then((res) => {
                toast.current.show({severity:'success', summary: 'Thành công', detail: res.data, life: 3000});
                setValue("");
            }).catch(() => {
                toast.current.show({severity:'error', summary: 'Thất bại', detail:"Thể loại đã tồn tại.", life: 3000});
            })
            setReload(!reload);
            setLoading(false);
            setNewCategory(false);
        }else{
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Thể loại không được để trống.', life: 3000});
        }
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="bi bi-trash" className="rounded-5" outlined severity="danger" onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="d-flex flex-wrap gap-2">
                <Button label="Thêm mới" icon="bi bi-plus" className="rounded-2 text-white" onClick={() => openDialog()} severity="success" />
            </div>
        );
    };

    const header = (
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Quản lý thể loại</h4>
            <span className="p-input-icon-left">
                <i className="bi bi-search fs-5" style={{marginTop:'-0.9rem'}} />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Tìm kiếm..." />
            </span>
        </div>
    );

    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="Không" className="rounded-3" icon="bi bi-x" style={{marginRight: '10px'}} outlined onClick={hideDialog} />
            <Button loading={loading} label="Có" className="rounded-3" icon="bi bi-check" onClick={handleDeleteCategory} />
        </React.Fragment>
    );

    const newDialogFooter = (
        <React.Fragment>
            <Button label="Đóng" className="rounded-3" icon="bi bi-x" style={{marginRight: '10px'}} outlined onClick={hideDialog} />
            <Button loading={loading} label="Thêm" className="rounded-3" icon="bi bi-check" onClick={handleNewCategory} />
        </React.Fragment>
    )

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
                    dataKey="name" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Đang hiển thị {first} đến {last} của {totalRecords} thể loại" globalFilter={globalFilter} header={header}>
                <Column selectionMode="multiple" ></Column>
                <Column field="name" sortable header="Thể loại" style={{ minWidth: '50rem' }}></Column>
                <Column body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
        </div>
        <Dialog visible={deleteCategory} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Xác nhận" modal className="p-fluid" footer={deleteDialogFooter} onHide={hideDialog}>
            <div className="confirmation-content">
                <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem', marginRight:'15px' }} />
                {category && 
                <span>
                    Bạn có chắc chắn muốn xóa thể loại {category.name}?
                </span>}
            </div>
        </Dialog>
        <Dialog visible={newCategory} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Thêm mới" modal className="p-fluid" footer={newDialogFooter} onHide={hideDialog}>
            <div className="confirmation-content">
                <InputText placeholder='Nhập thể loại' value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        </Dialog>
    </div>
    );
}

export default ListCategories;