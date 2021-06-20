const email_ids = require('../static/email_ids.json');

const search = (arr, city) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].toLowerCase() === city) {
      return true;
    }
  }
  return false;
}

const getEmail = (city) => {

  city = city.toLowerCase();

  for (let i = 0; i < email_ids.length; i++) {
    const ele = email_ids[i];
    if (search(ele.cities, city)) {
      return {
        email_id: ele.email,
        password: ele.password,
      };
    }
  }

  return getEmail('other');
}

module.exports = getEmail;
