import axios from "axios";

const BASE_URL = "https://tehsiti.vercel.app/tehsiti/v1"

export const getRuasJalan = async (type) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            baseURL: BASE_URL + "/ruas/" + type,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getRuasJalanById = async (id) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            baseURL: BASE_URL + "/ruas-detail/" + id,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};