import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import "./ProductComparison.css";

// props as defined in calling parent
//   cardProductId  ={cardProductId}
//   closeComparison   ={this.closeComparison
//   currentProductId  ={this.props.currentProductId}

const helper = require("../../../../helper/helper.js");

class ProductComparison extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      currentProduct: null,
      relatedProduct: null,
    }

  }
  
  componentDidMount() {
    // console.log("+PC: cDM: cPId: ", currentProductId)
    // console.log("+PC: cDM: cRPId: ", cardProductId)
    this.loadProductData();
  }

  // Strictly speaking, not needed. KEEPT FOR DEBUGGING OR IF NEEDED
  componentDidUpdate = (prevProps, prevState) => {
    // console.log("PC: cDU: rPI: ", this.props.cardProductId);
    if (prevProps.cardProductId !== this.props.cardProductId ||
        prevProps.currentProductId !== this.props.currentProductId) {
      this.loadProductData();
    }
  }
  
  loadProductData = () => {
    helper.getOneProduct(this.props.currentProductId, result => {
      // console.log("PC: lRPD: gOP: result: " , result)
      this.setState({
        currentProduct: result
      });
    });
    helper.getOneProduct(this.props.cardProductId, result => {
      // console.log("PC: lRPD: gOP: result: " , result)
      this.setState({
        relatedProduct: result
      });
    });
  }
  
  isReadytoRender = () => {
    return (
      this.state.currentProduct !== null &&
      this.state.relatedProduct !== null
    );
  }

  render() {
    // console.log("PC-DATE-TIME: render: ", new Date());

    if (!this.isReadytoRender()) return null;

    const { currentProduct, relatedProduct } = this.state;

    // console.log("PC: cPId: ", currentProduct.id); // used only for debugging
    // console.log("PC: cP: ", currentProduct); // used only for debugging
    // console.log("PC: cPId: ", cardProductId);
    // console.log("PC: rP: ", relatedProduct);
    const currentProductName = currentProduct.name;
    const relatedProductName = relatedProduct.name;
    // console.log("PComp: typeof cP: ", currentProduct);

    const currentFeaturesArr = currentProduct.features || null;
    // console.log("PC: rCat: ", relatedCategory);
    const currentFeaturesArrLen = currentFeaturesArr.length

    const relatedFeaturesArr = relatedProduct.features || null;
    // console.log("PC: rCat: ", relatedCategory);
    const relatedFeaturesTempArr = relatedFeaturesArr.slice() || null;
    // const relatedFeaturesArrLen = relatedFeaturesArr.length

    const allFeaturesArr = [];
    
    for (let i = 0; i < currentFeaturesArr.length; i++) {
      if (currentFeaturesArr[i].value === "null") currentFeaturesArr[i].value = "(not applicable)";
      allFeaturesArr.push( 
        {
          feature: currentFeaturesArr[i].feature,
          currentValue: currentFeaturesArr[i].value
        }
      )
      for (let j = 0; j < relatedFeaturesTempArr.length; j++) {
        if (allFeaturesArr[i].feature === relatedFeaturesTempArr[j].feature) {
          if (relatedFeaturesTempArr[j].value === "null") relatedFeaturesTempArr[j].value = "(not applicable)";
          allFeaturesArr[i].relatedValue = relatedFeaturesTempArr[j].value;
          relatedFeaturesTempArr.splice(j, 1);
          j--;
        } else {
          allFeaturesArr[i].relatedValue = null;
        }
      }
    }
    for (let j = currentFeaturesArrLen - 1; j < relatedFeaturesTempArr.length; j++) {
      if (relatedFeaturesTempArr[j].value === "null") relatedFeaturesTempArr[j].value = "(not applicable)";
      allFeaturesArr.push( 
        {
          feature: relatedFeaturesTempArr[j].feature,
          // currentValue: null,
          currentValue: null,
          relatedValue: relatedFeaturesTempArr[j].value
        }
      )
    }

    // modal setup
    // const [show, setShow] = useState(false);
    const show = true;
    const setShow = () => {
    }

    const handleClose = () => setShow(false);

    return (
      // <Container-fluid class="layout product-card-layout align-left">
        <Modal className="comparison-body" show={show} onHide={handleClose} >
          <Modal.Header closeButton onClick={this.props.closeComparison}>
            <Modal.Title>Product Comparison</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive>
              <thead className="comparison-body">
                <tr>
                  <th>{currentProductName}</th>
                  <th>Feature</th>
                  <th>{relatedProductName}</th>
                </tr>
              </thead>
              <tbody className="comparison-body"> 
                {
                    allFeaturesArr.map((feature, index) => {
                      // console.log("PComp: render: allF: ", feature)
                      return (
                        <tr className="cols layout comparison-body rows" key={index}>
                          <td>{allFeaturesArr[index].currentValue}</td>
                          <td>{allFeaturesArr[index].feature}</td>
                          <td>{allFeaturesArr[index].relatedValue}</td>
                        </tr>
                      )
                    })
                  }
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      // </Container-fluid>
    )
  }
}

export default ProductComparison;
