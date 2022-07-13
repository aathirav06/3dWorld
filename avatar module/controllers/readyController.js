const catchAsync = require("../catchAsync");

exports.avatarLink = catchAsync(async (req, res, next) => {
  //STORE LINK, DOWNLOAD AVATAR, STORE IN DB/CLOUD, RENDER MODEL TO WORLD..

  //REDIRECTION TO NEW PAGE REQUIRED

  //FOR NOW LINK SENT BACK IN RESPONSE
  // console.log(req.params.url);
  res.status(200).json({
    status: "success",
    data: req.body.url,
  });
});
