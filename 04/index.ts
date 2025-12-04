import * as fs from "fs"

const FILENAME = "./04/data.txt"
let paperStorageArray: number[][] = []
let removalMap: number[][] = []

function convertRowStringToDataArray(str: string): number[] {
  const retArr: number[] = []
  if (str.length > 0) {
    const strArr = str.split("")
    strArr.forEach((character) => {
      character === "." ? retArr.push(0) : retArr.push(1)
    })
  }
  return retArr
}

function getCoordinates(x: number, y: number): number[][][] {
  const retArr: number[][][] = [
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
  ]
  return retArr
}

function checkCoordinate(x: number, y: number): number {
  let retVal = 0
  if (paperStorageArray[y] && paperStorageArray[y][x] !== undefined) {
    retVal = paperStorageArray[y][x]
  }
  return retVal
}

function checkPosition(x: number, y: number): number {
  let total = -1
  const coordinatesToCheck = getCoordinates(x, y)
  coordinatesToCheck.forEach((row) => {
    row.forEach((coordinate) => {
      if (coordinate[0] != undefined && coordinate[1] != undefined) {
        total += checkCoordinate(coordinate[0], coordinate[1])
      }
    })
  })
  if (total < 4) {
    removalMap.push([x, y])
  }
  return total
}

function calcuateRemoval() {
  let total = 0
  for (let i = 0; i < paperStorageArray.length; i++) {
    for (let j = 0; j < (paperStorageArray[i] || []).length; j++) {
      if (paperStorageArray[i]?.[j] !== undefined) {
        if (paperStorageArray[i]?.[j] === 1) {
          if (checkPosition(j, i) < 4) {
            total++
          }
        }
      }
    }
  }
  return total
}

function removeRolls() {
  if (removalMap.length > 0) {
    removalMap.forEach((roll) => {
      if (roll[0] != undefined && roll[1] != undefined) {
        const x: number = roll[0]
        const y: number = roll[1]
        if (roll[0] != undefined && roll[1] != undefined) {
        }
        if (paperStorageArray[y] && paperStorageArray[y][x] != undefined) {
          paperStorageArray[y][x] = 0
        }
      }
    })
  }
  removalMap = []
}

function main() {
  let goodCount = 0
  const fileContents: string = fs.readFileSync(FILENAME, "utf8")
  if (fileContents.length > 0) {
    const paperStorage = fileContents.split(/\r?\n/)

    paperStorageArray = paperStorage.map((row) =>
      convertRowStringToDataArray(row)
    )
    goodCount = calcuateRemoval()
    let curCount = goodCount
    while (curCount > 0) {
      removeRolls()
      curCount = calcuateRemoval()
      goodCount += curCount
    }
  }
  console.log("goodCount: ", goodCount)
}

main()
