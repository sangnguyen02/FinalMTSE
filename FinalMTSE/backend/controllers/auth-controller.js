const { getGoogleOauthToken, getGoogleUser }= require('./googleServer')

exports.googleOauthHandler = async (req, res, next) => {
    try {
        const code = req.query.code;
  
        if (!code) {
          return next(new appError('Authorization code not provided!', 401));
        }
      
        // Use the code to get the id and access tokens
        const { id_token, access_token } = await getGoogleOauthToken({ code });
      
        // Use the token to get the User
        const { id, email, verified_email, name, given_name, family_name } =
          await getGoogleUser({
            id_token,
            access_token
          });
          console.log(email)
    }
    catch (err) {
        console.error(err)
    }
   
  };