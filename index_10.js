//就活の企業管理SPAを作る
/*
機能1：企業名が入力できる
機能2：エントリー開始日が入力できる
機能3：エントリー終了日が入力できる
機能4：インターン開始日が入力できる
機能5：インターン終了日が入力できる
機能6：ホームページのURLが入力できる
機能7：自分の進捗が入力できる
機能8：ローカルストレージを使ってリロードしてもデータが消えないようにする
*/
/*
必要なデータ要素
・ID
・企業名
・エントリー開始日
・エントリー終了日
・インターン開始日
・インターン終了日
・ホームページ
・自分の進捗
*/

//vue-js-modalを使うためにVue.useを設定
Vue.use(window["vue-js-modal"].default);

const vue = new Vue({
  el:"#app",
  data: {
    form: {
      name:'',
    },

    offices: [],
    //editIndex: -1, //update_userで使う
    //createFlag: true, //モーダルのボタン切り替え

  },/*
  created(){
    this.users = [
      {
        id: 1,
        name: 'あやさん',
        email: 'ayasan@example.com'
      },
    ]
  },*/
  methods: {
    Modal_show(){ //モーダルを表示
      //this.createFlag = true;
      this.resetForm();
      this.$modal.show('add-modal');
    },/*
    add_user(){ //メンバー登録
      const user = Object.assign({},this.form); //入力した値からuserオブジェクトを作成
      this.users.push(user); //配列のpushメソッドを使って配列usersの一番後ろに作成したuserオブジェクトを追加
      this.$modal.hide('user-modal'); //追加が完了するとthis.$modal.hideでモーダルウィンドウを非表示
      this.resetForm(); //resetFormの呼び出し
    },
    delete_user(user){ //メンバー削除
      const index = this.users.indexOf(user); //indexOfメソッドを使って削除を行ったメンバーの配列の番号を取得
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
    },*/
    resetForm(){ //モーダル内の入力値をリセット
      this.form.name = ''
    },
  },
});
