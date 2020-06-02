import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ProductCard from './comp/ProductCard/ProductCard'
import "./RIAC.css";

// props:
//   setProductId   ={this.setProductId}
//   currentProduct   ={this.state.currentProduct}
//   relatedProductsIds   ={this.state.relatedProductsIds}

class RIAC extends React.Component{
  constructor(props){
    super(props)
    this.state={
      cardType: "relatedProduct", // used???
      yourOutfitIds: this.reinstateOutfitIds() || []
    }
  }

  // NOT YET USED
  // componentDidMount() {
  //   if (this.reinstateOutfitIds()) { // in general, retrieved SHOULD be validated
  //     this.setState({
  //       yourOutfitIds: this.reinstateOutfitIds()
  //     });
  //   }
  // }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("PC: cDU: t.p: ", prevState, this.state);
    if (prevState.yourOutfitIds !== this.state.yourOutfitIds) {
      this.storeOutfitIds()
    }
  }

  storeOutfitIds = () => {
    return localStorage.setItem("yourOutfitIds", JSON.stringify(this.state.yourOutfitIds))
  }

  reinstateOutfitIds = () => {
    let yourPreloadedOutfitIds = [];
    let storageKey = "yourOutfitIds";
    try {
      yourPreloadedOutfitIds = JSON.parse(localStorage.getItem(storageKey));
    //validate yourPreloadedOutfitIds
    } catch (e) {
      // ignore QQQ
    }
    return yourPreloadedOutfitIds || [];
    };

  setCardTypeToYourOutfit = () => {
      this.props.cardType("yourOutfit");
  }
  
  setCardTypeToRelatedProduct = () => {
    this.props.cardType("relatedProduct");
}

  addOutfitProductId = () => {
    // console.log("RIAC: aOPI: t.p: ", this.props)
    if (!this.state.yourOutfitIds.includes(this.props.currentProduct.id) ) {
      this.setState({
        yourOutfitIds: [...this.state.yourOutfitIds, this.props.currentProduct.id]
      });   
    }
  }

  removeOutfitProductId = (toBeRemovedOutfitId) => { 
    let revisedOutfitIds = this.state.yourOutfitIds.filter(element => element !== toBeRemovedOutfitId);
    this.setState({
      yourOutfitIds: revisedOutfitIds
    });
  }
 
  isReadytoRender = () => {
    return (
      this.props.setProductId !== null &&
      this.props.currentProduct !== null &&
      this.props.relatedProductsIds !== null
    );
  }

  render() {
    // console.log("RIAC-DATE-TIME: render: ", new Date());

    if (!this.isReadytoRender()) return null;

    const { cardType, yourOutfitIds } = this.state;
    // const { setProductId, currentProduct, relatedProductsIds } = this.state;

    let relatedProductsIds = this.props.relatedProductsIds;
    // console.log("RIAC: rPIds: ", relatedProductsIds)
    let relatedDisplayProductsIds = relatedProductsIds.slice();
    // console.log("R: rDPIds: ", relatedDisplayProductsIds)
    if (relatedDisplayProductsIds !== undefined) {
      relatedDisplayProductsIds.length = 4;
      }      

    // YOUR OUTFIT
    // console.log("RIAC: render: t.s.yOIds: ", this.state.yourOutfitIds);
    // let yourOutfitIdsForDisplay = yourOutfitIds.splice();
    // if (yourOutfitIdsForDisplay !== undefined) {
    //   yourOutfitIdsForDisplay.length = 3;
    //   }      

     return (
      <Container-fluid class="layout container RIAC">

        <Col sm={{ span: 10, offset: 1 }} className="layout container">
          <Row className="layout"><strong>Related Products</strong>
          &nbsp; &nbsp; Click on image to see details. Click on star to see feature comparison.</Row>
          <Row className="layout"> {
              relatedDisplayProductsIds.map((relatedProductId, index) => { 
                let indexProdIdStr = index.toString() + '-' + relatedProductId.toString();
                return (
                  <Col className="layout col-3" key={indexProdIdStr}>
                    <ProductCard
                      currentProduct = {this.props.currentProduct}
                      setProductId={this.props.setProductId}
                      cardProductId={relatedProductId}
                      cardType={"relatedProduct"}
                      removeOutfitProductId={this.removeOutfitProductId}
                    />
                  </Col>
                )
              })
            }
          </Row>
          <br></br>

          <Row className="layout"><strong>Your Outfit</strong> 
          &nbsp; &nbsp; Click in box below-left to add current product to your outfit.</Row>
          <Row className="layout"> 
            <Col className="layout col-3" key={"0-0"}>
              <div className="add-current-product" onClick={this.addOutfitProductId}>
                <b>+ (add to outfit)<br /> <br /></b>
                <Row className="add-card-body">
                  <b>NOTES:</b><br />
                  o Limit: one of each product.<br />
                  o Click star to delete.<br />
                  o Your outfit will be retained in local storage - 
                    it will persist even if you leave and return later (with some limits).
                </Row>
              </div>
            </Col>
            {
              yourOutfitIds.map((yourOutfitId, index) => { 
                index++;
                let indexOutfitIdStr = index.toString() + '-' + yourOutfitId.toString();
                return (
                  <Col className="layout col-3" key={indexOutfitIdStr}>
                    <ProductCard
                      cardProductId={yourOutfitId}
                      cardType={"yourOutfits"}
                      currentProduct = {this.props.currentProduct}
                      setProductId={this.props.setProductId} // STRICTLY SPEAKING, NOT NEEDED
                      removeOutfitProductId={this.removeOutfitProductId}
                    />
                  </Col>
                )
              })
            }
          </Row>
        </Col>
      </Container-fluid>
    )
  }
}

export default RIAC;
