const { getOfferApplications } = require('../../database/queries/application/index');
console.log(getOfferApplications);

module.exports = (req, res, next) => {
  console.log('jjjjjjjjjjjjjjjjj');
  
  const { offerId } = req.params;
  getOfferApplications(offerId)
    .then((result) => {
      res.send({
        error: null,
        data: result.rows,
      });
    })
    .catch(() => next({ code: 500, msg: 'Internal Server Error!' }));
};