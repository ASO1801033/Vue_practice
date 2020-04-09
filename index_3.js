//vue-js-modalを使うためにVue.useを設定
Vue.use(window["vue-js-modal"].default);

const vue = new Vue({
  el:"#app",
  data: {
    title: 'メンバー一覧',
    add_title: 'メンバー登録',
    edit_title: 'メンバー更新',
    id_text: 'ID',
    name_text: '名前',
    mail_text: 'メール',
    addbutton_text: '登録',
    editbutton_text: '更新',
    deletebutton_text: '削除',
    form: {
      id:'',
      name:'',
      email:'',
    },
    users: [],
    editIndex: -1, //update_userで使う
    createFlag: true, //モーダルのボタン切り替え
  },
  created(){
    this.users = [
      {
        id: 1,
        name: 'あやさん',
        email: 'ayasan@example.com'
      },
    ]
  },
  methods: {
    showModal(){ //モーダルを表示
      this.createFlag = true;
      this.resetForm();
      this.$modal.show('user-modal');
    },
    add_user(){ //メンバー登録
      const user = Object.assign({},this.form); //入力した値からuserオブジェクトを作成
      this.users.push(user); //配列のpushメソッドを使って配列usersの一番後ろに作成したuserオブジェクトを追加
      this.$modal.hide('user-modal'); //追加が完了するとthis.$modal.hideでモーダルウィンドウを非表示
      this.resetForm(); //resetFormの呼び出し
    },
    delete_user(user){ //メンバー削除
      const index = this.users.indexOf(user); //indexOfメソッドを使って削除を行ったメンバーの配列の番号を取得
      console.log(index);
      this.users.splice(index, 1) //spliceメソッドを使ってindex番目の要素1つを配列から削除
    },
    edit_user(user){ //メンバー更新
      this.createFlag = false,
      this.editIndex = this.users.indexOf(user);
      this.form = Object.assign({}, user);
      this.$modal.show('user-modal');
    },
    update_user(){ //モーダルウィンドウ上で行ったユーザ情報の更新を保存
      Object.assign(this.users[this.editIndex], this.form);
      this.$modal.hide('user-modal');
    },
    resetForm(){ //モーダル内の入力値をリセット
      this.form.id = '';
      this.form.name = '';
      this.form.email = '';
    },
  },
});
