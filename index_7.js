new Vue({
  el: '#app-1',
  data: {
    hello_text: true, //trueでv-ifの所を実行、falseでv-elseの所を実行
    ok1: true,
    ok2: true,
  }
});

var app2 = new Vue({
  el: '#app-2',
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
app2.fruits.push({ name: 'apple ← It\'s push-New!' }); //末尾に追加
//app2.fruits.pop(); //末尾を取り出す
app2.fruits.unshift({ name: 'strawberry ← It\'s unshift-New!' }); //先頭に追加
//app2.fruits.shift(); //先頭を取り出す
app2.fruits.splice(2, 0, { name: 'ピーマン' }); //splice(何番目に , 挿入=0 or 置き換え=1 , 値)好きな場所に値を挿入
app2.fruits.splice(2, 1, { name: 'パプリカ' }); //splice(何番目に , 挿入=0 or 置き換え=1 , 値)好きな場所の値を置き換える
app2.fruits.splice(1, 2); //1番目から2個の値を削除する
app2.fruits.reverse(); //配列の中身を逆順にする
