const express = require("express");
const bodyParser = require("body-parser");
const pick = require("object.pick");
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

database.connect();

database.on('error', (err) => {
	console.error(err.toString());
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("hello world"));

app.get('/students', (req, res) => {
	database.query("SELECT * FROM COSC331_Project1.Student_Data", (error, results) => {
		if (error) {
			console.error(error);
			res.status(400).send(error);
		} else
			res.json(results);
	});
});

app.get('/students/:id', (req, res) => {
	database.query(`SELECT * FROM COSC331_Project1.Student_Data WHERE id = ?`, [req.params.id], (error, results) => {
		if (error) {
			console.error(error);
			res.status(400).send(error);
		} else
			res.json(results);
	});
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

	database.query(
		"INSERT INTO COSC331_Project1.Student_Data SET ?",
		pick(req.body, ["id", "firstName", "lastName", "year", "age", "major", "gpa"]),
		(error, results) => {
			if (error) {
				console.error(error.toString());
				res.status(400).send(error);
			} else
				res.json(results);
		});

});

app.put('/students', [
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

	database.query(
		"UPDATE COSC331_Project1.Student_Data SET ? WHERE id = ?",
		[pick(req.body, ["firstName", "lastName", "year", "age", "major", "gpa"]), req.body.id],
		(error, results) => {
			if (error) {
				console.error(error.toString());
				res.status(400).send(error);
			} else
				res.json(results);
		});
});

app.patch('/students', [
	body("id").not().isEmpty().isInt().isLength(7),
	body("firstName").optional().isAlphanumeric(),
	body("lastName").optional().isAlphanumeric(),
	body("year").optional().isInt().isLength(4),
	body("age").optional().isInt(),
	body("major").optional().isAlphanumeric(),
	body("gpa").optional().isFloat()
], (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(422).json({ errors: errors.array() });

	database.query(
		"UPDATE COSC331_Project1.Student_Data SET ? WHERE id = ?",
		[pick(req.body, ["firstName", "lastName", "year", "age", "major", "gpa"]), req.body.id],
		(error, results) => {
			if (error) {
				console.error(error.toString());
				res.status(400).send(error);
			} else
				res.json(results);
		});
});

app.delete('/students/:id', (req, res) => {
	database.query(`DELETE FROM COSC331_Project1.Student_Data WHERE id = ?`, [req.params.id], (error, results) => {
		if (error) {
			console.error(error);
			res.status(400).send(error);
		} else
			res.json(results);
	});
});

// start server
app.listen(port, () => console.log(`listening on port ${port}`));
