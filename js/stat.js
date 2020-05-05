'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var INDENT = 30;
var FONT_GAP = 15;
var BAR_WIDTH = 40;
var BAR_INDENT = 50;
var BAR_HEIGHT = 150;
var greetingHeight = GAP + FONT_GAP + GAP + FONT_GAP + GAP;
var colors = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + INDENT, CLOUD_Y + INDENT);
  ctx.fillText('Список результатов:', CLOUD_X + INDENT, CLOUD_Y + INDENT + GAP + FONT_GAP);
  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'red';
    } else if (players[i] !== 'Вы') {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random(colors) + ')';
    }

    ctx.fillRect(CLOUD_X + GAP + INDENT + (BAR_WIDTH + BAR_INDENT) * i, CLOUD_Y + GAP + greetingHeight + BAR_HEIGHT + GAP, BAR_WIDTH, -(BAR_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = '#000';

    ctx.fillText(players[i], CLOUD_X + GAP + INDENT + (BAR_WIDTH + BAR_INDENT) * i, CLOUD_Y + GAP + greetingHeight + INDENT + BAR_HEIGHT);

    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + INDENT + (BAR_WIDTH + BAR_INDENT) * i, 85 + (150 - (BAR_HEIGHT * times[i]) / maxTime));
  }
};
