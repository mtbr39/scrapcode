class Mover {
    constructor() {
        this.sprite = new Sprite(width / 2, height / 2, 40, 40);
        this.sprite.type = "Mover";
        this.sprite.color = color(0,0,255,0);

        this.vision = new Vision({ x: this.sprite.x, y: this.sprite.y, offsetX: this.sprite.width });
        
        this.vision.sprite.overlaps(allSprites, (mySprite, targetSprite) => {
            if (targetSprite.type == "Plant") this.findPlant(targetSprite);
            
        });

        this.stateAction = function(){return;};

        this.sprite.addSpeed(1.0, this.sprite.rotation);

        drawer.submitObject(this);
    }
    draw() {
        this.stateAction();
        // this.sprite.moveTowards(mouse.x, mouse.y);

        if (kb.presses(' ')) { 
            this.findPlant();
        }

        this.vision.fixPosition(this.sprite.x, this.sprite.y, this.sprite.rotation);

    }

    changeState(stateFunction) {
        this.stateAction = stateFunction;
    }


    findPlant(targetSprite) { 
        // JSON.stringify([1, 2]) == JSON.stringify([1, 2]) // true
        if ([this.sprite.x, this.sprite.y]==[targetSprite.x, targetSprite.y]) {
            console.log("到着");
        }
        // this.sprite.rotation = (Math.atan((targetSprite.x - this.sprite.x) / (targetSprite.y - this.sprite.y)) * 180) / Math.PI;
        this.sprite.move(targetSprite.x, targetSprite.y, 2);
        // targetSprite.color = color(0, 0, 255, 0);
        return;
    }
}

class Vision {
    constructor(options) {
        let x0 = options.x | 0;
        let y0 = options.y | 0;
        this.offsetX = options.offsetX | 0;
        this.offsetY = options.offsetY | 0;
        this.sprite = new Sprite(x0 + this.offsetX, y0 + this.offsetY, 400, 400);
        this.sprite.type = "Vision";
        this.sprite.color = color(0, 0, 255, 0);

        drawer.submitObject(this);
    }
    draw() {

    }
    fixPosition(x, y, rotation) {
        this.sprite.move(x, y, 999);
        // this.sprite.rotation = rotation;
        // this.sprite.x += Math.cos(this.sprite.rotation * Math.PI / 180) * this.offsetX;
        // this.sprite.y += Math.sin(this.sprite.rotation * Math.PI / 180) * this.offsetY;
    }
}

class Behavior {
    constructor() {

    }

}
