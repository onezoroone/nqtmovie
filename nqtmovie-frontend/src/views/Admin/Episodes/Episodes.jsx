import { Link, useParams } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../../axios-client";
import Loading from "../../Loading";
import { Helmet } from "react-helmet";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";

function Episodes() {
    const {slug} = useParams();
    const [data, setData] = useState(null);
    const [server, setServer] = useState(null);
    const [episodes, setEpisodes] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedMovies, setSelectedMovies] = useState(null);
    const [deleteEpisodeDialog, setDeleteEpisodeDialog] = useState(false);
    const [episodeDialog, setEpisodeDialog] = useState(false);
    const [episode, setEpisode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [nameServer, setNameServer] = useState("");
    const [linkEp, setLinkEp] = useState("");
    const [newEpisode, setNewepisode] = useState("");
    const [manyEpiDialog, setManyEpiDialog] = useState(false);
    const [value, setValue] = useState('');
    const toast = useRef();
    useEffect(() => {
        const fetch = async () => {
            await axiosClient.get(`/episodes/getEpisodes/${slug}`)
            .then((res) => {
                setData(res.data);
                setServer(res.data.data[0])
                setEpisodes(res.data.data[0].episodes)
            })
        }
        fetch();
    }, [reload, slug]);
    if(!data) return <Loading />
    
    const header = (
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Quản lý tập phim cho <Link to={`/admin/edit-movie/${slug}`} className="text-white">{data.name}</Link></h4>
            <span className="p-input-icon-left">
                <i className="bi bi-search fs-5" style={{marginTop:'-0.9rem'}} />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Tìm kiếm..." />
            </span>
        </div>
    );

    const updateEpisode = async () => {
        setLoading(true);
        await axiosClient.post("/episodes/updateEpisode",{
            id: episode.id,
            serverName : nameServer,
            idEpisode: episode.idEpisode,
            link: linkEp
        }).then((res) => {
            toast.current.show({severity:'success', summary: 'Thành công', detail: res.data, life: 5000});
        })
        setReload(!reload);
        setLoading(false);
        setEpisodeDialog(false);
    }

    const confirmDeleteEpisode = (episode) => {
        setEpisode(episode);
        setDeleteEpisodeDialog(true);
    }

    const openDialog = (episode) => {
        setEpisode(episode);
        setNameServer(episode.server);
        setLinkEp(episode.ep_link);
        setNewepisode(episode.ep_number);
        setEpisodeDialog(true);
    }

    const openNewDialog = () => {
        setEpisode(null);
        setNameServer("");
        setLinkEp("");
        setNewepisode("");
        setEpisodeDialog(true);
    }

    const newManyDialog = () => {
        setNameServer("");
        setManyEpiDialog(true);
    }

    const crawlOphim = async () => {
        await axiosClient.post("/episodes/crawlEpisodeOphim",{
            slug: slug
        }).then((res) => {
            toast.current.show({severity:'success', summary: 'Thành công', detail: res.data, life: 5000});
        }).catch((err) => {
            toast.current.show({severity:'error', summary: 'Thất bại', detail: err.response.data.message, life: 5000});
        })
        setReload(!reload);
    }

    const crawlNguonc = async () => {
        await axiosClient.post("/episodes/crawlEpisodeNguonc",{
            slug: slug
        }).then((res) => {
            toast.current.show({severity:'success', summary: 'Thành công', detail: res.data, life: 5000});
        }).catch((err) => {
            toast.current.show({severity:'error', summary: 'Thất bại', detail: err.response.data.message, life: 5000});
        })
        setReload(!reload);
    }

    const leftToolbarTemplate = () => {
        return (
            <div className="d-flex flex-wrap gap-2">
                <Button label="Thêm" icon="bi bi-plus" className='text-white rounded-3' severity="success" onClick={openNewDialog} />
                <Button label="Thêm nhiều" icon="bi bi-plus" className='text-white rounded-3' severity="success" onClick={newManyDialog} />
                <Button label="Xóa" className='text-white rounded-3' icon="bi bi-trash" severity="danger" disabled  />
                <Button label="NGUONC" className='text-white rounded-3' icon="bi bi-fast-forward-fill" severity="primary" onClick={crawlNguonc} />
                <Button label="OPHIM" className='text-white rounded-3' icon="bi bi-fast-forward-fill" severity="help" onClick={crawlOphim} />
            </div>
        );
    };

    const deleteEpisode = async () => {
        setLoading(true);
        await axiosClient.post("/episodes/deleteEpisode",{
            idEpisode: episode.idEpisode,
            serverName: episode.server
        }).then((res) => {
            toast.current.show({severity:'success', summary: 'Success', detail: res.data, life: 5000});
        })
        setReload(!reload);
        setLoading(false);
        setDeleteEpisodeDialog(false);
    }

    const handleNewEpisode = async () => {
        setLoading(true);
        await axiosClient.post("/episodes/addEpisode",{
            idMovie: data.idMovie,
            serverName : nameServer,
            link: linkEp,
            episode: newEpisode
        }).then((res) => {
            toast.current.show({severity:'success', summary: 'Thành công', detail: res.data, life: 5000});
        }).catch((err) => {
            toast.current.show({severity:'error', summary: 'Thất bại', detail: err.response.data, life: 5000});
        })
        setReload(!reload)
        setLoading(false);
        setEpisodeDialog(false);
    }

    const handleNewManyEpisode = async () => {
        setLoading(true);
        await axiosClient.post("/episodes/addManyEpisodes",{
            idMovie : data.idMovie,
            serverName : nameServer,
            list: value
        }).then((res) => {
            setValue("");
            toast.current.show({severity:'success', summary: 'Thành công', detail: res.data, life: 5000});
        }).catch((err) => {
            toast.current.show({severity:'error', summary: 'Thất bại', detail: err.response.data, life: 5000});
        })
        setReload(!reload);
        setLoading(false);
        setManyEpiDialog(false);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <a href={`/${slug}/${rowData.slug}`} target="_blank" rel="noreferrer" className="text-decoration-none" style={{marginRight:'10px'}}><Button icon="bi bi-eye" severity="help" outlined className="rounded-5" /></a>
                <Button icon="bi bi-pencil" rounded outlined className="mr-2 rounded-5" style={{marginRight:'10px'}} onClick={() => openDialog(rowData)} />
                <Button icon="bi bi-trash" rounded outlined severity="danger" className='rounded-5' onClick={() => confirmDeleteEpisode(rowData)} />
            </React.Fragment>
        );
    };

    const bodyTemplate = (rowData) => {
        return <p>Tập {rowData.ep_number}</p>;
    };

    const hideDeleteEpisodeDialog = () => {
        setDeleteEpisodeDialog(false);
        setEpisodeDialog(false);
        setManyEpiDialog(false);
    };

    const deleteEpisodeDialogFooter = (
        <React.Fragment>
            <Button label="Không" icon="bi bi-x" className='rounded-3' style={{marginRight:'10px'}} outlined onClick={hideDeleteEpisodeDialog} />
            <Button label="Có" loading={loading} icon="bi bi-check" severity="danger" className='rounded-3' onClick={deleteEpisode} />
        </React.Fragment>
    );

    const updateEpisodeDialogFooter = (
        <React.Fragment>
            <Button label="Đóng" icon="bi bi-x" className='rounded-3' style={{marginRight:'10px'}} outlined onClick={hideDeleteEpisodeDialog} />
            <Button label="Lưu" loading={loading} icon="bi bi-check" className='rounded-3' onClick={updateEpisode} />
        </React.Fragment>
    )

    const newEpisodeDialogFooter = (
        <React.Fragment>
            <Button label="Đóng" icon="bi bi-x" className='rounded-3' style={{marginRight:'10px'}} outlined onClick={hideDeleteEpisodeDialog} />
            <Button label="Thêm" loading={loading} icon="bi bi-check" className='rounded-3' onClick={handleNewEpisode} />
        </React.Fragment>
    )

    const newManyEpisodeDialogFooter = (
        <React.Fragment>
            <Button label="Đóng" icon="bi bi-x" className='rounded-3' style={{marginRight:'10px'}} outlined onClick={hideDeleteEpisodeDialog} />
            <Button label="Thêm" loading={loading} icon="bi bi-check" className='rounded-3' onClick={handleNewManyEpisode} />
        </React.Fragment>
    )

    return(
        <div>
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
            <Helmet>
                <title>{`Episodes - ${data.name} - ${import.meta.env.VITE_BASE_NAME}`}</title>
                <meta property="og:title" content={`Episodes - ${data.name} - ${import.meta.env.VITE_BASE_NAME}`} />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="d-flex justify-content-center mb-4">
                <SelectButton value={server} onChange={(e) => {setServer(e.value); setEpisodes(e.value.episodes)}}  optionLabel="server" options={data.data} />
            </div>
            <DataTable selection={selectedMovies} onSelectionChange={(e) => setSelectedMovies(e.value)}
                header={header} paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Đang hiển thị {first} đến {last} của {totalRecords} tập phim" globalFilter={globalFilter} value={episodes}>
                <Column selectionMode="multiple"></Column>
                <Column field="ep_number" header="Episode"></Column>
                <Column field="slug" body={bodyTemplate} header="Name"></Column>
                <Column field="ep_link" header="Link"></Column>
                <Column field="created_at" header="Create At"></Column>
                <Column body={actionBodyTemplate} style={{ minWidth: '10rem' }}></Column>
            </DataTable>

            <Dialog visible={episodeDialog} modal style={{ width: '32rem' }} className="p-fluid" breakpoints={{ '960px': '75vw', '641px': '90vw' }} footer={episode ? updateEpisodeDialogFooter : newEpisodeDialogFooter} header="Episode" onHide={hideDeleteEpisodeDialog}>
                <div className="field mb-2">
                    <label htmlFor="name" className="font-bold mb-2">
                        Tên máy chủ
                    </label>
                    <InputText id="name" onChange={(e) => setNameServer(e.target.value)} value={nameServer} required />
                </div>
                <div className="field mb-2">
                    <label htmlFor="episode" className="font-bold mb-2">
                        Tập
                    </label>
                    <InputText id="episode" onChange={(e) => setNewepisode(e.target.value)} value={newEpisode} readOnly={episode ? true : false} required />
                </div>
                <div className="field mb-2">
                    <label htmlFor="link" className="font-bold mb-2">
                        Link
                    </label>
                    <InputText id="link" onChange={(e) => setLinkEp(e.target.value)} value={linkEp} required />
                </div>
            </Dialog>

            <Dialog visible={manyEpiDialog} modal style={{ width: '32rem' }} className="p-fluid" breakpoints={{ '960px': '75vw', '641px': '90vw' }} footer={newManyEpisodeDialogFooter} header="List Episodes Add" onHide={hideDeleteEpisodeDialog}>
                <div className="field mb-2">
                    <label htmlFor="name" className="font-bold mb-2">
                        Tên máy chủ
                    </label>
                    <InputText id="name" onChange={(e) => setNameServer(e.target.value)} value={nameServer} required />
                </div>
                <div className="field">
                    <label className="font-bold mb-2">
                        Danh sách tập
                    </label>
                    <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} autoResize placeholder="Example: Full|https://vip.opstream17.com/share/9aa42b31882ec039965f3c4923ce901b" rows={7} cols={30} />
                </div>
            </Dialog>

            <Dialog visible={deleteEpisodeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Xác nhận" modal footer={deleteEpisodeDialogFooter} onHide={hideDeleteEpisodeDialog}>
                <div className="confirmation-content">
                    <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem', marginRight:'15px' }} />
                    {episode && (
                        <span>
                            Bạn có chắc chắn muốn xóa tập <b>{episode.ep_number}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default Episodes;