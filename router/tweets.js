import express from 'express'

const router = express.Router()

let tweets = [
    {
        id:'1',
        text:'안녕하세요',
        createdAt: Date.now().toString(),
        name: '김사과',
        username: 'apple',
        url: 'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fwww.logoyogo.com%2Fweb%2Fwp-content%2Fuploads%2Fedd%2F2021%2F02%2Flogoyogo-1-45.jpg'
    },
    {
        id:'2',
        text:'반갑습니다',
        createdAt: Date.now().toString(),
        name: '반하나',
        username: 'banana',
        url: 'https://img.freepik.com/premium-vector/banana-cute-kawaii-style-fruit-character-vector-illustration_787461-1772.jpg'
    }
]

// 해당 아이디에 트윗 가져오기
// GET
// http://localhost:8080/tweets?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username
    const data = username ? tweets.filter((tweet) => tweet.username == username): tweets;
    res.status(200).json(data)
})
/*
router.get('/', (req, res) => {
    const data = req.query.username
    res.status(200).send(U_N(data))
})
function U_N(data) {
    for (let i=0; tweets.length; i++){
        if(tweets[i]["username"] == data){
            return tweets[i]
        }
    }
}
*/


// 글번호에 대한 트윗 가져오기
// Get
// http://localhost:8080/tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet) {
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `${id}의 트윕이 없습니다.`})
    }
})
/*
router.get('/:id', (req, res) => {
    const data = req.params.id
    res.status(200).send(ID(data))
})
function ID(data) {
    for (let i=0; tweets.length; i++){
        if(tweets[i]["id"] == data){
            return tweets[i]
        }
    }
}
*/

// 트윗하기(추가)
// POST
// http://localhost:8080/tweets
// name, username, text
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/', (req, res, next) => {
    const { text, name, username } = req.body;
    const tweet = {
        id: '10',
        text: text,
        createdAt: Date.now().toString(),
        name: name,
        username: username,
        url: 'https://img.freepik.com/premium-vector/banana-cute-kawaii-style-fruit-character-vector-illustration_787461-1772.jpg'
    }
    tweets= [tweet, ...tweets]
    res.status(201).json(tweets)
})

// 트윗 수정하기
// PUT
// http://localhost:8080/tweets/:id
// id, username, text
// json 형태로 입력 후 변경된 데이터까지 모두 json으로 출력
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const username = req.body.username
    const text = req.body.text
    const tweet = tweets.find((tweet)=> tweet.id === id)
    if(tweet){
        tweet.username = username;
        tweet.text = text;
        res.status(201).json(tweet)
    }else {
        res.status(404).json({message: `${id}의 트윗이 없습니다.`})
    }
})

// 트윗 삭제하기
// DELETE
// http://localhost:8080/tweets/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    tweets = tweets.filter((tweet)=> tweet.id !== id)
    res.sendStatus(204)
    // res.status(204).json(tweets)
})

export default router