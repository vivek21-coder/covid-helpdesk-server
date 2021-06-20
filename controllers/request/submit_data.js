const Data = require("../../Models/Data");

const nodemailer = require('nodemailer');
const getEmail = require("../getEmails");

const submit_data = async (req, res) => {
  const {
    name,
    age,
    aadhaar,
    covid_status,
    email,
    phone,
    city,
    resource,
    available_or_required,
    description,
    descriptioncity
  } = req.body;

  if (!name ||
    !email ||
    !city ||
    !resource ||
    !available_or_required ||
    !description) {
    res.sendStatus(400);
    return;
  }

  const date_time = new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'});

  try {

    const covid_data = new Data({
      name,
      age,
      aadhaar,
      covid_status,
      email,
      phone,
      city,
      resource,
      available_or_required,
      description,
      descriptioncity,
      date_time,
    });

    console.log(covid_data);

    await covid_data.save();

    send_email(city, city, covid_data);

  } catch (e) {
    console.log(e);
    res.sendStatus(500);
    return;
  }


  res.sendStatus(200);
}

const send_email = (city_from, city_to, data) => {

  const from = getEmail(city_from);
  let to;
  if (city_from === city_to) {
    to = from;
  } else {
    to = getEmail(city_to);
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: from.email_id,
      pass: from.password
    }
  });

  const mailOptions = {
    from: from.email_id,
    to: to.email_id,
    replyTo: data.email,
    subject: `${data.resource} ${data.available_or_required} at ${data.city}`,
    text: `${data.resource} ${data.available_or_required} at ${data.city

    }\n\nPatient Name : ${data.name
    }${data.age ? `\nAge : ${data.age
    }` : ``}
    ${data.available_or_required === 'Required' ? `\nCOVID : ${data.covid_status
    }` : ``}\nEmail : ${data.email
    }${data.phone ? `\nPhone : ${data.phone
    }` : ``}\nCity : ${data.city
    }\nResource : ${data.resource
    }\nAvailable/Required : ${data.available_or_required
    }\nDescription : ${data.description
    }\nDescription of City : ${data.descriptioncity
    }\nDate/time : ${data.date_time
    }`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      console.log(`Sending mail to ${from.email_id} failed.`);

      if (city_from !== 'other') {
        send_email('other', city_to, data);
      }

    } else {
      console.log('Email sent : ' +
        from.email_id + ' to ' + to.email_id + ' : ' +
        info.response
      )
      ;
    }
  });
}

module.exports = submit_data;
