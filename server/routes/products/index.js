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
  con.query("SELECT * FROM sanpham", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
	});
});
router.get('/get/:id',function(req,res,next){
	let id = req.params.id;
	con.query("SELECT * FROM sanpham where id_san_pham="+id+" ", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
	});
});
router.get("/search/:value",function(req,res,next){
	let value = req.params.value;
	con.query("SELECT * FROM sanpham WHERE ten_san_pham LIKE " + con.escape('%'+value+'%'), function (err, result, fields) {
    if (err) throw err;
    res.json(result);
	});
});
/*** POST A  DATA OF PRODUCTS ***/
router.post("/post",function(req,res,next){
	let ten_san_pham = req.body.ten_san_pham;
	let id_loai_san_pham = req.body.id_loai_san_pham;
	let gia_tien = req.body.gia_tien;
	let mo_ta = req.body.mo_ta;
	let trang_thai = req.body.trang_thai;
	let so_luong = req.body.so_luong;
	var sql = "INSERT INTO sanpham (ten_san_pham, id_loai_san_pham,gia_tien,mo_ta,trang_thai,so_luong) VALUES ('"+ten_san_pham+"', "+id_loai_san_pham+","+gia_tien+",'"+mo_ta+"',"+trang_thai+","+so_luong+")";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	res.json(result)
  	});
});/*** UPDATE A  DATA OF PRODUCTS ***/
router.put("/update",function(req,res,next){
	let id_san_pham= req.body.id_san_pham;
	let ten_san_pham = req.body.ten_san_pham;
	let id_loai_san_pham = req.body.id_loai_san_pham;
	let gia_tien = req.body.gia_tien;
	let mo_ta = req.body.mo_ta;
	let trang_thai = req.body.trang_thai;
	let so_luong = req.body.so_luong;
	var sql = "UPDATE sanpham SET ten_san_pham = '"+ten_san_pham+"',id_loai_san_pham = "+id_loai_san_pham+",gia_tien="+gia_tien+",mo_ta='"+mo_ta+"', trang_thai="+trang_thai+",so_luong="+so_luong+" WHERE id_san_pham = "+id_san_pham+" ";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	res.json(result)
  	});
});
// DELETE PRODUCT
router.delete("/delete/:id",function(req,res,next){
	let id_san_pham = req.params.id;
	var sql = "DELETE FROM sanpham WHERE id_san_pham = "+id_san_pham+" ";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	console.log("Number of records deleted: " + result.affectedRows);
  	});
});
module.exports = router;
