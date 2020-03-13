new Vue({
  el:"#chat",
  data: {
    message: [],
  },
  methods: {
    mySend() {
      this.message.push({ id:1, name:'じぶん', style:'my', message:this.my_message }); //配列に上書きせず追加する
      this.my_message = ''
    },
    otherSend() {
      this.message.push({ id:2, name:'あいて', style:'other', message:this.other_message }); //配列に上書きせず追加する
      this.other_message = ''
    }
  }
});
