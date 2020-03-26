const app = new Vue({
  el: '#app',
  data: {
    items: [
      { id: 'all', value: 0, text: 'すべて' },
      { id: 'doing', value: 1, text: '未完了' },
      { id: 'done', value: 2, text: '完了' },
    ],
    tasks: [],
    value: '',
    show: 0,
  },
  methods: {
    add() {
      this.tasks.push({ //タスクの追加
        task: this.value,
        done: false,
      });
      this.value = '';
    },
    del(index) { //タスクの削除
      console.log(tasks(index));
      this.tasks.splice(index, 1); //spliceメソッドを使ってindex番目の要素1つを配列から削除
    },
  },
  computed: { //条件によって表示したい配列をフィルタリングする時は算出プロパティをつかう
    showTasks() {
      switch (this.show) {
        case 0: //すべて
          return this.tasks;
        case 1: //未完了
          //配列で条件に一致する要素を抜き出すにはfilterメソッドをつかう
          return this.tasks.filter(e => !e.done); //trueの要素が抜き出される(idがdoneでないのもの)
        case 2: //完了
          //配列で条件に一致する要素を抜き出すにはfilterメソッドをつかう
          return this.tasks.filter(e => e.done); //trueの要素が抜き出される(idがdoneのもの)
        default:
          return [];
      }
    },
  },
});
