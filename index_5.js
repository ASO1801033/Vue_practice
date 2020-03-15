new Vue({
    el: "#app1",
    data: {
      show: true
    }
});

new Vue({
  el: "#app2",
  data: {
    show: true
  },
  computed: {
    label: function() {
      return this.show ? "とじる" : "ひらく";
    }
  }
});

new Vue({
  el: "#app3",
  data: {
    text: '',
    max: 20
  }
});
