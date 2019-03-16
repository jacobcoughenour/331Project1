const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const mysql = require("mysql");
const app = express();
const database = mysql.createConnection({
	host: "cosc331-project1.ckou5s9ukp1f.us-east-1.rds.amazonaws.com",
	user: "COSC331",
	password: "password"
});
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("hello world"));

app.get('/students', (req, res) => {
	database.connect();

	database.query("SELECT * FROM COSC331_Project1.Student_Data", (error, results) => {
		if (error) {
			res.status(400).send(error);
			return;
		}
		res.send(results);
	})

	database.end();
});

app.get('/students/:id', (req, res) => {
	database.connect();

	database.query(`SELECT * FROM COSC331_Project1.Student_Data WHERE id = ?`, [req.params.id], (error, results) => {
		if (error) {
			res.status(400).send(error);
			return;
		}
		res.send(results);
	})

	database.end();
});

app.post('/students', [
	body("id").not().isEmpty().isInt().isLength(7),
	body("firstName").not().isEmpty().isAlphanumeric(),
	body("lastName").not().isEmpty().isAlphanumeric(),
	body("year").not().isEmpty().isInt().isLength(4),
	body("age").not().isEmpty().isInt(),
	body("major").not().isEmpty().isAlphanumeric(),
	body("gpa").not().isEmpty().isFloat()
], (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(422).json({ errors: errors.array() });

	database.connect();

	database.query("INSERT INTO COSC331_Project1.Student_Data", (error, results) => {
		if (error) {
			res.status(400).send(error);
			return;
		}
		res.send(results);
	})

	database.end();
});

app.put('/students', (req, res) => {
	// database.connect();

	// database.query("SELECT * FROM COSC331_Project1.Student_Data", (error, results) => {
	// 	if (error) {
	// 		res.status(400).send(error);
	// 		return;
	// 	}
	// 	res.send(results);
	// })

	// database.end();
});

app.patch('/students', (req, res) => {
	// database.connect();

	// database.query("SELECT * FROM COSC331_Project1.Student_Data", (error, results) => {
	// 	if (error) {
	// 		res.status(400).send(error);
	// 		return;
	// 	}
	// 	res.send(results);
	// })

	// database.end();
});

app.delete('/students/:id', (req, res) => {
	// database.connect();

	// database.query("SELECT * FROM COSC331_Project1.Student_Data", (error, results) => {
	// 	if (error) {
	// 		res.status(400).send(error);
	// 		return;
	// 	}
	// 	res.send(results);
	// })

	// database.end();
});

// start server
app.listen(port, () => console.log(`listening on port ${port}`));
