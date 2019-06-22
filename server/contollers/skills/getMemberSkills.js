



const { getMemberSkills } = require('../../database/queries/skills/getMemberSkills');

module.exports = (req, res, next) => {
  getMemberSkills(req.params.memberId)
    .then((result) => {
      
      res.send({
        error: null,
        data: result.rows,
      });
    })
    .catch(err => next(err));
};





