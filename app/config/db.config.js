module.exports = {
  HOST: "ep-flat-rain-avsu61lg-pooler.c-11.us-east-1.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_tCQWML5ZYjT3",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};