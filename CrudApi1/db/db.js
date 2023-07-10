const fs = require("fs");

const PATH = "db/users.json";

let data = fs.readFileSync(PATH, { encoding: "utf-8", flag: fs.constants.O_CREAT });

if (data.length > 0) data = JSON.parse(data);
else data = [];

const createData = (obj) => {
    return new Promise((resolve, reject) => {
        data.push(obj);
        fs.writeFile(PATH, JSON.stringify(data), (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    })
}

const readData = () => {
    return new Promise((resolve, reject) => {
        (data.length > 0) ? resolve(data) : reject([]);
    })
}

const updateData = (id, obj) => {
    return new Promise((resolve, reject) => {
        if (id >= 0 && id < data.length) {
            obj.id = id;
            data[data.indexOf(data.find(obj => obj.id === id))] = obj;
            console.log(index);

            fs.writeFile(PATH, JSON.stringify(data), (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        }
        else reject("Index is incorrect!");
    })
}

const deleteData = (id) => {
    return new Promise((resolve, reject) => {
        if (id >= 0 && id < data.length) {
            data.splice(data.indexOf(data.find(obj => obj.id === id)));
            fs.writeFile(PATH, JSON.stringify(data), (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        }
        else reject("Index is incorrect!");
    })
}

const GetIndex = () => {
    return (data.length > 0) ? Math.max(...data.map(user => user.id)) : 0;
}


module.exports = { createData, readData, updateData, deleteData, GetIndex }