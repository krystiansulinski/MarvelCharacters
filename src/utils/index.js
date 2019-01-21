import React from 'react';
import sampleResponse from '../assets/sampleResponse';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getGrouping(result, row, col) {
  let grouping = [];
  for (let i = 0; i < row; i++) {
    grouping[i] = [];
    for (let j = 0; j < col; j++) {
      grouping[i].push(result[i * (row + 1) + j]);
    }
  }
  return grouping;
}

export function getGroupingFallback() {
  return getGrouping(sampleResponse.data.results, 4, 5);
}

export function getRandomLetter() {
  return String.fromCodePoint(getRandomInt("a".codePointAt(0), "z".codePointAt(0)));
}

export function getLoadingIndicator() {
  const dots = ".......................";
  return <h1 data-text={dots}>{dots}</h1>
}

export function getCharacterDetails(urls) {
  return urls && urls[1] && urls[1].type === "wiki" ? urls[1].url : urls[0].url;
}

export function getPictureSrc(thumbnail) {
  return thumbnail ? thumbnail.path + "/landscape_amazing." + thumbnail.extension : "";
}