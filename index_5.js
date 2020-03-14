var app = new Vue({
  el: '#app',
  data: {
    tasks: [
      { name: '勉強をする', detail: 'テストの勉強' },
      { name: '課題を提出する', detail: '提出期限の課題を出す' },
    ]
  }
});

app.tasks.push({ name: '筋トレ ← 追加したタスク', detail: '腹筋30回' }); //配列にデータを追加
