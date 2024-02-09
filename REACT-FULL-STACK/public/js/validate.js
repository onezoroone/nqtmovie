
function showError(input, message){
    let parent = input.parentElement;
    let p = parent.querySelector('small');
    parent.classList.add('error');
    p.innerText = message;
}
function showSuccess(input){
    let parent = input.parentElement;
    let p = parent.querySelector('small');
    parent.classList.remove('error');
    p.innerText = '';
}
let form = document.getElementById('formSignUp');
let username = document.querySelector('#username');
let emailInput = document.querySelector('#email');
let phoneInput = document.querySelector('#phone');
let pass1 = document.querySelector('#pass1')
let pass2 = document.querySelector('#pass2')
function isValidEmail(email) {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    email.value = email.value.trim();
    let checkEmail = !regex.test(email.value);
    if(regex.test(email.value)){
        showSuccess(email);
    }else{
        showError(email,"Email không hợp lệ!");
    }
    return checkEmail;
}

function isValidPhoneNumber(phone) {
    const regex = /^\d{10}$/;
    phone.value = phone.value.trim();
    let checkPhone = !regex.test(phone.value);
    if(phone.value !== ""){
        if(regex.test(phone.value)){
            showSuccess(phone);
        }else{
            showError(phone,"Số điện thoại không hợp lệ!");
        }
    }else{
        showSuccess(phone);
        checkPhone = false;
    }
    return checkPhone;
}

function checkLength(input, min, max){
    input.value = input.value.trim();
    if(input.value.length < min){
        showError(input, `Phải có ít nhất ${min} ký tự!`)
        return true
    }
    if(input.value.length > max){
        showError(input, `Không được vượt quá ${max} ký tự!`)
        return true
    }
    showSuccess(input)
    return false
}
function checkPass(pass1, pass2){
    if(pass1.value !== pass2.value){
        showError(pass2, "Mật khẩu không trùng khớp!");
        return true
    }
    showSuccess(pass2)
    return false
}
if(form){
    form.addEventListener('submit', function (e){
        let checkEmail = isValidEmail(emailInput);
        let checkLenght = checkLength(username, 5, 20);
        let checkPassError = checkPass(pass1, pass2);
        if(checkEmail || checkLenght || checkPassError){
            e.preventDefault();
        }
    });
}
let formP = document.getElementById('formChangePw');
if(formP){
    formP.addEventListener('submit', function (e){
        let checkPassError = checkPass(pass1, pass2);
        if(checkPassError){
            e.preventDefault();
        }
    });
}
