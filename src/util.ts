export const removeExtension = (filename: string) => filename.split('.').slice(0, -1).join('.')

// type any because I have to check ALL characters (letter, number, space, special char and so on...)
export const isLetter = (str: any) => str.length === 1 && str.match(/[a-z]/i)
