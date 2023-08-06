const { db } = require("../config/firebase");

class ModelRuasJalan {
    async getDataRuasJalan(type) {
        var allData = [];

        const ref = db.collection(type);
        const snapshot = await ref.get();

        snapshot.forEach((hasil) => {
            allData.push(hasil.data());
        });
        return allData;
    }

    async checkIdRuasJalan(id, type) {
        let doc = ''

        const ref = db.collection(type);
        const snapshot = await ref.get();

        snapshot.forEach((hasil) => {
            if (hasil.data().no_ruas === id) {
                doc = hasil.id
            }
        });

        const refCheck = ref.doc(doc)
        if (!refCheck) {
            return false
        } else {
            const snapsShotCheck = await refCheck.get()
            if (!snapsShotCheck.exists) {
                return false;
            } else {
                return true;
            }
        }
    }

    async getDataRuasJalanById(id, type) {
        var data = {}

        const ref = db.collection(type);
        const snapshot = await ref.get();

        snapshot.forEach((hasil) => {
            if (hasil.data().no_ruas === id) {
                data = hasil.data()
            }
        });
        return data;
    }

    async postDataRuasJalan(req, type) {
        const result = db.collection(type).doc().set(req).then(() => {
            return true
        }).catch((error) => {
            return false
        })

        return result
    }

}

module.exports = ModelRuasJalan;