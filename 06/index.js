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
            if (typeof operator === 'string') {
                if (operator === "+") {
                    result.push(list.reduce((acc, num) => acc + (typeof num === 'string' ? parseInt(num) : num), 0));
                }
                else if (operator === "*") {
                    result.push(list.reduce((acc, num) => {
                        return acc * (typeof num === 'string' ? parseInt(num) : num);
                    }, 1));
                }
            }
        });
    }
    return result;
}
function main() {
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
main();
//# sourceMappingURL=index.js.map