
const asyncHandler = (handler) => (req, res, next) =>
handler(req, res, next).catch((error)=>{
console.log(error)
    res.status(500).send({
      status: "Error",
      message: "something went wrong on server! Please try again",
      data: null,
    });
});

module.exports = { asyncHandler };