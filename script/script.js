
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
    russianAlphabet = new Component("#russian-alphabet");
    englishAlphabet = new Component("#english-alphabet");
    upperCaseValue = new Component("#upperCaseValue");
    numbers = new Component("#numbers");
    symbols = new Component("#symbols");

    rotateBtn = new Rotate("#gen-btn");
    password1 = new ComponentWithNewValue("#password1");
    password2 = new ComponentWithNewValue("#password2");
    password3 = new ComponentWithNewValue("#password3");
    password4 = new ComponentWithNewValue("#password4");
    password5 = new ComponentWithNewValue("#password5");
    genPasswords = [this.password1, this.password2, this.password3, this.password4, this.password5];

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
        let chars = [   ];

        if(this.englishAlphabet.$el.checked) {
            chars.push(engWords)
            if (this.upperCaseValue.$el.checked) {
                chars.push(engWords.toUpperCase());
            }
        }
        if(this.russianAlphabet.$el.checked) {
            chars.push(rusWords)
            if (this.upperCaseValue.$el.checked) {
                chars.push(rusWords.toUpperCase());
            }
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


        this.genPasswords.map( p => {
            let newPassword = '';
            for (let i = 0; i < passwordLength; i++) {
                let randomNumber = Math.floor(Math.random() * chars.length);
                newPassword += chars.substring(randomNumber, randomNumber + 1);
            }
            p.setValue(newPassword);
        })

        this.changeColor();
    }

    refreshGenPassword() {
        this.genPassword(this.select.$el.value);
        this.rotateBtn.doRotate();
    }

    copyPassword(password) {
        event.preventDefault();
        this.genPasswords.map( p => {
            if(p.$el.id === password) {
                p.$el.select();
                document.execCommand("copy");
            }
        })
    }

}

const genNewPassword = new PasswordGenerator();
