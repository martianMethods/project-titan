/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import "./ImageComponent.css";
import PropTypes from "prop-types";

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  handleShowImage = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { photo, id } = this.props;
    const { isOpen } = this.state;
    return (
      <div>
        <React.Fragment key={id}>
          <img
            className="small-image"
            src={photo}
            onClick={this.handleShowImage}
            alt="review"
          />
          {isOpen && (
            <dialog
              className="dialog"
              style={{ position: "absolute" }}
              open
              onClick={this.handleShowImage}
            >
              <img
                className="big-image"
                src={photo}
                onClick={this.handleShowImage}
                alt="review"
              />
            </dialog>
          )}
        </React.Fragment>
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
