
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import Loading from "../../Loading";
import { Link } from 'react-router-dom';
import axiosClient from "../../../axios-client";
import { Helmet } from 'react-helmet';
export default function ListMovies() {
    const [deleteMovieDialog, setDeleteMovieDialog] = useState(false);
    const [deleteMoviesDialog, setDeleteMoviesDialog] = useState(false);
    const [movie, setMovie] = useState({});
    const [selectedMovies, setSelectedMovies] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [reload, setReload] = useState(false);
    useEffect(()=>{
        const fetch = async () => {
            await axiosClient.get("/movies/getAllMovie")
            .then((response) => {
                setData(response.data);
            })
        }
        fetch();
    },[reload])

    if(!data) return <Loading />

    const hideDeleteMovieDialog = () => {
        setDeleteMovieDialog(false);
        setDeleteMoviesDialog(false);
    };

    const confirmDeleteMovie = (movie) => {
        setMovie(movie);
        setDeleteMovieDialog(true);
    };

    const deleteMovie = async () => {
        setLoading(true);
        await axiosClient.post("/movies/deleteMovie",{
            id: movie.id,
            name: movie.name
        }).then((response => {
            toast.current.show({severity:'success', summary: 'Thành công', detail:response.data, life: 5000});
        }))
        setReload(!reload);
        setLoading(false);
        setDeleteMovieDialog(false);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteMoviesDialog(true);
    };

    const deleteSelectedMovies = async () => {
        setLoading(true);
        for(var i=0; i < selectedMovies.length; i++){
            await axiosClient.post("/movies/deleteMovie",{
                id: selectedMovies[i].id,
                name: selectedMovies[i].name
            }).then((response => {
                toast.current.show({severity:'success', summary: 'Thành công', detail:response.data, life: 5000});
            }))
        }
        setReload(!reload);
        setLoading(false);
        setDeleteMoviesDialog(false);
        setSelectedMovies(null);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Link to="/admin/new-movie"><Button label="Thêm mới" icon="bi bi-plus" className='text-white rounded-3' style={{marginRight:'10px'}} severity="success" /></Link>
                <Button label="Xóa" className='text-white rounded-3' icon="bi bi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedMovies || !selectedMovies.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Xuất file csv" icon="bi bi-upload" className="p-button-help text-white" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.img} alt={rowData.name} className="shadow-2 rounded-2" width="80px" />;
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const TypeBodyTemplate = (rowData) => {
        return <Tag value={rowData.type} severity={getSeverity(rowData)}></Tag>;
    };

    const getSeverity = (movie) => {
        switch (movie.type) {
            case 'Phim bộ':
                return 'success';

            case 'Phim lẻ':
                return 'warning';
                
            default:
                return null;
        }
    };

    const categoryTemplate = (rowData) => {
        return <span>{rowData.categories.map((item,index) => <span key={index}>
        {item}
        {index < rowData.categories.length - 1 && ", "}
    </span>)}</span>
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Link to={`/admin/edit-movie/${rowData.slug}`}><Button icon="bi bi-pencil" rounded outlined className="mr-2 rounded-5" style={{marginRight:'10px'}} /></Link>
                <Button icon="bi bi-trash" rounded outlined severity="danger" className='rounded-5' onClick={() => confirmDeleteMovie(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Quản lý phim</h4>
            <span className="p-input-icon-left">
                <i className="bi bi-search fs-5" style={{marginTop:'-0.9rem'}} />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Tìm kiếm..." />
            </span>
        </div>
    );
    const deleteMovieDialogFooter = (
        <React.Fragment>
            <Button label="Không" icon="bi bi-x" className='rounded-3' style={{marginRight:'10px'}} outlined onClick={hideDeleteMovieDialog} />
            <Button label="Có" loading={loading} icon="bi bi-check" severity="danger" className='rounded-3' onClick={deleteMovie} />
        </React.Fragment>
    );
    const deleteMoviesDialogFooter = (
        <React.Fragment>
            <Button label="Không" icon="bi bi-x" className='rounded-3' style={{marginRight:'10px'}} outlined onClick={hideDeleteMovieDialog} />
            <Button label="Có" loading={loading} icon="bi bi-check" className='rounded-3' severity="danger" onClick={deleteSelectedMovies} />
        </React.Fragment>
    );

    return (
        <div>
            <Helmet>
                <title>{`List Movies - ${import.meta.env.VITE_BASE_NAME}`}</title>
                <meta property="og:title" content={`List Movies - ${import.meta.env.VITE_BASE_NAME}`} />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <Toast ref={toast} />
            <div>
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={data} selection={selectedMovies} onSelectionChange={(e) => setSelectedMovies(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Đang hiển thị {first} đến {last} của {totalRecords} phim" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="id" header="Code" sortable></Column>
                    <Column field="name" header="Tên" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="othername" header="Tên khác"></Column>
                    <Column field="img" header="Ảnh" body={imageBodyTemplate}></Column>
                    <Column field="categories" header="Thể loại" body={categoryTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="rating" header="Đánh giá" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="type" header="Loại" body={TypeBodyTemplate} style={{ minWidth: '6rem' }} sortable ></Column>
                    <Column field="created_at" header="Tạo ngày" sortable ></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column>
                </DataTable>
            </div>
            <Dialog visible={deleteMovieDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Xác nhận" modal footer={deleteMovieDialogFooter} onHide={hideDeleteMovieDialog}>
                <div className="confirmation-content">
                    <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem', marginRight:'15px' }} />
                    {movie && (
                        <span>
                            Bạn có chắc chắn muốn xóa <b>{movie.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteMoviesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Xác nhận" modal footer={deleteMoviesDialogFooter} onHide={hideDeleteMovieDialog}>
                <div className="confirmation-content">
                    <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem', marginRight:'15px' }} />
                    {movie && <span>Bạn có chắc chắn muốn các bộ phim đã chọn?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        