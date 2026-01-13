class LuckyWheel {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
    this.radius = Math.min(this.centerX, this.centerY) - 10;
    this.rotation = 0;
    this.isSpinning = false;
    this.foods = [];
    this.targetRotation = 0;
    this.currentSpeed = 0;
    this.selectedIndex = 0;
    this.showResult = false;

    // 颜色数组
    this.colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEEAD",
      "#D4A5A5",
      "#9B59B6",
    ];
  }

  // 计算当前指针指向的扇形索引（指针在中心，指向顶部）
  getCurrentSelectedIndex() {
    if (this.foods.length === 0) return 0;
    // 指针从中心指向顶部（-90度 = 3*PI/2）
    // 转盘逆时针旋转，扇形从顶部开始逆时针排列
    const normalizedRotation =
      ((this.rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const anglePerSegment = (2 * Math.PI) / this.foods.length;
    // 指针指向 -90度（3*PI/2）
    // 在转盘的原始坐标系中，指针指向的角度
    // 转盘旋转了 rotation，所以需要反向计算
    // 指针指向的绝对角度是 3*PI/2
    // 在转盘坐标系中，这个角度对应的原始位置是 3*PI/2 - rotation
    const pointerAngleInWheel =
      ((3 * Math.PI) / 2 - normalizedRotation + 2 * Math.PI) % (2 * Math.PI);
    // 扇形0从 -90度（3*PI/2）开始，每个扇形占据 anglePerSegment
    // 计算指针指向的扇形索引
    let index = Math.floor(pointerAngleInWheel / anglePerSegment);
    // 确保索引在有效范围内
    index = index % this.foods.length;
    return index;
  }

  // 绘制指针（从顶部指向中心，底部宽顶部尖）
  drawPointer() {
    this.ctx.save();

    // 设置阴影效果
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    this.ctx.shadowBlur = 8;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 2;

    // 指针从顶部指向中心（底部宽，顶部尖）
    const pointerLength = this.radius - 5; // 指针稍微短一点
    const bottomWidth = 30; // 底部宽度（宽的部分）

    // 计算顶部点的坐标（在转盘边缘上方，尖的部分）
    const topX = this.centerX;
    const topY = this.centerY - pointerLength;
    // 底部在中心附近（宽的部分）
    const bottomX = this.centerX;
    const bottomY = this.centerY - 20; // 稍微离开中心一点

    // 绘制三角形箭头（底部宽，顶部尖）
    this.ctx.beginPath();
    this.ctx.moveTo(topX, topY); // 起点在顶部（尖的部分）
    // 绘制底部宽的部分
    this.ctx.lineTo(bottomX - bottomWidth / 2, bottomY);
    this.ctx.lineTo(bottomX + bottomWidth / 2, bottomY);
    this.ctx.closePath();

    // 指针样式 - 渐变填充（从顶部到底部）
    const gradient = this.ctx.createLinearGradient(
      topX,
      topY,
      bottomX,
      bottomY
    );
    gradient.addColorStop(0, "#CC0000");
    gradient.addColorStop(1, "#FF6666");
    this.ctx.fillStyle = gradient;
    this.ctx.strokeStyle = "#990000";
    this.ctx.lineWidth = 3;
    this.ctx.fill();
    this.ctx.stroke();

    // 清除阴影
    this.ctx.shadowColor = "transparent";

    this.ctx.restore();
  }

  // 绘制转盘
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 计算当前选中的索引（用于高亮）
    // 始终使用指针实际指向的扇形索引
    const currentSelected = this.getCurrentSelectedIndex();

    // 绘制每个扇形
    this.foods.forEach((food, index) => {
      const startAngle =
        (index * 2 * Math.PI) / this.foods.length + this.rotation;
      const endAngle =
        ((index + 1) * 2 * Math.PI) / this.foods.length + this.rotation;

      // 如果是选中的扇形，添加高亮效果
      const isSelected = index === currentSelected && this.showResult;

      this.ctx.save();

      // 选中效果：添加阴影和边框
      if (isSelected) {
        this.ctx.shadowColor = "rgba(255, 215, 0, 0.9)";
        this.ctx.shadowBlur = 20;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
      }

      this.ctx.beginPath();
      this.ctx.moveTo(this.centerX, this.centerY);
      this.ctx.arc(
        this.centerX,
        this.centerY,
        this.radius,
        startAngle,
        endAngle
      );
      this.ctx.fillStyle = isSelected
        ? this.lightenColor(this.colors[index])
        : this.colors[index];
      this.ctx.fill();

      // 选中边框 - 双层效果
      if (isSelected) {
        // 外层金色边框
        this.ctx.strokeStyle = "#FFD700";
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
        // 内层白色边框
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      }

      this.ctx.restore();

      // 绘制文字
      this.ctx.save();
      this.ctx.translate(this.centerX, this.centerY);
      this.ctx.rotate(startAngle + Math.PI / this.foods.length);
      this.ctx.textAlign = "right";
      this.ctx.fillStyle = isSelected ? "#FFD700" : "#fff";
      this.ctx.font = isSelected ? "bold 18px Arial" : "16px Arial";
      this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      this.ctx.shadowBlur = 3;
      this.ctx.fillText(food, this.radius - 20, 0);
      this.ctx.restore();
    });

    // 绘制中心圆
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, 50, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.strokeStyle = "#CCCCCC";
    this.ctx.lineWidth = 3;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();

    // 绘制指针（在转盘上方，从中心指向顶部）
    this.drawPointer();

    // 如果需要显示结果，在中央绘制结果（确保和指针指向一致）
    if (this.showResult && this.foods.length > 0) {
      this.ctx.save();
      // 绘制结果文字（使用 selectedIndex，已在停止时更新为指针指向的索引）
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = "#FF4444";
      this.ctx.font = "bold 20px Arial";
      this.ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      this.ctx.shadowBlur = 5;
      this.ctx.fillText(
        this.foods[this.selectedIndex],
        this.centerX,
        this.centerY
      );
      this.ctx.restore();
    }
  }

  // 颜色变亮函数（用于选中高亮）
  lightenColor(color) {
    // 处理十六进制颜色
    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + 40);
      const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + 40);
      const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + 40);
      return `rgb(${r}, ${g}, ${b})`;
    }
    // 如果是 RGB 格式，直接返回原色（或可以解析后处理）
    return color;
  }

  // 开始旋转
  async spin() {
    if (this.isSpinning) return;

    try {
      this.showResult = false;
      document.getElementById("spinButton").disabled = true;

      const response = await fetch("http://127.0.0.1:5000/api/get-food");
      const data = await response.json();

      this.selectedIndex = data.selectedIndex;
      this.foods = data.foods;

      // 计算目标角度：确保选中的扇形最终停在指针位置（顶部，-90度）
      // 指针从中心指向顶部（3*PI/2 = -90度）
      const anglePerSegment = (2 * Math.PI) / this.foods.length;
      // 选中扇形的中心角度（从顶部开始，逆时针计算）
      // 扇形0的中心在 -90度 + anglePerSegment/2 = 3*PI/2 + anglePerSegment/2
      const selectedSegmentCenter =
        (3 * Math.PI) / 2 +
        this.selectedIndex * anglePerSegment +
        anglePerSegment / 2;
      // 指针指向 -90度（3*PI/2），需要让选中扇形的中心对齐指针
      // 转盘需要旋转的角度 = 选中扇形中心角度 - 指针角度
      // 这样旋转后，选中扇形的中心会移动到指针位置
      let targetSegmentAngle = selectedSegmentCenter - (3 * Math.PI) / 2;
      // 标准化角度到 [0, 2*PI)
      targetSegmentAngle =
        ((targetSegmentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      // 加上多圈旋转效果（5-8圈随机）
      const extraRotations = (5 + Math.random() * 3) * 2 * Math.PI;
      const targetAngle = extraRotations + targetSegmentAngle;

      // 标准化当前旋转角度
      this.rotation =
        ((this.rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      this.targetRotation = this.rotation + targetAngle;

      this.isSpinning = true;
      this.currentSpeed = 0.3;

      this.animate();
    } catch (error) {
      console.error("获取数据失败:", error);
      document.getElementById("spinButton").disabled = false;
    }
  }

  // 动画效果
  animate() {
    if (!this.isSpinning) return;

    const remaining = this.targetRotation - this.rotation;

    // 当接近目标时，精确停止
    if (Math.abs(remaining) < 0.001) {
      this.rotation = this.targetRotation;
      this.isSpinning = false;
      // 更新选中索引为指针实际指向的扇形
      this.selectedIndex = this.getCurrentSelectedIndex();
      document.getElementById("spinButton").disabled = false;
      this.showResult = true;
      this.draw();
      return;
    }

    // 使用缓动函数，让旋转逐渐减速
    this.currentSpeed = Math.max(0.001, remaining * 0.03);
    this.rotation += this.currentSpeed;

    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// 初始化
async function init() {
  const canvas = document.getElementById("wheelCanvas");
  const wheel = new LuckyWheel(canvas);

  try {
    // 获取初始数据
    const response = await fetch("http://127.0.0.1:5000/api/get-food");
    const data = await response.json();
    wheel.foods = data.foods;
    wheel.draw();

    // 绑定点击事件
    document.getElementById("spinButton").addEventListener("click", () => {
      wheel.spin();
    });
  } catch (error) {
    console.error("初始化失败:", error);
  }
}

// 页面加载完成后初始化
window.addEventListener("load", init);
