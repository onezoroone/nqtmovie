import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import Loading from "../../Loading";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Dropdown } from "primereact/dropdown";
import axiosClient from "../../../axios-client"
import { InputSwitch } from "primereact/inputswitch";
import { useEffect } from "react";
function ListUsers() {
    const [userDialog, setUserDialog] = useState(false);
    const [resetDialog, setResetDialog] = useState(false);
    const [notiDialog, setNotiDialog] = useState(false);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState({});
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [checked, setChecked] = useState(false);
    const [data, setData] = useState(null);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            await axiosClient.get("/users/getAllUser")
            .then((res) => {
                setData(res.data);
            })
        }
        fetch();
    }, [reload]);
    if(!data) return <Loading />
    const hideDialog = () => {
        setUserDialog(false);
        setResetDialog(false);
        setNotiDialog(false);
    };

    const editUser = (user) => {
        setUser({ ...user });
        setSelectedRole({name: user.role});
        setChecked(user.verified == "true" ? true : false)
        setUserDialog(true);
    };

    const saveUser = async () => {
        setLoading(true);
        await axiosClient.post("/users/updateRole",{
            id: user.id,
            name: user.name,
            checked: checked ? "true" : "false",
            role: selectedRole.name
        }).then((response) => {
            toast.current.show({severity:'success', summary: 'Thành công', detail:response.data, life: 3000});
            setReload(!reload);
        }).catch((err) => {
            toast.current.show({severity:'error', summary: 'Thất bại', detail:err.response.data, life: 3000});
        }).finally(() => {
            setLoading(false);
        })
        setUserDialog(false);
    };

    const confirmResetPass = (user) => {
        setUser(user);
        setResetDialog(true);
    };
    const resetPassUser = async () => {
        setLoading(true);
        await axiosClient.post("/users/resetPassword",{
            id: user.id,
            name: user.name,
        }).then((response) => {
            setMessage(response.data);
            setNotiDialog(true);
        }).catch((err) => {
            toast.current.show({severity:'error', summary: 'Thất bại', detail:err.response.data, life: 3000});
        })
        setLoading(false);
        setResetDialog(false);
    }

    const leftToolbarTemplate = () => {
        return (
            <div className="d-flex flex-wrap gap-2">
                <Button label="Cấm" disabled icon="bi bi-ban" className="rounded-2 text-white" severity="danger" />
            </div>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="bi bi-pencil" outlined className="mr-2 rounded-5" style={{marginRight:'10px'}} onClick={() => editUser(rowData)} />
                <Button icon="bi bi-arrow-clockwise" className="rounded-5" outlined severity="danger" onClick={() => confirmResetPass(rowData)} />
            </React.Fragment>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.role} className="text-uppercase" severity={getSeverity(rowData)}></Tag>;
    };

    const getSeverity = (user) => {
        switch (user.role) {
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

    const header = (
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Quản lý người dùng</h4>
            <span className="p-input-icon-left">
                <i className="bi bi-search fs-5" style={{marginTop:'-0.9rem'}} />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Tìm kiếm..." />
            </span>
        </div>
    );
    const userDialogFooter = (
        <React.Fragment>
            <Button label="Đóng" className="rounded-3" icon="bi bi-times" style={{marginRight: '10px'}} outlined onClick={hideDialog} />
            <Button loading={loading} label="Lưu" className="rounded-3" icon="bi bi-check" onClick={saveUser} />
        </React.Fragment>
    );

    const resetDialogFooter = (
        <React.Fragment>
            <Button label="Đóng" className="rounded-3" icon="bi bi-times" style={{marginRight: '10px'}} outlined onClick={hideDialog} />
            <Button loading={loading} label="Cài lại" className="rounded-3" icon="bi bi-check" onClick={resetPassUser} />
        </React.Fragment>
    );

    const verifiedBodyTemplate = (rowData) => {
        return <i className={`bi ${rowData.verified == "true" ? "bi-check-circle" : "bi-x-circle"}`}></i>;
    };

    const roles = [
        { name: 'user' },
        { name: 'private'},
        { name: 'admin'}
    ]
    return (  
        <div>
        <Helmet>
            <title>{`List Users - ${import.meta.env.VITE_BASE_NAME}`}</title>
            <meta property="og:title" content={`List Users - ${import.meta.env.VITE_BASE_NAME}`} />
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Toast ref={toast} />
        <div>
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
            <DataTable ref={dt} value={data} selection={selectedUsers} onSelectionChange={(e) => setSelectedUsers(e.value)}
                    dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Đang hiển thị {first} đến {last} của {totalRecords} người dùng" globalFilter={globalFilter} header={header}>
                <Column selectionMode="multiple" ></Column>
                <Column field="id" header="ID" sortable style={{ minWidth: '0.5rem' }}></Column>
                <Column field="name" header="Tên" style={{ minWidth: '16rem' }}></Column>
                <Column field="email" header="Email" style={{ minWidth: '16rem' }}></Column>
                <Column field="role" header="Vai trò" body={statusBodyTemplate} sortable></Column>
                <Column field="verified" header="Xác thực" dataType="boolean" sortable body={verifiedBodyTemplate} />
                <Column field="last_used_at" header="Truy cập"  sortable></Column>
                <Column field="created_at" header="Tạo ngày"></Column>
                <Column body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
        </div>

        <Dialog visible={userDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Chi tiết người dùng" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
            <div className="field mb-2">
                <label htmlFor="name" className="font-bold mb-2">
                    Tên
                </label>
                <InputText id="name" value={user.name} readOnly required />
            </div>
            <div className="field mb-2">
                <label htmlFor="email" className="font-bold mb-2">
                    Email
                </label>
                <InputText id="email" value={user.email} readOnly required />
            </div>
            <div className="d-flex flex-column mb-2">
                <label htmlFor="verified" className="font-bold mb-2">
                    Xác thực
                </label>
                <InputSwitch id="verified" checked={checked} onChange={(e) => setChecked(e.value)} />
            </div>
            <div className="field">
                <label htmlFor="role" className="font-bold mb-2">
                    Vai trò
                </label>
                <Dropdown value={selectedRole} onChange={(e) => setSelectedRole(e.value)} options={roles} optionLabel="name" 
                placeholder="Select Role" id="role" className="w-full md:w-14rem" />
            </div>
        </Dialog>
        <Dialog visible={resetDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Xác nhận" modal className="p-fluid" footer={resetDialogFooter} onHide={hideDialog}>
            <div className="confirmation-content">
                <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem', marginRight:'15px' }} />
                {user && (
                    <span>
                        Bạn có muốn cài lại mật khẩu cho <b>{user.name}</b>?
                    </span>
                )}
            </div>
        </Dialog>

        <Dialog visible={notiDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Thông báo" modal className="p-fluid" onHide={hideDialog}>
            <div className="confirmation-content">
                {message && <span>{message}</span>}
            </div>
        </Dialog>
    </div>
    );
}

export default ListUsers;