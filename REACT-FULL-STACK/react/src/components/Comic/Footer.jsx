function Footer() {
    return (
        <>
            <div className="container-fuild footer" style={{background: '#292929'}}>
                <div className="container footer-content" style={{padding: '1em 0'}}>
                    <div className="row">
                        <div className="col-md-2 col-sm-12">
                            <img src="/jack.png" className="img-responsive" alt="Logo" style={{display: 'block', maxWidth: '100%', height: 'auto'}} />
                        </div>
                        <div className="col-md-6 col-sm-12 footer-container">
                            <p className="text-white">Kho truyện tranh online miễn phí | Truyện Hay. Truyện Mới. Website luôn cập nhập những bộ truyện mới nhất thuộc các thể loại đặc sắc như truyện tiên hiệp, kiếm hiệp, truyện teen, tiểu thuyết ngôn tình hay nhất. Hỗ trợ mọi thiết bị di động và máy tính bảng ...</p>
                        </div>
                        <div className="col-md-4 col-sm-12 footer-container">
                                        <p className="small-footer-p text-white">Email: <a className="text-primary" href="mailto:testmailphpnqt@gmail.com">testmailphpnqt@gmail.com</a></p>
                                                    <p className=" text-white">Fanpage: <a className="text-primary" href="#">https://www.facebook.com/nqtcomic</a></p>
                                                    <p><a className="text-primary" href="">Chính sách bảo mật</a></p>
                            <p className="small-footer-p"><a className="text-primary" href="">Chính sách riêng tư</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
