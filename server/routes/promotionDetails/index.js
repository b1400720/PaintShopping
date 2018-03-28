var express = require('express');
var router = express.Router();
var statusCode = require('./../../constants/statusCode');

/* GET home page. */
router.get('/', function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query('SELECT * FROM chi_tiet_khuyen_mai ORDER BY id_chitietkhuyenmai', function (err, rows, fields) {
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
    const sqlQuery = `SELECT * FROM chi_tiet_khuyen_mai
                    where id_chitietkhuyenmai = "${_id}"
                    ORDER BY id_chitietkhuyenmai`;
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
    const sqlQuery = `SELECT * FROM chi_tiet_khuyen_mai
                    where tenkhuyenmai LIKE ${conn.escape('%' + _value + '%')}
                    ORDER BY id_chitietkhuyenmai`;
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
    const promotionDetails = {
      id_chitietkhuyenmai: req.body.id_chitietkhuyenmai,
      tenkhuyenmai: req.body.tenkhuyenmai,
      ngay_batdau: req.body.ngay_batdau,
      ngay_ketthuc: req.body.ngay_ketthuc,
      hinhthuc: req.body.hinhthuc,
    };
    const sqlQuery = `INSERT INTO chi_tiet_khuyen_mai SET ?`;
    conn.query(sqlQuery, promotionDetails, function (err, result) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(promotionDetails);
      }
    })
  })
});

/** Cập nhật lại 1 gói khuyến mãi */
router.put('/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const promotionDetails = {
      tenkhuyenmai: req.body.tenkhuyenmai,
      ngay_batdau: req.body.ngay_batdau,
      ngay_ketthuc: req.body.ngay_ketthuc,
      hinhthuc: req.body.hinhthuc,
    };
    const sqlQuery = `UPDATE \`chi_tiet_khuyen_mai\` SET ? WHERE id_chitietkhuyenmai = '${_id}'`;
    conn.query(sqlQuery, promotionDetails, function (err, result) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(promotionDetails);
      }
    })
  })
});

/** Xóa đi 1 gói khuyến mãi */
router.delete('/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const sqlQuery = `DELETE FROM \`chi_tiet_khuyen_mai\` WHERE id_chitietkhuyenmai = '${_id}'`;
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
