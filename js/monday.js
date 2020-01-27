const monday_sketch = ( sketch ) => {


    let radius = 55;
    let x = 0;
    let y = 0;

    let message_to_draw = 'SUNDAY MONDAY TUESDAY WEDNESDAY THURSDAY FRIDAY SATURDAY';
    let position_in_message = 0;
    let sketch_width, sketch_height;

    sketch.setup = () => {
        sketch_width = document.getElementById('canvas-container-c').clientWidth;
        sketch_height = sketch_width * (2/3);
        sketch.createCanvas(sketch_width, sketch_height);
        sketch.noFill();
        sketch.stroke('#ee2348');
        sketch.strokeWeight(4);
        sketch.textSize(sketch_height/1.3);
        sketch.noLoop();

    };

    sketch.draw = () => {
        sketch.line_it_up();
        window.setInterval(sketch.line_it_up, 10);
        window.setInterval(sketch.walk_through_message, 1000);
    }

    sketch.line_it_up = () => {
        y=0;
        sketch.clear();

        while (y <= sketch_height) {
            if (sketch.floor(sketch.random(1, 3)) == 2) {
                sketch.strokeWeight(1);
                sketch.line(0, y, sketch_width, y + sketch.random(.2, 1));
            }
            y+=2;
        }

        sketch.strokeWeight(2);
        sketch.text(message_to_draw[position_in_message],
                    sketch_width/2 - sketch.textWidth(message_to_draw[position_in_message])/2,
                    sketch_height/2 + (sketch_height/1.3)/2.75);
    }

    sketch.walk_through_message = () => {
        character_to_draw = message_to_draw[position_in_message];
        position_in_message++;

        if (position_in_message > message_to_draw.length) {
            position_in_message = 0;
        }
    }

};

new p5(monday_sketch, 'canvas-container-c');
