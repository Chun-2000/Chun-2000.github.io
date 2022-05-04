let TextArea = document.querySelector(".list-group");

let start = document.getElementById("start");
let replay = document.getElementById("replay");
let solution = document.getElementById("solution");

let input = document.querySelector(".input");
let guess = document.querySelector(".guess");

let correct_answer = 0;
let numberArray = []; //typeof(numberArray) = object
let A = 0;
let B = 0;
reset();

start.addEventListener('click',()=>{
    unlock();
    correct_answer = Random4Number();
});

replay.addEventListener('click',()=>{
    reset();
});

solution.addEventListener('click',()=>{
    alert(`答案為 ${correct_answer}`);
});

guess.addEventListener('click',()=>{
    
    if(CheckIsRepeatChar(Change(input.value)) == true){
        alert("錯誤!請輸入四個不同數字");
    }
    else{
        if(correct_answer === input.value){
            guess.innerText = "猜!"; 
            alert(`恭喜你答對了~\n5秒後更新`);
            TextArea.innerHTML += `<li class="list-group-item"><span class="badge bg-success">4A0B</span>${input.value}</li>`;
            setTimeout(`alert('重新開始!'); reset();`,5000);
            
        }
        else{
            CheckIsDifferent4Char(Change(input.value),Change(correct_answer));
            guess.innerText = "猜!";
            TextArea.innerHTML += `<li class="list-group-item"><span class="badge bg-danger">${A}A${B}B</span>${input.value}</li>`;
        }
    }
});

function reset(){
    TextArea.innerText = "";
    input.value = "";
    start.removeAttribute('disabled');
    replay.setAttribute('disabled', true);
    solution.setAttribute('disabled', true);
    input.setAttribute('disabled', true);
    input.removeAttribute('is-invalid');
}

function unlock(){
    start.setAttribute('disabled', true);
    replay.removeAttribute('disabled');
    solution.removeAttribute('disabled');
    input.removeAttribute('disabled');
    
}

function Random4Number() {
    randomList = Math.floor(Math.random() * 9) + 1;

    var solution = '';
    var n = 0;
    for(i=0;i<4;i++){
        n = Math.floor(Math.random() * 9);
        if(solution.indexOf(`${n}`)!= -1){
            i-=1;
            debugger;
            continue;
        }
        else{
            solution += n;
        };
    };
    return solution;
};

function Change(numberString){
    numberArray = numberString.split('');
    return numberArray;
}

function CheckIsRepeatChar(arr){
    let nary=arr.sort();

    for(let i=0;i<arr.length;i++){

        if (nary[i] == nary[i+1]){

            alert("錯誤! 陣列重複內容: "+ nary[i]);
            return true;

        }

    }
    return false;
}

function CheckIsDifferent4Char(input, answer){

    A = 0,B = 0;

    for(let i=0;i<4;i++){
        if (answer.includes(input[i])){
            B++;
        }
    }
    for(let i=0;i<4;i++){
        if (input[i] === answer[i]){
            A++;
            B--;
        }
    }
}