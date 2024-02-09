function HeaderMoblie() {
    const handleShow = () =>{
        const canvas = document.getElementById('offcanvasExample');
        const backdrop = document.getElementById("backdrop-sidebar");
        const check = canvas.classList.contains("show");
        if(!check){
            canvas.classList.add("show")
            backdrop.classList.add("show")
        }else{
            canvas.classList.remove("show")
            backdrop.classList.remove("show")
        }
    }
    return (
        <div className="header w-100">
            <a href="/" className="position-fixed logobrand text-white"><img src='/images/jack.png' alt="" width="auto" height="50" /></a>
            <a className="position-fixed toggle" onClick={handleShow}  role="button" aria-controls="offcanvasExample"><i className="bi bi-list text-white p-0"></i></a>
        </div>
      );
}

export default HeaderMoblie;
