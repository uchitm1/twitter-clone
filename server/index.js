const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/index");
const router = require("./routes/router");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { COOKIE_NAME } = require("./constants");

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.json());
app.use(
	session({
		name: COOKIE_NAME,
		store: MongoStore.create({
			mongoUrl: process.env.CONNECTION_URL,
		}),
		cookie: {
			maxAge: 14 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		},
		secret: "secretKey",
		saveUninitialized: false,
		resave: false,
	})
);

db();

app.use("/api", router);

app.get("/", (_, res) => {
	res.send("<h1>Hello World</h1>");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
