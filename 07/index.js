import * as fs from "fs";
const FILENAME = "./07/data.txt";
function getLocations(splitterRow, valueToFind) {
    const retArr = splitterRow.reduce((acc, val, i) => {
        if (val === valueToFind) {
            acc.push(i);
        }
        return acc;
    }, []);
    return retArr;
}
function figureSplits(mapArray) {
    const entranceArray = mapArray.shift();
    const entranceIndex = entranceArray?.findIndex((char) => char === "S");
    let splits = 0;
    if (entranceIndex) {
        let rayCount = 0;
        // console.log("entranceIndex: ", entranceIndex)
        const splitterMap = mapArray.map((row) => getLocations(row, "^"));
        // console.log("splitterMap: ", JSON.stringify(splitterMap))
        let rayMap = [];
        rayMap[entranceIndex] = "|";
        splitterMap.forEach((row) => {
            const currentRayIndexes = getLocations(rayMap, "|");
            // console.log("currentRayCount: ", currentRayCount)
            const futureRayMap = [];
            currentRayIndexes.forEach((ray) => {
                let collision = false;
                row.forEach((splitter) => {
                    if (splitter === ray) {
                        // console.log("collision at:", ray)
                        collision = true;
                        splits++;
                        futureRayMap[ray - 1] = "|";
                        futureRayMap[ray + 1] = "|";
                    }
                });
                if (collision === false) {
                    futureRayMap[ray] = "|";
                }
            });
            rayMap = futureRayMap;
            const currentRayCount = rayMap.filter((item) => item === "|").length;
            rayCount += currentRayCount;
            console.log("rayMap: ", JSON.stringify(rayMap));
        });
        console.log("rayCount: ", rayCount);
    }
    return splits;
}
function main() {
    console.log("running");
    const fileContents = fs.readFileSync(FILENAME, "utf8");
    if (fileContents.length > 0) {
        const splitterMap = fileContents.split(/\r?\n/);
        let mapArray = splitterMap.map((row) => {
            const nArr = row.split("");
            if (nArr.every((item) => item === ".")) {
                return null;
            }
            else {
                return nArr;
            }
        });
        mapArray = mapArray.filter((item) => {
            return item != null;
        });
        console.log("mapArray: ", JSON.stringify(mapArray));
        const splits = figureSplits(mapArray);
        console.log("splits: ", splits);
    }
}
main();
//# sourceMappingURL=index.js.map