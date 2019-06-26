const { sign } = require('jsonwebtoken');
const  addMmeber  = require('../../database/queries/members/addMember');
const { checkEmail } = require('../../database/queries/authentication/checkEmail');
const { checkUsername } = require('../../database/queries/authentication/checkUsername');
const { singUpSchema } = require('../../helpers/validation-schema');
const { hashingPass } = require('../../helpers/hashPassword');
///////////////////////////////////////////////////////////////////////////////////////////////
module.exports = (req, res, next) => {
  console.log('reqq',req.body); 
  const memberInfo = { ...req.body };

      checkUsername(memberInfo.username)
        .then((resultUser) => {
          if (resultUser.length) throw next({ code: 400, msg: 'The username already exists ' });
          else       
       return checkEmail(memberInfo.email);
        })
        .then((resultEmail) => {
          if (resultEmail.length) throw next({ code: 400, msg: 'The email already exists' });
          
       else return hashingPass(memberInfo.password);
        })
        .then(hashedPass => {
          const{username,password,email} = memberInfo
          console.log('jjjj',hashedPass)
          console.log(addMmeber);
          
            addMmeber({ username, password: hashedPass,email })
            .then((resultAdd) => {
              console.log('add',resultAdd.rows[0]);      
              const {id,username,email}= resultAdd.rows[0];
              const payLoad = {
                 id, username,email
                };
                console.log('paylooood',payLoad);
                
            const jwt = sign(payLoad, process.env.SECRET);
            console.log('jjjj',jwt);
            
               res.cookie('jwt', jwt, { maxAge: 7200000 });
              console.log('rrrrrrr',jwt);
              console.log(payLoad);
              
              
            return  res.send({ error: null, data: [payLoad] });
                 
                  
              })
        })   
         
     .catch(err => next({ code: 400, msg: err.errors }));
}
