
const express = require('express');
const app = express();

let dbparams = {
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'juhu',
	port: 3306
}

const mysql = require("mysql2");

const con = mysql.createConnection(dbparams);

app.use(express.static("abc"));



app.get("/getAllBooks", (req, resp) => {
	con.query('select * from Book', [], (error, rows) => {
		resp.send(rows);
	});
});

app.get("/getBook", (req, resp) => {

	let input = req.query.x;
	console.log(input);
	let output = { bookfoundstatus: false, books: { bookId: 0, bookname: "Giveaway", price: 0 } };

	con.query('select * from Book where bookId=?', [input], (error, rows) => {
		if (rows.length > 0) {
			output.bookfoundstatus = true;
			output.books = rows[0];

		}
		else if (rows.length<0){
			
			app.get("/addBook", (req, resp) => {
				let input = { bookId: req.query.x, bookname: req.query.y, price: req.query.z };
				console.log(input);
		
				let output = true;
		
		
				con.query('insert into Book(bookId,bookname,price) values (?,?,?)',
					[input.bookId, input.bookname, input.price], (error, whathappenedtoinsert) => {
		
						if (error) {
						
						}
						else if (whathappenedtoinsert.affectedRows>0){
							output = true;
						}
						resp.send(output);
		
					});
		
			});

		}
		resp.send(output);


	});

});



	app.get("/addBook", (req, resp) => {
		let input = { bookId: req.query.x, bookname: req.query.y, price: req.query.z };
		console.log(input);

		let output = true;


		con.query('insert into Book(bookId,bookname,price) values (?,?,?)',
			[input.bookId, input.bookname, input.price], (error, whathappenedtoinsert) => {

				if (error) {
				
				}
				else if (whathappenedtoinsert.affectedRows>0){
					output = true;
				}
				resp.send(output);

			});

	});



app.listen(8081, function () {
	console.log("server listening at port 8081...");
});