const BaseController = require('../base').BaseController;
const AuthHandler = require('./auth.handler');

class AuthController extends BaseController{
    constructor(){
        super();
        this._authHandler = new AuthHandler();
        this._passport = require('passport');
    }
    create(req, res, next){
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (user)=>{
                this._authHandler.issueNewToken(req, user , responseManager.getDefaultResponseHandler(res));
        });
    }

    remove(req, res, next){
    let responseManager = this._responseManager;
    let that = this;
    this._passport.authenticate('jwt-rs-auth', {
        onVerified : function(token, user){
            that._authHandler.revokeToken(req, token, responseManager.getDefaultResponseHandler(res));
        },
        onFailure: function(error){
            responseManager.respondWithError(req, error.status || 401 , error.message);
        }

    })(req, res, next);

    }
    authenticate(req, res, next , callback){
        let responseManager = this._responseManager;
        this._passport.authenticate('credentials-auth', function(err, user){
            if(err){
                responseManager.respondWithError(res, err.status || 401 , err.message);
            }
            else{
                callback(user);
            }

        })(req, res, next);

    }
}

module.exports = AuthController;