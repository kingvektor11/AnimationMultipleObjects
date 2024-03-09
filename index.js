// 获取画布和上下文
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 设置画布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 定义物体数组
const objects = [];

// 定义物体构造函数
function Object(x, y, radius, color, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dx = dx;
  this.dy = dy;

  // 绘制物体的方法
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // 更新物体位置的方法
  this.update = function() {
    this.x += this.dx;
    this.y += this.dy;
    
    // 碰撞检测，反弹
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.draw();
  }
}

// 创建物体
for (let i = 0; i < 10; i++) {
  const radius = Math.random() * 30 + 10; // 随机半径
  const x = Math.random() * (canvas.width - radius * 2) + radius; // 随机x坐标
  const y = Math.random() * (canvas.height - radius * 2) + radius; // 随机y坐标
  const dx = (Math.random() - 0.5) * 5; // 随机水平速度
  const dy = (Math.random() - 0.5) * 5; // 随机垂直速度
  const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`; // 随机颜色

  const obj = new Object(x, y, radius, color, dx, dy);
  objects.push(obj);
}

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 更新并绘制每个物体
  for (let i = 0; i < objects.length; i++) {
    objects[i].update();
  }
}

// 启动动画
animate();
