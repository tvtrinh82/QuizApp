export default class Router {
  constructor(rootElementId) {
    this.routes = {};
    this.rootElement = document.querySelector(rootElementId);

    // Lắng nghe sự kiện click nút back/forward của trình duyệt
    window.addEventListener('popstate', () => this.handleRoute());
  }

  addRoute(path, renderFunction, afterRenderFunction = null) {
    this.routes[path] = { render: renderFunction, afterRender: afterRenderFunction };
  }

  handleRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes['/404'];
    
    if (route && route.render) {
      this.rootElement.innerHTML = route.render();
      if (route.afterRender) {
        // Need a small timeout to ensure DOM is updated before binding events
        setTimeout(() => route.afterRender(), 0);
      }
    } else {
      this.rootElement.innerHTML = `<div class="p-8"><h1 class="text-2xl text-red-500">404 - Không tìm thấy trang</h1></div>`;
    }
  }

  start() {
    this.handleRoute();
  }
}
