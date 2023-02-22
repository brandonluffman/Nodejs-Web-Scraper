// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
// const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";
// const url = "https://www.google.com/shopping/product/1750428752407040408/reviews?q=sony+headphones+wh-1000xm5&prds=eto:12288230993631893230_0;2320404521285140659_0;15067390725587779599_0,local:1,pid:9284429138362173623,prmr:2,rsk:PC_3375826184378489259&sa=X&ved=0ahUKEwigpfyUp6n9AhVtFFkFHdKeCLIQqSQIgAE"

// // Async function which scrapes the data
// async function scrapeData() {
//   try {
//     // Fetch HTML of the page we want to scrape
//     const { data } = await axios.get(url);
//     // Load HTML we fetched in the previous line
//     const $ = cheerio.load(data);
//     // Select all the list items in plainlist class
//     const listItems = $(".sh-rol__reviews-cont");
//     // Stores data for all countries
//     const reviews = [];
//     // Use .each method to loop through the li we selected
//     listItems.each((idx, el) => {
//       // Object holding data for each country/jurisdiction
//       const review = { content: "", stars: "" };
//       // Select the text content of a and span elements
//       // Store the textcontent in the above object
//       review.content = $(el).find('.z6XoBf').find('.P308Ne').text();
//       review.stars = $(el).text();
//       // Populate countries array with country data
//       reviews.push(review);
//     });
//     // Logs countries array to the console
//     console.dir(reviews);
//     // Write countries array in countries.json file
//     fs.writeFile("coutries.json", JSON.stringify(reviews, null, 2), (err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log("Successfully written data to file");
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }
// // Invoke the above function
// scrapeData();

// const puppeteer = require("puppeteer");
// const getBooksData = async () => {
//     const url = "https://www.google.com/search?q=merchant+of+venice&gl=us&tbm=bks";
//     browser = await puppeteer.launch({
//         headless: true,
//         args: ["--disabled-setuid-sandbox", "--no-sandbox"],
//     });
//     const page = await browser.newPage();
//     await page.setExtraHTTPHeaders({
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36 Agency/97.8.6287.88",
//     });
//     await page.goto(url, {
//         waitUntil: "domcontentloaded"
//     });
//     let books_results = [];
//     books_results = await page.evaluate(() => {
//         return Array.from(document.querySelectorAll(".Yr5TG")).map((el) => {
//             return {
//                 title: el.querySelector(".DKV0Md")?.textContent,
//                 writers: el.querySelector(".N96wpd")?.textContent,
//                 description: el.querySelector(".cmlJmd")?.textContent,
//                 // thumbnail: el.querySelector("img").getAttribute("src"),
//             }
//         })
//     });
//     console.log(books_results) 
//     await browser.close();
// };
// getBooksData();

const puppeteer = require("puppeteer");
const getBooksData = async () => {
    const url = "https://www.google.com/shopping/product/1750428752407040408/reviews?q=sony+headphones+wh-1000xm5&prds=eto:12288230993631893230_0;2320404521285140659_0;15067390725587779599_0,local:1,pid:9284429138362173623,prmr:2,rsk:PC_3375826184378489259,cs:1&sa=X&ved=0ahUKEwigpfyUp6n9AhVtFFkFHdKeCLIQqSQIgAE";
    browser = await puppeteer.launch({
        headless: true,
        args: ["--disabled-setuid-sandbox", "--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36 Agency/97.8.6287.88",
    });
    await page.goto(url, {
        waitUntil: "domcontentloaded"
    });
    let books_results = [];
    books_results = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("._-wX")).map((el) => {
            return {
                title: el.getElementById("-3199256946087010458-short")?.textContent,
                writers: el.querySelector("._-wV")?.textContent,
                description: el.querySelector("._-wY")?.textContent,
                // thumbnail: el.querySelector("img").getAttribute("src"),
            }
        })
    });
    console.log(books_results) 
    await browser.close();
};
getBooksData();