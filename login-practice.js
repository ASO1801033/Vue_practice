//認証情報はこのオブジェクトで管理する。
var Auth = {
  loggedIn: false,
  login: function(email, pass) {
    //TODO: ここはサーバで認証処理(login)を実行する。
    (email == "vue@example.com" && pass == "vue" )?this.loggedIn = true:this.loggedIn = false;
    //TODO: サーバから取得したtokenをlocalstrageに保存するように変更が必要。
    localStorage.token = Math.random().toString(36).substring(7)
    return this.loggedIn;
  },
  logout: function() {
    //TODO: ここはサーバで認証処理(logout)を実行する。
    this.loggedIn = false
    delete localStorage.token
  }
};

//トップメニューコンポーネント
var Top = {
  template: '<div>'
            +'<h2>Top</h2>'
            +'<div style="width:600px;text-align:right;">'
            +'<router-link to="/logout">Logout</router-link>'
            +'</div>'
            +'<ul>'
            +'<li>'
            +'メニュー１'
            +'</li>'
            +'<li>'
            +'メニュー２'
            +'</li>'
            +'</ul>'
            +'</div>'
};

//ログインコンポーネント
var Login = {
  template: ''
      +'<div>'
      +'  <h2>Login</h2>'
      +'  <p v-if="$route.query.redirect">'
      +'    ログインしてください'
      +'  </p>'
      +'  <p v-if="error" class="error">ログインに失敗しました</p>'
      +'  <form @submit.prevent="login">'
      +'  <table>'
      +'    <tr><td>E-Mail:</td><td><input v-model="email" placeholder="email"></td></tr>'
      +'    <tr><td>password:</td><td><input v-model="pass" placeholder="password" type="password"></td></tr>'
      +'  </table>'
      +'  <input type="submit" value="Login" v-on:click="login">'
      +'  </form>'
      +'</div>',
  data: function () {
    return {
      email: 'vue@example.com',
      pass: '',
      error: false
    }
  },
  methods: {
    login: function() {
      this.error = !Auth.login(this.email, this.pass);

      if (!this.error) {
        router.push(this.$route.query.redirect);
      };
    }
  }
};

//ログアウトコンポーネント
//画面描画時に、ログアウトメソッドが呼び出され、ログアウトする。
var Logout = {
  template: '<input type="submit" value="Logout" v-on:click="logout">',
  methods: {
    logout: function() {
      Auth.logout();
      router.push('/top');
    }
  },
  created: function(){
    this.logout()
  }
};

//ルーター定義
var routes = [
  { path: '/top', component: Top, meta: { requiresAuth: true }},
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  {
    // 定義されていないパスへの対応。トップページへリダイレクトする。
    path: '*',
    redirect: '/top'
  }
];

//ルーター
var router = new VueRouter({
  "routes": routes
});

//認証がない場合は、ログインページに遷移する。
router.beforeEach(function (to, from, next) {
  if (to.matched.some(function (record) {
    return record.meta.requiresAuth;
  }) && !Auth.loggedIn) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

var app = new Vue({
  el: '#app',
  "router": router
});
