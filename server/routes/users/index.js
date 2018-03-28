var express = require('express');
var router = express.Router();
var statusCode = require('./../../constants/statusCode');

/* GET home page. */
router.get('/', function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query('SELECT * FROM tai_khoan ORDER BY username', function (err, rows, fields) {
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
    const sqlQuery = `SELECT * FROM tai_khoan
                    where id_taikhoan = "${_id}"
                    ORDER BY username`;
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
router.get('/username/:value', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _value = req.params.value;
    const sqlQuery = `SELECT * FROM tai_khoan
                    where username LIKE ${conn.escape('%' + _value + '%')}
                    ORDER BY username`;
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
router.post('/user', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const user = {
      id_taikhoan: req.body.id_taikhoan,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      sdt: req.body.sdt,
    };
    const sqlQuery = `INSERT INTO khuyen_mai SET ?`;
    conn.query(sqlQuery, user, function (err, result) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(user);
      }
    })
  })
});

/** Cập nhật lại 1 gói khuyến mãi */
router.put('/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    let sqlQuery = `SELECT * FROM tai_khoan
                      where id_taikhoan = "${_id}"`;
    conn.query(sqlQuery, function (err, result) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        console.log(result);
        if (result.length > 0) {
          const user = {
            password: req.body.password || result[0].password,
            email: req.body.email || result[0].email,
            sdt: req.body.sdt || result[0].sdt,
            is_active: req.body.is_active || result[0].is_active
          };
          sqlQuery = `UPDATE tai_khoan SET ? WHERE id_taikhoan = '${_id}'`;
          conn.query(sqlQuery, user, function (err, result) {
            if (err) {
              res.status(statusCode.InternalServerError).json(err);
            } else {
              res.status(statusCode.OK).json({
                affectedRows: result.affectedRows,
                done: true
              });
            }
          })
        } else {
          res.status(statusCode.OK).json({
            affectedRows: 0,
            done: true
          });
        }
      }
    })
  })
});

/** Xóa đi 1 gói khuyến mãi */
router.delete('/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const sqlQuery = `DELETE FROM tai_khoan WHERE id_taikhoan = '${_id}'`;
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