'user strict'
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const axios = require('axios');
var fs = require('fs');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const _axios = axios.create({ httpsAgent })

app.post('/calculadora', async (req, res) => {
    try {
        parametros = req.body;
        console.log(req.body);
        // const response = await axios.post('http://api1.santacruz.gob.bo:8091/api/DeudaTributaria',
        //     parametros
        // );
        const response = await _axios.post('https://api1.santacruz.gob.bo:9018/api/CalculadoraIdtgbMovil/CalcularDeudaTributaria',
        parametros
        );
        res.send({
            success: true,
            data: response.data
        });
    } catch (error) {
        res.status(500).send({message: 'error al procesar', error: error});
    }
});

app.get('/report',async (req, res) => {

    return axios.request({
        responseType: 'arraybuffer',
        url: 'http://localhost:8090/rest/users/reportpdf',
        method: 'get',
        headers: {
          'Content-Type': 'application/pdf',
        },
      }).then((result) => {
        const outputFilename = './report.pdf';
        //  fs.writeFileSync(outputFilename, result.data);
         // res.setHeader('Content-disposition', 'attachment; filename=reporte.pdf');
         res.setHeader('Content-disposition', 'inline; filename=reporte.pdf');
         res.setHeader('Content-type', 'application/pdf');
         res.send(result.data);
        //  res.download(outputFilename); //descargar
         // return outputFilename;
      });
    // try {
    //      const response = await axios.post('http://api1.santacruz.gob.bo:8091/api/DeudaTributaria',
    //          parametros
    //      );
    //     const response = await _axios({
    //         method:'get',
    //         url:'http://localhost:8090/rest/users/reportpdf',
    //         responseType:'blob'
    //       });
          
    //       res.setHeader('Content-disposition', 'attachment; filename=reporte.pdf');
    //       res.setHeader('Content-type', 'application/pdf');
    //       //res.send(resp);
    //       res.download(response.data);
    // } catch (error) {
    //     res.status(500).send({message: 'error al procesar', error: error});
    // }
});



app.listen(port, () => {
    console.log(`servidor corriendo en puerto ${port}`)
});

