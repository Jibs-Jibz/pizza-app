const path = require("path")
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")

// initailize nodemailer transport
export const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
})

const templatesDir = path.resolve("public/templates")

// setup support work passing data into the html file
// using handlebars, syntax...
const handlebarOptions = {
  viewEngine: {
    extName: ".html",
    partialsDir: templatesDir,
    defaultLayout: false,
  },
  viewPath: templatesDir,
  extName: ".html",
}

mailer.use("compile", hbs(handlebarOptions))

/**
 *
 * @param {string} email - the recipients email
 * @param {string} link - the verification url
 * @returns {Promise}
 */
export const sendVerificationMail = async (email, link) => {
  try {
    const result = await mailer.sendMail({
      from: "Node app",
      to: email,
      subject: "Verify your mail",
      template: "email_verification",
      context: {
        link, // this is the way we pass some data to the template
      },
    })

    return result
  } catch (e) {
    console.log(e)
    return e
  }
}



export const sendResetPasswordEmail = async ({ email }, link: string) => {
  try {
    const result = await mailer.sendMail({
      from: "John from greenifyafrica",
      to: email,
      subject: "Password Reset",
      template: 'resetpw_mail',
      context: {
        link,
        site_name: 'Greenify Africa',
      }
    });
    return result;
  } catch (e) {
    // console.log(e);
    return e;
  }
};

// module.exports = {
//   mailer,
//   sendVerificationMail,
// }
