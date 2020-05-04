const sink_sketch = ( sketch ) => {

    // Store our sketch dimensions and dom element here in case
    // we need to resize
    let sketch_width, sketch_height, canvas_container_element;
    let stroke_length_range;

    sketch.setup = () => {

        canvas_container_element = document.getElementById('canvas-container-a')
        sketch.setDimensions();

        // Remove our placeholder image after we've loaded the dom
        // and are ready to draw. Then, create our cavnas
        placeholder_img = document.querySelector('#canvas-container-a img');
        placeholder_img.remove();
        sketch.createCanvas(sketch_width, sketch_height);

        sketch.frameRate(8);

    };

    sketch.draw = () => {

        let x, y, x2, y2;

        x = sketch.random( -stroke_length_range, sketch_width );
        y = sketch.random( -stroke_length_range, sketch_height );
        x2 = sketch.random( x-stroke_length_range, x+stroke_length_range );
        y2 = sketch.random( y-stroke_length_range, y+stroke_length_range );


        sketch.strokeWeight( sketch.random( sketch_width/1000, sketch_width/2000 ) );

        sketch.line(x, y, x2, y2);

    }

    sketch.windowResized = () => {

        // Kludge: ios seems to fire resize() during scrolling
        if ( sketch_width !== canvas_container_element.clientWidth ) {
            sketch.setDimensions();
            sketch.resizeCanvas( sketch_width, sketch_height );
        }

    }

    sketch.setDimensions = () => {

        // We use this to help with resizing and fullscree displays
        // Calculate the width and height of our canvas here
        // Lets keep a 3:2 aspect ratio
        sketch_width = canvas_container_element.clientWidth;
        sketch_height = sketch_width * (2/3);

        stroke_length_range = sketch_width/30;
    }

};

new p5(sink_sketch, 'canvas-container-a');
