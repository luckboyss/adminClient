Array.prototype.concat = function (...values) {
  const arr = [];
  arr.push(...this);
  if (values.length === 0) return arr;
  values.forEach(value => {
    if (Array.isArray(value)) {
      arr.push(...value);
    } else {
      arr.push(value);
    }
  });
  return arr;
}

Array.prototype.slice = function (start, end) {
  const arr = [];

  if (this.length === 0) return arr;

  start = start || 0;
  if (start < 0) {
    start = 0;
  } else if (start >= this.length) {
    return arr;
  }

  end = end || this.length;
  if (end > this.length) {
    end = this.length;
  } else if (end <= start) {
    return arr;
  }


  for (let i = start; i < end; i++) {
    arr.push(this[i]);  
  }

  return arr;
}

Array.prototype.flantten = function () {
  const arr = [];
  this.forEach(item => {
    if (!Array.isArray(item)) {
      arr.push(item);
    } else {
      arr.push(...item.flantten());
    }
  });
  return arr;
}

console.log([1,[2,[3,4]]].flantten());
console.log([].flantten());