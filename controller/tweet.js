import * as tweetRepository from '../data/tweet.js'

// 여러 트윗을 가져오는 함수
export async function getTweets(req, res) {
    const username = req.query.username
    const data = await (username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll())
    // username 유무에 따른 출력
    res.status(200).json(data)
}

// 하나의 트윗을 가져오는 함수
export async function getTweet(req, res, next) {
    const id = req.params.id
    const tweet = await tweetRepository.getById(id);
    if(tweet) {
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `${id}의 트윕이 없습니다.`})
    }
}

// 트윗 생성 함수
export async function createTweet(req, res, next) {
    const { text, name, username } = req.body;
    const tweets = await tweetRepository.create(text, name, username);
    res.status(201).json(tweets)
}

// 트윗 변경 함수
export async function updateTweet(req, res, next) {
    const id = req.params.id
    const text = req.body.text
    const tweet = await tweetRepository.update(id, text);
    if(tweet){
        res.status(201).json(tweet)
    }else {
        res.status(404).json({message: `${id}의 트윗이 없습니다.`})
    }
}

// 트윗 삭제 함수
export async function deleteTweet(req, res, next) {
    const id = req.params.id
    await tweetRepository.remove(id);
    res.sendStatus(204)
}
