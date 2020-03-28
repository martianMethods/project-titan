import React, { Component } from "react";
import "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import StarRatingComponent from "react-star-rating-component";
import "./AddReview.css";

const helper = require("../../../helper/helper.js");

export default class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: this.props.productID,
      meta: [],
      fitId: 0,
      sizeId: 0,
      lengthId: 0,
      comfortId: 0,
      qualityId: 0,
      widthId: 0,
      overallRating: 0,
      recommend: null,
      Characteristics: [],
      Fit: "",
      Size: "",
      Length: "",
      Comfort: "",
      Quality: "",
      Width: "",
      summary: "",
      body: "",
      bodyCount: 50,
      nickname: "",
      photos: [],
      email: "",
      ShowModal: true,
      overallError: "",
      recommendError: "",
      characteristicsError: "",
      bodyError: "",
      nicknameError: "",
      emailError: "",
      errorMsg: "",
      successMsg: false,
      rating: 0,
      ratingMeaning: ["", "Poor", "Fair", "Average", "Good", "Great"]
    };
  }

  CloseModal = () => {
    this.setState({
      ShowModal: false
    });
  };

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
  };

  componentDidMount() {
    const { productId } = this.state;

    helper.getReviewMetadata(productId, results =>
      // eslint-disable-next-line implicit-arrow-linebreak
      this.setState({
        meta: results,
        fitId: results.characteristics.Fit
          ? results.characteristics.Fit.id
          : null,
        lengthId: results.characteristics.Length
          ? results.characteristics.Length.id
          : null,
        comfortId: results.characteristics.Comfort
          ? results.characteristics.Comfort.id
          : null,
        qualityId: results.characteristics.Quality
          ? results.characteristics.Quality.id
          : null,
        sizeId: results.characteristics.Size
          ? results.characteristics.Size.id
          : null,
        widthId: results.characteristics.Width
          ? results.characteristics.Width.id
          : null,
        Characteristics: Object.keys(results.characteristics),
        size: results.characteristics.Size ? results.characteristics.Size : 0
      })
    );
  }

  handleSubmit = () => {
    const { productId } = this.state;
    const { summary } = this.state;
    //const { Characteristics } = this.state;
    const { recommend } = this.state;
    const { nickname } = this.state;
    const { body } = this.state;
    const { email } = this.state;
    const { Fit } = this.state;
    const { Size } = this.state;
    const { Length } = this.state;
    const { Width } = this.state;
    const { Comfort } = this.state;
    const { Quality } = this.state;
    const { rating } = this.state;
    const { fitId } = this.state;
    const { lengthId } = this.state;
    const { comfortId } = this.state;
    const { qualityId } = this.state;
    const { sizeId } = this.state;
    const { widthId } = this.state;

    let error = false;

    let review = {
      rating: rating,
      summary: summary,
      body: body,
      recommend: recommend === "true" ? true : false, // recommend.toLowerCase() ===
      name: nickname,
      email: email,
      photos: [],
      characteristics: {
        [`${fitId}`]: parseInt(Fit),
        [`${lengthId}`]: parseInt(Length),
        [`${comfortId}`]: parseInt(Comfort),
        [`${qualityId}`]: parseInt(Quality),
        [`${sizeId}`]: parseInt(Size),
        [`${widthId}`]: parseInt(Width)
      }
    };

    if (this.state.rating === 0) {
      error = true;
      this.setState({
        overallError: "You must select one of the ratings:",
        errorMsg: "Invalid Overall Rating"
      });
    } else {
      this.setState({ overallError: "" });
    }
    if (!this.state.recommend) {
      error = true;
      this.setState({
        recommendError: "You must select one of the ratings:",
        errorMsg: "Invalid Recommend Rating"
      });
    } else {
      this.setState({ recommendError: "" });
    }

    // ///////// SOMETHING IN HERE CAUSES REVIEWS NOT TO POST ///////////

    // if (!!this.state.Characteristics) {
    //   error = true;
    //   this.setState({
    //     characteristicsError: "You must select one of the ratings:",
    //     errorMsg: "Invalid Characteristics Rating"
    //   });
    // } else {
    //   this.setState({ characteristicsError: "" });
    // }
    // if (!this.state.Fit) {
    //   error = true;
    //   this.setState({
    //     characteristicsError: "You must select one of the ratings:",
    //     errorMsg: "Invalid Characteristics Rating"
    //   });
    // } else {
    //   this.setState({ characteristicsError: "" });
    // }
    // if (!this.state.Size) {
    //   error = true;
    //   this.setState({
    //     characteristicsError: "You must select one of the ratings:",
    //     errorMsg: "Invalid Characteristics Rating"
    //   });
    // } else {
    //   this.setState({ characteristicsError: "" });
    // }
    // if (!this.state.Length) {
    //   error = true;
    //   this.setState({
    //     characteristicsError: "You must select one of the ratings:",
    //     errorMsg: "Invalid Characteristics Rating"
    //   });
    // } else {
    //   this.setState({ characteristicsError: "" });
    // }
    // if (!this.state.Comfort) {
    //   error = true;
    //   this.setState({
    //     characteristicsError: "You must select one of the ratings:",
    //     errorMsg: "Invalid Characteristics Rating"
    //   });
    // } else {
    //   this.setState({ characteristicsError: "" });
    // }
    // if (!this.state.Quality) {
    //   error = true;
    //   this.setState({
    //     characteristicsError: "You must select one of the ratings:",
    //     errorMsg: "Invalid Characteristics Rating"
    //   });
    // } else {
    //   this.setState({ characteristicsError: "" });
    // }
    // if (!this.state.Width) {
    //   error = true;
    //   this.setState({
    //     characteristicsError: "You must select one of the ratings:",
    //     errorMsg: "Invalid Characteristics Rating"
    //   });
    // } else {
    //   this.setState({ characteristicsError: "" });
    // }
    if (!this.state.body) {
      error = true;
      this.setState({
        bodyError: "You must fill in the following:",
        errorMsg: "Invalid Body"
      });
    } else {
      this.setState({ bodyError: "" });
    }
    if (!this.state.nickname) {
      error = true;
      this.setState({
        nicknameError: "You must fill in the following:",
        errorMsg: "Invalid Nickname"
      });
    } else {
      this.setState({ nicknameError: "" });
    }
    if (!this.state.email) {
      error = true;
      this.setState({
        emailError: "You must provide a valid email:",
        errorMsg: "Invalid Email"
      });
    } else {
      this.setState({ emailError: "" });
    }

    if (!error) {
      helper.postReview(productId, review, () => true);
      this.setState({ successMsg: true });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { bodyCount } = this.state;
    if (prevState.bodyCount !== this.state.bodyCount) {
      this.setState({ bodyCount: bodyCount });
    }
  }
  handleRating = e => {
    this.setState({ overallRating: e.target.name });
  };

  handleCharacteristics = e => {
    console.log();
    this.setState({ [e.target.id]: e.target.name });
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBody = e => {
    if (this.state.bodyCount > 0) {
      this.setState({
        bodyCount: this.state.bodyCount - 1,
        [e.target.name]: e.target.value
      });
    } else {
      if (this.state.bodyCount === 0) {
        this.setState({ bodyCount: "Minimum reached" });
      }
    }
  };

  handleRecommend = e => {
    this.setState({ recommend: e.target.name });
  };

  Photos = e => {
    if (this.state.photos.length < 5) {
      let morePhotos = this.state.photos;
      morePhotos.push(e.target.value);
      this.setState({ photos: morePhotos });
    }
  };

  render() {
    const { Characteristics } = this.state;
    // const { email } = this.state;
    // const { body } = this.state;
    // const { summary } = this.state;
    // const { nickname } = this.state;
    const { rating } = this.state;
    const { ratingMeaning } = this.state;

    // const isEnabled =
    //   email.length > 5 &&
    //   body.length > 50 &&
    //   summary.length < 60 &&
    //   nickname.length < 60 &&
    //   body.length < 1000;
    return (
      <div>
        {!this.state.successMsg ? (
          <Modal size="lg" show={this.state.ShowModal}>
            <ModalHeader>
              <h2>Write Your Review</h2>
              <h3>About the {this.props.productName}</h3>
            </ModalHeader>
            <ModalTitle />
            <Form>
              <dl className="paddy">
                <Form.Label>
                  <b>*Overall Rating:</b>
                  <p style={{ color: "red" }}>
                    <i>{this.state.overallError}</i>
                  </p>
                  <div>
                    <h3>{ratingMeaning[rating]}</h3>
                    <StarRatingComponent
                      name="overall"
                      starCount={5}
                      value={rating}
                      onStarClick={this.onStarClick}
                    />
                  </div>
                  <b>*Do You Recommend This Product?:</b>
                  <p style={{ color: "red" }}>
                    <i>{this.state.recommendError}</i>
                  </p>
                  {["checkbox"].map(type => (
                    <div key={`inline-${type}`} required className="mb-3">
                      <Form.Check
                        inline
                        onClick={this.handleRecommend}
                        name="Yes"
                        label="Yes"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        onClick={this.handleRecommend}
                        name="No"
                        label="No"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                    </div>
                  ))}
                  <b>*Characteristics:</b>
                </Form.Label>
                {Characteristics.map(item => (
                  <div key={`inline-${item}`} required className="mb-3">
                    <Form.Label>
                      <b>{item}</b>
                      <p style={{ color: "red" }}>
                        <i>{this.state.characteristicsError}</i>
                      </p>
                    </Form.Label>
                    <br />
                    {item === "Fit" ? (
                      <dl>
                        <Form.Check
                          inline
                          name="1"
                          onClick={this.handleCharacteristics}
                          label="1 - Runs tight"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="2"
                          onClick={this.handleCharacteristics}
                          label="2 - Rus slightly light"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="3"
                          onClick={this.handleCharacteristics}
                          label="3 - Perfect"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="4"
                          onClick={this.handleCharacteristics}
                          label="4 - Rus slightly long"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="5"
                          onClick={this.handleCharacteristics}
                          label="5 - Runs long"
                          type="checkbox"
                          id={item}
                        />
                      </dl>
                    ) : null}
                    {item === "Length" ? (
                      <dl>
                        <Form.Check
                          inline
                          name="1"
                          onClick={this.handleCharacteristics}
                          label="1 - Runs short"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="2"
                          onClick={this.handleCharacteristics}
                          label="2 - Runs slightly short"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="3"
                          onClick={this.handleCharacteristics}
                          label="3 - Perfect"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="4"
                          onClick={this.handleCharacteristics}
                          label="4 - Runs slightly long"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="5"
                          onClick={this.handleCharacteristics}
                          label="5 - Runs long"
                          type="checkbox"
                          id={item}
                        />
                      </dl>
                    ) : null}
                    {item === "Comfort" ? (
                      <dl>
                        <Form.Check
                          inline
                          name="1"
                          onClick={this.handleCharacteristics}
                          label="1 - Uncomfortable"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="2"
                          onClick={this.handleCharacteristics}
                          label="2 - slightly uncomfortable"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="3"
                          onClick={this.handleCharacteristics}
                          label="3 - Ok"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="4"
                          onClick={this.handleCharacteristics}
                          label="4 - Comfortable"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="5"
                          onClick={this.handleCharacteristics}
                          label="5 - Perfect"
                          type="checkbox"
                          id={item}
                        />
                      </dl>
                    ) : null}
                    {item === "Quality" ? (
                      <dl>
                        <Form.Check
                          inline
                          name="1"
                          onClick={this.handleCharacteristics}
                          label="1 - Poor"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="2"
                          onClick={this.handleCharacteristics}
                          label="2 - Below average"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="3"
                          onClick={this.handleCharacteristics}
                          label="3 - What I expected"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="4"
                          onClick={this.handleCharacteristics}
                          label="4 - Pretty great"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="5"
                          onClick={this.handleCharacteristics}
                          label="5 - Perfect"
                          type="checkbox"
                          id={item}
                        />
                      </dl>
                    ) : null}
                    {item === "Size" ? (
                      <dl>
                        <Form.Check
                          inline
                          name="1"
                          onClick={this.handleCharacteristics}
                          label="1 - A size too small"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="2"
                          onClick={this.handleCharacteristics}
                          label="2 - half a size too small"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="3"
                          onClick={this.handleCharacteristics}
                          label="3 - Perfect"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="4"
                          onClick={this.handleCharacteristics}
                          label="4 - half a size too big"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="5"
                          onClick={this.handleCharacteristics}
                          label="5 - A size too wide"
                          type="checkbox"
                          id={item}
                        />
                      </dl>
                    ) : null}
                    {item === "Width" ? (
                      <dl>
                        <Form.Check
                          inline
                          name="1"
                          onClick={this.handleCharacteristics}
                          label="1 - Too narrow"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="2"
                          onClick={this.handleCharacteristics}
                          label="2 - Slightly narrow"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="3"
                          onClick={this.handleCharacteristics}
                          label="3 - Perfect"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="4"
                          onClick={this.handleCharacteristics}
                          label="4 - Slightly wide"
                          type="checkbox"
                          id={item}
                        />
                        <Form.Check
                          inline
                          name="5"
                          onClick={this.handleCharacteristics}
                          label="5 - Too wide"
                          type="checkbox"
                          id={item}
                        />
                      </dl>
                    ) : null}
                  </div>
                ))}
                <Form.Label>
                  <b>Review Summary:</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="summary"
                  maxLength="60"
                  onChange={this.handleInput}
                  placeholder="Example: Best purchase ever!"
                />
                <Form.Label>
                  <b>*Review Body:</b>
                  <p style={{ color: "red" }}>
                    <i>{this.state.bodyError}</i>
                  </p>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="body"
                  // minLength="50"
                  // maxLength="1000"
                  onChange={this.handleBody}
                  placeholder="Why did you like the product or not?"
                />
                <p>Minimum required characters left: {this.state.bodyCount}</p>
                <Form.Label>
                  <b>Photos:</b>
                </Form.Label>
                <Form.Control placeholder="Provide a URL" />
                <div>
                  <input type="file" onChange={this.Photos} />
                </div>
                <div>
                  {this.state.photos.map((photo, i) => (
                    <imageComponent
                      photo={photo.url}
                      id={photo.id}
                      handleShowImage={this.handleShowImage}
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                    />
                  ))}
                </div>
                <Form.Label>
                  <b>*Nickname:</b>
                  <p style={{ color: "red" }}>
                    <i>{this.state.nicknameError}</i>
                  </p>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="nickname"
                  maxLength="60"
                  onChange={this.handleInput}
                  placeholder="Example: jackson11!"
                />
                <p>
                  <i>
                    For privacy reasons, do not use your full name or email
                    address
                  </i>
                </p>
                <Form.Label>
                  <b>*Email:</b>
                  <p style={{ color: "red" }}>
                    <i>{this.state.emailError}</i>
                  </p>
                </Form.Label>
                <Form.Control
                  required
                  name="email"
                  type="text"
                  maxLength="60"
                  onChange={this.handleInput}
                  placeholder="Example: jackson11@email.com"
                />
              </dl>
            </Form>
            <ModalBody />
            <ModalFooter>
              <Button
                // disabled={!isEnabled}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button onClick={this.props.ShowModal}>Close</Button>
            </ModalFooter>
          </Modal>
        ) : (
          <Modal show={this.props.Show}>
            <h1>Success!</h1>
            <Button onClick={this.props.ShowModal}>Close</Button>
          </Modal>
        )}
      </div>
    );
  }
}
