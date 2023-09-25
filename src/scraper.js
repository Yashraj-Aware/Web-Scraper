const cheerio = require("cheerio");
const axios = require("axios");
const router = require("express").Router();
const { generateFilename, saveProductJson, generateTitle } = require("./utils");

const baseUrl = "https://www.amazon.com";


router.post("/scrape", async (req,res) => {
    // url requested from body 
    const {url} = req.body;
    //vslidate

    if(!url.includes(baseUrl))
    {
        console.log("Invalid");
        return ;
    }

    try{

        //get html from the url
        axios.get(url).then((response) => {
            //loading html in the cheerio
            const $ = cheerio.load(response.data);

            // empty array to store products
            const products = [];
            $(".s-result-item").each((i,el) => {
                const product = $(el);
                const priceWhole = product.find(".a-price-whole").text();
                const priceFraction = product.find(".a-price-fraction").text();

                const price = priceWhole + priceFraction;

                const link = product.find(".a-link-normal.a-text-normal").attr("href");
                const title = generateTitle(product, link);

                // if title and price and link not empty

                if(title!=="" && price!=="" && link!=="")
                {
                    products.push({title,price,link});
                }

            });

            saveProductJson(products);

            res.json({
                products_saved: products.length,
                message: "scrped successfully",
                filename: generateFilename(),

            });
        });
    }  catch (error) {
        res.statusCode(500).json({
            message: "error scrping",
            error: error.message,
        });
    }
});

module.exports = router;