const mongoose = require("mongoose");

exports.getErrorMessage = (err) => {
  if (err instanceof mongoose.MongooseError)
    return Object.values(err.errors)[0].message;
  else if (err instanceof Error) {
    return err.message;
  }
};

// exports.showAndHideErrorMessage = () => {

//   const divError = document.getElementsByClassName("notice error")[0];

//   function showNotice() {
//     divError.classList.remove("hidden");}

//   function hideNotice() {
//     divError.classList.add("hidden");}

//   showNotice();
//   setTimeout(hideNotice, 5000);
// };
