// DOM elements

const resultEl = document.getElementById('pass');
const lengthEl = document.getElementById('points');
const uppercaseEl = document.getElementById('tick1');
const lowercaseEl = document.getElementById('tick2');
const numbersEl = document.getElementById('tick3');
const symbolsEl = document.getElementById('tick4');
const generateEl = document.getElementById('yap');
const clipboard = document.getElementById('copy');




const randomFunc ={
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//Generate event listen

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;


    resultEl.innerText= generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
//Generate password function

function generatePassword(lower, upper, number, symbol, length) {
    // 1.Initialize password variables
    // 2. Filter out unchecked types
    //Loop over length call generator function for each type
    //4. Add final password to the password variable and return

    let generatedPassword= '';

    const typesCount = lower + upper + number + symbol;

    //console.log('typesCount: ', typesCount);

    const typesArr = [{symbol},{number},{lower},{upper}].filter
    (item => Object.values(item)[0]);

    //console.log('typesArr ', typesArr);

    if(typesCount === 0){
        return '';
    }

    for(let i=0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            //console.log('FuncName: ', funcName);

            generatedPassword += randomFunc[funcName]();

        });

    }
        const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
    }

    clipboard.addEventListener('click', () => {
        const textarea = document.createElement('textarea');
        const password = resultEl.innerText;
        
        if(!password) { return; }
        
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        alert('Şifreniz panoya kopyalandı.');
    });

   


// Generator function - https://net-comber.com/charset.html

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}

function getRandomUpper(){

    return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}

function getRandomNumber(){

    return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}

function getRandomSymbol(){
    const symbols = '!@#$%#^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random()*symbols.length)]
}


