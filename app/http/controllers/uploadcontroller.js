
function uploadcontroller() {
  return {
    index(req, res) {
      return res.render("adminpanel/upload")

      // item.find().then(function (zips) {
      //     console.log(zips)
      //     res.render('home', { zips: zips })
      // })
    },
    postindex(req,res){
      console.log("post index is running")

      if (req.files) {
        console.log(req.files);
        let file = req.files.file;
        let filename = file.name;
        console.log(filename);
    
        file.mv("../../../public/img/" + filename, function (err) {
          if (err) {
            res.send(err);
          }
        });
      }





    }
  };
}
module.exports = uploadcontroller;
