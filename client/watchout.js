// THIS IS WHERE WE STARTED WITH!
// var mouse = d3.select('.gameBoard')
//               .append('svg')
//               .attr({'class': 'svgMouse'});

var gameOptions = {
  height: 450,
  width: 700,
  enemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collision: 0,
};

var gameBoard = d3.select('.board')
                  .append('svg')
                  .attr({'class': 'svgBoard',
                         'width': gameOptions.width,
                         'height': gameOptions.height,
                       })
                  .style('background-color', 'orange');

var numRandomCircle = function(n, r) {
  var data = [];
  var count = 0;
  while (count < n) {
    var prop = {
      id: count,
      cx: Math.random() * gameOptions.width,
      cy: Math.random() * gameOptions.height,
      r: r
    };
    data.push(prop);
    count++;
  }
  return data;
};

var dataSet = numRandomCircle(20, 10);

var enemies = gameBoard.selectAll('.svgBoard')
                       .data(dataSet)
                       .enter()
                       .append('circle')
                       .attr({'class': 'svgCircle',
                              'r': function(d) { return d.r; },
                              'fill': 'blue',
                              'cx': function(d) { return d.cx; },
                              'cy': function(d) { return d.cy; }
                            });

var drag = d3.behavior.drag()
             .on('drag', function() { player.attr({'cx': d3.event.x, 'cy': d3.event.y}); });

var player = gameBoard.append('circle')
                      .attr({'class': 'svgPlayer',
                             'r': 15,
                             'fill': 'green',
                             'cx': gameOptions.width / 2,
                             'cy': gameOptions.height / 2
                           })
                      .call(drag);

var updateScore = function() {
  d3.select('.current').select('span')
    .text(gameStats.score.toString());
};

var updateCollision = function() {
  var someNum = Math.max(gameStats.collision / 20, 1);
  var result = Math.round(someNum);
  d3.select('.collisions').select('span')
    .text(result.toString());
};

var updateBestScore = function() {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
  d3.select('.highscore')
    .select('span')
    .text(gameStats.bestScore.toString());
};

var update = function(data) {
  enemies.transition()
         .duration(2000)
         .attr({'cx': function(d) { return (d.cx = Math.random() * gameOptions.width); },
                'cy': function(d) { return (d.cy = Math.random() * gameOptions.height); }
              });
};

var collision = function() {
  var enemyArr = enemies[0];
  for (var i = 0; i < enemyArr.length; i++) {
    var cxEnemy = enemyArr[i].attributes['cx']['value'];
    var cyEnemy = enemyArr[i].attributes['cy']['value'];
    var cxPlayer = player.attr('cx');
    var cyPlayer = player.attr('cy');
    var distance = Math.sqrt(Math.pow(cyEnemy - cyPlayer, 2) + Math.pow(cxEnemy - cxPlayer, 2));
    if (distance < player.attr('r')) {
      resetScore();
      gameStats.collision++;
      updateCollision();
    }
  }
};

var currentScore = function() {
  gameStats.score++;
};

var resetScore = function() {
  gameStats.score = 0;
  updateScore();
};

setInterval(function() {
  updateBestScore();
  updateScore();
  currentScore();
}, 100);

setInterval(function() {
  update(dataSet);
}, 2000);
  
setInterval(function() {
  collision();
}, 10);
