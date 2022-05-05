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

var toastLiveExample = document.getElementById('liveToast')
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

// keydown 事件 => 用户按下鍵盤按键 即可觸發
input.addEventListener('keydown',()=>{
    guess.innerHTML = `<div class="spinner-grow spinner-grow-sm text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>`;
    pass();
})

guess.addEventListener('click',()=>{
    if(CheckIsRepeatChar(Change(input.value)) == true){
        alert("錯誤!請輸入四個不同數字");
    }
    else{
        if(correct_answer === input.value){
            alert(`恭喜你答對了~\n5秒後更新`);
            TextArea.innerHTML += `<li class="list-group-item"><span class="badge bg-success">4A0B</span>${input.value}</li>`;
            setTimeout(`alert('重新開始!'); reset();`,5000);
        }
        else{
            CheckIsDifferent4Char(Change(input.value),Change(correct_answer));
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
    guess.setAttribute('disabled', true);
}

function unlock(){
    start.setAttribute('disabled', true);
    replay.removeAttribute('disabled');
    solution.removeAttribute('disabled');
    input.removeAttribute('disabled');
    input.setAttribute('placeholder', "請輸入四個不同數字");
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

function pass(){
    // 因為目標要按下第4下按鍵 就出現"guess"按鈕 (會比預想的多按一下 => 所以設 3)
    if(input.value.length == 3){
        guess.removeAttribute('disabled');
        guess.innerText = "猜!"; 
    }
    else{
        guess.setAttribute('disabled', true);
        setTimeout(`var toast = new bootstrap.Toast(toastLiveExample);toast.show();`,10000);
        return;
    }
}