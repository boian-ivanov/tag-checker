'use strict'

const axios = require('axios')
const cheerio = require('cheerio')

exports.handler = async (event, context) => {
  const tag = event.queryStringParameters.tag

  if (!tag) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "You need to specify a 'tag' parameter." })
    };
  }

  let URL = `http://best-hashtags.com/hashtag/${tag}/`;

  let response = await axios.get(URL)

  const $ = cheerio.load(response.data);
  const selection = '.tag-box.tag-box-v3 > p1'

  const element = $(selection).get([0]);
  const tags = element ? element.children[0].data.trim() : '';

  return {
    statusCode: 200,
    body: JSON.stringify({ tags: tags})
  };
}