const sink_sketch = ( sketch ) => {

    let sketch_width, sketch_height;

    sketch.setup = () => {
        sketch_width = document.getElementById('canvas-container-a').clientWidth;
        sketch_height = sketch_width * (2/3);
        sketch.createCanvas(sketch_width, sketch_height);
        sketch.stroke(100);
        sketch.frameRate(5);
    };

    sketch.draw = () => {
        let x, y, x2, y2;

        x = sketch.random(-30, sketch_width);
        y = sketch.random(-30, sketch_height);
        x2 = sketch.random(x-25, x+25);
        y2 = sketch.random(y-25, y+25);

        sketch.line(x, y, x2, y2);
    }

    sketch.windowResized = () => {
        sketch.setDimensions();
        sketch.resizeCanvas(sketch_width, sketch_height);
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

new p5(sink_sketch, 'canvas-container-a');
