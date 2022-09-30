let angleState='RAD';
function setAngle(updateText){
    let displayText=document.getElementById('angle');
    if (angleState == 'RAD'){
        displayText.innerHTML='DEG';
        updateText.innerHTML='rad';
        angleState='DEG';
        sys['sin(']='Math.sin((Math.PI/180)*';
        sys['cos(']='Math.cos((Math.PI/180)*';
        sys['tan(']='Math.tan((Math.PI/180)*';
    }else{
        displayText.innerHTML='RAD';
        updateText.innerHTML='deg';
        angleState='RAD';
        sys['sin(']='Math.sin(';
        sys['cos(']='Math.cos(';
        sys['tan(']='Math.tan(';
    }
}

let inverseState= false;
function setInverse(updateText){
    let Elems= document.getElementsByClassName('inv');
    const revStates= ['sin', 'cos', 'tan', 'ln', 'log'];
    const invStates= ['asin', 'acos', 'atan', 'exp', '10^'];
    if (!inverseState){
        updateText.innerHTML='rev';
        inverseState= true;
        for(let i=0; i<5; i++){
            Elems[i].innerHTML=invStates[i];
            Elems[i].setAttribute("value",`${invStates[i]}(`);
        }
    }else{
        updateText.innerHTML='inv';
        inverseState= false;
        for(let i=0; i<5; i++){
            Elems[i].innerHTML=revStates[i];
            Elems[i].setAttribute("value",`${revStates[i]}(`);
        }
    }
}

let eval_express='';
let expression=document.getElementById('expression');
let mini_result=document.getElementById('mini_display');

const sys={
    '9':'9','8':'8','7':'7','6':'6','5':'5','4':'4','3':'3','2':'2','1':'1','0':'0',
    '.':'.','+':'+','-':'-','×':'*','÷':'/','%':'*0.01',
    'sin(':'Math.sin(','cos(':'Math.cos(','tan(':'Math.tan(',
    'ln(':'Math.log(','log(':'Math.log10(','√(':'Math.sqrt(',
    'asin(':'Math.asin(','acos(':'Math.acos(','atan(':'Math.atan(',
    'exp(':'Math.exp(','10^(':'Math.pow(10,',
    '^':'**','π':'Math.PI','e':'Math.E',
    '(':'(',')':')','!':'!'
    };

function express(putValue){
    let sym = putValue.getAttribute("value");
    expression.value+=sym;
    eval_express += sys[sym];
    expression.scrollBy(1000,0);
    miniResult(eval_express);
}

function miniResult(getIt){
    try{
        result=eval(getIt);
        if (result == undefined){
            result='';
            return result;
        }
        result= parseFloat(result.toFixed(13));
        mini_result.innerHTML= result;
        mini_result.scrollBy(1000,0);
        return result;
    }
    catch(err){
        result=''
        return result;
    }
}

function backspace(){
    expression.value='';
    eval_express='';
    miniResult(eval_express);
    mini_result.innerHTML=''
}
function display(){
    expression.value=miniResult(eval_express);
    mini_result.innerHTML='';
}