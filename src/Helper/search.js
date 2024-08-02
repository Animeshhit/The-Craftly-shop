import axios from "axios";
const getSearchProducts = async (text, page, limit, setValue) => {
  try {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_SERVER_URL
        }/search?page=${page}&limit=${limit}&q=${text}`
      )
      .then((res) => {
        let { data } = res;
        console.log(data);
        setValue(data);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  } catch (err) {
    console.log(err);
    alert("Network connection error");
  }
};

export default getSearchProducts;
