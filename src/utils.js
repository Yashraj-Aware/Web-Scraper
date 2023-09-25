const fs = require("fs");
const generateTitle = (product , link) => {

    // product title
    const title = product.find(".a-size-medium.a-color-base.a-text-normal").text();

    // if empty
    if(title === ""){
        const urlSegment = link;
        if(typeof urlSegment === "string")
        {
            const urlSegmentStripped = urlSegment.split("/")[1];

            const title = urlSegmentStripped.replace(/-/g, " ");

            return title;
        }
    }
    return title;
};

//unique filenames

const generateFilename = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();

    // returning string containing date time as filename

    const filename = `${year}-${month}-${day}-${hour}-${minute}-${seconds}.json`;
    return filename;
};


const saveProductJson = (products) => {
    //creating a new file with unique filename using generateFileName function

    const filename = generateFilename();

    //convert array into json --> json.stringify
    const jsonProducts = JSON.stringify(products, null, 2);

    // create test file if the inp is test url or data file if not
    const folder = process.env.NODE_ENV === "test" ? "test-data":"data";
    //new folder if it doesnt exists
    if(!fs.existsSync(folder))
    {
        fs.mkdirSync(folder);
    }
    fs.writeFileSync(`${folder}/${filename}`,jsonProducts);

    //returning path to the file
    return `./data/${filename}`;
};

// export functions

module.exports = {
    generateFilename,
    saveProductJson,
    generateTitle,
};