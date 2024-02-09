import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <div className="mt-5">
    <footer className="text-center text-lg-start text-white">
        <div className="p-4 pb-0">
            <section className="border-top">
                <div className="row">
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold">
                            Mô tả
                        </h6>
                        <p>
                            Đây chỉ là 1 dự án khởi động để thực tập. Không có ý cố tình vi phạm bản quyền.
                        </p>
                    </div>

                    <hr className="w-100 clearfix d-md-none" />

                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold">Thể loại hot</h6>
                        <p>
                            <a className="text-white">Action</a>
                        </p>
                        <p>
                            <a className="text-white">Fantasy</a>
                        </p>
                        <p>
                            <a className="text-white">Adventure</a>
                        </p>
                        <p>
                            <a className="text-white">Comedy</a>
                        </p>
                    </div>

                    <hr className="w-100 clearfix d-md-none" />

                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold">Liên hệ</h6>
                        <p><i className="bi bi-house mr-3"></i> New York, NY 10012, US</p>
                        <p><i className="bi bi-envelope mr-3"></i> testmailphpnqt@gmail.com</p>
                        <p><i className="bi bi-phone mr-3"></i> + 01 234 567 88</p>
                        <p><i className="bi bi-printer mr-3"></i> + 01 234 567 89</p>
                    </div>
                </div>
            </section>

            <section className="p-3 pt-0 border-top">
                <div className="row d-flex align-items-center">
                    <div className="col-md-7 col-lg-8 text-center text-md-start">
                        <div className="p-3">
                            © 2023 Copyright:
                            <Link className="text-white" to="/"> NQTMOVIE.ID.VN</Link>
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                        <a className="btn btn-outline-light btn-floating m-1 text-white" href="https://www.facebook.com/tung.duc.hieu.2594" role="button"><i className="bi bi-facebook"></i></a>
                        <a className="btn btn-outline-light btn-floating m-1 text-white" role="button"><i className="bi bi-twitter"></i></a>
                        <a className="btn btn-outline-light btn-floating m-1 text-white" role="button"><i className="bi bi-google"></i></a>
                        <a className="btn btn-outline-light btn-floating m-1 text-white" role="button"><i className="bi bi-instagram"></i></a>
                    </div>
                </div>
            </section>
        </div>
    </footer>
</div>

        </>
     );
}

export default Footer;
