const axios = require("axios");

const getTodayHoliday = async (country, api, url) => {
  try {
    const now = new Date();
    const { data } = await axios.get(url, {
      params: {
        api_key: api,
        country,
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      },
    });
    return (
      data.map(({ name }) => name).join("\n") || `has no holiday today.`
    );
  } catch (error) {
    console.error(error);
    return "something went wrong";
  }
};

module.exports = getTodayHoliday;
