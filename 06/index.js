import * as fs from "fs";
const FILENAME = "./06/data.txt";
function swapArray(arr) {
    const result = [];
    const itemCount = arr[0]?.length || 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < itemCount; j++) {
            if (arr[i] !== undefined) {
                const row = arr[i] || [];
                if (row[j] !== undefined) {
                    const valAtAddress = !isNaN(parseInt(row[j]))
                        ? parseInt(row[j])
                        : row[j];
                    if (!result[j]) {
                        result[j] = []; // Initialize as an empty array
                    }
                    ;
                    result[j][i] = valAtAddress;
                }
            }
        }
    }
    return result;
}
function getColumnsValues(arr) {
    const result = [];
    const tmpArray = swapArray(arr);
    if (typeof tmpArray !== "number") {
        // Check if tmpArray is not a number
        console.log("tmpArray: ", JSON.stringify(tmpArray));
        tmpArray.forEach((list) => {
            const operator = list.pop();
            console.log("list: ", list);
            if (typeof operator === "string") {
                if (operator === "+") {
                    result.push(list.reduce((acc, num) => acc + (typeof num === "string" ? parseInt(num) : num), 0));
                }
                else if (operator === "*") {
                    result.push(list.reduce((acc, num) => {
                        return acc * (typeof num === "string" ? parseInt(num) : num);
                    }, 1));
                }
            }
        });
    }
    return result;
}
function one() {
    console.log("running");
    const fileContents = fs.readFileSync(FILENAME, "utf8");
    if (fileContents.length > 0) {
        const problemList = fileContents.split(/\r?\n/);
        console.log("problemList: ", problemList);
        if (problemList) {
            const columns = problemList.map((row) => {
                return row.trim().split(/\s+/);
            });
            console.log("columns: ", JSON.stringify(columns));
            const colVals = getColumnsValues(columns);
            console.log("colVals: ", colVals);
            const total = colVals.reduce((acc, num) => acc + num);
            console.log("total: ", total);
        }
    }
}
function parseProblems(arr) {
    // The array is currently in rows, this transposes it to be in columns.
    const nArr = [];
    arr.forEach((row, i) => {
        row.forEach((cell, j) => {
            // Ensure the sub-array for the column exists.
            if (!nArr[j]) {
                nArr[j] = [];
            }
            // Assign the cell to the new transposed position.
            nArr[j][i] = cell;
        });
    });
    return nArr;
}
function separateProblems(arr) {
    const retArr = [];
    arr.forEach((row) => {
        if (row.every((item) => item === " ")) {
            retArr.push([]); // Push an empty array to signify a separator
        }
        else {
            retArr.push(row); // Push the row as is
        }
    });
    return retArr;
}
function parseString(stringToParse) {
    const tmpArr = [];
    stringToParse.forEach((char) => {
        if (char !== " ")
            tmpArr.push(char);
    });
    const fString = tmpArr.join("");
    return parseInt(fString);
}
function finalSolution(arr) {
    const arrayValues = arr.map((problem) => {
        const operator = problem.shift();
        if (operator === "*") {
            return problem.reduce((acc, num) => {
                return acc * (typeof num === "string" ? parseInt(num) : num);
            }, 1);
        }
        else {
            return problem.reduce((acc, num) => {
                return acc + (typeof num === "string" ? parseInt(num) : num);
            }, 0);
        }
    });
    return arrayValues;
}
function boilProblems(arr) {
    const retArr = [];
    let subArr = [];
    const lastEntry = arr[arr.length - 1];
    arr.forEach((element) => {
        const lastChar = element[element.length - 1];
        if (lastChar === "*" || lastChar === "+") {
            subArr.push(lastChar);
            element.pop();
        }
        const strValue = parseString(element);
        if (Number.isNaN(strValue)) {
            retArr.push(subArr);
            subArr = [];
        }
        else if (element === lastEntry) {
            subArr.push(strValue);
            retArr.push(subArr);
        }
        else {
            subArr.push(strValue);
        }
    });
    return retArr;
}
function main() {
    console.log("running");
    const fileContents = fs.readFileSync(FILENAME, "utf8");
    if (fileContents.length > 0) {
        const problemList = fileContents.split(/\r?\n/);
        console.log("problemList: ", problemList);
        const charMap = problemList.map((line) => {
            return line.split("");
        });
        console.log("charMap: ", JSON.stringify(charMap));
        const problems = parseProblems(charMap);
        console.log("problems: ", JSON.stringify(problems));
        const separatedProblems = separateProblems(problems);
        console.log("separatedProblems: ", JSON.stringify(separatedProblems));
        const boiledProblems = boilProblems(separatedProblems);
        console.log("boiledProblems: ", JSON.stringify(boiledProblems));
        const totArr = finalSolution(boiledProblems);
        console.log("totArr: ", JSON.stringify(totArr));
        const total = totArr.reduce((acc, num) => acc + num);
        console.log("total: ", total);
    }
}
main();
//# sourceMappingURL=index.js.map