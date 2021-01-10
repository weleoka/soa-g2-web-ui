
class Ut {
  static pp(obj) {
    console.log(JSON.stringify(obj, null, 2));
  }

  static l(str) {
    console.log(str);
  }

  static ld(str) {
    console.debug(str);
  }
}
export {Ut}
