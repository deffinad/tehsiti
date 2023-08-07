const { db } = require("../config/firebase");

class ModelRuasJalan {
    async getDataRuasJalan(type) {
        var allData = [];

        const ref = db.collection('ruas-jalan');
        const snapshot = await ref.get();

        snapshot.forEach((hasil) => {
            if (type === 'all') {
                allData.push(hasil.data());
            } else {
                if (hasil.data().type === type) {
                    allData.push(hasil.data());
                }
            }
        });
        return allData;
    }

    async checkIdRuasJalan(id) {
        let doc = ''

        const ref = db.collection('ruas-jalan');
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

    async getDataRuasJalanById(id) {
        var data = {}

        const ref = db.collection('ruas-jalan');
        const snapshot = await ref.get();

        snapshot.forEach((hasil) => {
            if (hasil.data().no_ruas === id) {
                data = hasil.data()
            }
        });
        return data;
    }

    async postDataRuasJalan(req) {
        const result = db.collection('ruas-jalan').doc().set(req).then(() => {
            return true
        }).catch((error) => {
            return false
        })

        return result
    }

}

module.exports = ModelRuasJalan;