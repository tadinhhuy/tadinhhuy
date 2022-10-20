const axios = require('axios');
const fs = require('fs');

const generateTemplate = ({ quote, author }) => `
  <div>
    <p>
      _**${quote}**_ - ${author}
    </p>
    <div id="header" align="center">
      <div id="badges">
        <a href="https://www.linkedin.com/in/huytd11" target="_blank">
          <img
            src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white"
            alt="LinkedIn Badge"
          />
        </a>
      </div>
    </div>
    <div align="center">
      <img
        src="https://media.giphy.com/media/dWesBcTLavkZuG35MI/giphy.gif"
        width="600"
        height="300"
      />
    </div>
  </div>
`;

const HOST_API = 'https://quotes.rest/qod?language=en&quot;';

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

  fs.writeFileSync('README.md', generateTemplate({ quote, author }));
};

generate();
