import { useEffect } from "react";
import { Link } from "react-router-dom";

function CategoryList({data}) {
    useEffect(() => {
        document.title = "Categories List"
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Category Lists</h4>
                            </div>
                            <div className="iq-card-header-toolbar d-flex align-items-center">
                                <Link to="/admin/category/add" className="btn btn-primary">Add Category</Link>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="table-view">
                                <table className="data-tables table movie_table w-100">
                                    <thead>
                                    <tr>
                                        <th style={{width:'10%'}}>ID.</th>
                                        <th style={{width:'70%'}}>Tên</th>
                                        <th style={{width:'20%'}}>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        {/* <td>{{$i}}</td>
                                        <td>{{$category->category}}</td> */}
                                        <td>
                                            <div className="flex align-items-center list-user-action">
                                                <a className="iq-bg-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" data-bs-toggle="modal" data-bs-target="#Modal" href=""><i className="bi bi-trash"></i></a>
                                            </div>
                                        </td>
                                        <div className="modal fade" id="Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h4 className="modal-title fs-5" id="exampleModalLabel">Thông báo</h4>
                                                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        Bạn có chắc chắn muốn xóa thể loại <strong style={{color: 'yellow'}}></strong>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <form>
                                                            <button type="submit" className="btn btn-primary" href="">Submit</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
