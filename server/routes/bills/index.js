var express = require('express');
var router = express.Router();
var statusCode = require('./../../constants/statusCode');

/* GET home page. */
router.get('/get', function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query('SELECT * FROM hoa_don ', function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(rows);
      }
    })
  })
});
/** Get item theo mã số id */
router.get('/get/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const sqlQuery = `SELECT * FROM hoa_don
                    where id_hoa_don = "${_id}"
                    ORDER BY id_hoa_don`;
    conn.query(sqlQuery, function (err, rows, fields) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(rows);
      }
    })
  })
});

/** Tạo 1 gói khuyến mãi */
router.post('/post', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const tax = {
      id_tai_khoan: req.body.id_tai_khoan,
      tong_tien: req.body.tong_tien,
      trang_thai: req.body.trang_thai
    };
    const sqlQuery = `INSERT INTO hoa_don SET ?`;
    conn.query(sqlQuery, tax, function (err, result) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(tax);
      }
    })
  })
});

/** Cập nhật lại 1 gói khuyến mãi */
router.put('/update/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const tax = {
      id_tai_khoan: req.body.id_tai_khoan,
      tong_tien: req.body.tong_tien,
      trang_thai: req.body.trang_thai
    };
    const sqlQuery = `UPDATE hoa_don SET ? WHERE id_hoa_don = '${_id}'`;
    conn.query(sqlQuery, tax, function (err, result) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(tax);
      }
    })
  })
});
/** Xóa đi 1 gói khuyến mãi */
router.delete('/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const sqlQuery = `DELETE FROM hoa_don WHERE id_hoa_don = '${_id}'`;
    conn.query(sqlQuery, function (err, result) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json({
          affectedRows: result.affectedRows,
          done: true
        });
      }
    })
  })
});

module.exports = router;
