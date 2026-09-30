var e=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n,r=e((()=>{n=class{constructor(e){this.routes={},this.rootElement=document.querySelector(e),window.addEventListener(`popstate`,()=>this.handleRoute())}addRoute(e,t,n=null){this.routes[e]={render:t,afterRender:n}}handleRoute(){let e=window.location.pathname,t=this.routes[e]||this.routes[`/404`];t&&t.render?(this.rootElement.innerHTML=t.render(),t.afterRender&&setTimeout(()=>t.afterRender(),0)):this.rootElement.innerHTML=`<div class="p-8"><h1 class="text-2xl text-red-500">404 - Không tìm thấy trang</h1></div>`}start(){this.handleRoute()}}})),i,a=e((()=>{i=()=>`
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Đăng Nhập</h2>
          <p class="text-gray-500 dark:text-gray-400">Chào mừng bạn quay trở lại Quiz App!</p>
        </div>
        
        <form id="login-form" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" id="email" required class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="admin@quiz.com">
          </div>
          
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mật khẩu</label>
            <input type="password" id="password" required class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 pr-10" placeholder="••••••••">
            <button type="button" class="toggle-password absolute bottom-2 right-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" data-target="password">
              👁️
            </button>
          </div>
          
          <div id="error-message" class="text-red-500 text-sm hidden font-medium"></div>
          
          <button type="submit" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Đăng nhập
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Chưa có tài khoản? 
            <a href="/register" class="font-medium text-blue-600 dark:text-blue-400 hover:underline">Đăng ký ngay</a>
          </p>
        </div>
      </div>
    </div>
  `})),o,s=e((()=>{o=()=>`
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <div class="text-center mb-6">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Đăng Ký</h2>
          <p class="text-gray-500 dark:text-gray-400">Tham gia hệ thống Quiz App ngay!</p>
        </div>
        
        <form id="register-form" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Họ và tên</label>
            <input type="text" id="reg-name" required class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Nguyễn Văn A">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" id="reg-email" required class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="email@quiz.com">
          </div>
          
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mật khẩu</label>
            <input type="password" id="reg-password" required class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 pr-10" placeholder="••••••••">
            <button type="button" class="toggle-password absolute bottom-2 right-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" data-target="reg-password">
              👁️
            </button>
          </div>

          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Xác nhận mật khẩu</label>
            <input type="password" id="reg-confirm-password" required class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 pr-10" placeholder="••••••••">
            <button type="button" class="toggle-password absolute bottom-2 right-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" data-target="reg-confirm-password">
              👁️
            </button>
          </div>

          <div id="reg-error-message" class="text-red-500 text-sm hidden font-medium"></div>
          
          <button type="submit" id="reg-submit-btn" class="w-full flex justify-center py-2.5 px-4 mt-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Đăng ký
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Đã có tài khoản? 
            <a href="/login" class="font-medium text-blue-600 dark:text-blue-400 hover:underline">Đăng nhập</a>
          </p>
        </div>
      </div>
    </div>
  `})),c,l,u=e((()=>{c=`http://localhost:8080`,l={async request(e,t={}){let n=`${c}${e}`,r=localStorage.getItem(`token`),i={"Content-Type":`application/json`,...t.headers};r&&(i.Authorization=`Bearer ${r}`);let a={...t,headers:i};try{let e=await fetch(n,a);if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw console.error(`API Request failed:`,e),e}},get(e){return this.request(e,{method:`GET`})},post(e,t){return this.request(e,{method:`POST`,body:JSON.stringify(t)})},put(e,t){return this.request(e,{method:`PUT`,body:JSON.stringify(t)})},delete(e){return this.request(e,{method:`DELETE`})}}})),d,f,p=e((()=>{d=class{constructor(){this.listeners=[];let e=localStorage.getItem(`user`),t=localStorage.getItem(`token`);this.state={user:e?JSON.parse(e):null,token:t||null}}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}setState(e){this.state={...this.state,...e},e.user!==void 0&&(e.user?localStorage.setItem(`user`,JSON.stringify(e.user)):localStorage.removeItem(`user`)),e.token!==void 0&&(e.token?localStorage.setItem(`token`,e.token):localStorage.removeItem(`token`)),this.listeners.forEach(e=>e(this.state))}getState(){return this.state}},f=new d})),m,ee=e((()=>{u(),p(),m={async login(e,t){try{let{accessToken:n,user:r}=await l.post(`/login`,{email:e,password:t});if(r.status===`locked`)throw Error(`Tài khoản của bạn đã bị khóa bởi Quản trị viên!`);return f.setState({token:n,user:r}),r}catch(e){throw console.error(`Lỗi đăng nhập:`,e),e.message.includes(`khóa`)?e:Error(`Email hoặc mật khẩu không chính xác.`)}},logout(){f.setState({token:null,user:null})},async register(e,t,n=``){try{return await l.post(`/register`,{email:e,password:t,name:n})}catch(e){throw e}}}})),h,g=e((()=>{u(),h={async getUsers(){return await l.get(`/users`)},async deleteUser(e){return await l.delete(`/users/${e}`)},async updateUser(e,t){return await l.request(`/users/${e}`,{method:`PATCH`,body:JSON.stringify(t)})},async createUser(e){return await l.post(`/users`,e)}}})),_,v,y=e((()=>{_=(e,t=`Thông báo`)=>{let n=`
    <div id="global-alert" class="fixed inset-0 flex items-center justify-center z-[9999] bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300">
      <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm transform transition-all p-6 scale-100 border border-white/40">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">${t}</h3>
          <p class="text-sm text-gray-600 mb-6">${e}</p>
          <button id="btn-alert-ok" class="w-full inline-flex justify-center rounded-xl border border-transparent px-4 py-2.5 bg-blue-600 text-base font-bold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm transition-all transform hover:-translate-y-0.5">
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,n);let r=document.getElementById(`global-alert`);document.getElementById(`btn-alert-ok`).addEventListener(`click`,()=>r.remove()),r.addEventListener(`click`,e=>{e.target===r&&r.remove()})},v=(e,t=`Xác nhận`,n)=>{let r=`
    <div id="global-confirm" class="fixed inset-0 flex items-center justify-center z-[9999] bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300">
      <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm transform transition-all p-6 scale-100 border border-white/40">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
            <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">${t}</h3>
          <p class="text-sm text-gray-600 mb-6">${e}</p>
          <div class="flex gap-3 w-full">
            <button id="btn-confirm-cancel" class="flex-1 inline-flex justify-center rounded-xl border border-gray-300 px-4 py-2.5 bg-white text-base font-bold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm transition-all">
              Hủy
            </button>
            <button id="btn-confirm-ok" class="flex-1 inline-flex justify-center rounded-xl border border-transparent px-4 py-2.5 bg-yellow-600 text-base font-bold text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm transition-all transform hover:-translate-y-0.5">
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,r);let i=document.getElementById(`global-confirm`),a=document.getElementById(`btn-confirm-cancel`),o=document.getElementById(`btn-confirm-ok`);a.addEventListener(`click`,()=>i.remove()),i.addEventListener(`click`,e=>{e.target===i&&i.remove()}),o.addEventListener(`click`,()=>{i.remove(),n&&n()})}})),b,te=e((()=>{g(),p(),y(),b={showProfileModal(){let{user:e}=f.getState();if(!e)return;let t=`
      <div id="profile-modal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all p-8 scale-100">
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b dark:border-gray-700 pb-3">Sửa Hồ Sơ Cá Nhân</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Họ Tên</label>
              <input type="text" id="prof-name" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${e.name||``}">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" id="prof-email" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${e.email||``}">
            </div>
            <div class="relative group">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Mật khẩu mới (Để trống nếu không đổi)</label>
              <input type="password" id="prof-pass" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 pr-12" placeholder="••••••••">
              <button type="button" class="toggle-password absolute bottom-2 right-2 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" data-target="prof-pass">
                👁️
              </button>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Số điện thoại</label>
              <input type="text" id="prof-phone" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${e.phone||``}" placeholder="09xxxxxxx">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Quản lý lớp</label>
              <input type="text" id="prof-class" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${e.class_name||``}" placeholder="12A1, 10B2...">
            </div>
            ${e.role===`admin`?`
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Môn giảng dạy</label>
              <input type="text" id="prof-subject" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${e.subject||``}" placeholder="Toán học, Vật lý...">
            </div>
            `:``}
          </div>
          <div class="mt-8 flex justify-end space-x-4">
            <button id="prof-cancel" class="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 font-bold">Hủy</button>
            <button id="prof-submit" class="px-5 py-2.5 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-bold">Lưu thay đổi</button>
          </div>
        </div>
      </div>
    `;document.body.insertAdjacentHTML(`beforeend`,t);let n=document.getElementById(`profile-modal`),r=()=>n.remove();n.addEventListener(`click`,e=>{e.target===n&&r()}),document.querySelectorAll(`#profile-modal .toggle-password`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-target`),n=document.getElementById(t);n&&(n.type===`password`?(n.type=`text`,e.currentTarget.textContent=`🙈`):(n.type=`password`,e.currentTarget.textContent=`👁️`))})}),document.getElementById(`prof-cancel`).addEventListener(`click`,r),document.getElementById(`prof-submit`).addEventListener(`click`,async()=>{let t=document.getElementById(`prof-name`).value.trim(),n=document.getElementById(`prof-email`).value.trim(),i=document.getElementById(`prof-pass`).value.trim(),a=document.getElementById(`prof-phone`).value.trim(),o=document.getElementById(`prof-class`).value.trim(),s=document.getElementById(`prof-subject`),c=s?s.value.trim():e.subject;if(!t||!n){_(`Họ tên và email không được để trống!`,`Lỗi nhập liệu`);return}let l={name:t,email:n,phone:a,class_name:o,subject:c};i&&(l.password=i);try{let t=document.getElementById(`prof-submit`);t.textContent=`Đang lưu...`,t.disabled=!0,await h.updateUser(e.id,l);let n={...e,...l};n.password&&delete n.password;let{token:i}=f.getState();f.setState({token:i,user:n}),r(),alert(`Cập nhật thông tin thành công!`),window.dispatchEvent(new Event(`popstate`))}catch(e){alert(`Lỗi cập nhật hồ sơ: `+e.message),document.getElementById(`prof-submit`).textContent=`Lưu thay đổi`,document.getElementById(`prof-submit`).disabled=!1}})}}})),x,S=e((()=>{a(),s(),ee(),te(),p(),x={renderLogin(){let{user:e}=f.getState();return e?(this.redirectBasedOnRole(e.role),``):i()},afterRenderLogin(){let e=document.getElementById(`login-form`);if(!e)return;document.querySelectorAll(`.toggle-password`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-target`),n=document.getElementById(t);n&&(n.type===`password`?(n.type=`text`,e.currentTarget.textContent=`🙈`):(n.type=`password`,e.currentTarget.textContent=`👁️`))})}),e.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`email`).value,n=document.getElementById(`password`).value,r=document.getElementById(`error-message`);r.classList.add(`hidden`);try{let e=await m.login(t,n);this.redirectBasedOnRole(e.role)}catch(e){r.textContent=e.message,r.classList.remove(`hidden`)}});let t=document.querySelector(`a[href="/register"]`);t&&t.addEventListener(`click`,e=>{e.preventDefault(),window.history.pushState({},``,`/register`),window.dispatchEvent(new Event(`popstate`))})},renderRegister(){let{user:e}=f.getState();return e?(this.redirectBasedOnRole(e.role),``):o()},afterRenderRegister(){let e=document.getElementById(`register-form`);if(!e)return;document.querySelectorAll(`.toggle-password`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-target`),n=document.getElementById(t);n&&(n.type===`password`?(n.type=`text`,e.currentTarget.textContent=`🙈`):(n.type=`password`,e.currentTarget.textContent=`👁️`))})}),e.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`reg-name`).value,n=document.getElementById(`reg-email`).value,r=document.getElementById(`reg-password`).value,i=document.getElementById(`reg-confirm-password`).value,a=document.getElementById(`reg-error-message`),o=document.getElementById(`reg-submit-btn`);if(a.classList.add(`hidden`),r.length<4){a.textContent=`Mật khẩu phải có ít nhất 4 ký tự.`,a.classList.remove(`hidden`);return}if(r!==i){a.textContent=`Mật khẩu xác nhận không khớp.`,a.classList.remove(`hidden`);return}try{o.textContent=`ĐANG XỬ LÝ...`,o.disabled=!0,await m.register(n,r,t),alert(`Tạo tài khoản thành công! Vui lòng đăng nhập.`),window.history.pushState({},``,`/login`),window.dispatchEvent(new Event(`popstate`))}catch{a.textContent=`Đăng ký thất bại. Email có thể đã tồn tại.`,a.classList.remove(`hidden`),o.textContent=`TẠO TÀI KHOẢN`,o.disabled=!1}});let t=document.querySelector(`a[href="/login"]`);t&&t.addEventListener(`click`,e=>{e.preventDefault(),window.history.pushState({},``,`/login`),window.dispatchEvent(new Event(`popstate`))})},redirectBasedOnRole(e){e===`admin`?window.history.pushState({},``,`/admin/dashboard`):window.history.pushState({},``,`/student/dashboard`),window.dispatchEvent(new Event(`popstate`))},logout(){m.logout(),window.history.pushState({},``,`/login`),window.dispatchEvent(new Event(`popstate`))},showProfileModal:b.showProfileModal}})),C,w,T,E,D=e((()=>{S(),p(),y(),C=()=>{localStorage.getItem(`theme`)===`dark`||!(`theme`in localStorage)&&window.matchMedia(`(prefers-color-scheme: dark)`).matches?document.documentElement.classList.add(`dark`):document.documentElement.classList.remove(`dark`),document.body.classList.add(`bg-slate-50`,`dark:bg-slate-900`,`text-slate-900`,`dark:text-slate-100`,`transition-colors`)},w=()=>{document.documentElement.classList.contains(`dark`)?(document.documentElement.classList.remove(`dark`),localStorage.setItem(`theme`,`light`)):(document.documentElement.classList.add(`dark`),localStorage.setItem(`theme`,`dark`))},window.toggleDarkMode=w,T=()=>{let{user:e}=f.getState();if(!e)return``;let t=window.location.pathname,n=``;return n=e.role===`admin`?`
      <a href="/admin/dashboard" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${t===`/admin/dashboard`?`bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300`:`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white`}">Quản lý bộ đề</a>
      <a href="/admin/documents" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${t===`/admin/documents`?`bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300`:`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white`}">Quản lý tài liệu</a>
      <a href="/admin/users" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${t===`/admin/users`?`bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300`:`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white`}">Quản lý người dùng</a>
      <a href="/admin/results" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${t===`/admin/results`?`bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300`:`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white`}">Kết quả bài thi</a>
    `:`
      <a href="/student/dashboard" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${t===`/student/dashboard`?`bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300`:`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white`}">Trang chủ</a>
      <a href="/student/documents" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${t===`/student/documents`?`bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300`:`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white`}">Tài liệu học tập</a>
    `,`
    <header class="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow border-b border-slate-200 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a href="/student/dashboard" class="nav-link-logo text-2xl font-extrabold text-blue-800 dark:text-blue-400 mr-8 hover:opacity-80 transition cursor-pointer">Quiz App</a>
            <nav class="hidden md:flex space-x-4">
              ${n}
            </nav>
          </div>
          <div class="flex items-center gap-2 md:gap-4">
            <button onclick="window.toggleDarkMode()" class="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition focus:outline-none" aria-label="Toggle Dark Mode">
              <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            </button>
            <button id="btn-edit-profile" class="hidden md:flex text-gray-600 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition items-center gap-2">
              <span class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-2">
                👤 <span class="max-w-[100px] truncate">${e.name}</span>
              </span>
            </button>
            <button id="btn-logout" class="hidden md:block text-sm bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded shadow-sm transition">Đăng xuất</button>
            <button id="btn-mobile-menu" class="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded focus:outline-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-menu" class="hidden md:hidden border-t border-gray-200 dark:border-gray-700">
        <div class="px-2 pt-2 pb-3 space-y-1 flex flex-col">
          ${n.replace(/nav-link /g,`nav-link block `)}
        </div>
        <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-3">
           <button id="btn-edit-profile-mobile" class="text-gray-600 dark:text-gray-300 font-medium text-left w-full flex items-center gap-2">
              👤 ${e.name} (Sửa thông tin)
           </button>
           <button id="btn-logout-mobile" class="w-full text-center text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow-sm transition">Đăng xuất</button>
        </div>
      </div>
    </header>
  `},E=()=>{let e=()=>{v(`Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?`,`Đăng xuất`,()=>{x.logout()})},t=document.getElementById(`btn-logout`);t&&t.addEventListener(`click`,e);let n=document.getElementById(`btn-logout-mobile`);n&&n.addEventListener(`click`,e);let r=()=>x.showProfileModal(),i=document.getElementById(`btn-edit-profile`);i&&i.addEventListener(`click`,r);let a=document.getElementById(`btn-edit-profile-mobile`);a&&a.addEventListener(`click`,r);let o=document.getElementById(`btn-mobile-menu`),s=document.getElementById(`mobile-menu`);o&&s&&o.addEventListener(`click`,()=>{s.classList.toggle(`hidden`)}),document.querySelectorAll(`header .nav-link, header .nav-link-logo`).forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault();let t=e.currentTarget.getAttribute(`href`);window.history.pushState({},``,t),window.dispatchEvent(new Event(`popstate`))})})}})),ne,re=e((()=>{p(),S(),ne=e=>{e.addRoute(`/`,()=>{let{user:e}=f.getState();return e?(setTimeout(()=>x.redirectBasedOnRole(e.role),0),``):`<div class="p-8 text-center">
            <h1 class="text-3xl font-bold text-blue-600">Hệ thống thi trắc nghiệm</h1>
            <div class="mt-8 flex justify-center gap-4">
              <button onclick="window.history.pushState({}, '', '/login'); window.dispatchEvent(new Event('popstate'));" class="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">Bắt đầu</button>
            </div>
          </div>`}),e.addRoute(`/login`,()=>x.renderLogin(),()=>x.afterRenderLogin()),e.addRoute(`/register`,()=>x.renderRegister(),()=>x.afterRenderRegister())}})),O,k=e((()=>{u(),O={async getQuizzes(){return await l.get(`/quizzes`)},async getQuizById(e){return await l.get(`/quizzes/${e}?_embed=questions`)},async createQuiz(e){return await l.post(`/quizzes`,e)},async updateQuiz(e,t){return await l.request(`/quizzes/${e}`,{method:`PATCH`,body:JSON.stringify(t)})},async createQuestion(e){return await l.post(`/questions`,e)},async deleteQuiz(e){return await l.delete(`/quizzes/${e}`)}}})),A,ie,ae=e((()=>{A=(e=[])=>e.length===0?`<tr><td colspan="4" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">Không tìm thấy bộ đề nào</td></tr>`:e.map((e,t)=>`
    <tr class="transition-all hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 ${e.status===`locked`?`bg-red-50/30 dark:bg-red-900/10`:t%2==0?`bg-white dark:bg-gray-800`:`bg-gray-50/30 dark:bg-gray-800/50`}">
      <td class="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-gray-100">${e.title}</td>
      <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-300">
        <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${e.duration} phút</span>
      </td>
      <td class="px-6 py-5 whitespace-nowrap text-sm">
        <span class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${!e.status||e.status===`active`?`bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800`:`bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800`}">
          ${!e.status||e.status===`active`?`Đang mở`:`Đã khóa`}
        </span>
      </td>
      <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">
        <div class="flex items-center space-x-4">
          <button data-id="${e.id}" data-status="${e.status||`active`}" class="text-yellow-600 hover:text-yellow-800 transition-colors btn-toggle-quiz-status flex items-center gap-1" title="${!e.status||e.status===`active`?`Đóng`:`Mở lại`}">
            <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${!e.status||e.status===`active`?`M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z`:`M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z`}"></path></svg>
          </button>
          <button data-id="${e.id}" class="text-indigo-600 hover:text-indigo-900 transition-colors btn-edit flex items-center gap-1" title="Sửa & Quản lý câu hỏi">
            <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </button>
          <button data-id="${e.id}" class="text-red-500 hover:text-red-700 transition-colors btn-delete flex items-center gap-1" title="Xóa">
            <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join(``),ie=(e=[])=>`
    <div class="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-8 relative">
      <!-- Simple Header -->
      <div class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 px-6 py-5 flex justify-between items-center">
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          Quản Lý Bộ Đề
        </h3>
        <button id="btn-create-quiz" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-colors flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          <span class="hidden sm:inline">Tạo đề thi mới</span>
        </button>
      </div>
      
      <div class="p-6">
        <!-- Search & Filter -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4 bg-gray-50/50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input type="text" id="search-quiz" placeholder="Tìm kiếm bộ đề theo tên..." class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200">
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-100/80 dark:bg-gray-800/80">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-2/5">Tên bộ đề</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5">Thời gian</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5">Trạng thái</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5">Thao tác</th>
              </tr>
            </thead>
            <tbody id="quiz-tbody" class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              ${A(e)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `})),oe,se=e((()=>{oe=(e,t=[])=>`
    <div class="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-100 overflow-hidden mb-8 relative">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 flex justify-between items-center">
        <div>
          <h3 class="text-2xl font-extrabold text-white flex items-center gap-2 drop-shadow-md">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            ${e.title}
          </h3>
          <p class="text-blue-100 mt-1 font-medium flex items-center gap-1.5 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Thời gian làm bài: ${e.duration} phút
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button id="btn-edit-quiz-info" data-id="${e.id}" class="bg-blue-500 hover:bg-blue-600 text-white border border-blue-400 px-4 py-2 rounded-lg shadow-sm text-sm font-bold transition-all flex items-center gap-2 transform hover:-translate-y-0.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Sửa thông tin
          </button>
          <button onclick="window.history.pushState({}, '', '/admin/dashboard'); window.dispatchEvent(new Event('popstate'));" class="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2 rounded-lg shadow-sm text-sm font-bold transition-all backdrop-blur-md flex items-center gap-2 transform hover:-translate-y-0.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Quay lại
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form thêm câu hỏi -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
          <div class="bg-gray-50/80 px-6 py-4 border-b border-gray-100">
            <h4 class="text-lg font-bold text-gray-800 flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              Thêm câu hỏi mới
            </h4>
          </div>
          <form id="add-question-form" class="p-6 space-y-5 bg-white">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Nội dung câu hỏi</label>
              <textarea id="q-content" required class="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all resize-none text-sm" rows="3" placeholder="Nhập nội dung câu hỏi..."></textarea>
            </div>
            
            <div class="space-y-4">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 font-bold bg-gray-100 rounded px-1.5 text-xs">A</span>
                </div>
                <input type="text" id="q-optA" required class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-all" placeholder="Đáp án A">
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 font-bold bg-gray-100 rounded px-1.5 text-xs">B</span>
                </div>
                <input type="text" id="q-optB" required class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-all" placeholder="Đáp án B">
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 font-bold bg-gray-100 rounded px-1.5 text-xs">C</span>
                </div>
                <input type="text" id="q-optC" required class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-all" placeholder="Đáp án C">
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 font-bold bg-gray-100 rounded px-1.5 text-xs">D</span>
                </div>
                <input type="text" id="q-optD" required class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-all" placeholder="Đáp án D">
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Đáp án đúng</label>
              <select id="q-correct" class="block w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all text-sm font-bold bg-gray-50">
                <option value="A">Đáp án A</option>
                <option value="B">Đáp án B</option>
                <option value="C">Đáp án C</option>
                <option value="D">Đáp án D</option>
              </select>
            </div>

            <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Thêm câu hỏi
            </button>
          </form>
        </div>
      </div>

      <!-- Danh sách câu hỏi -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h4 class="text-lg font-bold text-gray-800 flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              Danh sách câu hỏi
            </h4>
            <span class="bg-indigo-100 text-indigo-800 text-xs font-extrabold px-3 py-1 rounded-full border border-indigo-200">
              ${t.length} câu
            </span>
          </div>
          
          <div class="p-6 space-y-4 bg-gray-50/30">
            ${t.length===0?`
              <div class="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <div class="text-4xl mb-3">📝</div>
                <p class="text-gray-500 font-medium">Chưa có câu hỏi nào trong đề thi này.</p>
                <p class="text-gray-400 text-sm mt-1">Hãy bắt đầu thêm câu hỏi ở form bên trái.</p>
              </div>
            `:``}
            
            ${t.map((e,t)=>`
              <div class="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <p class="font-bold text-gray-800 text-lg mb-4 pl-3">
                  <span class="text-indigo-600 mr-1">Câu ${t+1}:</span> ${e.content}
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-3">
                  <div class="flex items-start gap-2 p-2 rounded-lg border ${e.correctOption===`A`?`bg-green-50 border-green-200`:`bg-gray-50 border-transparent`}">
                    <span class="font-bold text-xs px-1.5 py-0.5 rounded ${e.correctOption===`A`?`bg-green-500 text-white`:`bg-gray-200 text-gray-600`}">A</span>
                    <span class="text-sm ${e.correctOption===`A`?`text-green-800 font-bold`:`text-gray-600`}">${e.options.A}</span>
                  </div>
                  <div class="flex items-start gap-2 p-2 rounded-lg border ${e.correctOption===`B`?`bg-green-50 border-green-200`:`bg-gray-50 border-transparent`}">
                    <span class="font-bold text-xs px-1.5 py-0.5 rounded ${e.correctOption===`B`?`bg-green-500 text-white`:`bg-gray-200 text-gray-600`}">B</span>
                    <span class="text-sm ${e.correctOption===`B`?`text-green-800 font-bold`:`text-gray-600`}">${e.options.B}</span>
                  </div>
                  <div class="flex items-start gap-2 p-2 rounded-lg border ${e.correctOption===`C`?`bg-green-50 border-green-200`:`bg-gray-50 border-transparent`}">
                    <span class="font-bold text-xs px-1.5 py-0.5 rounded ${e.correctOption===`C`?`bg-green-500 text-white`:`bg-gray-200 text-gray-600`}">C</span>
                    <span class="text-sm ${e.correctOption===`C`?`text-green-800 font-bold`:`text-gray-600`}">${e.options.C}</span>
                  </div>
                  <div class="flex items-start gap-2 p-2 rounded-lg border ${e.correctOption===`D`?`bg-green-50 border-green-200`:`bg-gray-50 border-transparent`}">
                    <span class="font-bold text-xs px-1.5 py-0.5 rounded ${e.correctOption===`D`?`bg-green-500 text-white`:`bg-gray-200 text-gray-600`}">D</span>
                    <span class="text-sm ${e.correctOption===`D`?`text-green-800 font-bold`:`text-gray-600`}">${e.options.D}</span>
                  </div>
                </div>
              </div>
            `).join(``)}
          </div>
        </div>
      </div>
    </div>
  `})),j,M,ce=e((()=>{k(),ae(),se(),p(),y(),j=(e,t)=>{let n=[15,30,45,60],r=e?.duration??45;n.includes(r)||n.unshift(r);let i=n.map(e=>`
    <option value="${e}" ${e===r?`selected`:``}>${e} phút</option>
  `).join(``),a=`
    <div id="quiz-modal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg p-8">
        <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-6">${e?`Sửa thông tin bộ đề`:`Tạo bộ đề mới`}</h3>
        <form id="quiz-form" class="space-y-4">
          <div>
            <label for="modal-title" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Tên bộ đề</label>
            <input id="modal-title" type="text" required class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" value="${e?.title||``}">
          </div>
          <div>
            <label for="modal-duration" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Thời gian (phút)</label>
            <select id="modal-duration" required class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
              ${i}
            </select>
          </div>
          <div>
            <label for="modal-subject" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Môn học</label>
            <input id="modal-subject" type="text" class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" value="${e?.subject||``}">
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" id="quiz-cancel" class="px-5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300">Hủy</button>
            <button type="submit" class="px-5 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  `;document.body.insertAdjacentHTML(`beforeend`,a);let o=document.getElementById(`quiz-modal`),s=()=>o.remove();document.getElementById(`quiz-cancel`).addEventListener(`click`,s),o.addEventListener(`click`,e=>{e.target===o&&s()}),document.getElementById(`quiz-form`).addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`modal-title`).value.trim(),r=Number.parseInt(document.getElementById(`modal-duration`).value,10),i=document.getElementById(`modal-subject`).value.trim();if(!n||!Number.isInteger(r)||r<=0){_(`Vui lòng nhập tên bộ đề và thời gian hợp lệ.`,`Lỗi nhập liệu`);return}s(),t(n,r,i)})},M={currentQuizzes:[],async renderDashboard(){try{let{user:e}=f.getState(),t=await O.getQuizzes();return this.currentQuizzes=e.subject?t.filter(t=>t.subject&&t.subject.toLowerCase()===(e.subject||``).toLowerCase()):t,ie(this.currentQuizzes)}catch(e){return`<p class="text-red-500">Lỗi tải danh sách bộ đề: ${e.message}</p>`}},afterRenderDashboard(){let e=document.getElementById(`search-quiz`),t=document.getElementById(`quiz-tbody`);e&&t&&e.addEventListener(`input`,e=>{let n=e.target.value.toLowerCase(),r=this.currentQuizzes.filter(e=>e.title.toLowerCase().includes(n));t.innerHTML=A?A(r):``,this.bindQuizRowEvents()}),this.bindQuizRowEvents();let n=document.getElementById(`btn-create-quiz`);n&&n.addEventListener(`click`,()=>{j(null,async(e,t,n)=>{await O.createQuiz({title:e,duration:t,subject:n}),window.dispatchEvent(new Event(`popstate`))})})},bindQuizRowEvents(){document.querySelectorAll(`.btn-toggle-quiz-status`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`),n=e.currentTarget.getAttribute(`data-status`),r=!n||n===`active`?`locked`:`active`,i=r===`locked`?`đóng`:`mở lại`;v(`Bạn có chắc chắn muốn ${i} bộ đề này? Học sinh sẽ ${r===`locked`?`không thể`:`có thể`} làm bài.`,i===`đóng`?`Đóng bộ đề`:`Mở lại bộ đề`,async()=>{await O.updateQuiz(t,{status:r}),window.dispatchEvent(new Event(`popstate`))})})}),document.querySelectorAll(`.btn-delete`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`);v(`Bạn có chắc chắn muốn xóa bộ đề này?`,`Xóa bộ đề`,async()=>{await O.deleteQuiz(t),window.dispatchEvent(new Event(`popstate`))})})}),document.querySelectorAll(`.btn-edit-info`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`),n=this.currentQuizzes.find(e=>e.id===t);n&&j(n,async(e,n,r)=>{await O.updateQuiz(t,{title:e,duration:n,subject:r}),window.dispatchEvent(new Event(`popstate`))})})}),document.querySelectorAll(`.btn-edit`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`);window.history.pushState({},``,`/admin/quiz?id=${t}`),window.dispatchEvent(new Event(`popstate`))})})},currentQuizDetail:null,async renderQuizDetail(e){try{let t=await O.getQuizById(e);return this.currentQuizDetail=t,oe(t,t.questions)}catch(e){return`<p class="text-red-500">Không tìm thấy bộ đề: ${e.message}</p>`}},afterRenderQuizDetail(e){let t=document.getElementById(`btn-edit-quiz-info`);t&&this.currentQuizDetail&&t.addEventListener(`click`,()=>{j(this.currentQuizDetail,async(t,n,r)=>{await O.updateQuiz(e,{title:t,duration:n,subject:r}),window.dispatchEvent(new Event(`popstate`))})});let n=document.getElementById(`add-question-form`);n&&n.addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`q-content`).value,r=document.getElementById(`q-optA`).value,i=document.getElementById(`q-optB`).value,a=document.getElementById(`q-optC`).value,o=document.getElementById(`q-optD`).value,s=document.getElementById(`q-correct`).value,c={quizId:e,content:n,options:{A:r,B:i,C:a,D:o},correctOption:s};try{await O.createQuestion(c),window.dispatchEvent(new Event(`popstate`))}catch(e){_(`Lỗi khi thêm câu hỏi: `+e.message,`Lỗi`)}})}}})),N,P,le=e((()=>{N=(e=[])=>e.length===0?`<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">Không tìm thấy người dùng nào</td></tr>`:e.map((e,t)=>`
    <tr class="transition-all hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 ${e.status===`locked`?`bg-red-50/30 dark:bg-red-900/10`:t%2==0?`bg-white dark:bg-gray-800`:`bg-gray-50/30 dark:bg-gray-800/50`}">
      <td class="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
          ${e.name.charAt(0).toUpperCase()}
        </div>
        ${e.name}
      </td>
      <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">${e.email}</td>
      <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
        <select data-id="${e.id}" class="role-select block w-full pl-3 pr-8 py-1.5 text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm transition-all">
          <option value="student" ${e.role===`student`?`selected`:``}>Học sinh</option>
          <option value="admin" ${e.role===`admin`?`selected`:``}>Giáo viên</option>
        </select>
      </td>
      <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
        <span class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${!e.status||e.status===`active`?`bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800`:`bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800`}">
          ${!e.status||e.status===`active`?`Hoạt động`:`Đã khóa`}
        </span>
      </td>
      <td class="px-6 py-5 whitespace-nowrap text-sm font-medium space-x-3">
        <div class="flex items-center space-x-4">
          <button data-id="${e.id}" data-status="${e.status||`active`}" class="text-yellow-600 hover:text-yellow-800 transition-colors btn-toggle-lock flex items-center gap-1" title="${!e.status||e.status===`active`?`Khóa`:`Mở khóa`}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${!e.status||e.status===`active`?`M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z`:`M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z`}"></path></svg>
          </button>
          <button data-id="${e.id}" class="text-red-500 hover:text-red-700 transition-colors btn-delete-user flex items-center gap-1" title="Xóa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join(``),P=(e=[])=>`
    <div class="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-8 relative">
      <!-- Simple Header -->
      <div class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 px-6 py-5 flex justify-between items-center">
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Quản Lý Người Dùng
        </h3>
        <button id="btn-add-user" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-colors flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          <span class="hidden sm:inline">Thêm người dùng</span>
        </button>
      </div>
      
      <div class="p-6">
        <!-- Search & Filters -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4 bg-gray-50/50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input type="text" id="search-user" placeholder="Tìm kiếm họ tên hoặc email..." class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200">
          </div>
          <div class="w-full sm:w-48 relative">
            <select id="filter-user-role" class="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200 appearance-none">
              <option value="all">Tất cả vai trò</option>
              <option value="student">Học sinh</option>
              <option value="admin">Giáo viên</option>
            </select>
          </div>
          <div class="w-full sm:w-48 relative">
            <select id="filter-user-status" class="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200 appearance-none">
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="locked">Đã khóa</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-100/80 dark:bg-gray-800/80">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Họ Tên</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vai Trò</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trạng Thái</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody id="user-tbody" class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              ${N(e)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `})),F,ue=e((()=>{g(),p(),le(),y(),F={currentUsers:[],async renderUsers(){try{let{user:e}=f.getState();return e.role===`admin`?(this.currentUsers=await h.getUsers(),P(this.currentUsers)):`<p class="text-red-500 text-center mt-10 text-xl font-bold">Bạn không có quyền truy cập trang này!</p>`}catch(e){return`<p class="text-red-500">Lỗi tải danh sách người dùng: ${e.message}</p>`}},afterRenderUsers(){let e=document.getElementById(`search-user`),t=document.getElementById(`filter-user-role`),n=document.getElementById(`filter-user-status`),r=document.getElementById(`user-tbody`),i=()=>{if(!r||!N)return;let i=e.value.toLowerCase(),a=t.value,o=n.value,s=this.currentUsers.filter(e=>{let t=(e.name||``).toLowerCase().includes(i)||(e.email||``).toLowerCase().includes(i),n=a===`all`||e.role===a,r=e.status||`active`;return t&&n&&(o===`all`||r===o)});r.innerHTML=N(s),this.bindUserRowEvents()};e&&e.addEventListener(`input`,i),t&&t.addEventListener(`change`,i),n&&n.addEventListener(`change`,i),this.bindUserRowEvents();let a=document.getElementById(`btn-add-user`);a&&a.addEventListener(`click`,()=>{document.body.insertAdjacentHTML(`beforeend`,`
          <div id="user-modal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all p-8 scale-100">
              <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-6 border-b dark:border-slate-700 pb-3">👤 Thêm Người Dùng</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Họ Tên</label>
                  <input type="text" id="mu-name" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Nguyễn Văn A">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input type="email" id="mu-email" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="email@quiz.com">
                </div>
                <div class="relative group">
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Mật khẩu</label>
                  <input type="password" id="mu-pass" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 pr-12" value="123456">
                  <button type="button" class="toggle-password absolute bottom-2 right-2 flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300" data-target="mu-pass">
                    👁️
                  </button>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Vai trò</label>
                  <select id="mu-role" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500">
                    <option value="student">Học sinh</option>
                    <option value="admin">Giáo viên</option>
                  </select>
                </div>
                <div id="mu-subject-group" class="hidden">
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Môn giảng dạy (Chỉ dành cho GV)</label>
                  <input type="text" id="mu-subject" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Toán học, Vật lý...">
                </div>
              </div>
              <div class="mt-8 flex justify-end space-x-4">
                <button id="mu-cancel" class="px-5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">Hủy</button>
                <button id="mu-submit" class="px-5 py-2.5 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700">Tạo mới</button>
              </div>
            </div>
          </div>
        `);let e=document.getElementById(`user-modal`),t=()=>e.remove();e.addEventListener(`click`,n=>{n.target===e&&t()}),document.querySelectorAll(`#user-modal .toggle-password`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-target`),n=document.getElementById(t);n&&(n.type===`password`?(n.type=`text`,e.currentTarget.textContent=`🙈`):(n.type=`password`,e.currentTarget.textContent=`👁️`))})}),document.getElementById(`mu-role`).addEventListener(`change`,e=>{let t=document.getElementById(`mu-subject-group`);e.target.value===`admin`?t.classList.remove(`hidden`):t.classList.add(`hidden`)}),document.getElementById(`mu-cancel`).addEventListener(`click`,t),document.getElementById(`mu-submit`).addEventListener(`click`,async()=>{let e=document.getElementById(`mu-name`).value.trim(),n=document.getElementById(`mu-email`).value.trim(),r=document.getElementById(`mu-pass`).value.trim(),i=document.getElementById(`mu-role`).value,a=i===`admin`?document.getElementById(`mu-subject`).value.trim():``;if(!e||!n||r.length<4){_(`Vui lòng nhập đầy đủ thông tin (Mật khẩu tối thiểu 4 ký tự)!`,`Lỗi nhập liệu`);return}try{await h.createUser({name:e,email:n,password:r,role:i,subject:a,status:`active`}),t(),window.dispatchEvent(new Event(`popstate`))}catch{_(`Lỗi tạo người dùng (Email có thể đã tồn tại)`,`Lỗi`)}})})},bindUserRowEvents(){document.querySelectorAll(`.btn-delete-user`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`);v(`Bạn có chắc chắn muốn xóa người dùng này? Hành động không thể hoàn tác.`,`Xóa người dùng`,async()=>{await h.deleteUser(t),window.dispatchEvent(new Event(`popstate`))})})}),document.querySelectorAll(`.role-select`).forEach(e=>{e.addEventListener(`change`,e=>{let t=e.target.getAttribute(`data-id`),n=e.target.value;v(`Bạn có chắc chắn muốn thay đổi quyền của người dùng này?`,`Đổi quyền`,async()=>{await h.updateUser(t,{role:n}),window.dispatchEvent(new Event(`popstate`))},()=>{window.dispatchEvent(new Event(`popstate`))})})}),document.querySelectorAll(`.btn-toggle-lock`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`),n=e.currentTarget.getAttribute(`data-status`)===`locked`?`active`:`locked`,r=n===`locked`?`khóa`:`mở khóa`;v(`Bạn có chắc chắn muốn ${r} tài khoản này?`,r===`khóa`?`Khóa tài khoản`:`Mở khóa tài khoản`,async()=>{await h.updateUser(t,{status:n}),window.dispatchEvent(new Event(`popstate`))})})})}}})),I,L=e((()=>{u(),I={async getResults(){return await l.get(`/results?_expand=user&_expand=quiz`)},async saveResult(e){return await l.post(`/results`,e)}}})),R,z,de=e((()=>{R=(e=[])=>e.length===0?`<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">Không tìm thấy kết quả nào</td></tr>`:e.map((e,t)=>{let n=new Date(e.timestamp).toLocaleString(`vi-VN`),r=e.timeSpent?Math.floor(e.timeSpent/60)+`p `+e.timeSpent%60+`s`:`N/A`;return`
      <tr class="transition-all hover:bg-violet-50/50 dark:hover:bg-violet-900/20 ${t%2==0?`bg-white dark:bg-gray-800`:`bg-gray-50/30 dark:bg-gray-800/50`}">
        <td class="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            ${(e.user?.name||`A`).charAt(0).toUpperCase()}
          </div>
          ${e.user?.name||`Ẩn danh`}
        </td>
        <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">${e.quiz?.title||`Đề đã xóa`}</td>
        <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 font-medium">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            ${e.correctCount} / ${e.totalQuestions}
          </span>
        </td>
        <td class="px-6 py-5 whitespace-nowrap text-sm">
          <span class="px-3 py-1 inline-flex text-sm font-bold rounded-full shadow-sm ${e.score>=5?`bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800`:`bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800`}">
            ${e.score.toFixed(1)}
          </span>
        </td>
        <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-medium">${r}</td>
        <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${n}</td>
      </tr>
    `}).join(``),z=(e=[])=>`
    <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8 relative">
      <!-- Gradient Header -->
      <div class="bg-gradient-to-r from-violet-600 to-fuchsia-700 dark:from-violet-800 dark:to-fuchsia-900 px-6 py-5 flex justify-between items-center">
        <h3 class="text-xl font-bold text-white flex items-center gap-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          Kết Quả Thi Của Học Sinh
        </h3>
      </div>
      
      <div class="p-6">
        <!-- Search & Filters -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4 bg-gray-50/50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input type="text" id="search-result" placeholder="Tìm kiếm theo học sinh hoặc đề thi..." class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-violet-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200">
          </div>
          <div class="w-full sm:w-48 relative">
            <select id="filter-result-score" class="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-violet-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200 appearance-none">
              <option value="all">Tất cả điểm số</option>
              <option value="pass">Đạt (>= 5)</option>
              <option value="fail">Chưa đạt (< 5)</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-100/80 dark:bg-gray-800/80">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Học Sinh</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Đề Thi</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Số Câu Đúng</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Điểm Số</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thời Gian Làm</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ngày Làm</th>
              </tr>
            </thead>
            <tbody id="result-tbody" class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              ${R(e)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `})),B,fe=e((()=>{L(),p(),de(),B={currentResults:[],async renderResults(){try{let{user:e}=f.getState(),t=(await I.getResults()).reverse();return e.subject&&(t=t.filter(t=>t.quiz&&t.quiz.subject&&t.quiz.subject.toLowerCase()===(e.subject||``).toLowerCase())),this.currentResults=t,z(this.currentResults)}catch(e){return`<p class="text-red-500">Lỗi tải danh sách kết quả: ${e.message}</p>`}},afterRenderResults(){let e=document.getElementById(`search-result`),t=document.getElementById(`filter-result-score`),n=document.getElementById(`result-tbody`),r=()=>{if(!n||!R)return;let r=e.value.toLowerCase(),i=t.value,a=this.currentResults.filter(e=>{let t=(e.user?.name||``).toLowerCase(),n=(e.quiz?.title||``).toLowerCase(),a=t.includes(r)||n.includes(r),o=!0;return i===`pass`&&(o=e.score>=5),i===`fail`&&(o=e.score<5),a&&o});n.innerHTML=R(a)};e&&e.addEventListener(`input`,r),t&&t.addEventListener(`change`,r)}}})),V,H,U=e((()=>{V=`http://localhost:3001/documents`,H={async getDocuments(){let e=await fetch(V);if(!e.ok)throw Error(`Không thể tải tài liệu`);return e.json()},async getDocument(e){let t=await fetch(`${V}/${e}`);if(!t.ok)throw Error(`Không thể tải tài liệu`);return t.json()},async addDocument(e){let t=await fetch(V,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});if(!t.ok)throw Error(`Không thể thêm tài liệu`);return t.json()},async updateDocument(e,t){let n=await fetch(`${V}/${e}`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`Không thể cập nhật tài liệu`);return n.json()},async deleteDocument(e){let t=await fetch(`${V}/${e}`,{method:`DELETE`});if(!t.ok)throw Error(`Không thể xóa tài liệu`);return t.json()}}})),W,pe=e((()=>{W=e=>`
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 sm:p-8 animate-fade-in-up">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Quản Lý Tài Liệu Học Tập</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Danh sách tài liệu tham khảo cho học sinh.</p>
        </div>
        <button id="btn-add-document" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Thêm tài liệu mới
        </button>
      </div>

      <!-- Khung hiển thị danh sách tài liệu -->
      <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead class="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Tên tài liệu</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Môn học</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Ngày đăng</th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            ${e.length===0?`
              <tr><td colspan="4" class="px-6 py-8 text-center text-slate-500 dark:text-slate-400 italic">Chưa có tài liệu nào.</td></tr>
            `:e.map(e=>`
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-slate-900 dark:text-slate-100 truncate max-w-[200px] sm:max-w-xs" title="${e.title}">${e.title}</div>
                      ${e.description?`<div class="text-sm text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs" title="${e.description}">${e.description}</div>`:``}
                      <a href="${e.link}" target="_blank" class="text-xs text-blue-500 dark:text-blue-400 hover:underline">Xem/Tải file</a>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                    ${e.subject}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  ${new Date(e.createdAt).toLocaleDateString(`vi-VN`)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button class="btn-edit-document text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4 transition" data-id="${e.id}">Sửa</button>
                  <button class="btn-delete-document text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition" data-id="${e.id}">Xóa</button>
                </td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `})),me,he=e((()=>{U(),pe(),p(),me={async renderDocuments(){let e=document.getElementById(`admin-content`);if(!e)return;let{user:t}=f.getState();if(t)try{e.innerHTML=`<div class="text-center py-10"><div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div></div>`;let n=await H.getDocuments();t.subject&&(n=n.filter(e=>e.subject===t.subject)),n.sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)),e.innerHTML=W(n);let r=document.getElementById(`btn-add-document`);r&&r.addEventListener(`click`,()=>{this.showDocumentModal(null,t,async e=>{await H.addDocument(e),this.renderDocuments()})}),document.querySelectorAll(`.btn-edit-document`).forEach(e=>{e.addEventListener(`click`,async e=>{let r=e.currentTarget.getAttribute(`data-id`),i=n.find(e=>e.id==r);i&&this.showDocumentModal(i,t,async e=>{await H.updateDocument(r,e),this.renderDocuments()})})}),document.querySelectorAll(`.btn-delete-document`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`);confirm(`Bạn có chắc muốn xóa tài liệu này?`)&&H.deleteDocument(t).then(()=>this.renderDocuments())})})}catch(t){e.innerHTML=`<div class="text-red-500 py-10 text-center">Lỗi: ${t.message}</div>`}},showDocumentModal(e,t,n){let r=!!e,i=t.subject||e?.subject||``,a=`
      <div id="doc-modal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all p-8 scale-100">
          <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-6 border-b dark:border-slate-700 pb-3">${r?`Sửa Tài Liệu`:`Thêm Tài Liệu Mới`}</h3>
          <form id="doc-form" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Tên tài liệu</label>
              <input type="text" id="doc-title" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${e?.title||``}" required>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Môn học</label>
              ${t.subject?`<input type="text" id="doc-subject" class="block w-full px-4 py-2 bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-300 rounded-lg" value="${i}" readonly>`:`
                <select id="doc-subject" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" required>
                  <option value="">-- Chọn môn học --</option>
                  <option value="Toán học" ${i===`Toán học`?`selected`:``}>Toán học</option>
                  <option value="Vật lý" ${i===`Vật lý`?`selected`:``}>Vật lý</option>
                  <option value="Hóa học" ${i===`Hóa học`?`selected`:``}>Hóa học</option>
                  <option value="Sinh học" ${i===`Sinh học`?`selected`:``}>Sinh học</option>
                  <option value="Ngữ văn" ${i===`Ngữ văn`?`selected`:``}>Ngữ văn</option>
                  <option value="Lịch sử" ${i===`Lịch sử`?`selected`:``}>Lịch sử</option>
                  <option value="Địa lý" ${i===`Địa lý`?`selected`:``}>Địa lý</option>
                  <option value="Tiếng Anh" ${i===`Tiếng Anh`?`selected`:``}>Tiếng Anh</option>
                  <option value="Giáo dục công dân" ${i===`Giáo dục công dân`?`selected`:``}>Giáo dục công dân</option>
                  <option value="Tin học" ${i===`Tin học`?`selected`:``}>Tin học</option>
                </select>
                `}
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Đường dẫn (Link)</label>
              <input type="url" id="doc-link" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="https://drive.google.com/..." value="${e?.link||``}" required>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Mô tả ngắn</label>
              <textarea id="doc-desc" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" rows="3">${e?.description||``}</textarea>
            </div>
            
            <div class="mt-8 flex justify-end space-x-4">
              <button type="button" id="doc-cancel" class="px-5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 font-bold transition">Hủy</button>
              <button type="submit" class="px-5 py-2.5 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-bold transition">Lưu</button>
            </div>
          </form>
        </div>
      </div>
    `;document.body.insertAdjacentHTML(`beforeend`,a);let o=document.getElementById(`doc-modal`),s=()=>o.remove();document.getElementById(`doc-cancel`).addEventListener(`click`,s),o.addEventListener(`click`,e=>{e.target===o&&s()}),document.getElementById(`doc-form`).addEventListener(`submit`,i=>{i.preventDefault(),n({title:document.getElementById(`doc-title`).value.trim(),subject:document.getElementById(`doc-subject`).value,link:document.getElementById(`doc-link`).value.trim(),description:document.getElementById(`doc-desc`).value.trim(),createdAt:r?e.createdAt:new Date().toISOString(),authorId:r?e.authorId:t.id}),s()})}}})),G,ge=e((()=>{ce(),ue(),fe(),he(),G={...M,...F,...B,...me}})),_e,ve=e((()=>{p(),S(),ge(),D(),_e=e=>{e.addRoute(`/admin/dashboard`,()=>{let{user:e}=f.getState();return!e||e.role!==`admin`?(x.redirectBasedOnRole(e?.role),``):`
      ${T()}
      <main id="admin-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p>Đang tải...</p>
      </main>
    `},async()=>{E();let e=document.getElementById(`admin-main`);e&&(e.innerHTML=await G.renderDashboard(),G.afterRenderDashboard())}),e.addRoute(`/admin/quiz`,()=>{let{user:e}=f.getState();return!e||e.role!==`admin`?(x.redirectBasedOnRole(e?.role),``):`
      ${T()}
      <main id="quiz-detail-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p>Đang tải...</p>
      </main>
    `},async()=>{E();let e=document.getElementById(`quiz-detail-main`);if(e){let t=new URLSearchParams(window.location.search).get(`id`);t?(e.innerHTML=await G.renderQuizDetail(t),G.afterRenderQuizDetail(t)):e.innerHTML=`<p class="text-red-500">ID bộ đề không hợp lệ</p>`}}),e.addRoute(`/admin/users`,()=>{let{user:e}=f.getState();return!e||e.role!==`admin`?(x.redirectBasedOnRole(e?.role),``):`
      ${T()}
      <main id="admin-users-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p>Đang tải...</p>
      </main>
    `},async()=>{E();let e=document.getElementById(`admin-users-main`);e&&(e.innerHTML=await G.renderUsers(),G.afterRenderUsers())}),e.addRoute(`/admin/results`,()=>{let{user:e}=f.getState();return!e||e.role!==`admin`?(x.redirectBasedOnRole(e?.role),``):`
      ${T()}
      <main id="admin-results-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p>Đang tải...</p>
      </main>
    `},async()=>{E();let e=document.getElementById(`admin-results-main`);e&&(e.innerHTML=await G.renderResults(),G.afterRenderResults())}),e.addRoute(`/admin/documents`,()=>{let{user:e}=f.getState();return!e||e.role!==`admin`?(x.redirectBasedOnRole(e?.role),``):`
      ${T()}
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div id="admin-content"></div>
      </main>
    `},async()=>{E(),await G.renderDocuments()})}})),K,ye,be=e((()=>{K=(e=[],t=[])=>e.length===0?`
      <div class="col-span-full text-center py-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div class="text-6xl mb-4">📭</div>
        <p class="text-xl text-slate-500 dark:text-slate-400 font-medium">Hiện tại không có bộ đề nào phù hợp.</p>
        <p class="text-slate-400 dark:text-slate-500 mt-2">Vui lòng quay lại sau nhé!</p>
      </div>
    `:e.map((e,n)=>{let r=t.filter(t=>t.quizId===e.id),i=r.length>0,a=i?Math.max(...r.map(e=>e.score)):null;return`
      <div class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 flex flex-col h-full relative">
        ${i?`
          <div class="absolute top-4 left-4 z-10 bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold border border-green-200 dark:border-green-800 shadow-sm flex items-center gap-1">
            <span>🏆 Đỉnh: ${a.toFixed(1)}</span>
          </div>
        `:``}
        <div class="h-28 bg-slate-100 dark:bg-slate-700/50 relative p-6 flex items-end border-b border-slate-200 dark:border-slate-700">
          <div class="absolute top-4 right-4 bg-white dark:bg-slate-600 rounded-full p-2 text-slate-400 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <h4 class="font-bold text-xl text-slate-800 dark:text-slate-100 leading-tight line-clamp-2">${e.title}</h4>
        </div>
        
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex items-center gap-4 text-slate-600 dark:text-slate-300 text-sm font-medium mb-6">
            <div class="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ${e.duration} phút
            </div>
            <div class="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ${e.questions?.length||0} câu
            </div>
          </div>
          
          <div class="mt-auto">
            <button data-id="${e.id}" class="w-full relative inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 btn-start-quiz shadow-md hover:shadow-lg overflow-hidden group-hover:scale-[1.02] ${i?`bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-600`:``}">
              <span class="relative z-10 flex items-center gap-2">
                ${i?`LÀM LẠI BÀI`:`BẮT ĐẦU THI`}
                <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    `}).join(``),ye=(e=[],t=[],n=null,r=[])=>{let i=t.length,a=i>0?(t.reduce((e,t)=>e+t.score,0)/i).toFixed(1):0,o=t.reduce((e,t)=>e+(t.correctCount||0),0),s=[...new Set(e.map(e=>e.subject).filter(e=>e))];return`
    <div class="relative min-h-screen -mt-6">
      <!-- Decorative background -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10"></div>
      
      <!-- Stats Banner -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-900 rounded-3xl shadow-xl overflow-hidden mb-10 mt-6 relative text-white flex flex-col md:flex-row items-center justify-between p-8 md:p-10">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTUgNWgxMHYxMEg1eiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div class="relative z-10 text-center md:text-left mb-6 md:mb-0">
          <h2 class="text-3xl font-extrabold mb-2 tracking-tight text-white">Chào mừng, ${n?.name||`Học sinh`}! 👋</h2>
          <p class="text-indigo-200 text-lg">Tiếp tục rèn luyện và phá vỡ kỷ lục của chính bạn.</p>
        </div>
        
        <div class="relative z-10 flex flex-wrap justify-center gap-4 md:gap-6">
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/20 shadow-inner text-center w-28 md:w-32">
            <div class="text-2xl md:text-3xl font-black text-white">${i}</div>
            <div class="text-indigo-200 text-[10px] md:text-xs font-semibold uppercase mt-1">Bài đã làm</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/20 shadow-inner text-center w-28 md:w-32">
            <div class="text-2xl md:text-3xl font-black text-white">${a}</div>
            <div class="text-indigo-200 text-[10px] md:text-xs font-semibold uppercase mt-1">Điểm TB</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/20 shadow-inner text-center w-28 md:w-32">
            <div class="text-2xl md:text-3xl font-black text-white">${o}</div>
            <div class="text-indigo-200 text-[10px] md:text-xs font-semibold uppercase mt-1">Câu đúng</div>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Cột Trái: Đề thi & Lịch sử -->
        <div class="w-full lg:w-2/3">
          <!-- Filters & Quizzes -->
          <div class="px-2 mb-12">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h3 class="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span class="text-indigo-600 dark:text-indigo-400">📚</span> Đề thi đang mở
              </h3>
              <div class="flex gap-4">
                <input type="text" id="search-quiz-student" placeholder="Tìm kiếm bộ đề..." class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full md:w-64 bg-white dark:bg-gray-800 dark:text-white">
                <select id="filter-quiz-subject" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-gray-800 dark:text-white">
                  <option value="all">Tất cả môn</option>
                  ${s.map(e=>`<option value="${e}">${e}</option>`).join(``)}
                </select>
              </div>
            </div>

            <div id="student-quizzes-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              ${K(e,t)}
            </div>
          </div>
          
          <!-- Recent History -->
          ${t.length>0?`
          <div class="px-2 mb-10">
            <h3 class="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6">
              <span class="text-indigo-600 dark:text-indigo-400">🕒</span> Lịch sử làm bài gần đây
            </h3>
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <ul class="divide-y divide-gray-100 dark:divide-gray-700">
                ${t.slice(0,5).map(e=>{let t=new Date(e.timestamp).toLocaleString(`vi-VN`,{day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}),n=`text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400`;return e.score>=8?n=`text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400`:e.score>=5&&(n=`text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400`),`
                  <li class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between">
                    <div>
                      <h4 class="font-bold text-gray-800 dark:text-gray-100 text-lg">${e.quiz?.title||`Bộ đề bị xóa`}</h4>
                      <p class="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center gap-4">
                        <span>📅 ${t}</span>
                        <span>⏱ ${e.timeSpent} giây</span>
                      </p>
                    </div>
                    <div class="font-black text-xl px-4 py-2 rounded-xl ${n}">
                      ${e.score.toFixed(1)} <span class="text-sm font-medium">điểm</span>
                    </div>
                  </li>
                  `}).join(``)}
              </ul>
            </div>
          </div>
          `:``}
        </div>

        <!-- Cột Phải: Bảng xếp hạng -->
        <div class="w-full lg:w-1/3 px-2">
          <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-yellow-100 dark:border-gray-700 overflow-hidden sticky top-24">
            <div class="bg-gradient-to-r from-amber-400 to-orange-500 p-6 text-white text-center relative overflow-hidden">
              <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTUgNWgxMHYxMEg1eiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-20"></div>
              <h3 class="text-2xl font-black relative z-10 flex items-center justify-center gap-2">
                🏆 Bảng Xếp Hạng 🏆
              </h3>
              <p class="text-orange-100 text-sm mt-1 relative z-10">Top 5 học sinh xuất sắc nhất</p>
            </div>
            <ul class="p-4 divide-y divide-gray-100 dark:divide-gray-700">
              ${r.length===0?`
                <li class="p-6 text-center text-gray-500 dark:text-gray-400 italic">Chưa có đủ dữ liệu xếp hạng.</li>
              `:r.map((e,t)=>{let r=``;r=t===0?`🥇`:t===1?`🥈`:t===2?`🥉`:`<span class="text-gray-400 font-bold">${t+1}</span>`;let i=e.userId===n.id;return`
                <li class="py-4 px-2 flex items-center justify-between ${i?`bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl`:``}">
                  <div class="flex items-center gap-3">
                    <div class="w-8 text-center text-2xl">${r}</div>
                    <div>
                      <div class="font-bold ${i?`text-indigo-700 dark:text-indigo-400`:`text-gray-800 dark:text-gray-200`}">${e.userName} ${i?`(Bạn)`:``}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">${e.totalTaken} bài thi - ${e.totalCorrect} câu đúng</div>
                    </div>
                  </div>
                  <div class="font-black text-lg text-orange-500 dark:text-orange-400">
                    ${e.avgScore.toFixed(1)}
                  </div>
                </li>
                `}).join(``)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `}})),xe,Se=e((()=>{k(),L(),be(),p(),xe={currentActiveQuizzes:[],currentStudentResults:[],async renderDashboard(){try{let{user:e}=f.getState(),t=await O.getQuizzes();this.currentActiveQuizzes=t.filter(e=>!e.status||e.status===`active`);let n=await I.getResults(),r=n.filter(t=>t.userId===e.id).reverse();this.currentStudentResults=r;let i={};n.forEach(e=>{i[e.userId]||(i[e.userId]={userId:e.userId,userName:e.user?.name||`Học sinh`,totalTaken:0,totalScore:0,totalCorrect:0}),i[e.userId].totalTaken++,i[e.userId].totalScore+=e.score,i[e.userId].totalCorrect+=e.correctCount||0});let a=Object.values(i).map(e=>({...e,avgScore:e.totalScore/e.totalTaken})).sort((e,t)=>t.avgScore-e.avgScore||t.totalCorrect-e.totalCorrect).slice(0,5);return ye(this.currentActiveQuizzes,r,e,a)}catch(e){return`<p class="text-red-500">Thông báo: ${e.message}</p>`}},afterRenderDashboard(){let e=document.getElementById(`search-quiz-student`),t=document.getElementById(`filter-quiz-subject`),n=document.getElementById(`student-quizzes-grid`),r=()=>{if(!n)return;let r=e?e.value.toLowerCase():``,i=t?t.value.toLowerCase():`all`,a=this.currentActiveQuizzes.filter(e=>{let t=e.title.toLowerCase().includes(r),n=e.subject?e.subject.toLowerCase():``;return t&&(i===`all`||n===i)});n.innerHTML=K(a,this.currentStudentResults),this.bindStartQuizEvents()};e&&e.addEventListener(`input`,r),t&&t.addEventListener(`change`,r),this.bindStartQuizEvents()},bindStartQuizEvents(){document.querySelectorAll(`.btn-start-quiz`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`);window.history.pushState({},``,`/student/take-quiz?id=${t}`),window.dispatchEvent(new Event(`popstate`))})})}}})),Ce,we=e((()=>{Ce=(e,t)=>`
    <div class="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
      
      <!-- Cột trái: Câu hỏi -->
      <div class="flex-1 bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-transparent dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">${e.title}</h2>
        <div id="question-container">
          <!-- Render câu hỏi ở đây -->
        </div>
        <div class="mt-8 flex justify-between">
          <button id="btn-prev" class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded text-gray-700 dark:text-gray-300 hidden">Câu trước</button>
          <button id="btn-next" class="bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-800 px-4 py-2 rounded text-blue-700 dark:text-blue-300">Câu tiếp theo</button>
        </div>
      </div>

      <!-- Cột phải: Nav và Timer -->
      <div class="w-full md:w-72">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6 text-center border border-transparent dark:border-gray-700">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Thời gian còn lại</h3>
          <div id="timer" class="text-3xl font-mono font-bold text-red-600 dark:text-red-400">--:--</div>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-transparent dark:border-gray-700">
          <h3 class="font-medium mb-4 text-gray-800 dark:text-gray-200">Danh sách câu hỏi</h3>
          <div class="grid grid-cols-5 gap-2" id="question-nav">
            ${t.map((e,t)=>`
              <button data-index="${t}" class="nav-btn w-10 h-10 rounded border dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center">
                ${t+1}
              </button>
            `).join(``)}
          </div>
          
          <button id="btn-submit" class="mt-6 w-full bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white font-bold py-3 px-4 rounded shadow transition-colors">
            NỘP BÀI
          </button>
        </div>
      </div>
      
    </div>
  `})),q,J,Y,X,Z,Q,Te,Ee=e((()=>{k(),L(),we(),y(),q=null,J=[],Y={},X=0,Z=null,Q=null,Te={async renderTakeQuiz(e){try{let t=await O.getQuizById(e);return q=t,J=t.questions,Y={},X=0,Ce(t,t.questions)}catch{return`<p class="text-red-500">Không thể tải đề thi.</p>`}},afterRenderTakeQuiz(e){q&&(Q=Date.now(),this.renderQuestionContent(),this.startTimer(q.duration*60),document.getElementById(`btn-next`).addEventListener(`click`,()=>{X<J.length-1&&(X++,this.renderQuestionContent())}),document.getElementById(`btn-prev`).addEventListener(`click`,()=>{X>0&&(X--,this.renderQuestionContent())}),document.querySelectorAll(`.nav-btn`).forEach(e=>{e.addEventListener(`click`,e=>{X=parseInt(e.target.getAttribute(`data-index`)),this.renderQuestionContent()})}),document.getElementById(`btn-submit`).addEventListener(`click`,()=>{v(`Bạn có chắc chắn muốn nộp bài?`,`Nộp bài`,()=>{this.submitQuiz()})}))},renderQuestionContent(){let e=J[X];if(!e)return;let t=document.getElementById(`question-container`),n=Y[X];t.innerHTML=`
      <h3 class="font-bold text-lg mb-4">Câu ${X+1}: ${e.content}</h3>
      <div class="space-y-3">
        ${Object.entries(e.options).map(([e,t])=>`
          <label class="flex items-center p-3 border rounded cursor-pointer hover:bg-blue-50 ${n===e?`bg-blue-100 border-blue-500`:``}">
            <input type="radio" name="answer" value="${e}" class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" ${n===e?`checked`:``}>
            <span class="ml-3 block text-gray-700">${e}. ${t}</span>
          </label>
        `).join(``)}
      </div>
    `,t.querySelectorAll(`input[type="radio"]`).forEach(e=>{e.addEventListener(`change`,e=>{Y[X]=e.target.value,this.updateNavUI()})}),document.getElementById(`btn-prev`).classList.toggle(`hidden`,X===0),document.getElementById(`btn-next`).classList.toggle(`hidden`,X===J.length-1),this.updateNavUI()},updateNavUI(){document.querySelectorAll(`.nav-btn`).forEach(e=>{let t=parseInt(e.getAttribute(`data-index`));e.className=`nav-btn w-10 h-10 rounded border text-sm font-medium flex items-center justify-center cursor-pointer`,t===X&&e.classList.add(`border-blue-500`,`ring-2`,`ring-blue-200`),Y[t]?e.classList.add(`bg-blue-600`,`text-white`,`border-blue-600`):e.classList.add(`bg-white`,`text-gray-600`,`hover:bg-gray-100`)})},startTimer(e){Z&&clearInterval(Z);let t=e,n=document.getElementById(`timer`),r=()=>{let e=Math.floor(t/60).toString().padStart(2,`0`),r=(t%60).toString().padStart(2,`0`);n.textContent=`${e}:${r}`,t<=60&&(n.classList.remove(`text-gray-800`),n.classList.add(`text-red-600`,`animate-pulse`))};r(),Z=setInterval(()=>{t--,r(),t<=0&&(clearInterval(Z),_(`Đã hết thời gian làm bài. Hệ thống tự động nộp bài!`,`Hết giờ`),this.submitQuiz())},1e3)},async submitQuiz(){clearInterval(Z);let e=Math.floor((Date.now()-Q)/1e3),t;try{t=await I.saveResult({quizId:q.id,answers:J.map((e,t)=>({questionId:e.id,selectedOption:Y[t]||null})),timeSpent:e})}catch(e){console.error(`Lỗi lưu kết quả`,e),_(`Không thể lưu kết quả bài thi: `+e.message,`Lỗi`);return}let n=t.correctCount,r=Number(t.score),i=document.getElementById(`app`);i.innerHTML=`
      <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Kết quả bài thi</h2>
          <p class="text-xl mb-6 text-gray-600">Bạn đã trả lời đúng <span class="font-bold text-green-600">${n}/${J.length}</span> câu hỏi.</p>
          <div class="text-5xl font-extrabold text-blue-600 mb-8">${r.toFixed(1)} <span class="text-lg text-gray-500">điểm</span></div>
          <button onclick="window.history.pushState({}, '', '/student/dashboard'); window.dispatchEvent(new Event('popstate'));" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Về trang chủ</button>
        </div>
      </div>
        </div>
      </div>
    `}}})),De,Oe=e((()=>{De=e=>`
    <div class="animate-fade-in-up">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">Tài Liệu Học Tập 📚</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-2 text-lg">Khám phá và tải về các tài liệu bổ ích để nâng cao kiến thức.</p>
      </div>

      <!-- Khung Tìm kiếm & Lọc -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 mb-10 flex flex-col md:flex-row gap-4 items-center">
        <div class="relative w-full md:w-2/3">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input type="text" id="doc-search-input" placeholder="Tìm kiếm tài liệu..." class="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-transparent rounded-xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 shadow-inner">
        </div>
        <div class="w-full md:w-1/3">
          <select id="doc-subject-filter" class="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-transparent rounded-xl text-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-medium cursor-pointer shadow-inner appearance-none">
            <option value="">Tất cả môn học</option>
            <option value="Toán học">Toán học</option>
            <option value="Vật lý">Vật lý</option>
            <option value="Hóa học">Hóa học</option>
            <option value="Sinh học">Sinh học</option>
            <option value="Ngữ văn">Ngữ văn</option>
            <option value="Lịch sử">Lịch sử</option>
            <option value="Địa lý">Địa lý</option>
            <option value="Tiếng Anh">Tiếng Anh</option>
            <option value="Giáo dục công dân">Giáo dục công dân</option>
            <option value="Tin học">Tin học</option>
          </select>
        </div>
      </div>

      <!-- Lưới Tài Liệu -->
      ${e.length===0?`
        <div class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Chưa có tài liệu nào</h3>
          <p class="text-gray-500 dark:text-gray-400 mt-2">Giáo viên chưa cập nhật tài liệu cho môn học này.</p>
        </div>
      `:`
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="doc-grid">
          ${e.map(e=>`
            <div class="doc-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col" data-title="${e.title.toLowerCase()}" data-subject="${e.subject}">
              <div class="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 relative p-6 flex flex-col justify-end">
                <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <span class="inline-block px-3 py-1 bg-white text-indigo-700 text-xs font-bold rounded-full w-max shadow-sm mb-2">${e.subject}</span>
              </div>
              <div class="p-6 flex-1 flex flex-col">
                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${e.title}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">${e.description||`Không có mô tả cho tài liệu này.`}</p>
                <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span class="text-xs text-gray-400 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    ${new Date(e.createdAt).toLocaleDateString(`vi-VN`)}
                  </span>
                  <a href="${e.link}" target="_blank" class="inline-flex items-center justify-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-colors gap-2 text-sm">
                    Xem / Tải 
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          `).join(``)}
        </div>
      `}
    </div>
  `})),ke,Ae=e((()=>{U(),Oe(),ke={async renderDocuments(){let e=document.getElementById(`student-content`);if(e)try{e.innerHTML=`<div class="text-center py-10"><div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div></div>`;let t=await H.getDocuments();t.sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)),e.innerHTML=De(t);let n=document.getElementById(`doc-search-input`),r=document.getElementById(`doc-subject-filter`),i=()=>{let t=n.value.toLowerCase(),i=r.value;e.querySelectorAll(`.doc-card`).forEach(e=>{let n=e.getAttribute(`data-title`),r=e.getAttribute(`data-subject`);n.includes(t)&&(i===``||r===i)?e.parentElement.style.display=`block`:e.parentElement.style.display=`none`})};n&&n.addEventListener(`input`,i),r&&r.addEventListener(`change`,i)}catch(t){e.innerHTML=`<div class="text-red-500 text-center py-10">Lỗi: ${t.message}</div>`}}}})),$,je=e((()=>{Se(),Ee(),Ae(),$={...xe,...Te,...ke}})),Me,Ne=e((()=>{p(),S(),je(),D(),Me=e=>{e.addRoute(`/student/dashboard`,()=>{let{user:e}=f.getState();return e?`
        ${T()}
        <main id="student-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <p>Đang tải...</p>
        </main>
      `:(window.history.pushState({},``,`/login`),window.dispatchEvent(new Event(`popstate`)),``)},async()=>{E();let e=document.getElementById(`student-main`);e&&(e.innerHTML=await $.renderDashboard(),$.afterRenderDashboard())}),e.addRoute(`/student/documents`,()=>{let{user:e}=f.getState();return e?`
        ${T()}
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div id="student-content"></div>
        </main>
      `:(window.history.pushState({},``,`/login`),window.dispatchEvent(new Event(`popstate`)),``)},async()=>{E(),await $.renderDocuments()}),e.addRoute(`/student/take-quiz`,()=>{let{user:e}=f.getState();return e?`
        ${T()}
        <main id="take-quiz-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <p>Đang chuẩn bị đề thi...</p>
        </main>
      `:(window.history.pushState({},``,`/login`),window.dispatchEvent(new Event(`popstate`)),``)},async()=>{E();let e=document.getElementById(`take-quiz-main`);if(e){let t=new URLSearchParams(window.location.search).get(`id`);t?(e.innerHTML=await $.renderTakeQuiz(t),$.afterRenderTakeQuiz(t)):e.innerHTML=`<p class="text-red-500">ID bộ đề không hợp lệ</p>`}})}}));t((()=>{r(),D(),re(),ve(),Ne();var e=new n(`#app`);C(),ne(e),_e(e),Me(e),e.start()}))();