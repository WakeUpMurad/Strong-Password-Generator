
class Component {
    constructor(selector) {
        this.$el = document.querySelector(selector);
    }
}

class ComponentWithNewValue extends Component{
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
    upperCaseValue = new Component("#upperCaseValue");
    lowerCaseValue = new Component("#lowerCaseValue");
    numbers = new Component("#numbers");
    symbols = new Component("#symbols");
    englishAlphabet = new Component("#english-alphabet");

    rotateBtn = new Rotate("#gen-btn");
    password = new ComponentWithNewValue("#password");
    slider = new ComponentWithNewValue("#sliderValue");
    select = new ComponentWithNewValue("#selectValue");
    colorIdentifier = new ColorIdentifier("#color-identifier");

    constructor(selector) {
        super(selector);
    }

    changeChars() {
        let numbers = "0123456789";
        let symbols = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
        let rusWords = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
        let engWords = "abcdefghijklmnopqrstuvwxyz";
        let chars = [rusWords];

        if(this.englishAlphabet.$el.checked) {
            chars.push(engWords)
            if (this.upperCaseValue.$el.checked) {
                chars.push(engWords.toUpperCase());
            }
        }
        if (this.upperCaseValue.$el.checked) {
            chars.push(rusWords.toUpperCase());
        }
        if (this.numbers.$el.checked) {
            chars.push(numbers);
        }
        if (this.symbols.$el.checked) {
            chars.push(symbols);
        }
        return chars.join('');
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
        let chars = this.changeChars();
        this.slider.setValue(passwordLength)
        this.select.setValue(passwordLength)

        let newPassword = '';
        for (let i = 0; i < passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            newPassword += chars.substring(randomNumber, randomNumber + 1);
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
