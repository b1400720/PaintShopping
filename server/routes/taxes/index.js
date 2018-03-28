var express = require('express');
var router = express.Router();
var statusCode = require('./../../constants/statusCode');

/* GET home page. */
router.get('/', function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query('SELECT * FROM thue ORDER BY id_thue', function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(rows);
      }
    })
  })
});
/** Get item theo mã số id */
router.get('/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const sqlQuery = `SELECT * FROM thue
                    where id_thue = "${_id}"
                    ORDER BY id_thue`;
    conn.query(sqlQuery, function (err, rows, fields) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(rows);
      }
    })
  })
});
/** Tìm kiếm theo giá trị */
router.get('/search/:value', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _value = req.params.value;
    const sqlQuery = `SELECT * FROM thue
                    where ten_thue LIKE ${conn.escape('%' + _value + '%')}
                    ORDER BY id_thue`;
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
router.post('/', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const tax = {
      id_thue: req.body.id_thue,
      ten_thue: req.body.ten_thue,
      gia_thue: req.body.gia_thue,
      don_vi: req.body.don_vi,
      is_active: req.body.is_active || 1
    };
    const sqlQuery = `INSERT INTO thue SET ?`;
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
router.put('/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const tax = {
      ten_thue: req.body.ten_thue,
      gia_thue: req.body.gia_thue,
      don_vi: req.body.don_vi,
      is_active: req.body.is_active || 1
    };
    const sqlQuery = `UPDATE thue SET ? WHERE id_thue = '${_id}'`;
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
    const sqlQuery = `DELETE FROM thue WHERE id_thue = '${_id}'`;
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
