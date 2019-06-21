
const { getSavedOffer } = require('../../database/queries/offer/getSavedOffers');

module.exports = (req, res, next) => {
  const { memberId } = req.params;
  getSavedOffer(memberId)
    .then(result => 
      {
        console.log(result);
        
      res.send({
      error: null,
      data: result.rows,
    })
    
  })
    .catch(() => next({ code: 500, msg: 'internal server error' }));
};
