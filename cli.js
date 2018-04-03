#!/usr/bin/env node
const fs = require('fs');

const args = {
  sizes: ['--sizes', '-s'],
  mode: ['--mode', '-m']
};

let sizesContent;

args.sizes.forEach(sizesArg => {
  const index = process.argv.indexOf(sizesArg);
  if (index > -1) {
    sizesContent = JSON.parse(fs.readFileSync(process.argv[index + 1], 'utf8'));
  }
});

if (!sizesContent) {
  throw new Error('-s --sizes argument is required');
}

let mode = 'scss';

args.mode.forEach(modeArg => {
  const index = process.argv.indexOf(modeArg);
  if (index > -1) {
    mode = process.argv[index + 1];
  }
});

// create SASS output
let output;

if (mode === 'scss') {
  output = '$dialog-sizes:';

  sizesContent.forEach(val => {
    const hasChildren = val.hasOwnProperty('names') || val.hasOwnProperty('isBase');
    output += `
      `;
    if (hasChildren) {
      output += '(';
    }
    output += val.value;
    if (val.isBase) {
      output += ' isBase';
    }
    if (hasChildren) {
      output += ` ${val.names.join(' ')})`;
    }
  });
  output += ';';

  process.stdout.write(output);

} else if (mode === 'html') {
  const sizes = sizesContent;
  output = `<div>
    <style>
      body {
        font-family: sans-serif;
      }
      .dialog-sizes__item {
        vertical-align: middle;
      }
      li {
        list-style: none;
      }
    </style>`;

  const color = (value) => {
    return `hsl(${(1 + value) / sizes.length * 360},90%,50%)`;
  }

  let sizesHTML = `<svg style="display: none; transform: rotateX(180deg)"class="dialog-sizes__thing" width="100%">
    <style>
      rect {
        vector-effect: non-scaling-stroke;
        stroke-width: 2;
        stroke: #fff;
      }
    </style>`;

  JSON.parse(JSON.stringify(sizes)).reverse().forEach((val, i) => {
    const hasChildren = val.hasOwnProperty('names') || val.hasOwnProperty('isBase');
    output += '<li style="display: flex; align-items: stretch; margin-bottom: 0.6rem" class="dialog-sizes__item">';
    let width = 100 / sizes.length;
    sizesHTML += `<div width="${width}%" x="${i * width}%" height="${val.value}" fill="${colors(i)}"></rect>`;
    output += `<svg style="border-left: 1px solid #000; transform: rotateY(180deg); flex: 0 0 ${sizes[sizes.length - 1].value}" width="${sizes[sizes.length - 1].value}" height="40" viewbox="0 0 40 ${sizes[sizes.length - 1].value}">
       <div style="width: ${val.value}; height: 40px; background-color: ${colors[i]};"></div>
    </div>`;

    output += '<div style="padding-left: 0.5rem;"><strong style="display: block; font-size: 1.25rem;';

    if (val.isBase) {
      output += 'text-decoration: underline';
    }

    output += `">${val.value}<span style="font-weight: normal; font-size: .6em; margin-left: 0.25rem">${val.value.split('rem')[0] * 16}px</span></strong>`;

    if (hasChildren) {
      output += `<span style="display: block; max-width: 100%; font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">size(<strong>${val.names.join(', ')}</strong>)</span>`;
    }
    output += '</div></li>';
  });

  sizesHTML += '</svg>';

  process.stdout.write(sizesHTML + output);
}
