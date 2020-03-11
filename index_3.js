//vue-js-modalを使うためにVue.useを設定
Vue.use(window["vue-js-modal"].default);

const vue = new Vue({
  el:"#app",
  data: {
    title: 'メンバー一覧',
    add_title: 'メンバー登録',
    form: {
      id:'',
      name:'',
      email:'',
    },
    users: [],
  },
  created() {
    this.users = [
      {
        id: 1,
        name: 'あやさん',
        email: 'ayasan@example.com'
      },
    ]
  },
  methods: {
    showModal() { //モーダルを表示
        this.$modal.show('user-modal');
    },
    add_user() { //メンバー登録
      const user = Object.assign({},this.form); //入力した値からuserオブジェクトを作成
      this.users.push(user); //配列のpushメソッドを使って配列usersの一番後ろに作成したuserオブジェクトを追加
      this.$modal.hide('user-modal'); //追加が完了するとthis.$modal.hideでモーダルウィンドウを非表示
    },
    resetForm(){ //モーダル内の入力値をリセット
        this.form.id = '';
        this.form.name = '';
        this.form.email = '';
    },
  },
})
