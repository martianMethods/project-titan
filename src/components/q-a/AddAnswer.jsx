import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AnswerImages from "../q-a/AnswerImages.jsx";
const helper = require("../../helper/helper.js");

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Answer: "",
      Nickname: "",
      Email: "",
      Photos: [],
      ErrorMessage: "",
      AnswerError: "",
      NicknameError: "",
      EmailError: "",
      SavePhotos: false,
      NumberOfPictures: 0
    };
  }

  Answer = e => {
    this.setState({ Answer: e.target.value });
  };

  Nickname = e => {
    this.setState({ Nickname: e.target.value });
  };

  Email = e => {
    this.setState({ Email: e.target.value });
  };

  Photos = (e, id) => {
    this.setState({ [id]: e.target.value, NumberOfPictures: id });
  };

  SavePhotos = () => {
    let photosArr = [];
    for (let i = 0; i < this.state.NumberOfPhotos; i++) {
      let index = i;
      photosArr.push(this.state[index]);
    }

    this.setState({
      SavePhotos: true,
      Photos: photosArr
    });
    console.log(this.state.Photos);
  };

  CheckForErrors = () => {
    let errors = false;

    if (!this.state.Answer || this.state.Answer.length > 1000) {
      errors = true;
      this.setState({
        AnswerError: "Invalid Answer",
        ErrorMessage: `You must enter the following:`
      });
    } else {
      this.setState({ AnswerError: "" });
    }

    if (!this.state.Nickname) {
      errors = true;
      this.setState({
        NicknameError: "Invalid Nickname",
        ErrorMessage: `You must enter the following:`
      });
    } else {
      this.setState({ NicknameError: "" });
    }

    if (!this.state.Email || !this.state.Email.includes("@")) {
      errors = true;
      this.setState({
        EmailError: "Invalid Email",
        ErrorMessage: `You must enter the following:`
      });
    } else {
      this.setState({ EmailError: "" });
    }

    if (!errors) {
      helper.postAnAnswer(
        this.props.id,
        this.state.Answer,
        this.state.Nickname,
        this.state.Email,
        null,
        () => true
      );
      this.props.button();
    }
  };

  render() {
    return (
      <Modal size="lg" show={true}>
        <ModalHeader>
          <h2>Submit your Answer</h2>
        </ModalHeader>
        <ModalBody>
          <ModalTitle>
            {this.props.currentProduct.name}: {this.props.questionBody}
          </ModalTitle>
          <Form>
            <p style={{ color: "red" }}>
              <i>{this.state.ErrorMessage}</i>
            </p>
            <Form.Label>
              <b>Your Answer*</b>
            </Form.Label>
            <Form.Control
              maxLength={"1000"}
              onChange={this.Answer}
            ></Form.Control>
            <p style={{ color: "red" }}>
              <i>{this.state.AnswerError}</i>
            </p>
            <Form.Label>
              <b>What is your nickname*</b>
            </Form.Label>
            <Form.Control
              maxLength={"60"}
              placeholder={"Example: jack543!"}
              onChange={this.Nickname}
            ></Form.Control>
            <p>
              <i>
                For privacy reasons, do not use your full name or email address
              </i>
            </p>
            <p style={{ color: "red" }}>
              <i>{this.state.NicknameError}</i>
            </p>
            <Form.Label>
              <b>Your email*</b>
            </Form.Label>
            <Form.Control
              maxLength={"60"}
              type={`email`}
              placeholder={`Example: jack@email.com`}
              onChange={this.Email}
            ></Form.Control>
            <p style={{ color: "red" }}>
              <i>{this.state.EmailError}</i>
            </p>
            <Form.Label>
              <b>Upload Pictures (5 max.)</b>
            </Form.Label>
            <div>
              <p>1.</p>
              <input
                type="url"
                placeholder="https://example.com"
                onChange={e => {
                  this.Photos(e, 1);
                }}
              />
              <br />
              <p>2.</p>
              <input
                type="url"
                placeholder="https://example.com"
                onChange={e => {
                  this.Photos(e, 2);
                }}
              />
              <br />
              <p>3.</p>
              <input
                type="url"
                placeholder="https://example.com"
                onChange={e => {
                  this.Photos(e, 3);
                }}
              />
              <br />
              <p>4.</p>
              <input
                type="url"
                placeholder="https://example.com"
                onChange={e => {
                  this.Photos(e, 4);
                }}
              />
              <br />
              <p>5.</p>
              <input
                type="url"
                placeholder="https://example.com"
                onChange={e => {
                  this.Photos(e, 5);
                }}
              />
              <br />
            </div>
            <Button onClick={this.SavePhotos} variant="outline-primary">
              Save
            </Button>
            <div>
              {this.state.SavePhotos
                ? this.state.Photos.map((picture, index) => (
                    <div>
                      <p>{index + 1}</p>
                      <AnswerImages photo={picture} key={picture} />
                      <br />
                    </div>
                  ))
                : null}
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.CheckForErrors} variant="outline-primary">
            Submit
          </Button>
          <Button onClick={this.props.button} variant="outline-primary">
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddAnswer;
