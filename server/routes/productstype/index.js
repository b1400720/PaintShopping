var express = require("express");
var mysql = require('mysql');
var router = express.Router();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nienluancoso"
});

con.connect(function(err) {
  if (err) throw err;
});
/* GET home page. */
router.get('/gets', function(req, res, next) {
  con.query("SELECT * FROM loai_san_pham", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
	});
});
router.get('/get/:id',function(req,res,next){
	let id = req.params.id;
	con.query("SELECT * FROM loai_san_pham where id_loai="+id+" ", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
	});
});
router.get("/search/:value",function(req,res,next){
	let value = req.params.value;
	con.query("SELECT * FROM loai_san_pham WHERE ten_loai LIKE " + con.escape('%'+value+'%'), function (err, result, fields) {
    if (err) throw err;
    res.json(result);
	});
});
/*** POST A  DATA OF PRODUCTS ***/
router.post("/post",function(req,res,next){
	let ten_loai = req.body.ten_loai;
	var sql = "INSERT INTO loai_san_pham (ten_loai) VALUES ('"+ten_loai+"')";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	res.json(result)
  	});
});/*** UPDATE A  DATA OF PRODUCTS ***/
router.put("/update",function(req,res,next){
	let id_loai= req.body.id_loai;
	let ten_loai = req.body.ten_loai;
	var sql = "UPDATE loai_san_pham SET ten_loai = '"+ten_loai+"' WHERE id_loai = "+id_loai+" ";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	res.json(result)
  	});
});
// DELETE PRODUCT
router.delete("/delete/:id",function(req,res,next){
	let id_loai = req.params.id;
	var sql = "DELETE FROM loai_san_pham WHERE id_loai = "+id_loai+" ";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	console.log("Number of records deleted: " + result.affectedRows);
  	});
});
module.exports = router;
