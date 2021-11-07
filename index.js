const express = require('express');
const app = express();
const PORT = 8080;

//middleware :helping the rest client to see the API
app.use(express.json())

// //make a call to the API
// app.get('/api', (req, res) => {
//     const apiKey = req.query.apiKey;

//     // TODO validate api
//     res.send({ data: "belajar masbro"});
// });

app.get('/pengeluaran', (req, res) => {
    res.status(200).send({
        nama: 'baju',
        harga: '200.000'
    })
});

app.post('/pengeluaran/:id', (req, res) => {
    const { id } = req.params;
    const { item } = req.body;

    if (!item) {
        res.status(418).send({ massage: 'Tolong isi Itemnya'})
    };

    res.send({
        pengeluaran: `Pengeluaranmu untuk ${item} berada di ID : ${id}`,
    })

});

app.listen(
    PORT,
    () => console.log('alive on http://localhost:',PORT)
);