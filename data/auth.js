import MongoDB, { ObjectId } from 'mongodb'
import { getUsers } from '../db/database.js'

const objectID = MongoDB.ObjectId;  // objectid가 생성(기본키)


// 아이디 중복검사
export async function findByUsername(username) {
    return getUsers().find({username}).next().then(mapOptionalUser);
}

// id 중복검사
export async function findById(id) {
    return getUsers().find({_id: new objectID(id)}).next().then(mapOptionalUser)
}

export async function createUser(user) {
    return getUsers().insertOne(user).then((result) => console.log(result.insertedId.toString()));
}

// export async function login(username) {
//     return users.find((users) => users.username === username);
// }

function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString() } : user;
}