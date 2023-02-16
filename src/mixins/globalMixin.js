import dayjs from 'dayjs';

export default {
  methods: {
    getFirstImagePath: (data) => {
      if (data !== "" && data !== "[]" && typeof data !== "undefined") {
        let file = JSON.parse(data);
        // console.log(file[index].path);
        return "http://file.piium.co.kr" + file[0].path;
      }
      return "";
    },
    getImagePath: (data) => {
        return "http://file.piium.co.kr" + data;
    },
    addComma(number) {
      const result = Number.isInteger(number)
        ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : 0;
      return result;
    },
    formattedDate(value, format = "YYYY.MM.DD") {
      dayjs.locale('ko');
      return dayjs(value).add(-9,'h').format(format);
    },
    getNameFromValue(value, nameValueList){
      var result = 'error';
      console.log(value, nameValueList)
      var index = nameValueList.findIndex(v => v.value === value);

      if(index >= 0){
        result = nameValueList[index].name;
      }
      return result;
    },
    isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        // console.log("isJsonString err", e);
        return false;
      }
      return true;
    },
    formatPhone(input){
      if(!input || isNaN(input)){
        console.log(`input must be a number was sent ${input}`);
        return input
      }else{
        if(typeof(input) !== 'string') input = input.toString();
        if(input.length === 11){
          return input.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        } else if(input.length < 11) {
          console.log('was not supplied enough numbers please pass a 11 digit number');
          return input
        } else if(input.length > 11) {
          console.log('was supplied too many numbers please pass a 11 digit number');
          return input
        }
      }
    },
  },
};
