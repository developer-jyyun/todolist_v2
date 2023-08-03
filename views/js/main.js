let addBtn=document.getElementById('add_btn');
    console.log(addBtn)
let inputText = document.getElementById('add_con')
    console.log(inputText)
    
    addBtn.addEventListener('click', function (e) {  //클릭이벤트
        if (inputText.value == '') {
            alert('내용을 입력해 주세요:)')
        } else{
            window.location.reload();       
        }  
    })
    

// // 구조분해
// const listNode = document.querySelectorAll('.todo_li');
// const done = document.getElementById('done');
// [...listNode].forEach(function(listNode) {
//     listNode.addEventListener('click', function() {
//         listNode.firstElementChild.style.background ='#b3c9df'
//         listNode.firstElementChild.textContent ='완료 날짜: 00/00/00'
//         listNode:nthElementChild(2).style.color='#ff0;'
//         // if (this.firstElementChild.checked == true) {//체크박스 표시

//         // } else {
       
//         // }
//     });
// });


const listLabel = document.querySelectorAll('.label');
for(let i = 0; i<listLabel.length; i++) {
    listLabel[i].addEventListener('click', function() {
        let thisTop = this.closest('li').firstElementChild;
        if (this.firstElementChild.checked == true) {//체크박스 표시
            this.classList.add('off') //밑줄
            this.closest('li').classList.add('off') //밑줄
            thisTop.innerHTML ='<span id="postTime">완료 날짜: 0000/00/00</span><span class="list_num"> no: <%= posts[i]._id %> </span> <button class="delete_btn" data-id="<%= posts[i]._id %>" type="button">X</button>'
            // thisTop.style.background ='#b3c9df'
            thisTop.style.background ='#919191'
            console.log()
        }else{
            this.classList.remove('off')
            this.closest('li').classList.remove('off') //밑줄
            thisTop.innerHTML ='<span id="postTime">등록 날짜: 0000/00/00</span><span class="list_num"> no: <%= posts[i]._id %> </span> <button class="delete_btn" data-id="<%= posts[i]._id %>" type="button">X</button>'
            this.closest('li').firstElementChild.style.background ='#4e50ff'
            this.closest('li').firstElementChild.style.color ='#fff'
        }
    });
}


function setClock(){
    let dateInfo = new Date();     
    let hour = modifyNumber(dateInfo.getHours());
    let min = modifyNumber(dateInfo.getMinutes());
    let sec = modifyNumber(dateInfo.getSeconds());
    let year = dateInfo.getFullYear();
    let month = dateInfo.getMonth()+1; //monthIndex를 반환해주기 때문에 1을 더해준다.
    let date = dateInfo.getDate();
    document.getElementById("time").innerHTML = hour + ":" + min  + ":" + sec;
    document.getElementById("date").innerHTML = year + "년 " + month + "월 " + date + "일";
}

function modifyNumber(time){
    if(parseInt(time)<10){
        return "0"+ time;
    }
    else
        return time;
}

window.onload = function(){
    setClock();
    setInterval(setClock,1000); //1초마다 setClock 함수 실행
}

