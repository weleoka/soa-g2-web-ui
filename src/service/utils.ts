class Ut {
  static pp(obj) {
    console.log(JSON.stringify(obj, null, 2));
  }

  static l(any) {
    console.log(any);
  }

  static ld(str) {
    console.debug(str);
  }

  static minutesToHoursAndMinutes(input) {
    const hours = Math.floor(input / 60);
    const mins = input % 60;
    return hours + ":" + (mins === 0 ? "00" : mins);
  }

  static addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }
}
export { Ut };
