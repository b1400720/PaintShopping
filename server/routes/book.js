var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	req.getConnection(function (error, conn) {
		conn.query('SELECT * FROM chi_tiet_khuyen_mai ORDER BY id_chitietkhuyenmai', function (err, rows, fields) {
			//if(err) throw err
			if (err) {
        res.status(500).json(err);
			} else {
				// render to views/user/list.ejs template file
        res.status(200).json(rows);
			}
		})
	})
});

module.exports = router;
