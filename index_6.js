new Vue({
  el: '#app-1',
  data: {
    when: ['朝', '昼', '夕方', '夜', '深夜', '昼休み', '仕事中'], //〜に
    where: ['トイレ', 'スーバー', '玄関', '道の上', 'お風呂', '動物園', '宇宙'], //〜で
    who: ['自分', '近くの人', '猫', '犬', 'りんご', 'おじさん', 'おばあちゃん'], //〜が
    play: ['ランニング', 'DJ', 'お絵かき', '電話', 'ダンス', 'しゃっくり', 'テスト'], //〜をする
    text: '結果がでるよ！',
    when_text: '',
    where_text: '',
    who_text: '',
    play_text: '',
  },
  methods: {
    start: function() {
      const when = this.when
      let item1 = when[Math.floor(Math.random() * when.length)]
      this.when_text = item1;

      const where = this.where
      let item2 = where[Math.floor(Math.random() * where.length)]
      this.where_text = item2;

      const who = this.who
      let item3 = who[Math.floor(Math.random() * who.length)]
      this.who_text = item3;

      const play = this.play
      let item4 = play[Math.floor(Math.random() * play.length)]
      this.play_text = item4;

      if(this.who_text === '自分') {
        //this.text = '結果：' + this.when_text + 'に' + this.where_text + 'で' + this.who_text + 'が' + this.play_text + 'する';
        this.text = `結果：${this.when_text}に${this.where_text}で${this.who_text}が${this.play_text}する`;
      }else {
        //this.text = '結果：' + this.when_text + 'に' + this.where_text + 'で' + this.who_text + 'が' + this.play_text + 'する光景をみる';
        this.text = `結果：${this.when_text}に${this.where_text}で${this.who_text}が${this.play_text}する光景をみる`;
      };
    }
  }
});
