// data = [{username: "janedoe"},{username: "johndoe"}];
// localStorage.setItem("usernames", JSON.stringify(data));
// const retdata = JSON.parse(localStorage.getItem("usernames"));
// alert("Your username is "  + data[0].username);

localStorage.setItem("yourOutfitIds", JSON.stringify(yourOutfitIds));
const returnedOutfitIds = JSON.parse(localStorage.getItem("yourOutfitIds"));

reinstateOutfitIds = (returnedOutfitIds) => {
  this.setState({
    yourOutfitIds: returnedOutfitIds
  });
}