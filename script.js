var angleState='RAD';
function setAngle(updateText){
    var displayText=document.getElementById('angle');
    if (angleState == 'RAD'){
        displayText.innerHTML='DEG';
        updateText.innerHTML='deg';
        angleState='DEG';
        sys['sin(']='Math.sin((Math.PI/180)*';
        sys['cos(']='Math.cos((Math.PI/180)*';
        sys['tan(']='Math.tan((Math.PI/180)*';
    }else{
        displayText.innerHTML='RAD';
        updateText.innerHTML='rad';
        angleState='RAD';
        sys['sin(']='Math.sin(';
        sys['cos(']='Math.cos(';
        sys['tan(']='Math.tan(';
    }
}


var eval_express='';

var sys={
    '9':'9','8':'8','7':'7','6':'6','5':'5','4':'4','3':'3','2':'2','1':'1','0':'0',
    '.':'.','+':'+','-':'-','×':'*','÷':'/','%':'*0.01',
    'sin(':'Math.sin(','cos(':'Math.cos(','tan(':'Math.tan(',
    'ln(':'Math.log(','log(':'Math.log10(','√(':'Math.sqrt(',
    'π':'Math.PI','e':'Math.E',
    '(':'(',')':')','!':'!'
    };

function express(putValue){
    var expression=document.getElementById('expression');
    var sym = putValue.getAttribute("value");
    expression.value+=sym;
    eval_express += sys[sym];
    expression.scrollBy(40,0);
    miniResult(eval_express);
}

function miniResult(getIt){
    var mini_result=document.getElementById('mini_display');
    try{
        result=eval(getIt);
        if (result == undefined){
            result=''
        }
    }catch(err){
        result=''
    }
    mini_result.innerHTML= result;
    mini_result.scrollBy(30,0);
    return result;
}

function backspace(){
    var expression=document.getElementById('expression');
    expression.value='';
    eval_express='';
    miniResult(eval_express);
}
function display(){
    var expression=document.getElementById('expression');
    var mini_result=document.getElementById('mini_display');
    expression.value=miniResult(eval_express);
    mini_result.innerHTML='';
}