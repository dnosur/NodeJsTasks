const process = require("process");
const fs = require("fs");

const FILE_PATH = "data.txt";

const writeFile = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(FILE_PATH, data, (err) => {
            if (err) {
                console.log("File Write error!\n" + err);
                reject(false);
            }
            else {
                resolve(true);
            }
        })
    });
};

const readFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(FILE_PATH, { encoding: "utf-8", flag: fs.constants.F_OK }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}

const writeData = () => {
    stdin.resume();
    stdin.setEncoding("utf-8");

    return new Promise((resolve, reject) => {
        stdin.on("data", (keydata) => {
            resolve(keydata);
        })

        stdin.on("end", () => {
            reject("");
        })
    })
}

const main = async () => {
    while (true) {
        let data = await writeData();
        console.clear();

        if (data.length > 2) {
            writeFile(data)
                .then(data => {
                    if (data) return readFile();
                })
                .then(data => {
                    console.log(`Writted file: ${data}`);
                })
        }

        stdin.removeAllListeners();
    }
}

const stdin = process.openStdin();
main();