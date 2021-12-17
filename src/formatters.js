export default (format, data) => {
if (format === 'stylish') {
    console.log('{')
 const run = data.forEach((item) => {
if (item['type'] === 'remove') {
    console.log(`  ${'-'} ${item['key']}: ${item['value']}`)
}
if (item['type'] === 'same') {
    console.log(`  ${' '} ${item['key']}: ${item['value']}`)
}
if (item['type'] === 'add') {
    console.log(`  ${'+'} ${item['key']}: ${item['value']}`)
} 
if (item['type'] === 'update') {
    console.log(`  ${'-'} ${item['key']}: ${item['value1']}`)
    console.log(`  ${'+'} ${item['key']}: ${item['value2']}`)
} 
 })
}
return '}'
}