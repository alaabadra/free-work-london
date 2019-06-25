const yup = require('yup');
const { addHiredMember } = require('../../database/queries/application/index');

module.exports = (req, res, next) => {
    // console.log('reqqq',req)
  const { member_id: memberId, offer_id: offerId ,status} = req.body;
//   const validationSchema = yup.object().shape({
//     offerId: yup.string().required(),
//     memberId: yup.string().required(),
//   });
//   validationSchema
//     .validate({ offerId, memberId })
//     .then(() => {
      addHiredMember(memberId, offerId,status)
        .then((result) => {
            console.log('ressss',result)
          res.send({
            error: null,
            data: result.rows,// rows: [ { offer_id: 2, member_id: 3, status: null } ],
          });
        })
        .catch(err => next({ code: 500, msg: err.message }));
    // })
    // .catch(err => next({ code: 400, msg: err.message }));
};
