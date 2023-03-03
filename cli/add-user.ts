#!/usr/bin/env ts-node

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});