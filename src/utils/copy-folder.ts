import fs from 'fs'
import path from 'path'

export function copyFolder(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target)
  }

  const files = fs.readdirSync(source)

  for (const file of files) {
    const sourcePath = path.join(source, file)
    const targetPath = path.join(target, file)

    if (fs.statSync(sourcePath).isDirectory()) {
      if (!fs.existsSync(target)) {
        fs.mkdirSync(targetPath)
      }

      copyFolder(sourcePath, targetPath)
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  }
}
