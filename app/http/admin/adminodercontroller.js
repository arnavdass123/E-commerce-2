const order = require("../../models/order");

function ordercontroller() {
  //  for rendering admin orders page:
  return {
    index(req, res) {
      order.find({
          status: {
            $ne: "completed"
          }
        }, null, {
          sort: {
            createdAt: -1
          },
        })
        .populate("customerId", "-password").exec((err, orders) => {
          if (req.xhr) {
            console.log(" Xhr is here ");
            return res.json(orders);
          } else {
            console.log(orders, "my order object");
            return res.render('admin/oders');
          }

        });
    },
  };
}

module.exports = ordercontroller;