import { useEffect } from "react";
import { Link } from "react-router-dom";

function AddCategory() {
    useEffect(() => {
        document.title = "Add New Category"
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Thêm thể loại</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Tên thể loại" name="genre" required />
                                        </div>
                                        <div className="form-group ">
                                            <button type="submit" name="addGen" className="btn btn-primary">Thêm</button>
                                            <Link to="/admin/category" className="btn btn-danger">Đóng</Link>
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

export default AddCategory;
