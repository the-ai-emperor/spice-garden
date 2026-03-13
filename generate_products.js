const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src', 'data', 'products');

const categories = {
  "Sweets": ["gulab jamun", "laddu", "jalebi", "Gajar Paak", "Kaju katli", "Rasgulla", "Ras malai", "Barfi", "Peda", "Imarti", "Kalakand"],
  "Fruits": ["mango", "banana", "kiwi", "gawava", "Lychee", "watermalon", "orange", "grapes", "pear", "papaya"],
  "Fast Food": ["poha", "pizza", "burger", "momos", "french-fries", "gol-gappe", "samosa", "kachori", "pacoda", "aaloo tiki", "pav bhaji", "vada paav"],
  "Cold Drinks": ["coca-cola", "pepsi", "maza", "fruiti", "red-bull", "sprite", "thums-up", "limca", "fanta", "mirinda", "mountain dew", "fizz"],
  "Sabji": ["sev tamatar", "paneer", "aloo chhola", "palak panner", "matar paneer", "aloo sabji", "aloo matar", "dum aloo", "shahi panner", "sarson ka saag", "chana masala", "kala chana sabzi", "rajma sabzi", "green veg"],
  "Side dishes": ["chaach", "salad", "raita", "papadum", "pickle", "chutney"],
  "Combos": ["aloo sabji thali", "royal paneer thali", "curry thali", "side dishes thali"]
};

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function toCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/[^a-zA-Z0-9]+/g, '');
}

function toTitleCase(str) {
  return str.replace(/\\w\\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

// 1. Delete all .ts files except types.ts
const files = fs.readdirSync(DIR);
for (const file of files) {
  if (file !== 'types.ts' && file.endsWith('.ts')) {
    fs.unlinkSync(path.join(DIR, file));
  }
}

// 2. Generate new files and track for index.ts
let imports = [];
let allProductsArray = [];

let basePrice = 50;

for (const [category, items] of Object.entries(categories)) {
  for (const item of items) {
    const slug = toSlug(item);
    let varName = toCamelCase(item);
    
    // JS variables can't start with numbers or reserved words
    if (/^\\d/.test(varName)) varName = "item" + varName;
    if (varName === 'delete' || varName === 'class') varName = varName + "Item";

    const title = item.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    const price = basePrice + Math.floor(Math.random() * 80);
    
    // Choose an image based on category
    let img = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80"; // Default
    if (category === "Sweets") img = "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=600&q=80";
    if (category === "Fruits") img = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80";
    if (category === "Cold Drinks") img = "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80";
    if (category === "Fast Food") img = "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80";
    if (category === "Sabji") img = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80";
    if (category === "Side dishes") img = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80";
    if (category === "Combos") img = "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=600&q=80";
    
    const shortName = title.length > 15 ? title.substring(0, 15).trim() : title;
    
    const content = 'import type { Product } from "./types";\\n\\n' +
      'export const ' + varName + ': Product = {\\n' +
      '  slug: "' + slug + '",\\n' +
      '  name: "' + title + '",\\n' +
      '  shortName: "' + shortName + '",\\n' +
      '  price: ' + price + ',\\n' +
      '  thumbnail: "' + img + '",\\n' +
      '  gallery: ["' + img + '"],\\n' +
      '  description: "Delicious ' + title + ' from our ' + category + ' selection.",\\n' +
      '  category: "' + category + '",\\n' +
      '  tags: ["' + category.toLowerCase().replace(/ /g, '-') + '", "' + slug.replace(/-/g, ' ') + '"],\\n' +
      '  popular: ' + (Math.random() > 0.7 ? "true" : "false") + ',\\n' +
      '  featured: ' + (Math.random() > 0.8 ? "true" : "false") + '\\n' +
      '};\\n';

    fs.writeFileSync(path.join(DIR, slug + '.ts'), content);
    
    imports.push('import { ' + varName + ' } from "./' + slug + '";');
    allProductsArray.push(varName);
  }
}

// 3. Write index.ts
const indexContent = imports.join("\\n") + '\\n\\n' +
  'export * from "./types";\\n\\n' +
  'export const allProducts: Product[] = [\\n  ' +
  allProductsArray.join(",\\n  ") + '\\n];\\n';

fs.writeFileSync(path.join(DIR, "index.ts"), indexContent);

console.log("Successfully generated " + allProductsArray.length + " products.");
