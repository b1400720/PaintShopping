var express = require('express');
var router = express.Router();
var statusCode = require('./../../constants/statusCode');

/* GET home page. */
router.get('/', function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query('SELECT * FROM khuyen_mai ORDER BY id_khuyenmai', function (err, rows, fields) {
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
    const sqlQuery = `SELECT * FROM khuyen_mai
                    where id_khuyenmai = "${_id}"
                    ORDER BY id_khuyenmai`;
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
router.get('/search/product/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const sqlQuery = `SELECT * FROM khuyen_mai
                    where id_sanpham =  ${_id}
                    ORDER BY id_khuyenmai`;
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
router.get('/search/promotiondetails/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const sqlQuery = `SELECT * FROM khuyen_mai
                    where id_chitietkhuyenmai =  ${_id}
                    ORDER BY id_khuyenmai`;
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
    const promotion = {
      id_khuyenmai: req.body.id_khuyenmai,
      id_sanpham: req.body.id_sanpham,
      id_chitietkhuyenmai: req.body.id_chitietkhuyenmai,
      is_active: req.body.is_active,
    };
    const sqlQuery = `INSERT INTO khuyen_mai SET ?`;
    conn.query(sqlQuery, promotion, function (err, result) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(promotion);
      }
    })
  })
});

/** Cập nhật lại 1 gói khuyến mãi */
router.put('/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const promotion = {
      id_sanpham: req.body.id_sanpham,
      id_chitietkhuyenmai: req.body.id_chitietkhuyenmai,
      is_active: req.body.is_active,
    };
    const sqlQuery = `UPDATE khuyen_mai SET ? WHERE id_khuyenmai = '${_id}'`;
    conn.query(sqlQuery, promotion, function (err, result) {
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

/** Xóa đi 1 gói khuyến mãi */
router.delete('/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const sqlQuery = `DELETE FROM khuyen_mai WHERE id_khuyenmai = '${_id}'`;
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
