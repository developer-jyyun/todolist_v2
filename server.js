
const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(express.urlencoded({ extended: true })); 

// css연결
app.use(express.static('./views/css'));
app.use(express.static('./views/js'));

app.set('veiw engine','ejs')


MongoClient.connect('mongodb+srv://jyyun:1234@jyyun.vsb2lvf.mongodb.net/?retryWrites=true&w=majority', function(에러, client){
  if(에러){return console.log(에러)}  //연결 에러 발생 시 무슨 에러 발생하는지 출력!
                                      // 위 코드의 파라미터 넣기
                                      
    //**step1_todoapp이라는 database폴더에 연결
    db = client.db('todoapp')  
    app.listen(8080, function(){
      console.log('8080 잘 연결됐음^0^')
    });  
});


app.get('/', function(req, res){
  db.collection('post').find().toArray(function(에러, 결과){ //모든 데이터 가져오기
    console.log(결과)
    res.render('index.ejs',{posts:결과}) 
  });
});



//어떤 사람이 000라는 경로로 post 요청을 하면,
//데이터(todo, memo,....)를 보내주는데,
// 이때, 'post'라는 이름을 가진 collection에 두개 데이터를 저장하기

// //000 경로로 post 요청 -> 데이터 보내죠
app.post('/add', function(req, res) {  
  res.send('할 일 등록 완료^0^') //요청.send!!!!!
    // post 파일에 데이터 저장
    db.collection('counter').findOne({name:'게시물갯수'} , function(에러,결과){
      console.log(결과.totalPost);
      let 총게시물갯수 = 결과.totalPost;

      // db.collection('post').insertOne({_id : 총게시물갯수+1, todo: req.body.todo, memo:req.body.memo} , function(에러,결과){
        db.collection('post').insertOne({_id : 총게시물갯수+1, todo: req.body.todo, memo:req.body.memo, writeDate: { type: Date, default: new Date() } }, function(에러,결과){
        console.log('저장완료^_^!!');
        //  counter 라는 콜렉션에 있는 totalPost 라는 항목도 1 증가 시켜야 함.
        db.collection('counter').updateOne({name:'게시물갯수'},{ $inc : {totalPost:1} },function(에러,결과){
          if(에러){return console.log(에러)} //에러체크
        //완료되면 db.counter 내의 총 게시물갯수+1
        })

      });
   
    }); 
});



// 삭제
app.delete('/delete', function(req, res){
  console.log(req.body)
  req.body._id =  parseInt(req.body._id);
  //req.body에 담겨온 게시물번호를 가진 글을 db에서 찾아 삭제해주세요
  db.collection('post').deleteOne(req.body, function(에러, 결과){
    console.log('삭제완료');
    res.status(200).send({ message:'성공했습니다!' }); //응답코드 200: 요청 성공!
    // res.status(400).send({message:'실패'}) //400: 실패....T_T
  })

})

// detail
app.get('/detail/:id', function(req,res){
  db.collection('post').findOne({_id : parseInt(req.params.id)}, function(에러,결과){
    console.log(결과);
    res.render('detail.ejs',{data:결과});
  })
})