var app1 = new Vue({
    el: '#app-1',
    data: {
      text: 'りんご apple'
    }
});

var app2 = new Vue({
  el: '#app-2',
  data: {
    text: 'ページをロードした日時：' + new Date().toLocaleString() + ' (更新されたtextプロパティ)'
  }
});

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true //falseにするとseenの文字が消える,trueにするとseenの文字が表示される
  }
});

var app4 = new Vue({
  el: '#app-4',
  data: {
    fruits: [
      { name: 'cherry' },
      { name: 'grape' },
      { name: 'banana' },
      { name: 'melon' },
      { name: 'peach' }
    ]
  }
});

app4.fruits.push({ name: 'apple ← 追加した果物名なり！' }); //配列にデータを追加

var app5 = new Vue({
  el: '#app-5',
  data: {
    text: 'しんぶんし　とまと'
  },
  methods: {
    Backtext: function () {
      this.text = this.text.split('').reverse().join('')
    }
  }
});

var app6 = new Vue({
  el: '#app-6',
  data: {
    text: 'Hello World!'
  }
});

var app7 = new Vue({
  el: '#app-7',
  data: {
    type: '猫'
  }
});

new Vue({
  el: '#app-8',
  data: {
    counter: 0
  },
  methods: {
    // v-onディレクティブに指定するメソッドを設定
    plusEvent: function() {
      this.counter++;
    },
    minusEvent: function() {
      this.counter--;
    }
  }
});
