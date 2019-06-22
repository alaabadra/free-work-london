const yup = require('yup');
const { addHiredMember } = require('../../database/queries/application/index');
console.log('hhtyui',addHiredMember);

module.exports = (req, res, next) => {
    console.log(req);
    
  const { member_id: memberId, offer_id: offerId, status } = req.body;
//   const schema = yup.object({
//     offerId: yup.string().required(),
//     memberId: yup.string().required(),
//     status: yup.string().required(),
//   });
//   schema
//     .validate({ offerId, memberId, status })
//     .then(() => {
      addHiredMember(memberId, offerId, status)
        .then((result) => {
          res.send({
            error: null,
            data: result.rows,
          });
        })
        .catch(err => next({ code: 500, msg: err.message }));
    // })
    // .catch((err) => {
    //   next({ code: 400, msg: err.message });
    // });
};
