var express = require('express');
var router = express.Router();
var statusCode = require('./../../constants/statusCode');

router.get('/get', function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query('SELECT * FROM san_pham_dat_hang ', function (err, rows, fields) {
      //if(err) throw err
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        res.status(statusCode.OK).json(rows);
      }
    })
  })
});
router.get('/get/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const sqlQuery = `SELECT * FROM san_pham_dat_hang
    where id = "${_id}"
    ORDER BY id`;
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
    // kiem tra con hang khong
    // con hang thi cho them
    const id_san_pham = req.body.id_san_pham;
    let sql_product = `SELECT so_luong from sanpham where id_san_pham = "${id_san_pham}" `;
    conn.query(sql_product, function (err, result, fields) {
      if (err) {
        res.status(statusCode.InternalServerError).json(err);
      } else {
        let numberProduct = result[0].so_luong;
        let so_luong = req.body.so_luong;
        let numberProductCanBuy = numberProduct - so_luong; // tong so luong - so luong mua phai loi hon = 0
        if( numberProductCanBuy >=0 ){
          const tax = {
            id_san_pham: id_san_pham,
            id_hoa_don: req.body.id_hoa_don,
            so_luong: so_luong
          };
          const sqlQuery = `INSERT INTO san_pham_dat_hang SET ?`;
          conn.query(sqlQuery, tax, function (err, result) {
            if (err) {
              res.status(statusCode.InternalServerError).json(err);
            } else {
              // them hang thanh cong
              // cap nhat lai so luong trong san pham
              const sqlQueryProduct = `UPDATE sanpham SET so_luong = '${numberProductCanBuy}' WHERE id_san_pham = '${id_san_pham}'`;
              conn.query(sqlQueryProduct, function (errProduct, resultProduct) {
                if (errProduct) {
                  res.status(statusCode.InternalServerError).json(errProduct);
                } else {
                  res.status(statusCode.OK).json("success");
                }
              })
            }
          })
        }else{
          res.status(statusCode.InternalServerError).json("Số lượng không đủ");
        }
      }
    })
  })
});

router.delete('/:id', function (req, res, next) {
  req.getConnection(function (error, conn) {
    const _id = req.params.id;
    const sqlQuery = `DELETE FROM san_pham_dat_hang WHERE id = '${_id}'`;
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
