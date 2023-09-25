const request = require("supertest");
const fs = require("fs");
const {generateFilename, saveProductJson} = require("../src/utils");
const server = require("../src/server");

const cleanTestData = () =>{
    //delete test data from directory
    fs.rm("./test-data", {recursive: true}, (error) => {
        if(error)
        {
            console.log("error deleting directory", error);
        }
    });
}

// scraper test suite

describe("scraper", () => {
    //test unique filename
    test("generateFilename() return a string", () => {

        // assert generateFilename function returns a string
        expect(typeof generateFilename()).toBe("string");

        //assert generateFilename returns .json extension
        expect(generateFilename()).toMatch(/\.json$/);
    });

    // Test saveProductJson function(type of test: unit)
    test("saveProductJson() saves a file", async () => {
        //mock product
        const products = [
            {
                title: "MOCK",
                price: 100,
                link: "https://www.amazon.com/Mock-Product/dp/B07YXJ9XZ8",
            },
        ];

        //call saveProductJson with products array
        const saved = await saveProductJson(products);

        //assert saveProductJson function returns a string
        expect(typeof saved).toBe("string");

        //assert that it returns path with ./data/ and .json
        expect(saved).toMatch(/^\.\/data\/.*\.json$/);
    });


      // Test the /scrape route (type of test: integration)
  test("POST /scrape returns a 200 status code", async () => {
    // Create a mock request body
    testScrapUrl =
      "https://www.amazon.com/s?k=all+headphones&crid=2TTXQBOK238J3&qid=1667301526&sprefix=all+headphones%2Caps%2C284&ref=sr_pg_1";

    const body = {
      url: testScrapUrl,
    };
    // Make a POST request to the /scrape route
    const response = await request(server).post("/scrape").send(body);
    // Assert that the response status code is 200
    expect(response.statusCode).toBe(200);
    // Assert that the response body has a products property
    expect(response.body).toHaveProperty("products_saved");
  });
    

});

//close the server and delete the test data directory after all tests have run
afterAll(() => {
    cleanTestData();
    server.close();
  });