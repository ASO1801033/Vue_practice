//vue-js-modalを使うためにVue.useを設定
Vue.use(window["vue-js-modal"].default);

const vue = new Vue({
  el:"#app",
  data: {
    select_state: [
      { id: 'all', value: -1, label: 'すべて' },
      { id: 'review', value: 0, label: '検討中' },
      { id: 'making', value: 1, label: 'ES作成中' },
      { id: 'entered', value: 2, label: 'エントリー済' },
      { id: 'intern_dec', value: 3, label: 'インターン参加決定' },
      { id: 'intern_par', value: 4, label: 'インターン参加済' },
    ],
    form: {
      name: '',
      entry_start: '',
      entry_end: '',
      intern_start: '',
      intern_end: '',
      state: '',
      //url: '',
    },
    offices: [],
    edit_Index: -1, //update_officeとdelete_officeで使う
    createFlag: true, //モーダルのボタン切り替え
    current: -1, // 初期値を「-1」つまり「すべて」にする
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
        /*
        const add_data = Object.assign({},this.form); //入力した値からadd_dataオブジェクトを作成
        this.offices.push(add_data); //配列のpushメソッドを使って配列の一番後ろに作成したadd_dataオブジェクトを追加
        console.log(add_data);
        this.$modal.hide('add-modal'); //追加が完了するとthis.$modal.hideでモーダルウィンドウを非表示
        this.resetForm(); //resetFormの呼び出し
        */
        this.input_chack();
    },
    edit_office(office){ //情報修正
      this.createFlag = false,
      this.edit_Index = this.offices.indexOf(office);
      console.log('操作ボタンが押されたよ' + this.edit_Index);
      this.form = Object.assign({}, office);
      this.$modal.show('add-modal');
    },
    delete_office(){ //削除
      console.log('削除ボタンが押されたよ' + this.edit_Index);
      this.offices.splice(this.edit_Index, 1); //配列のedit_Index番目から1つの要素を削除する
      this.$modal.hide('add-modal');
    },
    update_office(){ //内容を保存
        /*
        Object.assign(this.offices[this.edit_Index], this.form);
        this.$modal.hide('add-modal');
        */
        this.input_chack();
    },
    input_chack() { //入力値のチェック
      var error = '';
      if(!this.form.name) { //nameが未入力
        error += '企業名が未入力です！\n';
      }

      if(this.form.entry_start && this.form.entry_end) { //entry_startとentry_endが入力されている
        if(!(moment(this.form.entry_start).isSameOrBefore(this.form.entry_end))) { //entry_startはentry_endより前に設定されているか
         error += 'エントリー終了日はエントリー開始日以降に設定してください！\n';
        }
      }else {
        if(!this.form.entry_start) { //entry_startが未入力
          error += 'エントリー開始日が未入力です！\n';
        }
        if(!this.form.entry_end) { //entry_endが未入力
          error += 'エントリー終了日が未入力です！\n';
        }
      }

      if(this.form.intern_start && this.form.intern_end) { //intern_startとintern_endが入力されている
        if(!(moment(this.form.intern_start).isSameOrBefore(this.form.intern_end))) { //intern_startはintern_endより前に設定されているか
         error += 'インターン終了日はインターン開始日以降に設定してください！\n';
        }
      }else {
        if(!this.form.intern_start) { //intern_startが未入力
          error += 'インターン開始日が未入力です！\n';
        }
        if(!this.form.intern_end) { //intern_endが未入力
          error += 'インターン終了日が未入力です！\n';
        }
      }

      if(this.form.entry_end && this.form.intern_start) { //entry_endとintern_startが入力されている
        if(!(moment(this.form.entry_end).isSameOrBefore(this.form.intern_start))) { //entry_endはintern_startより前に設定されているか
         error += 'インターン開始日はエントリー終了日以降に設定してください！\n';
        }
      }

      if(!this.form.state) { //stateが未入力
        error += '進捗が未入力です！\n';
      }

      if(error) {
        this.$swal(error); //エラーメッセージがあれば表示
      }else { //エラーメッセージなし
        console.log('エラーはなかったよ');
        if(document.getElementById("add_button")) { //押されたボタンが追加ボタンか
          console.log('追加ボタンが押されたよ');
          //this.add_office(); 追加すると無限ループになる
          const add_data = Object.assign({},this.form); //入力した値からadd_dataオブジェクトを作成
          this.offices.push(add_data); //配列のpushメソッドを使って配列の一番後ろに作成したadd_dataオブジェクトを追加
          console.log(add_data);
          this.$modal.hide('add-modal'); //追加が完了するとthis.$modal.hideでモーダルウィンドウを非表示
          this.resetForm(); //resetFormの呼び出し
        }else {
          console.log('変更ボタンが押されたよ');
          //this.update_office(); 追加すると無限ループになる
          Object.assign(this.offices[this.edit_Index], this.form);
          this.$modal.hide('add-modal');
        }
      }
    },
    resetForm() { //モーダル内の入力値をリセット
      this.form.name = '';
      this.form.entry_start = '';
      this.form.entry_end = '';
      this.form.intern_start = '';
      this.form.intern_end = '';
      this.form.state = '';
      //this.form.url = '';
    },
    /*urlclick(office) {
      console.log('クリックされた');
      this.edit_Index = this.offices.indexOf(office);
      console.log(this.edit_Index);
      var url = this.offices[this.edit_Index].url;
      console.log(url);
      return url;
    },*/
  },
  computed: { //絞り込み処理
    computedOffices: function() {
      switch (this.current) {
        case -1:
          return this.offices;
        case 0:
          //配列で条件に一致する要素を抜き出すにはfilterメソッドをつかう
          return this.offices.filter(e => e.state === '検討中');
        case 1:
          //配列で条件に一致する要素を抜き出すにはfilterメソッドをつかう
          return this.offices.filter(e => e.state === 'ES作成中');
        case 2:
          //配列で条件に一致する要素を抜き出すにはfilterメソッドをつかう
          return this.offices.filter(e => e.state === 'エントリー済');
        case 3:
          //配列で条件に一致する要素を抜き出すにはfilterメソッドをつかう
          return this.offices.filter(e => e.state === 'インターン参加決定');
        case 4:
          //配列で条件に一致する要素を抜き出すにはfilterメソッドをつかう
          return this.offices.filter(e => e.state === 'インターン参加済');
      }
    }
  },
});
