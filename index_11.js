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
    wallet_items: [
      //{ item: 'すべて', value: 'all' },
      { item: '現金'/*, value: 'money'*/ },
      { item: 'クレジットカード'/*, value: 'card'*/ },
      { item: '電子マネー/QRコード・バーコード'/*, value: 'electronic'*/ },
      { item: '引き落とし'/*, value: 'deduct'*/ },
      { item: '振り込み'/*, value: 'deposit'*/ },
    ],
    category_items: [
      //{ item: 'すべて' },
      { item: '食費' },
      { item: '固定費' },
      { item: '通信費' },
      { item: '外食費' },
      { item: '日用品費' },
      { item: '被服・美容費' },
      { item: '娯楽費' },
      { item: '交通費' },
      { item: '医療費' },
      { item: '特別費' },
      { item: '給与' },
    ],
    payment: [],
  },
  methods: {
    Modal_show(){
      this.resetForm();
      this.$modal.show('pay-modal');
    },
    add_pay() {
      const data = Object.assign({},this.form);
      this.payment.push(data);
      console.log(data);
      this.$modal.hide('pay-modal');
      this.resetForm();
    },
    resetForm() {
      this.form.date = '';
      this.form.in_ex = '';
      this.form.wallet = '';
      this.form.price = '';
      this.form.category = '';
      this.form.memo = '';
    },
  },
});
