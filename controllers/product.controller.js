const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//post
exports.create = function (req, res, next) {
    const product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            //KN: Not a good practice: send the err to client
            //Good POINT: auto set status to 500
            return next(err);
        }
        res.send('Product Created successfully');

        //KN: response in json format
        // res.json({"message": "Product Created successfully"});
    });
};

//get
// exports.details = function (req, res, next) {
//     Product.findById(req.params.id, function (err, product) {
//         if (err) return next(err);
        
//         //KN: will send product as a json
//         //equal to
//      // res.json(product);
//          res.send(product);
//     });
// };

//GET
//  async/await
exports.details = async function (req, res, next) {
    try{
        const product = await Product.findById(req.params.id);
        
        //KN: will send product as a json
        //equal to
        // res.json(product);
        return res.send(product);
    }
    catch(err){
        return next(err);
    }
};

//update
exports.update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

//delete
exports.delete = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};