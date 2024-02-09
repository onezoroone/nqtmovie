import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { FilterMatchMode } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axiosClient from '../../axios-client';

export default function Episode() {
    const [episodes, setEpisodes] = useState(null);
    const [movie, setMovie] = useState(null)
    const [deleteEpisodeDialog, setDeleteEpisodeDialog] = useState(false);
    const [deleteEpisodesDialog, setDeleteEpisodesDialog] = useState(false);
    const [episode, setEpisode] = useState(null);
    const [selectedEpisodes, setSelectedEpisodes] = useState(null);
    const [episodeDialog, setEpisodeDialog] = useState(false);
    const [addEpisodeDialog, setAddEpisodeDialog] = useState(false);
    const [number, setNumber] = useState(null);
    const [link, setLink] = useState(null);
    const [idEp, setIdEp] = useState(null);
    const [count, setCount] = useState(1);
    const [newNumber, setNewNumber] = useState('');
    const [newLink, setNewLink] = useState('');
    const toast = useRef(null);
    useEffect(() => {
        document.title = "Episodes List"
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        axiosClient.post(`/getEpisodes/${id}`)
        .then(response => {
            setEpisodes(response.data.Eps);
            setMovie(response.data.movie);
        })
    }, [count]);

    const hideDeleteEpisodeDialog = () => {
        setDeleteEpisodeDialog(false);
    };

    const hideDeleteEpisodesDialog = () => {
        setDeleteEpisodesDialog(false);
    };

    const confirmDeleteEpisode = (episode) => {
        setEpisode(episode);
        setDeleteEpisodeDialog(true);
    };

    const deleteEpisode = () => {
        axiosClient.post(`/deleteEpisode/${episode.episode_id}`);
        setCount(count + 1)
        setDeleteEpisodeDialog(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Episode Deleted', life: 5000 });
    };

    const confirmDeleteSelected = () => {
        setDeleteEpisodesDialog(true);
    };

    const deleteSelectedEpisodes = () => {
        let _episodes = episodes.filter((val) => !selectedEpisodes.includes(val));
        setEpisodes(_episodes);
        for(let i =0 ; i< selectedEpisodes.length; i++){
            axiosClient.post(`/deleteEpisode/${selectedEpisodes[i].episode_id}`);
        }
        setDeleteEpisodesDialog(false);
        setSelectedEpisodes(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Episodes Deleted', life: 5000 });
    };

    const editEpisode = (episode) => {
        setEpisode({ ...episode });
        setLink(episode.ep_link)
        setNumber(episode.ep_number)
        setIdEp(episode.episode_id)
        setEpisodeDialog(true);
    };
    const leftToolbarTemplate = () => {
        return (
            <div className="d-flex flex-wrap gap-2">
                <Button icon="pi pi-plus" label='New' severity="success" onClick={() => setAddEpisodeDialog(true)} style={{fontSize: '18px', borderRadius:'5px', padding:'2px 15px', color: '#fff'}}></Button>
                <Button label="Delete" style={{fontSize: '18px', borderRadius:'5px', padding:'2px 15px'}} icon="bi bi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedEpisodes || !selectedEpisodes.length} />
            </div>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined style={{marginRight: '5px', borderRadius:'50%'}} onClick={() => editEpisode(rowData)} />
                <Button icon="bi bi-trash" rounded outlined style={{borderRadius:'50%'}} severity="danger" onClick={() => confirmDeleteEpisode(rowData)} />
            </React.Fragment>
        );

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
        ep_number: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const header = (
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">{movie && (`${movie[0].name}`)}</h4>
            <span className="p-input-icon-left">
                <i className="bi bi-search" style={{marginTop: '-0.8rem'}} />
                <InputText type="search" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search..." style={{height:'40px'}} />
            </span>
        </div>
    );

    const deleteEpisodeDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="bi bi-x-lg" style={{marginRight:'0.5rem', borderRadius:'6px', padding:'0.35rem 1.25rem'}} outlined onClick={hideDeleteEpisodeDialog} />
            <Button label="Yes" icon="bi bi-check" style={{borderRadius:'6px', padding:'0.35rem 1.25rem'}} severity="danger" onClick={deleteEpisode} />
        </React.Fragment>
    );
    const deleteEpisodesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="bi bi-x-lg" style={{marginRight:'0.5rem', borderRadius:'6px', padding:'0.35rem 1.25rem'}} outlined onClick={hideDeleteEpisodesDialog} />
            <Button label="Yes" icon="bi bi-check" style={{borderRadius:'6px', padding:'0.35rem 1.25rem'}} severity="danger" onClick={deleteSelectedEpisodes} />
        </React.Fragment>
    );
    const hideDialog = () => {
        setEpisodeDialog(false);
    };
    const hideAddEpisodeDialog = () => {
        setAddEpisodeDialog(false);
    };
    const handleChange = () =>{
        const payload = {
            ep_number: number,
            ep_link: link
        }
        axiosClient.post(`/editEpisode/${idEp}`, payload)
        setCount(count + 1)
        setEpisodeDialog(false)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Episode Updated', life: 5000 });
    }
    const handleAddEpisode = () => {
        const payload = {
            ep_number: newNumber,
            ep_link: newLink
        }
        if(movie){
            axiosClient.post(`/addEpisode/${movie[0].id}`, payload);
        }
        setAddEpisodeDialog(false)
        setCount(count + 1)
        setNewLink('');
        setNewNumber('')
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Add new episode successfully', life: 5000 });
    }
    const episodeDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" style={{marginRight:'0.5rem', borderRadius:'6px', padding:'0.35rem 1.25rem'}} outlined onClick={hideDialog} />
            <Button label="Save" style={{borderRadius:'6px', padding:'0.35rem 1.25rem'}} onClick={handleChange} icon="pi pi-check" />
        </React.Fragment>
    );
    const addEpisodeDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" style={{marginRight:'0.5rem', borderRadius:'6px', padding:'0.35rem 1.25rem'}} outlined onClick={hideAddEpisodeDialog} />
            <Button label="Save" style={{borderRadius:'6px', padding:'0.35rem 1.25rem'}} onClick={handleAddEpisode} icon="pi pi-check" />
        </React.Fragment>
    );
    return (
        <div className='mb-5'>
            <Toast ref={toast} />
            <div className="card" style={{marginRight:'5px'}}>
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable value={episodes} selection={selectedEpisodes} onSelectionChange={(e) => setSelectedEpisodes(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" filters={filters} filterDisplay="row"
                        globalFilterFields={['ep_number']} header={header}>
                    <Column selectionMode="multiple" style={{width:'3%'}}></Column>
                    <Column field="episode_id" header="ID" sortable></Column>
                    <Column field="ep_number" header="Ep" sortable></Column>
                    <Column field="ep_link" header="Link" sortable></Column>
                    <Column body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={deleteEpisodeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteEpisodeDialogFooter} onHide={hideDeleteEpisodeDialog}>
                <div className="confirmation-content">
                    <i className="bi bi-exclamation-triangle" style={{ fontSize: '2rem', marginRight:'10px', color:'yellow' }} />
                    {episode && (
                        <span>
                            Are you sure you want to delete episode number <b>{episode.ep_number}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteEpisodesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteEpisodesDialogFooter} onHide={hideDeleteEpisodesDialog}>
                <div className="confirmation-content">
                    <i className="bi bi-exclamation-triangle mr-3" style={{ fontSize: '2rem', marginRight:'10px', color:'yellow' }} />
                    <span>Are you sure you want to delete the selected episodes?</span>
                </div>
            </Dialog>

            <Dialog visible={episodeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Episode Details" modal className="p-fluid" footer={episodeDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="number" className="font-bold">
                        Ep number
                    </label>
                    {episode && <InputText id="number" value={number} onChange={(e) => setNumber(e.target.value)} required />}
                </div>
                <div className="field">
                    <label htmlFor="link" className="font-bold">
                        Link
                    </label>
                    {episode && <InputText id="link" value={link} onChange={(e) => setLink(e.target.value)} required />}
                </div>
            </Dialog>

            <Dialog visible={addEpisodeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Add new episode" modal className="p-fluid" footer={addEpisodeDialogFooter} onHide={hideAddEpisodeDialog}>
                <div className="field">
                    <label htmlFor="number" className="font-bold">
                        Ep number
                    </label>
                    <InputText id="number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} required />
                </div>
                <div className="field">
                    <label htmlFor="link" className="font-bold">
                        Link
                    </label>
                    <InputText id="link" value={newLink} onChange={(e) => setNewLink(e.target.value)} required />
                </div>
            </Dialog>
        </div>
    );
}
