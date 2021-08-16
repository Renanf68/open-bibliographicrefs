function getFirstAuth(author: string) {
  let authArr = author.split(" ")
  let len = authArr.length
  let newAuthorString = authArr.map((name, index) => {
    if (len - 1 === index) {
      return name.toUpperCase()
    } else {
      if (name === "da" || name === "de" || name === "do") {
        return name
      } else {
        return name.charAt(0)
      }
    }
  })
  let lastName = newAuthorString[len - 1]
  let outputString = `${lastName},`
  function concatStrings(element: string, index: number) {
    if (element !== lastName && element !== "") {
      outputString += " " + element + "."
    }
  }
  newAuthorString.forEach(concatStrings)
  return outputString
}

export function formatAuthorsStringToABNT(authors: string) {
  let firstAuth = undefined
  let separation1 = authors.split(" and ")
  if (separation1.length > 3) {
    firstAuth = getFirstAuth(separation1[0])
  }
  let separation2 = separation1.map(auth => {
    let authArr = auth.split(" ")
    let len = authArr.length
    let newAuthorString = authArr.map((name, index) => {
      if (len - 1 === index) {
        return name.toUpperCase()
      } else {
        if (name === "da" || name === "de" || name === "do") {
          return name
        } else {
          return name.charAt(0)
        }
      }
    })
    let lastName = newAuthorString[len - 1]
    let outputString = `${lastName},`
    function concatStrings(element: string, index: number) {
      if (element !== lastName && element !== "") {
        outputString += " " + element + "."
      }
    }
    newAuthorString.forEach(concatStrings)
    return outputString
  })
  const len = separation2.length
  let finalString = ""
  function concatFinalStrings(element: string, index: number) {
    if (index < len - 1) {
      finalString += element + "; "
    } else {
      finalString += element
    }
  }
  separation2.forEach(concatFinalStrings)
  return { group: finalString, firstAuth }
}

/*export function joinFullNameAuthors(state: string, newString: string) {
  let newState = ""
  if (state === "") {
    return (newState = newString)
  }
  return (newString = `${state} and ${newString}`)
}*/

type Author = {
  id: number
  fullName: string
}

export function joinFullNameAuthors(authArray: Author[]) {
  let newString = ""
  function concatStrings(element: { id: number; fullName: string }) {
    if (newString === "") {
      newString = element.fullName
    } else {
      newString += " and " + element.fullName
    }
  }
  if (authArray.length > 1) {
    authArray.forEach(concatStrings)
  } else {
    newString = authArray[0].fullName
  }
  return newString
}
