// 图片懒加载类
class LazyLoad {
  constructor(el) {
    // 需使用懒加载的图片集合
    this.imglist = Array.from(document.querySelectorAll(el));
    this.init(); // 初始化
  }
  // 获取图片与窗口信息
  getBound(el) {
    let bound = el.getBoundingClientRect();
    let clientHeight = window.innerHeight;
    // 图片距离顶部的距离 <= 浏览器可视化的高度，从而推算出是否需要加载
    return bound.top <= clientHeight - 100; // -100是为了看到效果，您也可以去掉
  }
  // 加载图片
  loadImage(el, index) {
    let src = el.getAttribute("data-src");
    el.src = src;
    // 避免重复判断，已经确定加载的图片应当从imglist移除
    this.imglist.splice(index, 1);
  }
  // 判断是否该图片可以加载
  canLoad() {
    let imglist = this.imglist;
    imglist.forEach((item, index) => {
      this.getBound(item) && this.loadImage(item, index);
    });
  }
  // 当浏览器滚动的时候，继续判断
  bindEvent() {
    window.addEventListener("scroll", () => {
      this.imglist.length && this.canLoad();
    });
  }
  // 初始化
  init() {
    this.canLoad();
    this.bindEvent();
  }
}

// 实例化对象，参数则是需要使用懒加载的图片类名
const lazy = new LazyLoad(".lazyload");
