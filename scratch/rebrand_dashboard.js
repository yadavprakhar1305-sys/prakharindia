const fs = require('fs');
const path = require('path');

const dashPath = path.join(__dirname, '..', 'pages', 'admin', 'dashboard.html');
let html = fs.readFileSync(dashPath, 'utf8');

html = html
  .replace(/Workforce Orders/g, 'Property Orders & Construction Quotes')
  .replace(/Workforce Pricing/g, 'Construction Pricing per Sq. Ft.')
  .replace(/General Labour \(₹\/day\)/g, 'Standard Quality Construction (₹/sqft)')
  .replace(/Mistri \/ Skilled \(₹\/day\)/g, 'Luxury Quality Construction (₹/sqft)')
  .replace(/Min Labour Order/g, 'Min Construction Area (sqft)')
  .replace(/Min Mistri Order/g, 'Min Villa Plot Area (sqft)')
  .replace(/cfg-labour-price/g, 'cfg-std-price')
  .replace(/cfg-mistri-price/g, 'cfg-lux-price')
  .replace(/manpower-urgent/g, 'property-booking')
  .replace(/manpower-bulk/g, 'township-booking')
  .replace(/manpower/g, 'property')
  .replace(/Manpower/g, 'Property & Construction')
  .replace(/workforce-order/g, 'property-order')
  .replace(/Workforce/g, 'Property & Construction')
  .replace(/labour contractor/ig, 'civil contractor')
  .replace(/labour/ig, 'construction')
  .replace(/mistri/ig, 'builder');

fs.writeFileSync(dashPath, html);
console.log('admin/dashboard.html rebranded successfully.');
