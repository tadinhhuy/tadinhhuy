const axios = require("axios");
const fs = require("fs");

const HOST_API = "https://quotes.rest/qod?language=en&quot;";

const getQuote = async () => {
  try {
    const { data } = await axios.get(HOST_API);
    const quote = data.contents.quotes[0].quote;
    const author = data.contents.quotes[0].author;

    return {
      quote,
      author,
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const generate = async () => {
  const { quote, author } = await getQuote();

  if (!quote) return;

  fs.writeFileSync("README.md", `_**${quote}**_\n\n${author}`);
};

generate();
