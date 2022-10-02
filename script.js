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
        sys['sin<sup>&minus;1</sup>(']='(180/Math.PI)*Math.asin(';
        sys['cos<sup>&minus;1</sup>(']='(180/Math.PI)*Math.acos(';
        sys['tan<sup>&minus;1</sup>(']='(180/Math.PI)*Math.atan(';
    }else{
        displayText.innerHTML='RAD';
        updateText.innerHTML='deg';
        angleState='RAD';
        sys['sin(']='Math.sin(';
        sys['cos(']='Math.cos(';
        sys['tan(']='Math.tan(';
        sys['sin<sup>&minus;1</sup>(']='Math.asin(';
        sys['cos<sup>&minus;1</sup>(']='Math.acos(';
        sys['tan<sup>&minus;1</sup>(']='Math.atan(';
    }
}

let inverseState= false;
function setInverse(updateText){
    let Elems= document.getElementsByClassName('inv');
    const revStates= ['sin', 'cos', 'tan', 'ln', 'log'];
    const invStates= ['sin<sup>&minus;1</sup>', 'cos<sup>&minus;1</sup>', 'tan<sup>&minus;1</sup>', 'exp', '10^'];
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

let eval_express=[];
let expression_view=[];
let expression= document.getElementById('display');
let mini_result= document.getElementById('mini_display');

const sys={
    '9':'9','8':'8','7':'7','6':'6','5':'5','4':'4','3':'3','2':'2','1':'1','0':'0','.':'.','+':'+','-':'-','×':'*','÷':'/','%':'*0.01',
    'sin(':'Math.sin(','cos(':'Math.cos(','tan(':'Math.tan(','ln(':'Math.log(','log(':'Math.log10(','√(':'Math.sqrt(',
    'sin<sup>&minus;1</sup>(':'Math.asin(','cos<sup>&minus;1</sup>(':'Math.acos(','tan<sup>&minus;1</sup>(':'Math.atan(',
    'exp(':'Math.exp(','10^(':'Math.pow(10,','^':'**','π':'Math.PI','e':'Math.E','(':'(',')':')','!':'!','&infin;':'Infinity'
    };
function express(putValue){
    let sym = putValue.getAttribute("value");
    if (expression.innerHTML == 'Error'){
        expression.innerHTML= '';
        eval_express=[];
    }
    expression_view.push(sym);
    expression.innerHTML= expression_view.join('');
    eval_express.push(sys[sym]);
    expression.scrollBy(1000,0);
    miniResult(eval_express.join(''));
}

function miniResult(getIt){
    try{
        if (getIt === ''){
            return ''; //equals on no input!
        }
        result=eval(getIt);
        if ( isNaN(result) ){
            result='Not a number';
        }else if ( ! isFinite(result) ){
            result= '&infin;';
        }else{
            result= parseFloat(result.toFixed(13));
        }
    }
    catch(err){
        result='. . .'
    }
    mini_result.innerHTML= result;
    return result;
}

function backspace(){
    expression_view.pop();
    expression.innerHTML= expression_view.join('');
    eval_express.pop();
    mini_result.innerHTML= miniResult(eval_express.join(''));
}

function display(){
    let view= miniResult(eval_express.join(''));
    expression_view= [];
    eval_express= [];
    if (view == '. . .' || view == 'Not a number'){
        view='Error'
    }else if (view == '&infin;'){
        eval_express.push(sys[view].toString())
        expression_view.push(view.toString());
    }else{
        eval_express.push(view.toString())
        expression_view.push(view.toString());
    }
    expression.innerHTML= view;
    mini_result.innerHTML='';
}

function clear(){
    expression_view= [];
    expression.innerHTML= expression_view.join('');
    eval_express= [];
    mini_result.innerHTML= miniResult(eval_express.join(''));
}

let toggle= false;
function toggle_panel(){
    let sci_pad= document.getElementById('sci_pad');
    if( !toggle ){
        sci_pad.classList.add('slideR');
        sci_pad.classList.remove('slideL');
        toggle= true;
    }else{
        sci_pad.classList.add('slideL');
        sci_pad.classList.remove('slideR');
        toggle= false;
    }
}