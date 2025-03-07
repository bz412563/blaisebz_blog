import fs from 'fs'
import path from 'path'

function getDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error(`Error: No filename argument provided
Usage: npm run new-post -- <filename>`)
  process.exit(1)
}

// 允许中文，但去掉不合法的特殊字符
let fileName = args.join('-').replace(/[\/\\:*?"<>|]/g, '')

// 确保文件名不是空的
if (!fileName.trim()) {
  console.error('Error: Invalid filename')
  process.exit(1)
}

// 添加 .md 扩展名
if (!/\.(md|mdx)$/i.test(fileName)) {
  fileName += '.md'
}

const targetDir = './src/content/posts/'
const fullPath = path.join(targetDir, fileName)

// 确保目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}

// 检查文件是否已存在
if (fs.existsSync(fullPath)) {
  console.error(`Error: File ${fullPath} already exists`)
  process.exit(1)
}

const content = `---
title: ${fileName.replace(/\.(md|mdx)$/i, '')}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---`

// 确保写入时使用 UTF-8 编码
fs.writeFileSync(fullPath, content, { encoding: 'utf8' })

console.log(`Post ${fullPath} created`)
