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

/*
var STORAGE_KEY = 'offices'
var officeStorage = {
fetch: function () {
  var offices = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  offices.forEach(function (todo, index) {
    todo.id = index
  })
  officeStorage.uid = offices.length
  return offices
},
  save: function (offices) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offices))
  }
*/

//vue-js-modalを使うためにVue.useを設定
Vue.use(window["vue-js-modal"].default);

const vue = new Vue({
  el:"#app",
  data: {
    form: {
      name:'',
      entry_start:'',
      entry_end:'',
      intern_start:'',
      intern_end:'',
      //state:'',
    },
    state_select: '',
    states: [
        { id: 1, state: 'ES作成中' },
        { id: 2, state: 'エントリー済み' },
        { id: 3, state: 'インターン参加決定' },
        { id: 4, state: 'インターン参加済み' },
    ],

    offices: [],
    editIndex: -1, //update_userで使う
    createFlag: true, //モーダルのボタン切り替え

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
      this.createFlag = true;
      this.resetForm();
      this.$modal.show('add-modal');
    },
    add_office(){ //メンバー登録
      const add_data = Object.assign({},this.form); //入力した値からuserオブジェクトを作成
      this.offices.push(add_data); //配列のpushメソッドを使って配列usersの一番後ろに作成したuserオブジェクトを追加
      //console.log(add_data);
      this.$modal.hide('add-modal'); //追加が完了するとthis.$modal.hideでモーダルウィンドウを非表示
      this.resetForm(); //resetFormの呼び出し
    },/*
    delete_user(user){ //メンバー削除
      const index = this.users.indexOf(user); //indexOfメソッドを使って削除を行ったメンバーの配列の番号を取得
      this.users.splice(index, 1) //spliceメソッドを使ってindex番目の要素1つを配列から削除
    },*/
    edit_office(office){ //メンバー更新
      this.createFlag = false,
      this.editIndex = this.offices.indexOf(office);
      this.form = Object.assign({}, office);
      this.$modal.show('add-modal');
    },
    update_office(){ //モーダルウィンドウ上で行ったユーザ情報の更新を保存
      Object.assign(this.offices[this.editIndex], this.form);
      this.$modal.hide('add-modal');
    },
    resetForm(){ //モーダル内の入力値をリセット
      this.form.name = ''
      this.form.entry_start = ''
      this.form.entry_end = ''
      this.form.intern_start = ''
      this.form.intern_end = ''
    },
  },
});
