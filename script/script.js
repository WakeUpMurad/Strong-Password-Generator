
class Component {
    turns = 1
    constructor(selector) {
        this.$el = document.querySelector(selector);
    }
    getValue() {
        return this.$el.value
    }
    setValue(val) {
        this.$el.value = val;
    }
    setRotate() {
        this.$el.style.transform = `rotate(${this.turns * 0.5}turn)`;
        this.turns++
    }
    setBackgroundColor(backgroundColor) {
        this.$el.style.backgroundColor = backgroundColor;
    }
    setWidth(width) {
        this.$el.style.width = width;
    }
}

const slider = new Component("#sliderValue");
const select = new Component("#selectValue");
const password = new Component("#password");
const colorIdentifier = new Component("#color-identifier");
const rotateBtn = new Component("#gen-btn");


class PasswordGenerator {

    chars = "0123456789abcdefghijklmnopqrstuvwxyz!#$%&'()*+,-./:;<=>?@[\]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    genPassword(passwordLength = select.getValue()) {
        select.setValue(passwordLength);
        slider.setValue(passwordLength);
        let newPassword = '';
        for (let i = 0; i < passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * this.chars.length);
            newPassword += this.chars.substring(randomNumber, randomNumber + 1);
        }
        password.setValue(newPassword)

        if (slider.getValue() <= 8 ) {
            colorIdentifier.setBackgroundColor('red')
            colorIdentifier.setWidth('25%')
        } else if (slider.getValue() > 8 &&  slider.getValue() <= 14 ){
            colorIdentifier.setBackgroundColor('orange')
            colorIdentifier.setWidth('50%')
        } else if (slider.getValue() > 14 ) {
            colorIdentifier.setBackgroundColor('green')
            colorIdentifier.setWidth('100%')
        }
    }

    copyPassword() {
        password.$el.select();
        document.execCommand("copy");
    }

}

const genNewPassword = new PasswordGenerator();
const doRotateBtn = () => {
    genNewPassword.genPassword();
    rotateBtn.setRotate();
}
