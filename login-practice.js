//認証情報はこのオブジェクトで管理する。
var Auth = {
  user: [
    { email: 'vue@example.com', pass: 'vue' },
    { email: 'java@example.com', pass: 'java' },
    { email: 'ruby@example.com', pass: 'ruby' },
    { email: 'python@example.com', pass: 'python' },
  ],
  loggedIn: false,
  login: function(email, pass) {
    //TODO: ここはサーバで認証処理(login)を実行する。

    let cnt = 0
    while(cnt <= this.user.length - 1) {
      if(email == this.user[cnt]['email']) {
        //console.log(i + '：' + this.user[i]['pass']);
        if(pass == this.user[cnt]['pass']) {
          this.loggedIn = true; //emailとpassが一致
        }else {
          this.loggedIn = false; //emailとpassが不一致
        }
      }
      cnt++;
    }

    //(email == "vue@example.com" && pass == "vue")?this.loggedIn = true:this.loggedIn = false;
    /*
    if(email == "vue@example.com" && pass == "vue") {
    //if(email == this.user[0]['email'] && pass == this.user[0]['pass']) {
      this.loggedIn = true; //emailとpassが一致
    }else {
      this.loggedIn = false; //emailとpassが不一致
    }*/

    //TODO: サーバから取得したtokenをlocalstrageに保存するように変更が必要。
    //Math.random()で乱数、Math.random().toString(36)でブラウザでは36進数になる(0-9a-zの36文字)
    //.substring(7)で7文字目から最後までの文字列を切り出す(0から始まるインデックス)
    localStorage.token = Math.random().toString(36).substring(7)
    console.log(localStorage.token);
    return this.loggedIn;
  },
  logout: function() {
    //TODO: ここはサーバで認証処理(logout)を実行する。
    this.loggedIn = false
    delete localStorage.token //localStorage.tokenの内容を削除
  }
};

//トップメニューコンポーネント
var Top = {
  template: ''
      + '<div>'
      + '<h2>Top</h2>'
      + '<div style="width:600px;text-align:right;">'
      +   '<router-link to="/logout">Logout</router-link>'
      + '</div>'
      +   '<ul>'
      +     '<li>'
      +       'メニュー１'
      +     '</li>'
      +     '<li>'
      +      'メニュー２'
      +     '</li>'
      +   '</ul>'
      +'</div>'
};

//ログインコンポーネント
var Login = {
  template: ''
      +'<div>'
      + '<h2>Login</h2>'
      + '<p v-if="$route.query.redirect">ログインしてください</p>'
      + '<p v-if="error" class="error">ログインに失敗しました</p>'
      //+ '<form @submit.prevent="login">'
      + '<form>'
      +   '<table>'
      +     '<tr><td>E-Mail:</td><td><input v-model="email" placeholder="email"></td></tr>'
      +     '<tr><td>password:</td><td><input v-model="pass" placeholder="password" type="password"></td></tr>'
      +    '</table>'
      +   '<input type="submit" value="Login" v-on:click="login">' //v-on:click="login"でmethodsのloginを実行
      + '</form>'
      +'</div>',
  data: function () {
    return {
      //email: 'vue@example.com',
      email: '',
      pass: '',
      error: false
    }
  },
  methods: {
    login: function() {
      //!Auth.login(this.email, this.pass)でvar Authのloginを実行
      this.error = !Auth.login(this.email, this.pass);

      //もう少し調べる！！！
      if (!this.error) { //this.errorがtrueのとき
        router.push(this.$route.query.redirect);
        //このメソッドは <router-link> をクリックした時に内部的に呼ばれています。
        //つまり <router-link :to="..."> をクリックすることは router.push(...) を呼ぶことと等価です。
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
      //router.push('/top'); //文字列パスで指定
      router.push({ path: '/top' }); //オブジェクトで指定
    }
  },
  created: function(){ //★わからない(なんのためにある)
    this.logout()
  }
};

//ルーター定義
var routes = [ //★meta: { requiresAuth: true }がわからない
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
router.beforeEach(function (to, from, next) { //★わからない
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
