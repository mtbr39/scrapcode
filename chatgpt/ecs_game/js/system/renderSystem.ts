import { Entity } from "../entity";
import { System } from "./system";
import { MapComponent, PointComponent, PositionComponent, ShapeComponent, SizeComponent } from "../component/component";

export class RenderSystem extends System {
    private ctx: CanvasRenderingContext2D;
    entities: Entity[];
    scaler;

    constructor(ctx: CanvasRenderingContext2D, entities: Entity[], scaler: any) {
        super(entities);
        this.ctx = ctx;
        this.entities = entities;
        this.scaler = scaler;
    }

    public update() {
        this.ctx.fillStyle = "#F3F3F5";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.entities.forEach((entity) => {
            const map = entity.components.MapComponent as MapComponent;

            if (map) {
                const mapCellGridSize = 10; // グリッドサイズ
                const rectSize = 10; // 矩形のサイズ

                if ("gridDraw" == "gridDraw") {
                    // グリッド線の色や太さを設定
                    this.ctx.strokeStyle = "#000"; // 線の色を黒に設定
                    this.ctx.lineWidth = 1; // 線の太さを1に設定

                    // 横方向のグリッド線を描画
                    for (let y = 0; y <= map.grid.length; y++) {
                        const lineY = y * mapCellGridSize;
                        this.line(0, lineY, map.grid[0].length * mapCellGridSize, lineY, 1);
                    }

                    // 縦方向のグリッド線を描画
                    for (let x = 0; x <= map.grid[0].length; x++) {
                        const lineX = x * mapCellGridSize;
                        this.line(lineX, 0, lineX, map.grid.length * mapCellGridSize, 1);
                    }
                }

                for (let y = 0; y < map.grid.length; y++) {
                    for (let x = 0; x < map.grid[y].length; x++) {
                        if (map.grid[y][x] === 0) {
                            const rectX = x * mapCellGridSize; // x 座標の計算
                            const rectY = y * mapCellGridSize; // y 座標の計算
                            this.ctx.fillStyle = "#4D6653";
                            this.rect(rectX, rectY, mapCellGridSize, mapCellGridSize, true, true);
                        }
                    }
                }
            }
        });

        this.entities.forEach((entity) => {
            const position = entity.components.PositionComponent as PositionComponent;
            const size = entity.components.SizeComponent as SizeComponent;
            const point = entity.components.PointComponent as PointComponent;
            const shape = entity.components.ShapeComponent as ShapeComponent;

            if (position && size && shape === null) {
                // shapeが無い場合
                this.ctx.fillStyle = "gray";
                this.rect(position.x, position.y, size.width, size.height);
            }
            if (position && size && shape) {
                // shapeがある場合
                this.ctx.fillStyle = shape.color;
                switch (shape.type) {
                    case "square":
                        this.rect(position.x, position.y, size.width, size.height, shape.isFill);
                        break;
                    case "circle":
                        this.circle(position.x, position.y, size.width, shape.isFill);
                        break;
                }
            }
        });
    }

    rect(_x: number, _y: number, _w: number, _h: number, _isFill: boolean = true, adjust: boolean = false) {
        let [x, y, w, h] = this.scaler.array([_x, _y, _w, _h]);
        if (adjust) [w, h] = this.scaler.array2([_w, _h]);
        if (_isFill) {
            this.ctx.fillRect(x, y, w, h);
        } else {
            this.ctx.strokeRect(x, y, w, h);
        }
    }

    circle(_x: number, _y: number, _radius: number, _isFill: boolean = true) {
        const [x, y] = this.scaler.array([_x, _y]);
        const radius = this.scaler.scale(_radius);

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2); // 円を描画するパスを設定

        if (_isFill) {
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }

    line(_startX: number, _startY: number, _endX: number, _endY: number, lineWidth = 1): void {
        const [startX, startY, endX, endY] = this.scaler.array([_startX, _startY, _endX, _endY]);
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
    }
}
