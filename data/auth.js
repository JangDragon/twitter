import SQ from 'sequelize';
import {sequelize} from '../db/database.js'
const DataTypes = SQ.DataTypes;

export const User= sequelize.define(
    'user', // 생성될 때 users로 s 가 붙어서 나옴
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        url: DataTypes.STRING(1000)
    },
    {timestamps: false}  // 기본값(생략가능)
)

// 아이디 중복검사
export async function findByUsername(username) {
    return User.findOne({where: {username}})
}

// id 중복검사
export async function findById(id) {
    return User.findByPk(id);
}

export async function createUser(user) {
    return User.create(user).then((data)=>data.dataValues.id)
}

// export async function login(username) {
//     return users.find((users) => users.username === username);
// }
