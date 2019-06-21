const yup = require('yup');

const { getMyApplication } = require('../../database/queries/applications/index');
// const  getMyApplication  = require('../../database/queries/applications/getMyApplication');

module.exports = (req, res, next) => {
  const { memberId, offerId } = req.params;

        
      getMyApplication(memberId, offerId)
        .then((result) => {
          res.send({
            error: null,
            data: result.rows,
          });
        })
        .catch(() => next({ code: 500, msg: 'Internal Server Error' }));
  
};
