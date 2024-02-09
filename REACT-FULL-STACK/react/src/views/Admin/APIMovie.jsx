import { useState } from "react";
import axiosClient from "../../axios-client";
import { Button } from 'primereact/button';
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
function APIMovie() {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    const onSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true)
        await axios.get(value)
        .then(({data}) => {
            const check = data.movie;
            axiosClient.post('/apiMovieNguonc',{
                data: check
            }).then(({data}) => {
                setNotification(data, 'text-bg-success', 'bi-bell-fill');
            });
        })
        setLoading(false);
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">API NGUONC.COM</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="form-control" name="genre" required />
                                        </div>
                                        <div className="form-group mt-2">
                                            <Button loading={loading} type="submit" className="btn btn-primary">Add</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default APIMovie;
