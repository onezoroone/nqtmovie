import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { FilterMatchMode } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom';

export default function MovieList() {
    const [products, setProducts] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    useEffect(() => {
        document.title = "Movies List"
        axiosClient.post('/getAllmovies')
        .then(response => {
            setProducts(response.data);
        })
    }, []);

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        axiosClient.post(`/deleteMovie/${product.id}`);
        setDeleteProductDialog(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Movie Deleted', life: 5000 });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        for(let i =0 ; i< selectedProducts.length; i++){
            axiosClient.post(`/deleteMovie/${selectedProducts[i].id}`);
        }
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Movies Deleted', life: 5000 });
    };


    const leftToolbarTemplate = () => {
        return (
            <div className="d-flex flex-wrap gap-2">
                <Link to={`/admin/movie/add`} className='bg-success' style={{fontSize: '18px', borderRadius:'5px', padding:'2px 15px'}}><i className="bi bi-plus-lg" style={{marginRight:'3px'}}></i>New </Link>
                <Button label="Delete" style={{fontSize: '18px', borderRadius:'5px', padding:'2px 15px'}} icon="bi bi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="bi bi-upload" style={{fontSize: '18px', borderRadius:'5px', padding:'2px 15px'}} className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.img} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Link to={`/admin/movie/edit/${rowData.id}`} className='mr-2 p-button p-component p-button-icon-only p-button-outlined p-button-rounded p-button-edit' style={{marginRight: '5px', borderRadius:'50%'}}><i className="bi bi-pencil"></i></Link>
                <Button icon="bi bi-trash" rounded outlined style={{borderRadius:'50%'}} severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );

    };

    const getSeverity = (product) => {
        switch (product.status) {
            case 'Xong':
                return 'success';

            case 'Chưa xong':
                return 'warning';
            default:
                return null;
        }
    };
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.IN },
    });
    const header = (
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Movies List</h4>
            <span className="p-input-icon-left">
                <i className="bi bi-search" style={{marginTop: '-0.8rem'}} />
                <InputText type="search" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search..." style={{height:'40px'}} />
            </span>
        </div>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="bi bi-x-lg" style={{marginRight:'0.5rem', borderRadius:'6px', padding:'0.35rem 1.25rem'}} outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="bi bi-check" style={{borderRadius:'6px', padding:'0.35rem 1.25rem'}} severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="bi bi-x-lg" style={{marginRight:'0.5rem', borderRadius:'6px', padding:'0.35rem 1.25rem'}} outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="bi bi-check" style={{borderRadius:'6px', padding:'0.35rem 1.25rem'}} severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );
    return (
        <div className='mb-5'>
            <Toast ref={toast} />
            <div className="card" style={{marginRight:'5px'}}>
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" filters={filters} filterDisplay="row"
                        globalFilterFields={['name', 'othername', 'type', 'status']} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="id" header="ID" sortable style={{ width:'5%' }}></Column>
                    <Column field="name" header="Name" sortable style={{width:'20%' }}></Column>
                    <Column field="othername" header="Other Name" sortable style={{width:'25%' }}></Column>
                    <Column field="img" header="Image" body={imageBodyTemplate} style={{width:'10%'}}></Column>
                    <Column field="posted" header="Posted" sortable style={{ width:'10%' }}></Column>
                    <Column field='type' header="Type" sortable style={{ width:'10%' }}></Column>
                    <Column field='episode' header="Episode" sortable style={{ width:'10%' }}></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{width:'10%' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem', marginRight:'10px', color:'yellow' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="bi bi-exclamation-triangle mr-3" style={{ fontSize: '2rem', marginRight:'10px', color:'yellow' }} />
                    <span>Are you sure you want to delete the selected movies?</span>
                </div>
            </Dialog>
        </div>
    );
}
