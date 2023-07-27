window.addEventListener('load', () => {

    let canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    let ctx = canvas.getContext('2d');
    
    let cw = canvas.width / 250;
    let org = {x: 100, y: 100};

    //クラスインスタンス生成など
    const drawer = new Drawer({canvas: canvas, ctx: ctx, cw: cw, org: org});
    
    let alphaAnimals = [];
    for (let i=0; i<10; i++) {
        alphaAnimals[i] = new Animal();
        drawer.submitObject(alphaAnimals[i]);
    }
    

    // FrameLoop
    const fps = 60;

    let targetInterval = 1000 / fps;
    let previousTime = Date.now() - targetInterval;

    function loop() {
        let currentTime = Date.now();
        if (currentTime - previousTime > targetInterval) {
            update();
            previousTime = Date.now();
        }
        requestAnimationFrame(loop);
    }

    function update() {
        drawer.checkCollision();
        drawer.update();
        drawer.draw();

    }

    loop();

    // ---- マウスイベント ----

    canvas.addEventListener('mousedown', (e) => {
        
    });

    canvas.addEventListener('mouseup', () => {

    });

    canvas.addEventListener('mousemove', (e) => {
        
    });

    resizeCanvas();
    window.onresize = resizeCanvas;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

})