const osushi = [
  {'name': 'イカ', 'qty': '2', 'price': '100'},
  {'name': '大トロ', 'qty': '1', 'price': '1000'},
  {'name': 'イクラ', 'qty': '2', 'price': '100'},
  {'name': 'あなご', 'qty': '1', 'price': '200'},
  {'name': 'アジ', 'qty': '2', 'price': '100'},
  {'name': 'ヒラメ', 'qty': '1', 'price': '200'}
];

const names = [
  'イカ', '大トロ', 'イクラ', 'あなご', 'アジ', 'ヒラメ'
];

const qties = [
  '1', '2', '3', '4', '5', '6'
];

const prices = [
  '100', '1000', '100', '200', '100', '200'
];

new Vue({
  el: '#menu',
  data: {
    osushi: osushi,
    sort: {
      key: '', //ソートキー
      isAsc: false //昇順ならtrue,降順ならfalse
    },
    //ここからフィルタリングの準備
    prices: prices, //セレクトボックスの値
    selectprice: '', //選択されたセレクトボックスの値
    qties: qties, //チェックボックスの値
    selectqties: qties, //選択されたチェックボックスの値
    findname: '' //入力された文字列を格納
    //ここまでフィルタリングの準備
  },
  computed: {
    eventedAction: function() {
      let list = this.osushi.slice();

      //priceでフィルタリング実施(セレクトボックスを使ってのフィルタリング)
      if(this.selectprice) {
        list = list.filter(element => {
          return element.price === this.selectprice;
        });
      }

      //qtyでフィルタリング実施(チェックボックスを使ってのフィルタリング)
      if(this.selectqties) {
        list = list.filter(element => {
          for(const qty of this.selectqties) {
            if(element.qty === qty) {
              return true;
            }
          }
        });
      }

      //nameで検索実施
      if(this.findname) {
        list = list.filter(element => {
          return Object.keys(element).some(key => {
            if(key === 'name') {
              return element[key].indexOf(this.findname) > -1;
            }
          });
        });
      }

      //ソート実施
      if(this.sort.key) {
        list.sort((a, b) => {
          a = a[this.sort.key];
          b = b[this.sort.key];
          return(a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }

      return list;
    }
  },
  methods: {
    //sort用キーをセットし、昇順・降順を入れ替える
    sortBy: function(key) {
      this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
      this.sort.key = key;
    },
    sortedClass: function(key) {
      return this.sort.key === key ? `sorted ${
        this.sort.isAsc ? 'asc' : 'desc' }` : '';
    },
    //全ての処理をクリアにする
    reset: function() {
      this.sort.key = '';
      this.sort.isAsc = false;
      this.selectprice = '';
      this.selectqties = qties;
      this.findname = '';
      this.osushi = osushi;
    }
  }
});
