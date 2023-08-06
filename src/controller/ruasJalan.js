const ModelRuasJalan = require("../model/ModelRuasJalan");

const mRuasJalan = new ModelRuasJalan();

const getRuasJalan = async (req, res) => {
    try {
        const result = await mRuasJalan.getDataRuasJalan(req.params.type);
        if (result.length === 0) {
            res.status(404).json({
                status: 404,
                messages: "Data tidak ditemukan",
            });
        } else {
            res.status(200).json({
                status: 200,
                messages: "Data ditemukan",
                data: result,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            messages: "Server tidak memahami sintaks permintaan dari klien",
        });
    }
};

const getRuasJalanById = async (req, res) => {
    try {
        const checkIdDokter = await mRuasJalan.checkIdRuasJalan(req.params.id, req.params.type);
        if (checkIdDokter) {
            const result = await mRuasJalan.getDataRuasJalanById(req.params.id, req.params.type);
            res.status(200).json({
                status: 200,
                messages: "Data ditemukan",
                data: result,
            });
        } else {
            res.status(404).json({
                status: 404,
                messages: "Data tidak ditemukan",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            messages: "Server tidak memahami sintaks permintaan dari klien",
        });
    }
};

module.exports = {
    getRuasJalan,
    getRuasJalanById
};