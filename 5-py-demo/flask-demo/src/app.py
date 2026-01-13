from flask import Flask, jsonify, send_file
from random import randint
from flask_cors import CORS
import os

# 获取当前文件所在目录
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app)  # 启用CORS支持跨域请求

# 预定义食物列表
FOODS = ["麻辣烫", "炸鸡", "火锅", "披萨", "寿司", "面条", "烤肉"]

@app.route('/api/get-food')
def get_food():
    """返回食物列表和随机选中的索引"""
    return jsonify({
        "foods": FOODS,
        "selectedIndex": randint(0, len(FOODS) - 1)
    })

@app.route('/')
def index():
    """返回主页 HTML"""
    html_path = os.path.join(BASE_DIR, 'food-wheel.html')
    return send_file(html_path)

@app.route('/wheel.js')
def wheel_js():
    """返回 wheel.js 文件"""
    js_path = os.path.join(BASE_DIR, 'wheel.js')
    return send_file(js_path, mimetype='application/javascript')

if __name__ == '__main__':
    app.run(debug=True, port=5000)  