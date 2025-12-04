import * as fs from "fs";
const FILENAME = "./04/data.txt";
let paperStorageArray = [];
function convertRowStringToDataArray(str) {
    const retArr = [];
    if (str.length > 0) {
        const strArr = str.split("");
        strArr.forEach((character) => {
            character === "." ? retArr.push(0) : retArr.push(1);
        });
    }
    return retArr;
}
function getCoordinates(x, y) {
    const retArr = [
        [
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
        ],
        [
            [x - 1, y],
            [x, y],
            [x + 1, y],
        ],
        [
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1],
        ],
    ];
    return retArr;
}
function checkCoordinate(x, y) {
    let retVal = 0;
    if (paperStorageArray[y] && paperStorageArray[y][x] !== undefined) {
        retVal = paperStorageArray[y][x];
    }
    return retVal;
}
function checkPosition(x, y) {
    let total = -1;
    const coordinatesToCheck = getCoordinates(x, y);
    coordinatesToCheck.forEach((row) => {
        row.forEach((coordinate) => {
            if (coordinate[0] != undefined && coordinate[1] != undefined) {
                total += checkCoordinate(coordinate[0], coordinate[1]);
            }
        });
    });
    // console.log("total", total)
    return total;
}
function main() {
    // console.log("running")
    let goodCount = 0;
    const fileContents = fs.readFileSync(FILENAME, "utf8");
    if (fileContents.length > 0) {
        const paperStorage = fileContents.split(/\r?\n/);
        // console.log("paperStorage: ", paperStorage)
        paperStorageArray = paperStorage.map((row) => convertRowStringToDataArray(row));
        for (let i = 0; i < paperStorageArray.length; i++) {
            for (let j = 0; j < (paperStorageArray[i] || []).length; j++)
                if (paperStorageArray[i]?.[j] !== undefined) {
                    if (paperStorageArray[i]?.[j] === 1) {
                        if (checkPosition(j, i) < 4)
                            goodCount++;
                    }
                }
        }
    }
    console.log("goodCount: ", goodCount);
}
main();
// console.log("checkPosition(0,2): ", checkPosition(2,0));
//# sourceMappingURL=index.js.map