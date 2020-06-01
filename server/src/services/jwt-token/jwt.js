const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const util = require('util') 
const signAsync = util.promisify(jwt.sign);
const verifyAsync = util.promisify(jwt.verify);


async function generateJwt(userProfile){
    let token;
    //Profile has name and id
    if (userProfile.hasOwnProperty(name) && userProfile.hasOwnProperty(id)) {
        // Generate a JSON Web Token
      try {
        token = await signAsync(userProfile, config.token.secret, {
          expiresIn: config.token.expiresIn,
        });
      } catch (error) {
        throw new Error(error)
      }
  
      return token;
    }        
}

async function decodeJwt(userProfile){
    //Is there a token?
    if (!token) {
        throw new Error('Token is null')
      }
      try {
        // decode profile from token
        const decodedToken = await verifyAsync(token, config.token.secret);

        const profile = {
            id: decodedToken.id,
            name: decodedToken.name
        }
      } catch (error) {
        throw new Error('Some problem occured')
      }
      return profile;
}


module.exports = {generateJwt, decodeJwt}