const { countryCodeEmoji, emojiCountryCode } = require("country-code-emoji");

const getCountryCode = (text) => {
  try {
    return emojiCountryCode(text);
  } catch (error) {
    return undefined;
  }
};

const codes = ["gb", "rs", "ar", "sd", "cn", "us", "ge"];
const flags = codes.map(countryCodeEmoji);
const [GB, RS, AR, SD, CN, US, GE] = flags;

module.exports = { GB, RS, AR, SD, CN, US, GE, getCountryCode };
