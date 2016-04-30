// THIS IS WHERE WE STARTED WITH!
// var mouse = d3.select('.gameBoard')
//               .append('svg')
//               .attr({'class': 'svgMouse'});

// start slingin' some d3 here.
var gameOptions = {
  height: 450,
  width: 700,
  enemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

var axes = {  
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
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

var circles = gameBoard.selectAll('.svgBoard')
                       .data(dataSet)
                       .enter()
                       .append('circle')
                       .attr({'class': 'svgCircle',
                              'r': function(d) { return d.r; },
                              'fill': 'blue',
                              'cx': function(d) { return d.cx; },
                              'cy': function(d) { return d.cy; }
                            });

var dragmove = function(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr('transform', 'translate(' + x + ',' + y + ')');
};

var drag = d3.behavior.drag()
             .on('drag', dragmove);

var player = gameBoard.append('circle')
                      .attr({'class': 'svgPlayer',
                             'r': 15,
                             'fill': 'green',
                             'cx': gameOptions.width / 2,
                             'cy': gameOptions.height / 2
                           })
                      .call(drag);

// player.call(drag);

var updateScore = function() {
  d3.select('current')
    .text(gameStats.score.toString());
};

var updateBestScore = function() {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
  d3.select('highscore').text(gameStats.bestScore.toString());
};


var update = function(data) {
  circles.transition()
         .duration(1000)
         .attr({'cx': function(d) { return (d.cx = Math.random() * gameOptions.width); },
                'cy': function(d) { return (d.cy = Math.random() * gameOptions.height); }
              });

};



setInterval(function() {
  update(dataSet);
  console.log('hi');
}, 1000);
  
