import { create } from "domain";
import * as fs from "fs";
const FILENAME = "./05/data.txt";
let freshDB = [];
function createFreshDBFromStrings(str) {
    if (str.length > 1) {
        freshDB = str.map((rangeStringRaw) => {
            const rangeString = rangeStringRaw.split("-");
            if (rangeString[0] !== undefined && rangeString[1] !== undefined) {
                const startNumber = parseInt(rangeString[0]) || 0;
                const endNumber = parseInt(rangeString[1]) || 0;
                if (endNumber < startNumber) {
                    return [endNumber, startNumber];
                }
                else {
                    return [startNumber, endNumber];
                }
            }
            else
                return [0, 0];
        });
    }
    freshDB = freshDB.sort((a, b) => {
        const valA = a[0] !== undefined ? a[0] : 0;
        const valB = b[0] !== undefined ? b[0] : 0;
        return valA - valB;
    });
}
function searchDB(ingredient) {
    let found = 0;
    if (ingredient) {
        if (freshDB.length > 0) {
            if (freshDB[0] !== undefined) {
                if (freshDB[0][0] !== undefined) {
                    if (ingredient < freshDB[0][0]) {
                        return found;
                    }
                }
            }
            const arrLength = freshDB.length - 1;
            if (arrLength) {
                if (freshDB[arrLength] !== undefined) {
                    if (freshDB[arrLength][1] !== undefined) {
                        if (ingredient > freshDB[arrLength][1]) {
                            return found;
                        }
                    }
                }
            }
            let biggerThanStart = freshDB.map((range) => {
                if (range[0] !== undefined) {
                    if (ingredient >= range[0]) {
                        return range;
                    }
                    else {
                        return [0];
                    }
                }
            });
            biggerThanStart = biggerThanStart.filter((range) => range && range[0] !== 0);
            console.log("biggerThanStart: ", biggerThanStart);
            let smallerThanEnd = biggerThanStart.map((range) => {
                if (range && range[1] !== undefined) {
                    if (ingredient <= range[1]) {
                        return range;
                    }
                    else {
                        return [0];
                    }
                }
            });
            smallerThanEnd = smallerThanEnd.filter((range) => range && range[0] != 0);
            console.log("smallerThanEnd: ", smallerThanEnd);
            if (smallerThanEnd.length > 0)
                found = 1;
        }
    }
    return found;
}
function main() {
    console.log("running");
    const fileContents = fs.readFileSync(FILENAME, "utf8");
    if (fileContents.length > 0) {
        const fileData = fileContents.split(/\r?\n/);
        console.log("fileData: ", fileData);
        if (fileData) {
            const blankVal = fileData.findIndex((value) => value === "");
            console.log("blankVal: ", blankVal);
            const freshStringDB = fileData.slice(0, blankVal);
            const ingredients = fileData.slice(blankVal + 1);
            console.log("freshDB: ", freshStringDB);
            console.log("ingredients: ", ingredients);
            createFreshDBFromStrings(freshStringDB);
            console.log("freshDB: ", JSON.stringify(freshDB));
            const resultsArray = ingredients.map((ingredient) => {
                return searchDB(parseInt(ingredient));
            });
            console.log("resultsArray: ", resultsArray);
            const total = resultsArray.reduce((acc, num) => acc + num);
            console.log("total: ", total);
        }
    }
}
main();
//# sourceMappingURL=index.js.map