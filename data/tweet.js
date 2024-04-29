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
];


// 모든 트윗 리턴
export async function getAll() {
    return tweets
}

// 해당 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return tweets.filter((tweet) => tweet.username === username)
}

// 글 번호에 대한 트윗을 리턴
export async function getById(id){
    return tweets.find((tweet) => tweet.id === id)
}

// 트윗 작성
export async function create(text, name, username) {
    const tweet = {
        id: '10',
        text: text,
        createdAt: Date.now().toString(),
        name,   //name: name
        username,
        url: 'https://img.freepik.com/premium-vector/banana-cute-kawaii-style-fruit-character-vector-illustration_787461-1772.jpg'
    }
    tweets= [tweet, ...tweets]
    return tweets;
}

// 트윗을 변경
export async function update(id, text) {
    const tweet = tweets.find((tweet)=> tweet.id === id)
    if(tweet){
        tweet.text = text;
    }
    return tweet;
}

// 트윗 삭제
export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id)
}
