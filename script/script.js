
class Component {
    constructor(selector) {
        this.$el = document.querySelector(selector);
    }
}

class InputWithNewValue extends Component{
    constructor(selector) {
        super(selector)
    }
    setValue(value) {
        this.$el.value = value;
    }
}

class ColorIdentifier extends Component {
    constructor(selector) {
        super(selector)
    }
    setBackgroundColor(backgroundColor) {
        this.$el.style.backgroundColor = backgroundColor;
    }
    setWidth(width) {
        this.$el.style.width = width;
    }
}

class Rotate extends Component {
    turns = 1
    constructor(selector) {
        super(selector);
    }
    doRotate() {
        this.$el.style.transform = `rotate(${this.turns * 0.5}turn)`;
        this.turns++
    }

}

class PasswordGenerator extends Component {

    chars = "0123456789abcdefghijklmnopqrstuvwxyz!#$%&'()*+,-./:;<=>?@[\]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    rotateBtn = new Rotate("#gen-btn");
    password = new InputWithNewValue("#password");
    slider = new InputWithNewValue("#sliderValue");
    select = new InputWithNewValue("#selectValue");
    colorIdentifier = new ColorIdentifier("#color-identifier");

    constructor(selector) {
        super(selector);
    }

    changeColor() {
        if (this.slider.$el.value <= 8 ) {
            this.colorIdentifier.setBackgroundColor("red");
            this.colorIdentifier.setWidth("25%");
        } else if (this.slider.$el.value > 8 &&  this.slider.$el.value <= 14 ){
            this.colorIdentifier.setBackgroundColor("orange");
            this.colorIdentifier.setWidth("50%");
        } else if (this.slider.$el.value > 14 ) {
            this.colorIdentifier.setBackgroundColor("green");
            this.colorIdentifier.setWidth("100%");
        }
    }

    genPassword(passwordLength) {

        this.slider.setValue(passwordLength)
        this.select.setValue(passwordLength)

        let newPassword = '';
        for (let i = 0; i < passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * this.chars.length);
            newPassword += this.chars.substring(randomNumber, randomNumber + 1);
        }
        this.password.setValue(newPassword);
        this.changeColor();
    }

    refreshGenPassword() {
        this.genPassword(this.select.$el.value);
        this.rotateBtn.doRotate();
    }

    copyPassword() {
        this.password.$el.select();
        document.execCommand("copy");
    }

}

const genNewPassword = new PasswordGenerator();
