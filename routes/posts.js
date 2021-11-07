const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        pengeluaran: {
            nama_barang: 'kaos',
            harga: '100.000'
        }
    });
});

module.exports = router;