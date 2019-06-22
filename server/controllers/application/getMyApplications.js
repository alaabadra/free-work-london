
const { getMyApplications } = require('../../database/queries/application/index');
console.log(getMyApplications);

module.exports = (req, res, next) => {
    console.log('hhhhhhhhhhhhhhhh');
    
    console.log(req);
    
  const { memberId } = req.params;

    getMyApplications(memberId)
        .then((result) => {
          res.send({
            error: null,
            data: result.rows,
          });
        })
        .catch(() => next({ code: 500, msg: 'Internal Server Error' }));
   
};
