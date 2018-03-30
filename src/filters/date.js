import moment from "moment";

export default value => {
  return moment(value).format("MM DD");
};
