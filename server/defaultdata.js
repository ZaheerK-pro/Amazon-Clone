const Products = require('./models/productsScema')
const productsdata = require('./constant/productsdata')

const DefaultData = async() => {
    try {

        await Products.deleteMany({})     //remove extra data which stored when we run the app
        const storeData = await Products.insertMany(productsdata);  // insert multiple data into database
        console.log(storeData);
    }catch (error) {
            console.log("Error" + error.message);
    }
};

module.exports = DefaultData;
