
const rotateBtn = document.getElementById("gen-btn");
const colorIdentifier = document.getElementById("color-identifier");
const slider = document.getElementById("myRange");
const output = document.getElementById("password-length");
output.value = slider.value;


function genPassword() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!#$%&'()*+,-./:;<=>?@[\]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = output.value;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    document.getElementById("password").value = password;

    if (slider.value <= 8 ) {
        colorIdentifier.style.backgroundColor = 'red';
        colorIdentifier.style.width = '25%';
        colorIdentifier.style.borderTopRightRadius = '0.5rem';
        colorIdentifier.style.transition = '1s';
    } else if (slider.value > 8 &&  slider.value <= 14 ){
        colorIdentifier.style.backgroundColor = 'orange';
        colorIdentifier.style.width = '50%';
    } else if (slider.value > 14 ) {
        colorIdentifier.style.backgroundColor = 'green';
        colorIdentifier.style.width = '100%';
    }


}

function genPasswordSlider() {
    output.value = slider.value;
    genPassword()
}

function genPasswordSelect() {
    slider.value = output.value;
    genPassword()
}

let rotation = 0;
const angle = 180;

function genPasswordRefresh() {
    rotation += angle;
    rotateBtn.style.transform = `rotate(${rotation}deg)`;
    rotateBtn.style.transition = '1s';
    genPassword();
}

function copyPassword() {
    let copyText = document.getElementById("password");
    copyText.select();
    document.execCommand("copy");
}
