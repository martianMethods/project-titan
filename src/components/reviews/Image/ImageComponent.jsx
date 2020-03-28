/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import "./ImageComponent.css";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      tempPhoto: ""
    };
  }

  componentDidMount = () => {
    const { photo } = this.props;
    this.setState({ tempPhoto: photo });
  };
  handleShowImage = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { photo } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        {isOpen ? (
          <div>
            <Image
              src={photo}
              thumbnail
              style={{ width: "9rem", height: "8rem" }}
              onClick={this.handleShowImage}
            />
            <Modal show={true}>
              <ModalHeader style={{ textAlign: "right" }}>
                <button onClick={this.handleShowImage}>
                  <span role="img" aria-labelledby="photoId">
                    &#x274C;
                  </span>
                </button>
              </ModalHeader>
              <ModalBody style={{ textAlign: "center" }}>
                <Image
                  src={photo}
                  rounded
                  style={{ width: "100%", height: "auto" }}
                />
              </ModalBody>
            </Modal>
          </div>
        ) : (
          <Image
            src={photo}
            thumbnail
            style={{ width: "9rem", height: "8rem" }}
            onClick={this.handleShowImage}
          />
        )}
      </div>
    );
  }
}

ImageComponent.propTypes = {
  photo: PropTypes.string,
  id: PropTypes.number
};
ImageComponent.defaultProps = {
  photo: "",
  id: 27255
};
