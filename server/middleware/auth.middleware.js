const tokenService = require("../services/token.service")

module.exports = (req, res, next)=> {
if(req.method === 'OPTIONS') {
    return next()
}
try {
    console.log('middl')
    const token = req.headers.authorization.split(' ')[1]
    console.log('token', token)
    if(!token){
        console.log("token non")
       return res.status(401).json({message: 'Unauthorized'})
    }
    const data = tokenService.validateAccess(token)
    console.log('data', data)
    req.user = data
    next()
} catch (error) {
    console.log('i m error', error)
    res.status(401).json({message: 'Unauthorized'})
}
}