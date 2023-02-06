const readline = require('readline')
const fs = require('fs')
const { writeFile } = require('fs').promises

const pageBoilerplate = pageName => {
  return `\
import { FC } from 'react'

export const ${pageName}: FC = () => {
\treturn (
\t\t<div>
\t\t\t${pageName}
\t\t</div>
\t)
}
`
}

const indexFileBoilerplace = unitName => `\
export * from './${unitName}'
`

const createPage = async pageName => {
  const pageDirPath = `./src/pages/${pageName}`

  if (fs.existsSync(pageDirPath)) {
    console.error('Page with such name already exists')
    return
  }

  if (!fs.existsSync(pageDirPath)) {
    fs.mkdirSync(pageDirPath, { recursive: true })
  }

  await writeFile(`${pageDirPath}/${pageName}.tsx`, pageBoilerplate(pageName))
  await writeFile(`${pageDirPath}/index.ts`, indexFileBoilerplace(pageName))
}

;(async function () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('Enter page name: ', name => {
    createPage(name).then(() => rl.close())
  })
})()
