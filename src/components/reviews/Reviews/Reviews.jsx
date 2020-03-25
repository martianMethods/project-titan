/* eslint-disable react/prop-types */
import React from "react";
import "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Reviews.css";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";

import ReviewTiles from "../ReviewsTiles/ReviewTiles";
import Ratings from "../ratings/Ratings.jsx";
import AddReview from "../AddReview/AddReview.jsx";

const helper = require("../../../helper/helper.js");

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewsBtn: false,
      reviews: [],
      productId: this.props.productID,
      itemsToShow: 2,
      options: ["newest", "helpful", "relevant"],
      option: "",
      sortedBy: "relevant",
      starSort: null,
      ShowModal: false,
      backupRatings: 0,
      backupRatingsLength: 0,
      backupAvg: 0
    };
  }

  ShowModal = () => {
    this.setState({ ShowModal: !this.state.ShowModal });
  };

  handleStarSort = star => {
    this.setState({ starSort: star });
  };

  componentDidMount = () => {
    const { productID } = this.props;
    helper.getListReviews(productID, this.state.sortedBy, result => {
      this.setState({
        reviews: result.results,
        backupRatings:
          result.results.map(item => item.rating) !== undefined
            ? result.results.map(item => item.rating).reduce((a, b) => a + b)
            : null,
        backupRatingsLength: result.results.map(item => item.rating).length,
        backupAvg: parseFloat(
          (
            result.results.map(item => item.rating).reduce((a, b) => a + b) /
            result.results.map(item => item.rating).length
          ).toFixed(1, 10)
        )
      });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { productID } = this.props;
    if (prevState.sortedBy !== this.state.sortedBy) {
      helper.getListReviews(productID, this.state.sortedBy, result => {
        this.setState({
          reviews: result.results
        });
      });
    }
    if (prevState.starSort !== this.state.starSort) {
      helper.getListReviews(productID, this.state.sortedBy, result => {
        this.setState({
          reviews: result.results.filter(
            item => item.rating === this.state.starSort
          )
        });
      });
    }
  }

  moreReviews = () => {
    this.setState({ itemsToShow: this.state.itemsToShow + 2 });
  };

  setOption = option => {
    this.setState({ sortedBy: option });
  };

  render() {
    const { reviews } = this.state;
    const { itemsToShow } = this.state;
    return (
      <Container-fluid className="noBorder layout container">
        <Col sm={{ span: 10, offset: 1 }} className="layout container noBorder">
          <Row className="layout noBorder">Ratings and Reviews</Row>
          <Row className="layout noBorder">
            <Col sm={2} className="layout noBorder">
              <Ratings
                productId={this.state.productId}
                reviews={this.state.reviews}
                handleStarSort={this.handleStarSort}
                backupRatings={this.state.backupRatings}
                backupRatingsLength={this.state.backupRatingsLength}
                backupAvg={this.state.backupAvg}
              />
            </Col>
            <Col sm={1} className="layout noBorder"></Col>
            <Col className="layout noBorder">
              <Row className="layout noBorder">
                <span className="ptag noBorder">
                  {reviews.length} Reviews, sort on
                </span>
                <DropdownButton title={this.state.sortedBy}>
                  {this.state.options.map(option => (
                    <DropdownItem
                      key={option}
                      title={option}
                      onClick={() =>
                        this.setState({
                          sortedBy: option
                        })
                      }
                    >
                      {option}
                    </DropdownItem>
                  ))}
                </DropdownButton>
              </Row>
              <br />
              <Row
                style={{
                  height: "60vh",
                  width: "100%",
                  padding: "2%",
                  overflowWrap: "anywhere",
                  overflowY: "scroll"
                }}
              >
                {reviews.length >= 2
                  ? reviews.slice(0, itemsToShow).map(review => {
                      const date = new Date(review.date).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        }
                      );
                      return (
                        <ReviewTiles
                          review={review}
                          date={`${date}`}
                          key={review.review_id}
                          helper={helper}
                        />
                      );
                    })
                  : reviews.map(review => {
                      const date = new Date(review.date).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        }
                      );
                      return (
                        <ReviewTiles
                          review={review}
                          date={`${date}`}
                          key={review.review_id}
                          helper={helper}
                        />
                      );
                    })}
              </Row>
              <br />
              <Row className="layout noBorder">
                {!this.state.reviewsBtn &&
                this.state.itemsToShow < this.state.reviews.length ? (
                  <Button onClick={e => this.moreReviews()}>
                    Show more reviews
                  </Button>
                ) : null}{" "}
                <Button
                  className="addReviewBtn"
                  onClick={() => this.ShowModal()}
                >
                  ADD A REVIEW
                </Button>
                {this.state.ShowModal ? (
                  <AddReview
                    productID={this.props.productID}
                    productName={this.props.product.name}
                    ShowModal={this.ShowModal}
                  />
                ) : null}
              </Row>
            </Col>
          </Row>
        </Col>
        <br />
      </Container-fluid>
    );
  }
}

export default Reviews;
