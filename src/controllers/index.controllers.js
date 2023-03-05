const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render("index");
};

indexCtrl.renderAbout = (req, res) => {
  res.render("about");
};

indexCtrl.renderFeatures=(req,res)=>{
  res.render("features");
}

module.exports = indexCtrl;