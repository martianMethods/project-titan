import React from 'react';
import Row from 'react-bootstrap/Row'
import StarRatings from "react-star-ratings";
import noImage from "./NoImageOnFile.jpg";
import addToOutfitImage from "./NoStylesOnFile.jpg";
import alreadyInOutfitImage from "./NoImageOnFile.jpg"; // NEVER USED
import "./ProductCard.css";
import ProductComparison from '../ProductComparison/ProductComparison';

// props as defined in calling parent
//   cardProductId  ={relatedZProductId}
//   cardType  = "relatedProduct"  OR "yourOutfits"
//   currentProduct  ={this.props.currentProduct} USED ONLY FOR DEBUGGING
//   setProductId  ={this.props.setProductId}
//   removeOutfitProductId  ={this.removeOutfitProductId}

const helper = require("../../../../helper/helper.js");

class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      cardProduct: null, // change over time, requiring re-render
      cardStyles: null, // change over time, requiring re-render
      cardReviewRating: null, // change over time, requiring re-render
      compareProductsNow: false
      // cardType: "relatedProduct"  // outfitProduct
    }

    // NO NEED TO BIND WHEN I HAVE <this>
    // arrow function; current this (that does not need to be overriden)
  }
  
  componentDidMount() {
    // let cardProductId = this.props.cardProductId  // NEVER USED
    // console.log("+PC: cDM: if cRPId: ", cardProductId)
    this.loadProductData();
  }

  // Strictly speaking, not needed. KEEPT FOR DEBUGGING OR IF NEEDED
  componentDidUpdate = (prevProps, prevState) => {
    // console.log("PC: cDU: rPI: ", this.props.cardProductId);
    if (prevProps.cardProductId !== this.props.cardProductId) {
      this.loadProductData();
    }
  }
  
  loadProductData = () => {
    helper.getOneProduct(this.props.cardProductId, result => {
      // console.log("PC: lRPD: gOP: result: " , result)
      this.setState({
        cardProduct: result
      });
    });
    helper.getOneProductStyle(this.props.cardProductId, result => {
      this.setState({
        cardStyles: result.results
      });
    });

    helper.getReviewMetadata(this.props.cardProductId, result => {
      this.setState({
        cardReviewRating: helper.calculateReviewRating(result.ratings)
      });
    });
  }
  
  setProductId = () => { 
    this.props.setProductId(this.props.cardProductId);
  }

  compareProducts = (event) => {
    event.stopPropagation();
    this.setState({
      compareProductsNow: true
    });
  }

  closeComparison = (event) => { 
    event.stopPropagation();
    this.setState({
      compareProductsNow: false
    });
  }

  starClick = (cardType) => {
    if (cardType) {
      this.compareProducts()
    } else {
      this.removeOutfit()
    }
  }

  removeOutfitProductId = (event) => {
    this.props.removeOutfitProductId(this.props.cardProductId)
  }

  // Pre-method check if ready to render or null
  isReadytoRender = () => {
    return (
      this.state.cardProduct !== null &&
      this.state.cardStyles !== null &&
      this.state.cardReviewRating !== null &&
      this.cardType !== null
    );
  }

  render() {
    // console.log("PC-DATE-TIME: render: ", new Date());

    // Pre-method check if ready to render or null

    // Explicit method
    // if (this.state.cardProduct === null) return null;
    // if (this.state.cardStyles === null) return null;
    // if (this.state.cardReviewRating === null) return null;

    // function method
    if (!this.isReadytoRender()) return null;

    // const { setProductId, currentProduct, cardProductId, cardType } = this.props; // NOT USED
    const { cardProduct, cardStyles, cardReviewRating } = this.state;

    // console.logs for DEBUGGING
    // console.log("PC: cP: ", currentProduct); // used only for debugging
    // console.log("PC: rPId: ", this.props.cardProductId);
    // console.log("PC: rP: ", cardProduct);
    // console.log("PC: rSs: ", cardStyles);

    let cardCategory = cardProduct.category || null;
    // console.log("PC: rCat: ", cardCategory);

    let cardCaption = cardProduct.name ? cardProduct.name : null;
    // console.log("PC: rCap: ", cardCaption);

    let cardDefaultPrice = cardProduct.default_price || null; // SUPERCEDED BY style data
    // console.log("PC: rDP: ", cardDefaultPrice);

    // QUICK PATCH: !default => set to 0
    // let cardStyle = cardStyles.find(style => style["default?"] === 1) || cardStyles[0];
    let cardStyle = null;
    // console.log("PC: render: cS: ", cardStyle)
    let cardStyleOriginalPrice = null;
    // console.log("PC: render: cSoP: ", cardStyleOriginalPrice)
    let cardStyleSalePrice = cardDefaultPrice;
    // console.log("PC: render: cSSP: ", cardStyleSalePrice)
    let cardStyleImage = noImage;
    // console.log("PC: render: cSI: ", cardStyleImage)
  
    if (cardStyles.length > 0) {
      cardStyle = cardStyles.find(style => style["default?"] === 1) || cardStyles[0];
      // console.log("PC: rS: ", cardStyle);

      // let relatedStylesIndex = 2; // HARD CODED - FALLBAK
      cardStyleOriginalPrice = cardStyle.original_price || null;
      // console.log("PC: rStyleOPrice: ", cardStyleOriginalPrice);

      cardStyleSalePrice = cardStyle.sale_price || cardDefaultPrice;
      // console.log("PC: rStyleSPrice: ", cardStyleSalePrice);

      cardStyleImage = cardStyle.photos[0].url || noImage;
      // console.log("PC: rSI: ", cardStyleImage);
    }

    if (this.props.cardImageName === "alreadyInOutfit") {
      cardStyleImage = alreadyInOutfitImage;
    } else if (this.props.cardImageName === "addToOutfit") {
      cardStyleImage = addToOutfitImage;
    }

    // console.log("PC: render: rRR: ", cardReviewRating);

    // YOUR OUTFIT
    // this.yourOutfitIds.push(yourOutfitBaseProduct);

    return (
      <Container-fluid class="layout product-card-layout align-left">
        <div className="product-card-div" onClick={this.props.cardType === "relatedProduct" ? this.setProductId : () => {}}>
          <div className="image-container">
            <div className="card mb-3">            
              <img className="card-img-top style-image" src={cardStyleImage}  alt="Display this style"/>
              {/* <img className="card-img-top" src={"https://images.unsplash.com/photo-1473396413399-6717ef7c4093?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}  alt=""/> */}
              <div className="card-img-overlay">
                <small><p className="btn btn-star-riac" onClick={this.props.cardType === "relatedProduct" ? this.compareProducts : this.removeOutfitProductId}>&#x2605;</p></small>
                {this.state.compareProductsNow && (
                    <ProductComparison 
                      cardProductId={this.props.cardProductId} 
                      closeComparison={this.closeComparison}                  
                      currentProductId={this.props.currentProduct.id}
                    />  
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">          
          <p className="card-text category">{cardCategory}</p>
          <h5 className="card-title pc-caption">{cardCaption}</h5>
          <small><p className="card-text text-muted price">${cardStyleSalePrice} &nbsp; &nbsp; <del>${cardStyleOriginalPrice}</del></p></small>
            <Row className="rating-stars">              
              <StarRatings
                rating={cardReviewRating}
                starDimension="1em"
                starSpacing={"0"}
              />
            </Row>
          </div>
        </div>
      </Container-fluid>
    )
  }
}

export default ProductCard;
