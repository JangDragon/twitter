import * as authRepository from '../data/auth.js';
import * as bcrypt from "bcrypt";

export async function signup(req, res, next){
    const { username, password, name, email } = req.body;
    const users = await authRepository.createUser(username, password, name, email);
    if(users){
        res.status(201).json(users);
    }
}
export async function login(req, res, next){
    const { username, password } = req.body;
    const user = await authRepository.login(username);
    const result = bcrypt.compareSync(password, user.password);

    if(user){
        if(result){
            res.status(201).json(`${username} 로그인 완료`);
        }else{
            res.status(404).json({ message: `${username}님 아이디 또는 비밀번호를 확인해주세요` });
        }
    }
    else{
        res.status(404).json({ message: `${username}님 아이디 또는 비밀번호를 확인해주세요` });
    }
}