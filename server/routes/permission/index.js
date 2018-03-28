var express = require('express');
var router = express.Router();
var statusCode = require('./../../constants/statusCode');

/** Tìm kiếm theo giá trị */
router.get('/get/:username', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const username = req.params.username;
    const sqlQuery = `SELECT * FROM phan_quyen
                    where username = "${username}" `;
    conn.query(sqlQuery, function (err, rows, fields) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(rows);
      }
    })
  })
});

router.post('/post', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const data = {
      username: req.body.username,
      admin_cap_cao: req.body.admin_cap_cao || 0,
      quan_tri_vien: req.body.quan_tri_vien || 0,
      nhan_vien: req.body.nhan_vien || 0,
      nguoi_dung: req.body.nguoi_dung || 0,
    };
    const sqlQuery = `INSERT INTO phan_quyen SET ?`;
    conn.query(sqlQuery, data, function (err, result) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(data);
      }
    })
  })
});

router.put('/update/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const data = {
      admin_cap_cao: req.body.admin_cap_cao || 0,
      quan_tri_vien: req.body.quan_tri_vien || 0,
      nhan_vien: req.body.nhan_vien || 0,
      nguoi_dung: req.body.nguoi_dung || 0,
    };
    const sqlQuery = `UPDATE phan_quyen SET ? WHERE id_quyen = '${_id}'`;
    conn.query(sqlQuery, data, function (err, result) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(data);
      }
    })
  })
});

router.delete('/delete/:username', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const username = req.params.username;
    const sqlQuery = `DELETE FROM phan_quyen WHERE username = '${username}'`;
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
