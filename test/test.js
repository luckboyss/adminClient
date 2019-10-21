function addTo100() {
  var sum = 0;
  var add = function(num) {
    if (num<=100) {
      sum = sum  + num;
      add(num+1);
    }
  }
  add(1);
  return sum;
}
var res = addTo100();
console.log(res);
