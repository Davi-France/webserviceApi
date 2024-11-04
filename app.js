const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/buscarPendentes", async (req, res) => {
    const { indicePagina, limitePagina, CodUsu } = req.body;

    const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.senior.com.br">
            <soapenv:Body>
                <ser:buscarPendentes>
                    <user>Syn_Cons</user>
                    <password>Syn_Cons</password>
                    <encryption>0</encryption>
                    <parameters>
                        <indicePagina>${indicePagina || ""}</indicePagina>
                        <limitePagina>${limitePagina || ""}</limitePagina>
                        <CodUsu>${CodUsu || ""}</CodUsu>
                    </parameters>
                </ser:buscarPendentes>
            </soapenv:Body>
        </soapenv:Envelope>
    `;

    try {
        const response = await axios.post(
            "http://producao.synergie.com.br:59484/g5-senior-services/sapiens_Synccom_senior_g5_co_mcm_est_ordemcompra?wsdl",
            soapEnvelope,
            {
                headers: {
                    "Content-Type": "text/xml",
                },
            }
        );

        res.status(200).send(response.data);
    } catch (error) {
        console.error("Erro ao fazer a requisição SOAP:", error);
        res.status(500).send("Erro na requisição ao web service SOAP.");
    }
});

module.exports = app;
