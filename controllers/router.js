const router = require('express').Router();

const db = require('../model/user.js');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const saltrounds = 10;

const getToken = request =>{
	const authorization = request.get('authorization')
	if( authorization && authorization.toLowerCase().startsWith('bearer')){
		return authorization.substring(7);
	}
	return null
}

router.post('/signup',(request,response)=>{
	let password;

	bcrypt.hash(request.body.password, saltrounds, function(err, hash) {
		
    	const user = new db({email: request.body.email, username: request.body.username, password: hash})

    	user.save().then(result=>{
		response.status(201).json(result)
	}).catch(err => response.status(401).json(err))
	});
	

})

router.get('/users',(request, response)=>{
	db.find({}).then(result=>response.status(201).json(result.map(user=>user.toJSON())))
})

router.post('/login',(request, response)=>{
	db.findOne({username: request.body.username}).then(result=>{

		bcrypt.compare(request.body.password, result.password, (err,res)=>{
			if(res){
				userForToken = {username: result.username, id: result.id}
				token = jwt.sign(userForToken, process.env.SECRET)
				response.status(201).json({username: request.body.username, token})
			}
			else {
				response.status(401).json("incorrect username/password")
			}

		})
	})
})

router.post('/login_validate',(request, response)=>{
	token = getToken(request);
	user = jwt.verify(token, process.env.SECRET);
	db.findById(user.id).then(result=>{
		response.status(201).json(result)
	})
})
	



module.exports = router