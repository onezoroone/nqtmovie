import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from 'primereact/toast';
function UserList() {
    const [data, setData] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [productDialog, setProductDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [, setSubmitted] = useState(false);
    const [count, setCount] = useState(0);
    const toast = useRef(null);
    const [user, setUser] = useState(null);
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
    useEffect(()=> {
        document.title = "Users List"
        axiosClient.post('/getAllusers')
        .then(response => {
            setData(response.data);
        })
    },[count])
    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };
    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };
    const editUser = (user) => {
        setUser({ ...user });
        setProductDialog(true);
    };
    const deleteUser = () => {
        let _user = {...user};
        axiosClient.post(`/deleteUser/${_user.id}`);
        setCount(count + 1)
        setDeleteUserDialog(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: `${_user.username} Deleted`, life: 5000 });
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="bi bi-pencil" rounded style={{marginRight: '5px', borderRadius:'50%'}} outlined onClick={() => editUser(rowData)}/>
                <Button icon="bi bi-trash" style={{borderRadius:'50%'}} rounded outlined severity="danger" onClick={() => confirmDeleteUser(rowData)} />
            </React.Fragment>
        );
    };
    const saveUser = () => {
        setCount(count + 1)
        setSubmitted(true);
        let _user = { ...user };
        axiosClient.post(`/changePermission/${_user.id}/${_user.permission}`);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 5000 });
        setProductDialog(false);
        setUser(null);
    };
    const getSeverity = (product) => {
        switch (product.permission) {
            case 'admin':
                return 'success';

            case 'private':
                return 'warning';

            case 'user':
                return 'danger';
            default:
                return null;
        }
    };
    const permissionBodyTemplate = (rowData) => {
        return <Tag  className="text-uppercase" value={rowData.permission} severity={getSeverity(rowData)}></Tag>;
    };
    const imageBodyTemplate = (rowData) => {
        return <img src={`${window.location.origin}/api/images/uploads/${rowData.img}`} alt={rowData.img} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };
    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="bi bi-x-lg" style={{marginRight:'0.5rem', borderRadius:'6px', padding:'0.35rem 1.25rem'}} outlined onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="bi bi-check" style={{borderRadius:'6px', padding:'0.35rem 1.25rem'}} severity="danger" onClick={deleteUser} />
        </React.Fragment>
    );
    const userDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="bi bi-x-lg" style={{marginRight:'0.5rem', borderRadius:'6px', padding:'0.35rem 1.25rem'}} outlined onClick={hideDialog} />
            <Button label="Save" icon="bi bi-check" style={{borderRadius:'6px', padding:'0.35rem 1.25rem'}} onClick={saveUser} />
        </React.Fragment>
    );
    const onPermissChange = (e) => {
        let _user = { ...user };
        _user['permission'] = e.value;
        setUser(_user);
    };
    return (
        <div className="container-fluid">
            <Toast ref={toast} />
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Users List</h4>
                            </div>
                            <span className="p-input-icon-left">
                                <InputText className="InputSearchValue" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" style={{borderRadius: '5px', border:'none', padding:'5px'}} />
                            </span>
                        </div>
                        <div className="iq-card-body">
                            <div className="table-view card" >
                                <DataTable value={data} paginator selectionMode="single" rows={10} filters={filters} filterDisplay="row"
                                globalFilterFields={['username', 'email']}
                                 tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="id" header="ID"></Column>
                                    <Column field="img" header="Image" body={imageBodyTemplate} style={{width:'10%'}}></Column>
                                    <Column field="username" header="Username"></Column>
                                    <Column field="email" header="Email"></Column>
                                    <Column field="created_at" header="Created at"></Column>
                                    <Column field="permission" body={permissionBodyTemplate} sortable header="Permission"></Column>
                                    <Column header="Action" body={actionBodyTemplate}></Column>
                                </DataTable>
                            </div>
                            <Dialog visible={deleteUserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                                <div className="confirmation-content">
                                    <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem', marginRight:'10px', color:'yellow' }} />
                                    {user && (
                                        <span>
                                            Are you sure you want to delete <b>{user.username}</b>?
                                        </span>
                                    )}
                                </div>
                            </Dialog>
                            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="User Details" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                                {user && (
                                    <>
                                    <img src={`${window.location.origin}/api/images/uploads/${user.img}`} alt={user.img} style={{maxWidth: '200px'}} className="product-image block m-auto pb-3" />
                                    <div className="field">
                                        <label className="mb-3 font-bold">Permission</label>
                                        <div className="formgrid grid">
                                            <div className="field-radiobutton col-6">
                                                <RadioButton inputId="permission1" name="permission" value="admin" onChange={onPermissChange} checked={user.permission === 'admin'} style={{marginRight: '5px'}}/>
                                                <label htmlFor="permission1">Admin</label>
                                            </div>
                                            <div className="field-radiobutton col-6">
                                                <RadioButton inputId="permission2" name="permission" value="private" onChange={onPermissChange} checked={user.permission === 'private'} style={{marginRight: '5px'}} />
                                                <label htmlFor="permission2" style={{marginTop: '5px'}}>Private</label>
                                            </div>
                                            <div className="field-radiobutton col-6">
                                                <RadioButton inputId="permission3" name="permission" value="user" onChange={onPermissChange} checked={user.permission === 'user'} style={{marginRight: '5px'}} />
                                                <label htmlFor="permission3" style={{marginTop: '5px'}}>User</label>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                )
                                }
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UserList;
