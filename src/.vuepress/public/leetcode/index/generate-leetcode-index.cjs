// Node.js 脚本：自动扫描 leetcode md 文件，生成 leetcode-index.js
const fs = require('fs');
const path = require('path');
// 修正为项目 src/posts/leetcode 目录
const mdDir = path.resolve(__dirname, '../../../../posts/leetcode');
const outFile = path.join(__dirname, 'leetcode-index.js');

function getMeta(content) {
    const match = content.match(/---([\s\S]*?)---/);
    if (!match) return null;
    const meta = {};
    match[1].split('\n').forEach(line => {
        if (/^title:/.test(line)) meta.title = line.replace('title:', '').trim();
        if (/^date:/.test(line)) meta.date = line.replace('date:', '').trim();
        if (/^categories:/.test(line)) {
            meta.categories = line.replace('categories:', '')
                .replace('[', '').replace(']', '')
                .split(',').map(s => s.trim()).filter(Boolean);
        }
        if (/^tags:/.test(line)) {
            meta.tags = line.replace('tags:', '')
                .replace('[', '').replace(']', '')
                .split(',').map(s => s.trim()).filter(Boolean);
        }
    });
    
    // 简要描述，取 # 题目 下第一段
    const descMatch = content.match(/# [\u4e00-\u9fa5\w]+\n+([\s\S]*?)(\n{2,}|$)/);
    meta.desc = descMatch ? descMatch[1].replace(/\r/g, '').trim() : '';
    return meta;
}

function scanMdFiles(dir) {
    let result = [];
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            result = result.concat(scanMdFiles(fullPath));
        } else if (file.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const meta = getMeta(content);
            if (meta) {
                // 生成 html 路径
                const relPath = path.relative(mdDir, fullPath).replace(/\\/g, '/');
                meta.url = relPath.replace(/\.md$/, '.html');
                result.push(meta);
            }
        }
    });
    return result;
}

const index = scanMdFiles(mdDir);
const jsContent = '// 自动生成的 leetcode md 索引数据\nwindow.LEETCODE_INDEX = ' + JSON.stringify(index, null, 4) + ';\n';
fs.writeFileSync(outFile, jsContent, 'utf-8');
console.log('leetcode-index.js 已生成，共', index.length, '条');
