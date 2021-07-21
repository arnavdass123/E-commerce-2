const item = require('../../models/menu') 
function homecontroller() {
    return {
        async index(req, res) {
            const zips = await item.find()
            console.log(zips)
            return res.render('home', { zips: zips })

            // item.find().then(function (zips) {
            //     console.log(zips)
            //     res.render('home', { zips: zips })
            // })
        }
    }
}
module.exports = homecontroller