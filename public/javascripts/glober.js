(function() {
  var globe = planetaryjs.planet();
  globe.loadPlugin(autorotate(5));
  globe.loadPlugin(planetaryjs.plugins.earth({
    topojson: { file:   '/world-110m-withlakes.json' },
    oceans:   { fill:   '#FFFFFF' },
    land:     { fill:   '#FFFFFF' },
    borders:  { stroke: '#007944', lineWidth: 0.45, type: 'both' }
  }));
  globe.loadPlugin(lakes({
    fill: '#FFFFFF'
  }));
  globe.loadPlugin(planetBorder());
  globe.projection.scale(175).translate([175, 175]).rotate([70, -40, 25]);

  var canvas = document.getElementById('rotatingGlobe');
  if (window.devicePixelRatio == 2) {
    canvas.width = 800;
    canvas.height = 800;
    context = canvas.getContext('2d');
    context.scale(2, 2);
  }
  globe.draw(canvas);

  function autorotate(degPerSec) {
    return function(planet) {
      var lastTick = null;
      var paused = false;
      planet.plugins.autorotate = {
        pause:  function() { paused = true;  },
        resume: function() { paused = false; }
      };
      planet.onDraw(function() {
        if (paused || !lastTick) {
          lastTick = new Date();
        } else {
          var now = new Date();
          var delta = now - lastTick;
          var rotation = planet.projection.rotate();
          rotation[0] += degPerSec * delta / 1000;
          if (rotation[0] >= 180) rotation[0] -= 360;
          planet.projection.rotate(rotation);
          lastTick = now;
        }
      });
    };
  };

  function lakes(options) {
    options = options || {};
    var lakes = null;

    return function(planet) {
      planet.onInit(function() {
        var world = planet.plugins.topojson.world;
        lakes = topojson.feature(world, world.objects.ne_110m_lakes);
      });

      planet.onDraw(function() {
        planet.withSavedContext(function(context) {
          context.beginPath();
          planet.path.context(context)(lakes);
          context.fillStyle = options.fill || 'black';
          context.strokeStyle = '#007944';
          context.lineWidth = 0.45;
          context.fill();
          context.stroke();
        });
      });
    };
  };

  function planetBorder() {

    return function(planet) {
      planet.onDraw(function() {
         planet.withSavedContext(function(context) {
          context.beginPath();
          planet.path.context(context)({type: 'Sphere'});

          context.strokeStyle = '#007944';
          context.lineWidth = 0.4;
          context.stroke();
        });
      });
    }
  }
})();