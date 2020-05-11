//vue-js-modalを使うためにVue.useを設定
Vue.use(window["vue-js-modal"].default);

var app  = new Vue({
  el: "#app",
  data: {
    title: '家計簿つけつけマン',
    form: {
      date: '',
      in_ex: '',
      wallet: '',
      price: '',
      category: '',
    },
  },
  methods: {
    Modal_show(){ //モーダルを表示
      this.resetForm();
      this.$modal.show('pay-modal');
    },
    resetForm() { //モーダル内の入力値をリセット
      this.form.date = '';
      this.form.in_ex = '';
      this.form.wallet = '';
      this.form.price = '';
      this.form.category = '';
    },
  },
});
