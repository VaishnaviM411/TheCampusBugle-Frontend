export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const getUsername = () => {
    return localStorage.getItem("username");
  };
  
  export const getURL = () => {
    return "https://asia-south1-thecampusbugle.cloudfunctions.net/api/";
  };