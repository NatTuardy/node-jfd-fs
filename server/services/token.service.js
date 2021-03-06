const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

class TokenService {
 generate(payload){
     const accessToken = jwt.sign(payload, config.get('accessToken'), {
         expiresIn: '1h'
     })
     const refreshToken = jwt.sign(payload, config.get('refreshToken'))
 return {accessToken, refreshToken, expiresIn: 3600}
    }
 async save(userId, refreshToken ){
     
     const data = await Token.findOne({user: userId})
     if(data){
         data.refreshToken = refreshToken
         return data.save()
     }
     const token = await Token.create({ user: userId, refreshToken})
     return token
 }
 validateRefresh(refreshToken){
     try {
        return jwt.verify(refreshToken, config.get('refreshToken'))
     } catch (error) {
         null
     }
 }

 validateAccess(accessToken){
    try {
        console.log('accessToken1', jwt.verify(accessToken, config.get('accessToken')))
       return jwt.verify(accessToken, config.get('accessToken'))
    } catch (error) {
        null
    }
}

 async findToken(refreshToken){
     try {
         return await Token.findOne({refreshToken})    
     } catch (error) {
         return null
     }
 }

}

module.exports = new TokenService