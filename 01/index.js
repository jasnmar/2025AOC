import * as fs from "fs";
function run() {
    console.log("running");
    const instructions = [];
    try {
        const filePath = "./01/instructions.txt";
        const fileContents = fs.readFileSync(filePath, "utf8");
        if (fileContents.length > 0) {
            const strings = fileContents.split(/\r?\n/);
            strings.forEach((string) => {
                instructions.push(string);
            });
        }
        // console.log(fileContents)
    }
    catch (error) {
        console.error("Error reading file:", error);
    }
    function getDirection(instruction) {
        return instruction.substring(0, 1);
    }
    function getQuantity(instruction) {
        return fixQuantity(parseInt(instruction.substring(1)));
    }
    function fixQuantity(quantity) {
        while (quantity > 100) {
            quantity = quantity - 100;
            hundreds++;
        }
        return quantity;
    }
    function increaseValue(quantity, currentVal, instruction, index) {
        const oldVal = currentVal;
        const tmpVal = currentVal + quantity;
        if (tmpVal >= 100) {
            currentVal = tmpVal - 100;
            if (currentVal != 0) {
                crossCount(instruction, currentVal, oldVal, index);
            }
        }
        else {
            currentVal = tmpVal;
        }
        return currentVal;
    }
    function decreaseValue(quantity, currentVal, instruction, index) {
        const oldVal = currentVal;
        const tmpVal = currentVal - quantity;
        if (tmpVal < 0) {
            currentVal = 100 + tmpVal;
            if (oldVal != 0) {
                crossCount(instruction, currentVal, oldVal, index);
            }
        }
        else {
            currentVal = tmpVal;
        }
        return currentVal;
    }
    let counter = 0;
    let hundreds = 0;
    function crossCount(instruction, currentVal, oldVal, index) {
        hundreds++;
        console.log(index, hundreds, instruction, oldVal, currentVal);
    }
    if (instructions.length > 0) {
        let currentVal = 50;
        let index = 0;
        instructions.forEach((instruction) => {
            index++;
            const oldVal = currentVal;
            if (getDirection(instruction) === "R") {
                currentVal = increaseValue(getQuantity(instruction), currentVal, instruction, index);
            }
            else {
                currentVal = decreaseValue(getQuantity(instruction), currentVal, instruction, index);
            }
            // console.log("currentVal: ", currentVal)
            if (currentVal === 0) {
                counter++;
                console.log(index, counter, instruction, oldVal, currentVal);
            }
        });
        console.log("counter: ", counter);
        console.log("hundreds: ", hundreds);
        console.log("total: ", counter + hundreds);
    }
}
run();
//# sourceMappingURL=index.js.map