// this component is for use in RIAC.jsx
import React from 'react';
import Container from 'react-bootstrap/Container'; // NEVER USED
// import Row from 'react-bootstrap/Row' // NEVER USED
// import Col from 'react-bootstrap/Col' // NOT YET USED
import yourOutfitBase from './yourOutfitBase.jsx';

import "./YourOutfit.css";

// props as defined in calling parent
//   currentProductId  ={this.props.currentProductId}
//   yourOutfitIds  ={this.props.yourOutfitIds}


const helper = require("../../../../helper/helper.js");

// QQQQ DOES THIS GO HERE
const yourOutfitBase = {
  id: 0,
  category: "Click to add current product",
  name: null,
  slogan: null
}

class YourOutfit extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      // yourOutfitBase: null,
      yourOutfitIds: [], // change over time, requiring re-render
      alreadyInOutfit: null,
      addedOutfitProductId: null, // change over time, requiring re-render
      addedOutfitProduct: null, // change over time, requiring re-render
      removedOutfitProductId: null, // change over time, requiring re-render
      selectedOutfitProductId: null // change over time, requiring re-render
    }
  }
  
  componentDidMount() {
    // let cardProductId = this.props.cardProductId;  // NEVER USED
    // console.log("YO: cDM: cPId: ", currentProductId)
    this.loadOutfitData();
  }

  // Strictly speaking, not needed. KEEPT FOR DEBUGGING OR IF NEEDED
  componentDidUpdate = (prevProps, prevState) => {
    // console.log("YO: cDU: aOPId: ", this.state.addedOutfitProductId);
    // console.log("YO: cDU: rOPId: ", this.state.removedOutfitProductId);
    if (
      // prevState.yourOutfitBase !== this.state.yourOutfitBase ||
      prevState.addedOutfitProductId !== this.state.addedOutfitProductId ||
      prevState.removedOutfitProductId !== this.state.removedOutfitProductId
    ) {
      this.loadOutfitData();
    }
  }
  
  loadOutfitData = () => {
    if (
        this.state.yourOutfitIds.includes(this.state.addedOutfitProductId) 
      ) {
        this.setState({
          alreadyInOutfit: true
        })} else if (
          prevProps.addedOutfitProductId !== this.props.addedOutfitProductId // REDUNDANT?
      ) {
          helper.getOneProduct(this.props.currentProductId, result => {
          // console.log("YO: lRPD: gOP: result: " , result)
            this.setState({
            addedOutfitProduct: result
          });
        });      
    }
  }

  addOutfitProductId = (currentProductId) => {
    /* 
    if (!yourOutfitIds.includes(currentProductId) ) {
      //const expandedOutfitIds = [...this.state.yourOutfitIds, currentProductId]; 
      // // = this.state.yourOutfitIds.slice().push(currentProductId);
      // expandedOutfitIds.push(currentProductId);
      this.setState({
        // yourOutfitIds: expandedOutfitIds
        yourOutfitIds: [...this.state.yourOutfitIds, currentProductId]
      });
    }
      add emphasize comment in cardProduct.name: "already in your outfit" // do that elsewhere
    */

    const newOutfitIds = 
    this.setState({
      addedOutfitProductId: currentProductId
    });
  }

  removeOutfitProductId = (toBeRemovedOutfitId) => { 
    // // newList = [...oldList] // alternate method
    // newList = [];
    // for every item in old list, if not the same then push onto new list
    // setState yourOutfitIds: newList
    this.setState({
      removedOutfitProductId: toBeRemovedOutfitId
    });
  }
 
    // Pre-method check if ready to render or null
    // function method
  isReadytoRender = () => {
    return (
      this.props.currentProduct !== null
    );
  }

  render() {
    // console.log("YO-DATE-TIME: render: ", new Date());

    // Pre-method check if ready to render or null
    if (!this.isReadytoRender()) return null;

    
// WHAT DOES THIS DO?
    const { 
      yourOutfitIds, alreadyInOutfit, addedOutfitProductId, 
      addedOutfitProduct, removedOutfitProductId, selectedOutfitProductId
      } = this.state;

    // console.logs for DEBUGGING
    // console.log("YO: cPId: ", currentProduct.id); // used only for debugging
    // console.log("YO: cP: ", currentProduct); // used only for debugging
    // const currentProductName = currentProduct.name;

    if (alreadyInOutfit) {
      yourOutfitBase.name = "Please add a product not already in your outfit"      
    }
    
    return (
      <Container-fluid class="layout your-outfit-layout align-left">
        {/* render youOutfitBase */}
      const 
      // render any other outfits

      {/* // </Container-fluid> */}
    )
  }
}

export default YourOutfit;
