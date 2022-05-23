//取到 靜態UI(全域)
const span_price = document.querySelector('#total');
const img_ = document.querySelector('.main-pic img');
const ul_specs = document.querySelector('.main-specs');
//規格英文:specia...

//全域data
let iPadArray = [];

const url = "./iPadAir.json";
let xhr = new XMLHttpRequest();
xhr.onload = ()=>{
    //收到回應了
    // console.log(xhr)
    if(xhr.readyState == 4 && xhr.status == 200){
        iPadArray = JSON.parse(xhr.response);
        afterResponse();
    }
    else{console.log('抓資料失敗')}

}
xhr.open('GET',url);
xhr.send();//去network看請求.回應

//儲存 各組規格 的格式(陣列包物件)，方便迭代造DOM
let specArray = [
    {title:'外觀', key:'color', options:[], choosed:null},
    {title:'儲存裝置', key:'storage', options:[], choosed:null},
    {title:'連線能力', key:'network', options:[], choosed:null}
]

function afterResponse(){
    //(一)重組資料
    iPadArray.forEach( data =>{
        specArray.forEach( spec =>{
            let value = data[spec.key]; //data[color] //data[storage] //data[network]
            if(!spec.options.includes(value)){
                spec.options.push(value)
            }
        });
        //要重複做這樣的事:
        // if(!specArray[0].options
        //     .includes(data['color']) ){
        //         specArray[0].options.push(data['color'])
        //     }
    });

    console.log(specArray);
    
    //(二)依據 [規格資料] 造規格的UI
    //ul >
    //  li > h3{規格標題1} + bottons{選項文字}*n
    //  li > h3{規格標題2} + bottons{選項文字}*n
    //...

    specArray.forEach(spec =>{
        let title = spec.title;
        let key = spec.key;
        let options = spec.options;
        // 解構賦值(等於上面宣告的那三行)
        // let (title, key, options) = spec;
        let li = document.createElement('li');
        ul_specs.appendChild(li); //用 append 也可
        li.classList.add(`${key}`); //利用 class 利於把UI分組

        //加入標題
        let h3 = document.createElement('h3');
        li.appendChild(h3);
        h3.innerText = title;

        //每個選項資料 => 選項按鈕
        options.forEach(option => {
            let button = document.createElement('button');
            li.append(button);
            button.innerHTML = option;

            button.addEventListener('click', ()=>{
                //1. 紀錄 "此規格" 選中了 "此選項"
                spec.choosed = option;

                // ...改樣式 .choosed
                // 移除同組按鈕的.choosed ，自己要加 .choosed
                // let group = document.querySelectorAll(`.${key} button`);
                let group = li.querySelectorAll('button');
                group.forEach( btn =>{
                    btn.classList.remove('choosed')
                })

                button.classList.add('choosed');

                //2. 刷新圖和錢
                refreshImgAndPirce();
            });
        });
        // hr 水平線效果 隔開
        li.append( document.createElement('hr') );
    })
}

function refreshImgAndPirce(){
    //根據 '已選的資料' 找到目標data
    //類似這樣的效果
    // iPadArray
    //     .filter( data => dataa.color == specArray[0].choosed)
    //     .filter( data => data.storage == specArray[1].choosed)
    //     .filter( data => data.network == specArray[2].choosed)

    let tmp = iPadArray;
    // 每個規格 都 有一次篩選
    specArray.forEach(spec =>{
        tmp = tmp.filter( data => data[spec.key] == spec.choosed);
    });
    console.log('specArray',specArray); //這有紀錄選中項
    console.log('tmp',tmp);

    if(tmp.length != 1) return;

    // 目標資料 就是 tmp[0]
    span_price.innerHTML = tmp[0].price;
    img_.src = tmp[0].url;
    img_.alt = tmp[0].picture;

}