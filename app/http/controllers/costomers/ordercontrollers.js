const Order = require('../../../models/order')
const moment = require('moment')

function ordercontroller() {
    return {
        store(req, res) {
            // validate request
            console.log(req.body)

            const {
                phone,
                address
            } = req.body
            if (!phone || !address) {
                req.flash('error', 'All fields are required')
                return res.redirect('/cart')
            }

            const order = new Order({
                // passport gives us costomer id for order page:
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })
            console.log(order, " hello arnav bhai")
            // waiting code
            order.save().then(result => {
                req.flash('success', 'Order placed successfully')
                delete req.session.cart
                return res.redirect('/costomers/order')
            }).catch(err => {
                return res.redirect('/cart')
            })

        },
        async index(req, res) {
            const orders = await Order.find({
                customerId: req.user._id
            }, null, {
                sort: {
                    'createdAt': -1
                }
            })
            res.render("costomers/order", {
                orders: orders,
                moment: moment
            });
        }
    }
}

module.exports = ordercontroller