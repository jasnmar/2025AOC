import * as fs from "fs"

const FILENAME = "./06/data.txt"

function swapArray(arr: string[][]): number | string[][] {
  const result: number | string[][] = []
  const itemCount = arr[0]?.length || 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < itemCount; j++) {
      if (arr[i] !== undefined) {
        const row = arr[i] || []
        if (row[j] !== undefined) {
          const valAtAddress: string | number = !isNaN(
            parseInt(row[j] as string)
          )
            ? parseInt(row[j] as string)
            : (row[j] as string)

          if (!result[j]) {
            result[j] = [] // Initialize as an empty array
          }
          ;(result[j] as (string | number)[])[i] = valAtAddress
        }
      }
    }
  }
  return result
}

function getColumnsValues(arr: string[][]): number[] {
  const result: number[] = []
  const tmpArray = swapArray(arr)
  if (typeof tmpArray !== "number") {
    // Check if tmpArray is not a number
    console.log("tmpArray: ", JSON.stringify(tmpArray))
    tmpArray.forEach((list) => {
      
      const operator = list.pop()
      console.log("list: ", list);
      if(typeof operator === 'string') {
        if (operator === "+") {
          result.push(list.reduce((acc: number, num: string | number) => acc + (typeof num === 'string' ? parseInt(num) : num), 0));
        } else if (operator === "*") {
          result.push(list.reduce((acc: number, num: string | number) => {
            return acc * (typeof num === 'string' ? parseInt(num) : num);
          }, 1));
        }

      }
    })
  }

  return result
}

function main() {
  console.log("running")
  const fileContents: string = fs.readFileSync(FILENAME, "utf8")
  if (fileContents.length > 0) {
    const problemList = fileContents.split(/\r?\n/)
    console.log("problemList: ", problemList)
    if (problemList) {
      const columns = problemList.map((row) => {
        return row.trim().split(/\s+/)
      })
      console.log("columns: ", JSON.stringify(columns))
      const colVals = getColumnsValues(columns)
      console.log("colVals: ", colVals);
      const total = colVals.reduce((acc, num) => acc + num)
      console.log("total: ", total);
    }
  }
}

main()
