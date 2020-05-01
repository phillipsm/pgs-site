const keep_moving_sketch = ( sketch ) => {

    let sketch_width, sketch_height;
    let x, y, c1, c2;
    let available_colors = [ 'f7e8f6', 'f7e8f6', 'e5b0ea', 'bd83ce' ];


    sketch.setup = () => {
        var elem = document.querySelector('#canvas-container-a img');
        elem.remove();

        sketch_width = document.getElementById('canvas-container-a').clientWidth;
        sketch_height = sketch_width * (2/3);
        sketch.createCanvas(sketch_width, sketch_height);
        x = 0;
        y = sketch.random( sketch_height * .2, sketch_height * .3 );
        sketch.get_next_colors();

    };


    sketch.draw = () => {
        if ( x <= sketch_width ) {
            let inter = sketch.map( x, 0, sketch_width, 0, 1 );
            let c = sketch.lerpColor( c1, c2, inter );
            sketch.stroke( c );
            sketch.fill( c );

            sketch.ellipse( x, y, sketch_height*.01, sketch_height * .01 );
            x += 2;
            y = sketch.random( y - 4, y + 4 );

            if ( y >= sketch_height ) {
                y = sketch_height;
            }

            if ( y <= 0 ) {
                y = 0;
            }

        } else {
            x = 0;
            y = sketch.random( 0, sketch_height );
            sketch.get_next_colors();
        }
    }

    sketch.get_next_colors = () => {

        if ( !c1) {
            c1 = sketch.color( '#' + sketch.random( available_colors ) );
        } else {
            c1 = c2;
        }

        c2 = sketch.color( '#' + sketch.random( available_colors ) );
    }

    sketch.windowResized = () => {
        sketch.setDimensions();
        sketch.resizeCanvas(sketch_width, sketch_height);
        x = 0;
        y = sketch.random( 0, sketch_height );
    }

    sketch.setDimensions = () => {

        // We use this js file in our services page and as a fullscreen
        // Calculate the width and height of our canvas here
        sketch_width = document.getElementById('canvas-container-a').clientWidth;
        if (document.getElementsByClassName('services-page')[0]) {
            sketch_height = sketch_width * (2/3);
        } else {
            sketch_height = window.innerHeight;
        }
    }

};

new p5(keep_moving_sketch, 'canvas-container-a');
