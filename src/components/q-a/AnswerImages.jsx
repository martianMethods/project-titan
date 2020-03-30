import React from "react";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";

class AnswerImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  ShowModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <div>
        {this.state.showModal ? (
          <div>
            <Image
              src={this.props.photo}
              thumbnail
              style={{ width: "25%", height: "auto" }}
              onClick={this.ShowModal}
            />
            <Modal show={true}>
              <ModalHeader style={{ textAlign: "right" }}>
                <button onClick={this.ShowModal}>
                  <span role="img" aria-label="close button">
                    &#x274C;
                  </span>
                </button>
              </ModalHeader>
              <ModalBody style={{ textAlign: "center" }}>
                <Image
                  src={this.props.photo}
                  rounded
                  style={{ width: "100%", height: "auto" }}
                />
              </ModalBody>
            </Modal>
          </div>
        ) : (
          <Image
            src={this.props.photo}
            onError={function() {alert('Invalid image source')}}
            thumbnail
            style={{ width: "25%", height: "auto" }}
            onClick={this.ShowModal}
          />
        )}
      </div>
    );
  }
}

export default AnswerImages;
