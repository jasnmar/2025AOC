import * as fs from "fs";
const FILENAME = "./09/data.txt";
function convertToCoordinates(arr) {
    let retArr = [];
    const intArr = arr.map((coordinateSet) => {
        const cordArr = coordinateSet.split(",");
        const coords = cordArr.map((cordString) => {
            return parseInt(cordString);
        });
        return [coords[0] || 0, coords[1] || 0];
    });
    retArr = intArr;
    return retArr;
}
// function getMinMax(coordArray: [number, number][]) {
//   const xArr = coordArray.map((coordinate) => coordinate[0])
//   const yArr = coordArray.map((coordinate) => coordinate[1])
//   xArr.sort((a, b) => a - b)
//   yArr.sort((a, b) => a - b)
//   return [[xArr[0], yArr[0]], [xArr[xArr.length - 1], yArr[yArr.length - 1]]]
// }
function createSquares(coordArray) {
    const boxes = coordArray.map((coordinate, index) => {
        const boxArray = [];
        for (let i = index; i < coordArray.length; i++) {
            const cCoord = coordArray[i];
            if (cCoord) {
                const cCoordXVal = coordArray[i] ? cCoord[0] : -1;
                if (coordinate[0] !== cCoordXVal) {
                    const cCoordYVal = coordArray[i] ? cCoord[1] : -1;
                    if (coordinate[1] !== cCoordYVal) {
                        boxArray.push([coordinate, cCoord]);
                    }
                }
            }
        }
        if (boxArray.length > 0) {
            return boxArray;
        }
    });
    return boxes;
}
function computeAreas(boxArray) {
    const retArray = [];
    boxArray.forEach((boxGroup) => {
        // console.log("boxGroup: ", JSON.stringify(boxGroup))
        boxGroup.forEach((boxSet) => {
            // console.log("boxSet: ", JSON.stringify(boxSet))
            const val1 = boxSet[0];
            const val2 = boxSet[1];
            if (val1 !== undefined && val2 !== undefined) {
                let xVal1 = val1[0];
                let xVal2 = val2[0];
                let yVal1 = val1[1];
                let yVal2 = val2[1];
                if (xVal1 < xVal2) {
                    xVal1--;
                }
                else {
                    xVal2--;
                }
                if (yVal1 < yVal2) {
                    yVal1--;
                }
                else {
                    yVal2--;
                }
                const deltaX = Math.abs(xVal1 - xVal2);
                const deltaY = Math.abs(yVal1 - yVal2);
                const area = deltaX * deltaY;
                retArray.push([area, [val1, val2]]);
            }
        });
    });
    return retArray;
}
function main() {
    console.log("running");
    const fileContents = fs.readFileSync(FILENAME, "utf8");
    if (fileContents.length > 0) {
        const data = fileContents.split(/\r?\n/);
        // console.log("data: ", data)
        const coordinateArray = convertToCoordinates(data);
        // console.log("coordinateArray: ", JSON.stringify(coordinateArray))
        // const maxCoords = getMinMax(coordinateArray)
        // console.log("maxCoords: ", JSON.stringify(maxCoords))
        const squareArray = createSquares(coordinateArray);
        const filteredSquareArray = squareArray.filter((value) => value != null);
        // console.log("squareArray: ", JSON.stringify(filteredSquareArray.flat(1)))
        const areasArray = computeAreas(filteredSquareArray);
        // console.log("areasArray: ", JSON.stringify(areasArray))
        areasArray.sort((a, b) => {
            const areaA = a[0];
            const areaB = b[0];
            return areaB - areaA;
        });
        // console.log("areasArray: ", JSON.stringify(areasArray))
        const biggest = areasArray[0];
        console.log("biggest: ", JSON.stringify(biggest));
    }
}
main();
//# sourceMappingURL=index.js.map