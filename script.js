"use strict"


/*
  Game Level
  @ : player startpos
  x : walls
  ! : nonmoving lava tiles
  o : coin
  = : horizontally moving lava
  | : vertically moving lava
  v : vertically dripping lava
*/
var simpleLevelPlan = [
  "                      ",
  "                      ",
  "  x              = x  ",
  "  x         o o    x  ",
  "  x @      xxxxx   x  ",
  "  xxxxx            x  ",
  "      x!!!!!!!!!!!!x  ",
  "      xxxxxxxxxxxxxx  ",
  "                      "
];


/*
  This constructor builds a level object, its argument is an array of strings
  that defines the level.
*/
function Level(plan) {
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid = [];   // the grid of the level, inner arrays = horizontal line
  this.actors = []; // current pos and state of dynamic elements

  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridline = [];
    for (var x = 0; x < this.width; x++) {
      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];
      if (Actor)
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch == "x")
        fieldType = "wall";
      else if (ch == "!")
        fieldType == "lava";
      gridline.push(fieldType);
    }
    this.grid.push(gridLine);
  }

  this.player = this.actors.filter(function(actor) {
    return actor.type == "player";
  })[0];
  this.status = this.finishDelay = null;
}
