/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'scontent-lga3-2.xx.fbcdn.net',
      's.gravatar.com',
    ],
  },
  env: {
    AUTH0_BASE_URL: 'http://localhost:3000',
    AUTH0_DOMAIN: 'dev-0hcjgj7v.us.auth0.com',
    AUTH0_ISSUER_BASE_URL: 'https://dev-0hcjgj7v.us.auth0.com',
    AUTH0_CLIENT_ID: '7mhERQ9aMzIZi8lXvvq6bd7o1s0KzAAJ',
    AUTH0_CLIENT_SECRET:
      'QsVl-rYhWvIETNNI8yDuMCYgMYffWvEsMyNZhG7Inq3j27bLcu7ZEo5HIbrtH9SD',
    AUTH0_SECRET:
      'f5069d85d047da8a0fc460321be771927e6741a07d7970114639811053570648',

    CONNECTION_URI:
      'mongodb+srv://danico:jehovah077@cluster0.jxrgu.mongodb.net/house-shope?retryWrites=true&w=majority',
    NEXTAUTH_URL: 'http://localhost:3000',
    TEST: 123,
    PORT: 5000,
    JWT_SECRET: 'danico_secret_of_a_secure_jwt_token_key',
    JWT_EXPIRES_IN: '90d',
    JWT_COOKIE_EXPIRES_IN: 90,

    // MAILTRAP_HOST: 'smtp.mailtrap.io',
    // MAILTRAP_PORT: 2525,
    // MAILTRAP_USER: 'af2c8aef627d10',
    // MAILTRAP_PASS: '014394cbd70971',

    // SENDGRID_USERNAME: 'apikey',
    // SENDGRID_PASSWORD:
    //   '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',
    // SENDGRID_EMAIL_FROM: 'contehdaniel1995@gmail.com',
    // SENDGRID_HOST: 'smtp.sendgrid.net',
    // SENDGRID_PORT: 587,

    GOOGLE_CLIENT_ID:
      '588072545137-3lgmqsa10s4srpf4fdfuf4s5opm2b6sp.apps.googleusercontent.com',
    GOOGLE_SECRET_KEY: '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',

    FACEBOOK_CLIENT_ID: 2872764519680484,
    FACEBOOK_CLIENT_SECRET_KEY: 'adbdc4f54cd483b36b372e0d50c4567b',

    NEXT_PUBLIC_RESULT_PER_PAGE: 9,

    NEXTAUTH_SECRET_KEY:
      '756115623621-rkf35st1pbts55u4m790oiogl2k30ta9a4FwIS2S5utly38g0zj-9HULYmxW0IeCaqTw4bUrDO8johhnytestingGHASHGFGHZXFGHFGHFZGHFT5676VNANBN',

    JWT_SECRET:
      '756115623621-rkf35st1pbts55u4m790oiogl2k30ta9a4FwIS2S5utly38g0zj-9HULYmxW0IeCaqTw4bUrDO8johhnytestingGHASHGFGHZXFGHFGHFERTFGHJNKM,asdfghbjnkml--809',

    CLOUDINARY_NAME: 'dbmrdwsfb',
    CLOUDINARY_API_KEY: 857545946179366,
    CLOUDINARY_API_SECRET: 'xqg9bflE9TuBBxEwlGbAekJtycI',

    NEXT_PUBLIC_STRIP_PUBLIC_KEY:
      'pk_test_51JhEKrHiBu88YUh3vkNIFcvCyQi3gl6eMcECKjvvc2ZGjN7PKKd7igpN5TUs6GYBoxvXebkFU3GTeJcBziSbuYAY00w1AixrNx',

    STRIP_SERVER_SIDE_KEY:
      'sk_test_51JhEKrHiBu88YUh3DM4dwuoC0QhsSNL4e6bcecfgLedmyMmGpGhtqczbkA9IOfRVd6wkb4SqajA8Uf7Vs3f58UNi00a1Sq3RRT',
  },
};

