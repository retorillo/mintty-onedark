// (C) Retorillo, distributed under the MIT License

const CSON = require('cson');
const fs = require('fs');
const iro = require('iro');
iro.Color.useHsv = true;
var colors = CSON.parseFile('./colors.cson');
var encoding = 'utf-8'

for (var p in colors)
  colors[p] = new iro.Color(colors[p]);

var template = fs.readFileSync('minttyrc.template', { encoding: encoding });
var minttyrc = template.replace(/\{([a-z]+)([-+][hsv][0-9]+){0,}\}/ig,
  function(p0, name, modifier) {
    var c = colors[name].clone();
    if (modifier)
      modifier.replace(/([-+])([hsv])([0-9]+)/ig, function(p0, sign, hsv, offset) {
          c.offset(hsv, parseFloat(sign+offset));
      });
    return [Math.round(c.r), Math.round(c.g), Math.round(c.b)].join(',');
  });
console.log(minttyrc);
fs.writeFileSync('.minttyrc', minttyrc, { encoding: encoding });
