//vue-js-modalを使うためにVue.useを設定
Vue.use(window["vue-js-modal"].default);

const vue = new Vue({
  el:"#app",
  data: {
    form: {
      name: '',
      entry_start: '',
      entry_end: '',
      intern_start: '',
      intern_end: '',
      state: '',
    },
    offices: [],
    editIndex: -1, //update_officeで使う
    createFlag: true, //モーダルのボタン切り替え
  },
  // ↓ローカルストレージの実装
  watch: {
    offices: {
      handler: function(){ //変更があったら、handlerの中のメソッドが起動する
        localStorage.setItem('offices', JSON.stringify(this.offices));
        //保存は localStorage.setItem() が使われる
      },
      deep: true
    }
  },
  mounted: function(){
    this.offices = JSON.parse(localStorage.getItem('offices')) || [];
    //保存されているデータは localStorage.getItem() で読み込まれる
    // JSON.parse() でオブジェクト化をする
  },
  // ↑ローカルストレージの実装

  methods: {
    Modal_show(){ //モーダルを表示
      this.createFlag = true;
      this.resetForm();
      this.$modal.show('add-modal');
    },
    add_office(){ //登録
      var error = '';
      if(!this.form.name) {
        error += '企業名が未入力です！\n';
      }

      if(this.form.entry_start && this.form.entry_end) {
        if(!(moment(this.form.entry_start).isSameOrBefore(this.form.entry_end))) {
         error += 'エントリー終了日はエントリー開始日以降に設定してください！\n';
        }
      }else {
        if(!this.form.entry_start) {
          error += 'エントリー開始日が未入力です！\n';
        }
        if(!this.form.entry_end) {
          error += 'エントリー終了日が未入力です！\n';
        }
      }

      if(this.form.intern_start && this.form.intern_end) {
        if(!(moment(this.form.intern_start).isSameOrBefore(this.form.intern_end))) {
         error += 'インターン終了日はインターン開始日以降に設定してください！\n';
        }
      }else {
        if(!this.form.intern_start) {
          error += 'インターン開始日が未入力です！\n';
        }
        if(!this.form.intern_end) {
          error += 'インターン終了日が未入力です！\n';
        }
      }

      if(this.form.entry_end && this.form.intern_start) {
        if(!(moment(this.form.entry_end).isSameOrBefore(this.form.intern_start))) {
         error += 'インターン開始日はエントリー終了日以降に設定してください！\n';
        }
      }

      if(!this.form.state) {
        error += '進捗が未入力です！\n';
      }

      if(error) {
        this.$swal(error); //エラーメッセージがあれば表示
      }else { //エラーメッセージがなければ登録
        const add_data = Object.assign({},this.form); //入力した値からadd_dataオブジェクトを作成
        this.offices.push(add_data); //配列のpushメソッドを使って配列の一番後ろに作成したadd_dataオブジェクトを追加
        console.log(add_data);
        this.$modal.hide('add-modal'); //追加が完了するとthis.$modal.hideでモーダルウィンドウを非表示
        this.resetForm(); //resetFormの呼び出し
      }
    },
    delete_office(office){ //削除
      const index = this.offices.indexOf(office); //indexOfメソッドを使って削除を行った配列の番号を取得
      this.offices.splice(index, 1) //spliceメソッドを使ってindex番目の要素1つを配列から削除
      this.$modal.hide('add-modal');
    },
    edit_office(office){ //更新
      this.createFlag = false,
      this.editIndex = this.offices.indexOf(office);
      this.form = Object.assign({}, office);
      this.$modal.show('add-modal');
    },
    update_office(){ //内容を保存
      Object.assign(this.offices[this.editIndex], this.form);
      this.$modal.hide('add-modal');
    },
    resetForm(){ //モーダル内の入力値をリセット
      this.form.name = '';
      this.form.entry_start = '';
      this.form.entry_end = '';
      this.form.intern_start = '';
      this.form.intern_end = '';
      this.form.state = '';
    },
  },
});