//vue-js-modalを使うためにVue.useを設定
Vue.use(window["vue-js-modal"].default);

const vue = new Vue({
  el:"#app",
  data: {
    title: 'タスク一覧',
    add_title: 'タスク追加',
    edit_title: 'タスク更新',
    id_text: 'No',
    name_text: 'タスク名',
    detail_text: '内容',
    addbutton_text: '追加',
    editbutton_text: '更新',
    deletebutton_text: '削除',
    form: {
      id:'',
      name:'',
      detail:'',
    },
    tasks: [],
    editIndex: -1, //update_taskで使う
    createFlag: true, //モーダルのボタン切り替え
  },
  /*
  created(){
    this.tasks = [
      {
        id: 1,
        name: 'あやさん',
        detail: 'ayasan@example.com'
      },
    ]
  },
  */
  methods: {
    showModal(){ //モーダルを表示
      this.createFlag = true;
      this.resetForm();
      this.$modal.show('task-modal');
    },
    add_task(){ //メンバー登録
      const task = Object.assign({},this.form); //入力した値からtaskオブジェクトを作成
      this.tasks.push(task); //配列のpushメソッドを使って配列tasksの一番後ろに作成したtaskオブジェクトを追加
      this.$modal.hide('task-modal'); //追加が完了するとthis.$modal.hideでモーダルウィンドウを非表示
      this.resetForm(); //resetFormの呼び出し
    },
    delete_task(task){ //メンバー削除
      const index = this.tasks.indexOf(task); //indexOfメソッドを使って削除を行ったメンバーの配列の番号を取得
      this.tasks.splice(index, 1) //spliceメソッドを使ってindex番目の要素1つを配列から削除
    },
    edit_task(task){ //メンバー更新
      this.createFlag = false,
      this.editIndex = this.tasks.indexOf(task);
      this.form = Object.assign({}, task);
      this.$modal.show('task-modal');
    },
    update_task(){ //モーダルウィンドウ上で行ったユーザ情報の更新を保存
      Object.assign(this.tasks[this.editIndex], this.form);
      this.$modal.hide('task-modal');
    },
    resetForm(){ //モーダル内の入力値をリセット
      this.form.id = '';
      this.form.name = '';
      this.form.detail = '';
    },
  },
});
