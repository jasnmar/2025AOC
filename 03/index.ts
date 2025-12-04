import * as fs from "fs"

const FILENAME = "./03/data.txt"

function convertBatteryStringToNumberArray(batteryString: string): number[] {
  const batteryDigits = batteryString.split("")
  const batteryValues = batteryDigits.map((batteryDigit) => {
    return parseInt(batteryDigit)
  })
  return batteryValues
}

function findLargestNumberInArray(valueArray: number[]): number {
  const largest = Math.max(...valueArray)
  // console.log("largest: ", largest)
  return largest
}

function convertArrayOfNumbersToNumber(numArray:number[]) : number {
  const result: number = parseInt(numArray.join(''))

  return result
}

function fillArrayValues(arr: number[]) {
  const retArr: number[] = []
  arr.forEach((item) => {
    retArr.push(item)
  })
  return retArr
}

function findLargest12Numbers(numArray: number[]): number[] {
  let counter = 11
  if (numArray.length < counter) return []
  //We haven't found any numbers yet, so we need to reserve the last 12 numbers in case
  //that's where the values are that we need, so chop off the fron of the array, preserving
  //the last 12 numbers.
  const resultsArray: number[] = []
  let arrayStart = 0
  let arrayFront: number[] = numArray
  let trackingArray: number[] = numArray
  while (counter > -1) {
    if (resultsArray.length > 0) {
      //This gets the last value found
      const maxVal = resultsArray[resultsArray.length - 1]
      arrayStart = trackingArray.findIndex((value) => value === maxVal)+1
      trackingArray = trackingArray.slice(arrayStart)
    }
    arrayFront = trackingArray.slice(0, trackingArray.length - counter )
    resultsArray.push(findLargestNumberInArray(arrayFront))
    counter--
  }
  return resultsArray
}

function main() {
  const fileContents: string = fs.readFileSync(FILENAME, "utf8")
  if (fileContents.length > 0) {
    const batteriesArray = fileContents.split(/\r?\n/)
    // console.log("batteriesArray: ", batteriesArray);
    const batteryNumbers = batteriesArray.map((battery) => {
      return convertBatteryStringToNumberArray(battery)
    })
    const largestArray = batteryNumbers.map((battery) => {
      return findLargest12Numbers(battery)
    })
    const battValArray = largestArray.map((batArr) => {
      return convertArrayOfNumbersToNumber(batArr)
    })
    console.log("battValArray: ", JSON.stringify(battValArray))
    const total = battValArray.reduce((tot, val) => tot + val)
    console.log("total: ", total);
  }
}

function one() {
  const fileContents: string = fs.readFileSync(FILENAME, "utf8")
  if (fileContents.length > 0) {
    //Let's make an array out of each line, which represents a single battery
    const batteriesArray = fileContents.split(/\r?\n/)
    const batterySelection = batteriesArray.map((battery) => {
      const batteryValueArray = convertBatteryStringToNumberArray(battery)
      const largest = findLargestNumberInArray(batteryValueArray)
      const largestCount = batteryValueArray.filter(
        (batteryVal) => batteryVal === largest
      )
      if (largestCount.length > 1) {
        // console.log("Returning early with repeating numbers ", largestCount)
        return [largestCount[0], largestCount[0]]
      }
      //We didn't have 2 of the largest battery, so we need to find the next largest
      //Find the next largest before the index of the largest and after the index of the
      //largest then see which is better
      const largestIndex = batteryValueArray.findIndex(
        (value) => value === largest
      )

      const afterBatteryValueArray = batteryValueArray.slice(largestIndex + 1)
      const beforeBatteryValueArray = batteryValueArray.slice(0, largestIndex)
      const secondLargestAfter = findLargestNumberInArray(
        afterBatteryValueArray
      )
      const secondLargestBefore = findLargestNumberInArray(
        beforeBatteryValueArray
      )
      const valueWithBefore = parseInt(secondLargestBefore.toString() + largest)
      const valueWithAfter = parseInt(largest.toString() + secondLargestAfter)
      if (valueWithBefore > valueWithAfter) {
        return [secondLargestBefore, largest]
      } else {
        return [largest, secondLargestAfter]
      }
    })
    console.log("batterySelection: ", JSON.stringify(batterySelection))
    const batteryArray = batterySelection.map((battery) => {
      if (battery[0] && battery[1]) {
        return parseInt(battery[0]?.toString() + battery[1]?.toString())
      }
    })
    console.log("batteryArray: ", batteryArray)
    const total = batteryArray.reduce(
      (acc: number, num: number | undefined) => acc + (num || 0),
      0
    )
    console.log("total: ", total)
  }
}

main()
