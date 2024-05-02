import * as authRepository from '../data/auth.js';
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const secret = "abcd1234%^&"
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 10;

// async function makeToken(id) {
//     const token = jwt.sign(
//         {
//             id: id,
//             isAdmin: false
//         }, secret, { expiresIn: '1h' }
//     )
//     return token;
// }
function createJwtToken(id) {
    return jwt.sign({ id }, secret, { expiresIn: jwtExpiresInDays })
}


export async function signup(req, res, next) {
    const { username, password, name, email, url } = req.body;
    const found = await authRepository.findByUsername(username);
    if (found) {
        return res.status(409).json({ message: `${username}은 이미 존재합니다.` })
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await authRepository.createUser({username, hashed, name, email, url});
    const token = createJwtToken(userId);
    res.status(201).json({token, username});
}
export async function login(req, res, next) {
    const { username, password } = req.body;
    // const user = await authRepository.login(username);
    const user = await authRepository.findByUsername(username);
    console.log(user)
    if(!user){
        return res.status(401).json({ message: `아이디를 찾을 수 없음` });
    }
    const isValidpassword = await bcrypt.compareSync(password, user.password)
    if(!isValidpassword){
        return res.status(402).json({ message: `비밀번호 틀림` });
    }
    const token = createJwtToken(user.id)
    res.status(200).json({token, username})
}

// export async function verify(req, res, next) {
//     const token = req.header['Token']
//     if (token) {
//         res.status(200).json(token)
//     }
// }

export async function me(req, res, next){
    const user = await authRepository.findById(req.username)
    if(!user){
        return res.status(404).json({message: '일치하는 사용자가 없습니다.'})
    }
    res.status(200).json({token: req.token, username: user.username})
}