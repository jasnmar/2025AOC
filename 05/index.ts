import * as fs from "fs"

const FILENAME = "./05/data.txt"

let freshDB: [number, number, number][] = []
function createFreshDBFromStrings(str: string[]): void {
  if (str.length > 1) {
    freshDB = str.map((rangeStringRaw): [number, number, number] => {
      const rangeString = rangeStringRaw.split("-")

      if (rangeString[0] !== undefined && rangeString[1] !== undefined) {
        const startNumber = parseInt(rangeString[0]) || 0
        const endNumber = parseInt(rangeString[1]) || 0
        if (endNumber < startNumber) {
          return [endNumber, startNumber, 0]
        } else {
          return [startNumber, endNumber, 0]
        }
      } else return [0, 0, 0]
    })
  }
  freshDB = freshDB.sort(
    (a: [number, number, number], b: [number, number, number]) => {
      const fValA = a[0]
      const fValB = b[0]
      const sValA = a[1]
      const sValB = b[1]
      if (fValA - fValB === 0) {
        return sValA - sValB
      } else {
        return fValA - fValB
      }
    }
  )
}

function searchDB(ingredient: number): number {
  let found: number = 0
  if (ingredient) {
    const firstRange = freshDB[0]
    if (firstRange && ingredient < firstRange[0]) {
      return found
    }

    if (freshDB.length > 1) {
      const lastRange = freshDB[freshDB.length - 1]
      if (lastRange && ingredient > lastRange[1]) {
        return found
      }
    }

    const biggerThanStart = freshDB.filter((range) => ingredient >= range[0])
    console.log("biggerThanStart: ", biggerThanStart)
    const smallerThanEnd = biggerThanStart.filter(
      (range) => ingredient <= range[1]
    )
    console.log("smallerThanEnd: ", smallerThanEnd)
    if (smallerThanEnd.length > 0) found = 1
  }
  return found
}

function collapseOverlaps(): void {
  //The DB is sorted by starting value
  //Find the list of starting values that are less than the current ending value
  const newDB: [number, number, number][] = []
  for (let i = 0; i < freshDB.length; i++) {
    //Get a list of all of the ranges who start before the current one ends
    const cRange = freshDB[i]
    if (cRange) {
      //Current index start number
      const cStart = cRange[0]
      //Current index end number
      const cEnd = cRange[1]
      //Current index check data
      const cCheck = cRange[2]
      //The new start value is the same as the current start value, until it isn't
      let nStart = cStart
      //The new end value is the same as the current end value, until it isn't
      let nEnd = cEnd
      //The next range in the array
      if (cCheck === 1) {
        //This array has already been processed
        continue
      }
      for (let j = i + 1; j < freshDB.length; j++) {
        const fRange = freshDB[j]
        if (fRange) {
          //Next index start number
          const fStart = fRange[0]
          //Next index end number
          const fEnd = fRange[1]
          //Next Array Check index
          const fCheck = fRange[2]

          if (fCheck === 1) {
            //This array has already been processed
            return
          }
          if (cStart > fStart) {
            //Technically this would indicate a problem as we think we've sorted
            //the array, but let's deal with it anyway
            nStart = fStart
            fRange[2] = 1
          }
          if (fStart <= nEnd) {
            //This means that the next array starts
            //Before the current one ends, so they overlap
            //Set the end to the next end if the next end is bigger
            if (fEnd > nEnd) {
              nEnd = fEnd
            }
            //Mark as processed either way
            fRange[2] = 1
          }
        }
      }
      newDB.push([nStart, nEnd, 0])
    }
  }
  // console.log("newDB: ", newDB)

  freshDB = newDB
}
function addArrayVals(arr: [number, number, number][]): number {
  const difArray = arr.map((rangeItem) => {
    if (rangeItem[0] !== undefined && rangeItem[1] !== undefined) {
      if (rangeItem[0] < rangeItem[1]) {
        return rangeItem[1] - rangeItem[0] + 1
      } else {
        return rangeItem[0] - rangeItem[1] + 1
      }
    } else {
      return 0
    }
  })
  console.log("difArray: ", difArray)
  const total = difArray.reduce((acc, val) => acc + val)

  return total
}

function main() {
  // console.log("running")
  const fileContents: string = fs.readFileSync(FILENAME, "utf8")
  if (fileContents.length > 0) {
    const fileData = fileContents.split(/\r?\n/)
    // console.log("fileData: ", fileData)
    const blankVal = fileData.findIndex((value) => value === "")
    const freshStringDB = fileData.slice(0, blankVal)
    createFreshDBFromStrings(freshStringDB)
    console.log("freshDB: ", JSON.stringify(freshDB))
    collapseOverlaps()
    console.log("freshDB: ", JSON.stringify(freshDB))
    const total = addArrayVals(freshDB)
    console.log("total: ", total)
  }
}

function one() {
  console.log("running")
  const fileContents: string = fs.readFileSync(FILENAME, "utf8")
  if (fileContents.length > 0) {
    const fileData = fileContents.split(/\r?\n/)
    console.log("fileData: ", fileData)
    if (fileData) {
      const blankVal = fileData.findIndex((value) => value === "")
      console.log("blankVal: ", blankVal)
      const freshStringDB = fileData.slice(0, blankVal)
      const ingredients = fileData.slice(blankVal + 1)
      console.log("freshDB: ", freshStringDB)
      console.log("ingredients: ", ingredients)
      createFreshDBFromStrings(freshStringDB)
      console.log("freshDB: ", JSON.stringify(freshDB))
      const resultsArray = ingredients.map((ingredient) => {
        return searchDB(parseInt(ingredient))
      })
      console.log("resultsArray: ", resultsArray)
      const total = resultsArray.reduce((acc, num) => acc + num)
      console.log("total: ", total)
    }
  }
}

main()
