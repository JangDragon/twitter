// npm i mysql2

import {config} from '../config.js';
import Mongoose from 'mongoose';

export async function connectDB(){
    return Mongoose.connect(config.db.host)
}

export function useVirtualId(schema){
    schema.virtual('id').get(function(){
        return this._id.toString();
    })
    schema.set('toJSN', {virtuals:true})
    schema.set('toObject', {virtuals:true})
    // json과 object로 사용할 수 있게 적용
}

let db;

export function getUsers(){
    return db.collection('users');
}

export function getTweets(){
    return db.collection('tweets');
}

