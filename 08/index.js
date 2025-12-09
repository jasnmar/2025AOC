import * as fs from "fs";
const FILENAME = "./08/data.txt";
const CONNECTIONS = 10000;
function convertToCoordinates(arr) {
    let retArr = [];
    const intArr = arr.map((coordinateSet) => {
        const cordArr = coordinateSet.split(",");
        const coords = cordArr.map((cordString) => {
            return parseInt(cordString);
        });
        return [coords[0] || 0, coords[1] || 0, coords[2] || 0];
    });
    retArr = intArr;
    return retArr;
}
function computeDistanceBetweenCoordinates(coords1, coords2) {
    const deltaX = coords1[0] - coords2[0];
    const deltaY = coords1[1] - coords2[1];
    const deltaZ = coords1[2] - coords2[2];
    return Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);
}
function removeDuplicates(arr) {
    const retArr = [...new Set(arr)];
    retArr.sort((a, b) => a - b);
    return retArr;
}
function makeCoordinateMap(coordinateArray) {
    const distanceArray = [];
    for (let i = 0; i < coordinateArray.length; i++) {
        for (let j = i + 1; j < coordinateArray.length; j++) {
            const coord1 = coordinateArray[i];
            const coord2 = coordinateArray[j];
            if (coord1 && coord2) {
                const distance = computeDistanceBetweenCoordinates(coord1, coord2);
                distanceArray.push([distance, i, j]);
            }
        }
    }
    return distanceArray;
}
function checkForBox(nextBox1, circuitMap) {
    let foundIndex = -1;
    foundIndex = circuitMap.findIndex((circuitArray) => {
        const result = circuitArray.findIndex((box) => box === nextBox1);
        return result === -1 ? false : true;
    });
    return foundIndex;
}
function mergeCircuits(circuitIndex1, circuitIndex2, circuitMap) {
    const firstCircuit = circuitMap[circuitIndex1];
    const secondCircuit = circuitMap[circuitIndex2];
    if (firstCircuit && secondCircuit) {
        const combinedCircuit = removeDuplicates([
            ...firstCircuit,
            ...secondCircuit,
        ]);
        circuitMap[circuitIndex1] = combinedCircuit;
        circuitMap.splice(circuitIndex2, 1);
    }
    if (circuitMap.length === 1) {
        console.log("circuitMap 000000: ", circuitMap);
    }
    return circuitMap;
}
function connectCircuits(arr, coordinateCount, coordinates) {
    if (arr.length === 0) {
        return [];
    }
    const circuitMap = [];
    if (arr[0] !== undefined) {
        const firstElem = arr[0][1];
        const secondElem = arr[0][2];
        circuitMap.push([firstElem, secondElem]);
        for (let i = 1; i < CONNECTIONS; i++) {
            const currentArrElement = arr[i];
            if (currentArrElement) {
                const val1 = currentArrElement[1];
                const val2 = currentArrElement[2];
                const existingCircuitIndex1 = checkForBox(val1, circuitMap);
                const existingCircuitIndex2 = checkForBox(val2, circuitMap);
                if (existingCircuitIndex1 === -1 && existingCircuitIndex2 === -1) {
                    circuitMap.push([val1, val2]);
                }
                else if (existingCircuitIndex1 > -1 &&
                    existingCircuitIndex2 > -1 &&
                    existingCircuitIndex1 !== existingCircuitIndex2) {
                    mergeCircuits(existingCircuitIndex1, existingCircuitIndex2, circuitMap);
                }
                else {
                    const circuitIndex = existingCircuitIndex1 > existingCircuitIndex2
                        ? existingCircuitIndex1
                        : existingCircuitIndex2;
                    const existingValue = circuitMap[circuitIndex];
                    if (existingValue) {
                        existingValue.push(val1);
                        existingValue.push(val2);
                        circuitMap[circuitIndex] = removeDuplicates(existingValue);
                    }
                }
                console.log("circuitMap[0]?.length: ", circuitMap[0]?.length);
                if (circuitMap[0]?.length === coordinateCount) {
                    console.log("val1,val2: ", val1, val2);
                    i = CONNECTIONS;
                    console.log("box2", arr[val2]);
                    const boxLoc1 = coordinates[val1] ? coordinates[val1] : -1;
                    const boxLoc2 = coordinates[val2] ? coordinates[val2] : -1;
                    console.log("coordinates[b1], coordinates[b2]", coordinates[val1], coordinates[val2]);
                    const distance = boxLoc1[0] *
                        boxLoc2[0];
                    console.log("distance: ", distance);
                }
                console.log("circutMap: ", JSON.stringify(circuitMap));
            }
        }
    }
    return circuitMap;
}
function main() {
    const fileContents = fs.readFileSync(FILENAME, "utf8");
    if (fileContents.length > 0) {
        const data = fileContents.split(/\r?\n/);
        const coordinates = convertToCoordinates(data);
        const coordCount = coordinates.length;
        console.log("coordinates: ", JSON.stringify(coordinates));
        const distances = makeCoordinateMap(coordinates);
        distances.sort((a, b) => {
            const val1 = a[0];
            const val2 = b[0];
            return val1 - val2;
        });
        console.log("distances: ", JSON.stringify(distances));
        const circuitsMap = connectCircuits(distances, coordCount, coordinates);
        console.log("circuitsMap: ", JSON.stringify(circuitsMap));
        const circuitCounts = circuitsMap.map((circuit) => {
            return circuit.length;
        });
        circuitCounts.sort((a, b) => b - a);
        const best3 = circuitCounts.slice(0, 3);
        console.log("best3: ", best3);
        const total = best3.reduce((acc, num) => {
            return acc * num;
        }, 1);
        console.log("total: ", total);
    }
}
main();
//# sourceMappingURL=index.js.map