const s = ( sketch ) => {

  let x = 100;
  let y = 100;

  let rectangles = [];
  let shimmering_rects = [];

  let color_a = '#4FB477';
  let color_b = '#FFC4EB';
  let color_shimmer = '#ffd700';
  let color_shimmer_transition = '#ffec88';
  //var color_shimmer = '#6890E7';
  //var color_shimmer_transition = '#b1c6f3';
  let color_background = '#f3f5fb';


  sketch.setup = () => {
    sketch.createCanvas(680, 400);
  };

  sketch.draw = () => {
    sketch.background('#ffffff');

    sketch.draw_grid();

    window.setInterval(function() {
		sketch.shimmer(sketch.get_rand_int(0, rectangles.length));},
		sketch.get_rand_int(2000, 4000)
	);

    window.setInterval(sketch.remove_shimmer, sketch.get_rand_int(2000, 4000));


    sketch.noLoop();


  };


  sketch.get_rand_int = (min, max) => {
  	// A helper function that returns an integer between
  	// min and max

  	return Math.floor(Math.random() * (max - min) + min);
  }

  sketch.draw_grid = () => {

      	let padding = 30;
      	let next_x = padding;
      	let next_y = sketch.get_rand_int(30, 70);
      	let next_height = sketch.get_rand_int(30, 70);

      	let current_color = color_a;

      	// Build our list of rectangles and store them
      	while (next_x + padding < 680) {
      		while (next_y + next_height < 400 - sketch.get_rand_int(0, 30)) {

      			if (current_color === color_a) {
      				current_color = color_b;
      			} else {
      				current_color = color_a;
      			}

      			rectangles.push({'id': sketch.get_rand_int(0, 1000000), 'next_x': next_x,
      							 'next_y': next_y, 'w': 20, 'h': next_height,
      							 'fill_color': current_color});
      			next_y += next_height;
      			next_height = sketch.get_rand_int(30, 70);
      		}

      		next_x += padding;
      		next_y = sketch.get_rand_int(30, 70);
      	}


      	// Draw all of our rectangles
      	for (let i=0, len=rectangles.length; i < len; i++) {
      		sketch.fill(rectangles[i].fill_color);
      		sketch.stroke(rectangles[i].fill_color)
      		sketch.rect(rectangles[i].next_x, rectangles[i].next_y, rectangles[i].w, rectangles[i].h);
      	}

  };




  sketch.shimmer = (random_index) => {
  	// Turn the rectangle to a thrid color, but let it shimmer a little first

  	var random_rect = rectangles[random_index];

  	if (shimmering_rects.indexOf(random_rect.id) === -1) {

  		shimmering_rects.push(random_rect.id);

  		// Flicker at least once

  		// And flicker up to two more times
  		var flicker_times = sketch.get_rand_int(0, 3);

  		if (flicker_times == 0) {

  			sketch.set_shimmer_callback(color_shimmer, random_index, 0, 0);

  		} else if (flicker_times == 1) {

  			sketch.set_shimmer_callback(color_shimmer_transition, random_index, 0, 0);
  			sketch.set_shimmer_callback(color_shimmer, random_index, 30, 70);

  		} else if (flicker_times == 2) {
  			sketch.set_shimmer_callback(color_shimmer_transition, random_index, 0, 0);
  			sketch.set_shimmer_callback(color_shimmer, random_index, 30, 70);

  			sketch.set_shimmer_callback(color_shimmer_transition, random_index, 70, 110);
  			sketch.set_shimmer_callback(color_shimmer, random_index, 110, 140);

  		} else if (flicker_times == 3) {

  			sketch.set_shimmer_callback(color_shimmer_transition, random_index, 0, 0);
  			sketch.set_shimmer_callback(color_shimmer, random_index, 30, 70);
  			sketch.set_shimmer_callback(color_shimmer_transition, random_index, 70, 110);
  			sketch.set_shimmer_callback(color_shimmer, random_index, 110, 140);
  			sketch.set_shimmer_callback(color_shimmer_transition, random_index, 240, 280);
  			sketch.set_shimmer_callback(color_shimmer, random_index, 340, 380);
  			sketch.set_shimmer_callback(color_shimmer_transition, random_index, 380, 420);
  			sketch.set_shimmer_callback(color_shimmer, random_index, 480, 600);

  		}
  	}
  }


  sketch.set_shimmer_callback = (fill_color, index, duration_min, duration_max) => {
  	// A little helper to aid us set the man callbacks we use
  	// in the shimmer effect

  	window.setTimeout(function() {
  			sketch.fill(fill_color);
  			sketch.stroke(fill_color);
  			sketch.rect(rectangles[index].next_x, rectangles[index].next_y,
  				 rectangles[index].w, rectangles[index].h);
  		}, sketch.get_rand_int(duration_min, duration_max)
  	);
  }

  sketch.remove_shimmer = (fill_color, index, duration_min, duration_max) => {
	// Once we get to 8% shimmering, let's remove some

	if (shimmering_rects.length > .01 * rectangles.length) {
		var random_shimmering_rect_index = sketch.get_rand_int(0, shimmering_rects.length);

		for (var i=0, len=rectangles.length; i < len; i++) {

			if (rectangles[i].id === shimmering_rects[random_shimmering_rect_index]) {
				sketch.fill(rectangles[i].fill_color);
				sketch.stroke(rectangles[i].fill_color);

				sketch.rect(rectangles[i].next_x, rectangles[i].next_y,
					 rectangles[i].w, rectangles[i].h);
			}

		}
		delete shimmering_rects[random_shimmering_rect_index];
	}
}








};

let myp5 = new p5(s, 'canvas-container-a');
