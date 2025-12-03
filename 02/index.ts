const input =
  "82853534-82916516,2551046-2603239,805115-902166,3643-7668,4444323719-4444553231,704059-804093,32055-104187,7767164-7799624,25-61,636-1297,419403897-419438690,66-143,152-241,965984-1044801,1-19,376884-573880,9440956-9477161,607805-671086,255-572,3526071225-3526194326,39361322-39455443,63281363-63350881,187662-239652,240754-342269,9371-26138,1720-2729,922545-957329,3477773-3688087,104549-119841"

// const input = "805115-902166"
const results: { number: number; type: string }[] = []

function getRange(start: number, end: number): number {
  if (end > start) {
    return end - start + 1
  } else {
    return -1
  }
}

function complexCheck(
  number: number
): { number: number; type: string } | boolean {
  const numString = number.toString()
  const firstVal = numString[0]
  const nsArray = numString.split("")

  //Make sure the number is more than 1 digit
  if (numString.length === 1) return false

  //Check to see if the number is repeated everywhere
  if (nsArray.every((val) => val === firstVal)) {
    // console.log("repeating number: ", number)
    return { number: number, type: "repeating number" }
    //If it doesn't repeat everywhere, get more complicated...
  } else {
    //Check to see if the first number is repeated anywhere
    const restArray = nsArray.slice(1) // Get all digits except the first one
    if (restArray.length > 0) {
      const filteredNumber = restArray.filter((digit) => digit === firstVal)
      //Simple check will filter out numbers that repeat once
      //We only need to deal with multiple repeats
      if (filteredNumber.length > 1) {
        //The repeat increment has to be at least where the first repeat happens, so find it
        const repeatLocation = restArray.findIndex(
          (digit) => digit === firstVal
        )
        //if the repeat location is the 2nd digit, repeat digits will find it
        if (repeatLocation === 0) return false
        const repeatString = numString.slice(0, repeatLocation + 1)
        if (numString.length % repeatString.length != 0) return false
        let index = 0
        const repeatArray: string[] = []
        while (index * repeatString.length < numString.length) {
          repeatArray.push(
            numString.slice(
              repeatString.length * index,
              repeatString.length * index + repeatString.length
            )
          )
          index++
        }
        const match = repeatArray.every((val) => val === repeatArray[0])
        if (match) {
          return { number: number, type: "multiple repeats" }
        }
      }
    }
  }
  return false
}

//Simple compare checkes for exactly 1 repeat of numbers
function compare(number: number) {
  // for a number to repeat once it has to have an even length
  const numString = number.toString()
  if (numString.length % 2 === 0) {
    const first = parseInt(numString.slice(0, numString.length / 2))
    const second = parseInt(numString.slice(numString.length / 2))
    const res = first - second
    if (res === 0) {
      return { number: number, type: "simple" }
    }
  }
  const complex = complexCheck(number)
  if (complex) {
    if (complex != true) {
      return { number: number, type: complex.type }
    } else {
      return { number: number, type: "unknown" }
    }
  }
}

function analyzeNumber(
  number: number
): { number: number; type: string } | undefined {
  const foundNumber = compare(number)
  if (foundNumber) {
    if (foundNumber.type != "simple") {
      console.log("foundNumber: ", foundNumber)
    }
    return foundNumber
  }
}

function analyzeRange(range: string) {
  const [start, end] = range.split("-").map((id) => {
    return parseInt(id)
  })
  if (start && end) {
    const length = getRange(start, end)
    if (length > 0) {
      for (let i = start; i <= end; i++) {
        const result = analyzeNumber(i)
        if (result) {
          results.push(result)
        }
      }
    }
  }
}

function main() {
  const numbers = input.split(",")
  numbers.forEach((number) => {
    if (number.includes("-")) {
      analyzeRange(number)
    }
  })

  const sum = results.reduce((acc, cur) => {
    const num = cur.number
    return acc + num
  }, 0) 
  console.log("sum: ", sum)
}
main()
