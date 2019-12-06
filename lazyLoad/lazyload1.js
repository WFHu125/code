class LazyLoad {
  constructor(config) {
    this.imgs = []; // 观察节点集合
    this.io = null; // 实例函数
    // 默认参数
    this.default = {
      root: null
    };
    this.settings = { ...this.default, ...config };
    this.init();
  }

  // 初始化
  init() {
    this.imgs = Array.from(document.querySelectorAll("[data-src]"));
    this.getObserver(); // 实例化
    this.addObserver(); // 开始观察
  }

  // 开始观察,观察节点
  addObserver() {
    this.imgs.forEach(item => {
      this.io.observe(item);
    });
  }
  // 实例化
  getObserver() {
    // 配置，指定可视区域，root默认为浏览器视口
    let options = {
      root: this.settings.root
    };
    console.log(this.settings.root);
    this.io = new IntersectionObserver(entries => {
      entries.forEach(item => {
        // 当前元素可见
        if (item.isIntersecting) {
          this.loadImage(item.target); // 替换图片
          this.io.unobserve(item.target); // 停止观察当前元素，避免不可见时候再次调用callback函数
        }
      });
    }, options);
  }

  // 显示图片
  loadImage(el) {
    el.src = el.dataset.src;
  }
}
// config可不传，不传root默认为浏览器视口
const config = {
  root: document.querySelector(".main")
};
const lazyload = new LazyLoad(config);
