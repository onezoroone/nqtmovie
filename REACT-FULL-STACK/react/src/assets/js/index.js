//----------------------------Start Carousel Trending------------------------------
//----------------------------Change Icon Volume---------------------------
// function toggleMute(idvideo,icon ,event) {
//     event.preventDefault();
//     const video = document.getElementById(idvideo);
//     const muteIcon = document.getElementById(icon);
//     if (video.muted) {
//         video.muted = false;
//         muteIcon.className = "fs-1 bi bi-volume-up-fill";
//     } else {
//         video.muted = true;
//         muteIcon.className = "fs-1 bi bi-volume-mute-fill";
//     }
// }
// //----------------------------End---------------------------
// const videoContainers = document.querySelectorAll('.myvideo');
// const carousel = document.getElementById('carouselTrending');
// let previousSlide;
// let playTimeout;
// let img_video;
// let isTabVisible = true;

// //----------------------------Process Video In Carousel Trending----------------------------
// if(carousel){
//     //----------------------------Play Video----------------------------
//     function playVideo() {
//         const activeSlide = carousel.querySelector('.carousel-item.active');
//         const activeVideoContainer = activeSlide.querySelector('.myvideo');
//         const iconVolume = activeSlide.querySelector('.iconvolume');
//         if (activeVideoContainer) {
//             const activeVideo = activeVideoContainer.querySelector('.trailer');
//             img_video = activeSlide.querySelector('.video-img');
//             img_video.style.display = "none";
//             iconVolume.style.display = "block";
//             activeVideo.play();
//         }
//     }

// //----------------------------Pause Video----------------------------
//     function pauseVideo() {
//         const activeSlide = carousel.querySelector('.carousel-item.active');
//         const activeVideoContainer = activeSlide.querySelector('.myvideo');
//         if (activeVideoContainer) {
//             const activeVideo = activeVideoContainer.querySelector('.trailer');
//             activeVideo.pause();
//         }
//         clearTimeout(playTimeout);
//     }

// //----------------------------Resume Video----------------------------
//     function resumeVideo() {
//         const activeSlide = carousel.querySelector('.carousel-item.active');
//         const activeVideoContainer = activeSlide.querySelector('.myvideo');
//         if (activeVideoContainer) {
//             const activeVideo = activeVideoContainer.querySelector('.trailer');
//             activeVideo.play();
//         }
//     }

// //----------------------------Tab Page----------------------------
//     document.addEventListener('visibilitychange', function() {
//         if (document.visibilityState === 'visible') {
//             isTabVisible = true;
//             resumeVideo();
//         } else {
//             isTabVisible = false;
//             pauseVideo();
//         }
//     });

//     carousel.addEventListener('slide.bs.carousel', function(event) {
//         // Dừng video của slide hiện tại
//         const activeSlide = event.target.querySelector('.carousel-item.active');
//         const activeVideoContainer = activeSlide.querySelector('.myvideo');
//         const iconVolume = activeSlide.querySelector('.iconvolume');
//         if (activeVideoContainer) {
//             const activeVideo = activeVideoContainer.querySelector('.trailer');
//             activeVideo.pause();
//             activeVideo.currentTime = 0;
//             img_video = activeSlide.querySelector('.video-img');
//             img_video.style.display = "block";
//             iconVolume.style.display = "none";
//         }

//         // Hủy timeout nếu đang chờ phát video
//         clearTimeout(playTimeout);
//     });

// //----------------------------Process Video While Tab In Carousel Trending----------------------------
//     carousel.addEventListener('slid.bs.carousel', function(event) {
//         // Chạy lại video khi quay lại slide cũ sau 3 giây
//         if (isTabVisible) {
//             playTimeout = setTimeout(function() {
//                 playVideo();
//             }, 5000);
//         }
//         if (previousSlide) {
//             const previousVideoContainer = previousSlide.querySelector('.myvideo');
//             if (previousVideoContainer) {
//                 const previousVideo = previousVideoContainer.querySelector('.trailer');
//                 previousVideo.pause();
//                 previousVideo.currentTime = 0;
//             }
//         }
//         // Lưu slide hiện tại để sử dụng cho lần chuyển đổi tiếp theo
//         previousSlide = event.target.querySelector('.carousel-item.active');
//     });
//     //----------------------- Chạy video của slide đầu tiên khi trang web được tải--------------------------
//     window.addEventListener('DOMContentLoaded', function() {
//         const firstSlide = carousel.querySelector('.carousel-item:first-child');
//         const firstVideoContainer = firstSlide.querySelector('.myvideo');
//         if (firstVideoContainer) {
//             const firstVideo = firstVideoContainer.querySelector('.trailer');
//             // Đặt timeout mới để phát video sau 10 giây
//             playTimeout = setTimeout(function() {
//                 firstVideo.autoplay = true;
//                 img_video = firstSlide.querySelector('.video-img');
//                 const iconVolume = firstSlide.querySelector('.iconvolume');
//                 img_video.style.display = "none";
//                 iconVolume.style.display = "block";
//                 firstVideo.play();
//             }, 10000);
//         }
//     });
// //----------------------------------------End Carousel Trending------------------------------
// }

// ---------------------------------------Carousel Ranking----------------------------------
// $(document).ready(function(){
//     $('.carousel-top').owlCarousel({
//         items:5,
//         loop:true,
//         responsiveClass:true,
//         responsive:{
//             0:{
//                 items:1.2,
//                 nav:true
//             },
//             400:{
//                 items:1.5
//             },
//             570:{
//                 items:2.1,
//             },
//             860:{
//                 items:3.1
//             },
//             1500:{
//                 items:5,
//             },
//         }
//     });

//     // ---------------------------------------Carousel Updated----------------------------------
//     $('.carousel-update').owlCarousel({
//         loop:true,
//         responsiveClass:true,
//         responsive:{
//             0:{
//                 items:2,
//                 nav:true
//             },
//             600:{
//                 items:3,
//                 nav:false
//             },
//             900:{
//                 items:4,
//                 nav:true,
//             },
//             1200:{
//                 items:6,
//                 nav:true,
//             },
//             1500:{
//                 items:8,
//                 nav:true,
//                 loop:false,
//             }
//         }
//     })
//     $('.carousel-suggestion').owlCarousel({
//         loop:true,
//         responsiveClass:true,
//         responsive:{
//             0:{
//                 items:2,
//                 nav:true
//             },
//             670:{
//                 items:3,
//                 nav:false
//             },
//             900:{
//                 items:4,
//                 nav:true
//             },
//             1300:{
//                 items:6,
//                 nav: true
//             },
//             1500:{
//                 items:6,
//                 nav:true,
//                 loop:false,
//             }
//         }
//     })
// });
// ---------------------------Trailer Youtube----------------------------
// let youtubeIframe = document.getElementById("youtubeIframe");
// if(youtubeIframe){
//     function trailer(id_video) {
//         const youtubeOverlay = document.getElementById("youtubeOverlay");
//         youtubeIframe.src = 'https://www.youtube.com/embed/'+ id_video;
//         youtubeOverlay.style.display = "block";
//     }
//     document.getElementById("youtubeOverlay").addEventListener("click", function() {
//         const youtubeOverlay = document.getElementById("youtubeOverlay");
//         youtubeOverlay.style.display = "none";
//         youtubeIframe.src = "";
//     });
// }
// ---------------------------End Trailer Youtube----------------------------

// ---------------------------Search----------------------------
let searchInput = document.getElementById("search-keyword");
let searchResults = document.getElementById("search-box");

document.addEventListener("DOMContentLoaded", function() {
    searchInput.addEventListener("input", function() {
        const searchTerm = this.value.trim();

        if (searchTerm !== "") {
            searchResults.innerHTML = "Đang tìm kiếm...";

            // Gửi yêu cầu AJAX đến máy chủ
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "/search?searchKeyword=" + encodeURIComponent(searchTerm));
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        displaySearchResults(response);
                    }
                }
            };
            xhr.send();
        } else {
            searchResults.innerHTML = "";
        }
    });

    function displaySearchResults(results) {
        if (results.length > 0) {
            let html = "";
            results.forEach(function(result) {
                const slug = createSlug(result.name);
                const showDetailUrl = `/xem-phim-${slug}-${result.id}`;
                html += `
                <div class="search-item movie-box col-xl-6 col-lg-6 col-12 mt-3">
                    <div class="d-flex">
                        <img src="${result.img}" alt="" class="object-fit-cover" style="max-width: 80px; display: inline-block; vertical-align: middle; height: auto">
                            <div class="search-content" style="display: inline-block; max-width: 100%; padding-left: 10px">
                                <a href="${showDetailUrl}" type="submit" class="text-white" style="background: #21182E; border: none;">
                                    ${result.name}
                                    <div class="text-uppercase text-danger">
                                        Tập ${result.episode}
                                    </div>
                                </a>
                            </div>
                    </div>
                </div>
                `;
            });

            searchResults.innerHTML = html;
        } else {
            searchResults.innerHTML = "Không tìm thấy kết quả phù hợp.";
        }
    }
});
function createSlug(input) {
    return input
        .normalize("NFD") // Chuẩn hóa Unicode để xử lý dấu
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/[^a-z0-9-]/g, ''); // Loại bỏ các ký tự không phải chữ cái, số, hoặc dấu gạch ngang
}
// ----------------------------END SEARCH-----------------------

//----------------------------Update View-------------------------
function increaseViews(movieId) {
    $.ajax({
        url: "/upView",
        type: "GET",
        data: {
            movieId: movieId
        },
    });
}
//----------------------------End Update View-------------------------

// function toast1({title = '', message ='', type='info', duration = 3000}){
//     const main = document.getElementById('toast1');
//     if(main){
//         const toast = document.createElement('div');
//         const auto = setTimeout(function(){
//             main.removeChild(toast);
//         }, duration +1000);
//         toast.onclick = function(e){
//             if(e.target.closest('.toast1__close')){
//                 main.removeChild(toast);
//                 clearTimeout(auto);
//             }
//         }
//         const icons = {
//             success: 'bi bi-check-circle-fill',
//             warning: 'bi bi-exclamation-circle-fill',
//         };
//         const icon = icons[type];
//         toast.classList.add('toast1', `toast--${type}`);
//         toast.innerHTML = `
//                 <div class="toast1__icon">
//                   <i class="${icon}"></i>
//               </div>
//               <div class="toast1__body">
//                   <h4 class="toast1__title">${title}</h4>
//                   <p class="toast1__msg">${message}</p>
//               </div>
//               <div class="toast1__close">
//                   <i class="bi bi-x"></i>
//               </div>
//                   `;
//         main.appendChild(toast);
//     }
// }
// function showToastSuccess(){
//     toast1({
//         title: 'Thông báo',
//         message: 'Thêm vào mục yêu thích thành công.',
//         type: 'success',
//         duration: 3000
//     });
// }
// function showToastWarning(){
//     toast1({
//         title: 'Thông báo',
//         message: 'Phim đã có trong mục yêu thích.',
//         type: 'warning',
//         duration: 3000
//     });
// }
// $(document).ready(function() {
//     const favoriteButton = document.querySelector(".showToastBtn");
//     if(favoriteButton){
//         favoriteButton.addEventListener('click', function() {
//             $.ajax({
//                 type: "GET",
//                 url: "/addFavo",
//                 data: {
//                     id_movie: movieId,
//                     id_user: username
//                 },
//                 success: function(response) {
//                     if (response === 'added') {
//                         favoriteButton.setAttribute("onclick", "showToastWarning()");
//                     } else if (response === 'existed') {
//                         favoriteButton.setAttribute("onclick", "showToastWarning()");
//                     }
//                 }
//             });
//         });
//     }
// });
