export const parser = (str) =>{
  const obj = {};
  str.replace(/([^&=]*)=([^&=]*)/g,function(){
      obj[arguments[1]] = arguments[2];
  });
  return obj;
};

export const stringify = (obj) =>{
  const arr = [];
  for(let key in obj){
      arr.push(`${key}=${obj[key]}`);
  }
  return arr.join('&');
};

export const removeNode = (node) => {
  node.parentNode.removeChild(node);
};