const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    try {
        // Memanggil fungsi predictClassification untuk melakukan prediksi
        const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        // Data hasil prediksi
        const data = {
            id: id,
            result: label,
            explanation: explanation,
            suggestion: suggestion,
            confidenceScore: confidenceScore,
            createdAt: createdAt
        };

        // Menyimpan data ke Firestore menggunakan storeData
        await storeData(id, data);

        // Mengirimkan respons sukses
        const response = h.response({
            status: 'success',
            message: confidenceScore > 99 
                ? 'Model is predicted successfully.' 
                : 'Model is predicted successfully but under threshold. Please use the correct picture',
            data
        });
        response.code(201);
        return response;

    } catch (error) {
        // Menangani error dan mengirimkan respons gagal
        const response = h.response({
            status: 'fail',
            message: error.message,
        });
        response.code(500);
        return response;
    }
}

module.exports = postPredictHandler;
