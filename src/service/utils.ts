import { morphism } from "morphism";
import { MappingError } from "@/service/errors";

class Ut {
  static pp(obj) {
    return console.log(JSON.stringify(obj, null, 2));
  }

  static pf(obj) {
    return JSON.stringify(obj, null, 2);
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

  static isSet(obj: any) {
    return !!(obj && Object.keys(obj).length);
  }

  static isSetArr(obj: any) {
    return !!(Array.isArray(obj) && obj.length);
  }

  static isNotSet(obj: any) {
    return !(obj && Object.keys(obj).length);
  }

  static isNotSetArr(obj: any) {
    return !(Array.isArray(obj) && obj.length);
  }

  static toDateStr(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}

class ApiTools {
  /* mapping from array of dto to domain objects */
  static mapper(schema, sourceArr: [], type?) {
    if (!Array.isArray(sourceArr)) {
      throw new MappingError(`Expected array, got object!`);
    } else {
      try {
        return sourceArr.map(source => morphism(schema, source, type));
      } catch (e) {
        throw new MappingError(`Bad JSON array: ${sourceArr}`);
      }
    }
  }

  /* mapping from single dto to domain object */
  static singleMapper(schema, source, type) {
    if (Array.isArray(source)) {
      throw new MappingError(`Expected object, got array`);
    } else {
      try {
        return morphism(schema, source, type);
      } catch (e) {
        throw new MappingError(`Bad source: ${source}`);
      }
    }
  }
}

export { Ut, ApiTools };
