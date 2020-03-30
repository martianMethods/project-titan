/* eslint-disable react/no-unused-state */
/* eslint-disable arrow-parens */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Ratings.css";
import StarRatings from "react-star-ratings";
import ProgressBar from "react-bootstrap/ProgressBar";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

const helper = require("../../../helper/helper.js");

export default class Ratings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: this.props.productId,
      reviews: this.props.reviews,
      backupRatings: [],
      meta: [],
      ratingStars: [],
      ratingVals: [],
      ratingsValsSum: 0,
      ratingsAvg: 0,
      characteristics: [],
      characteristicsBool: false,
      size: 0,
      width: 0,
      comfort: 0,
      quality: 0,
      Length: 0,
      fit: 0,
      backupSum: 0
    };
  }

  componentDidMount() {
    const { productId } = this.state;

    helper.getReviewMetadata(productId, results =>
      // eslint-disable-next-line implicit-arrow-linebreak
      this.setState({
        meta: results,
        characteristicsBool: !!results.characteristics.Size,
        characteristics: Object.values(results.characteristics),
        size:
          results.characteristics.Size == null // productId 6,11,12,52,72 has problem of null
            ? 0
            : parseFloat(results.characteristics.Size.value.slice(0, 3)),
        width:
          results.characteristics.Width == null
            ? 0
            : parseFloat(results.characteristics.Width.value.slice(0, 3)),
        comfort:
          results.characteristics.Comfort == null
            ? 0
            : parseFloat(results.characteristics.Comfort.value.slice(0, 3)),
        quality:
          results.characteristics.Quality == null
            ? 0
            : parseFloat(results.characteristics.Quality.value.slice(0, 3)),
        Length:
          results.characteristics.Length == null
            ? 0
            : parseFloat(results.characteristics.Length.value.slice(0, 3)),
        fit:
          results.characteristics.Fit == null
            ? 0
            : parseFloat(results.characteristics.Fit.value.slice(0, 3)),
        recommendedSum: Object.values(results.recommended).reduce(
          (a, b) => a + b
        ),
        recommendedYes: Object.values(results.recommended)[1],
        ratingStars: Object.keys(results.ratings),
        ratingVals: Object.values(results.ratings),
        ratingsValsSum: Object.values(results.ratings).reduce((a, b) => a + b),
        theSum: Object.keys(results.ratings)
          .map((item, i) => {
            const valys = Object.values(results.ratings);
            return parseInt(item, 10) * valys[i];
          })
          .reduce((a, b) => a + b),
        ratingSum: Object.values(results.ratings)
          .map((item, i) => item * (i + 1))
          .reduce((a, b) => a + b),

        ratingsLength: Object.values(results.ratings).reduce(
          (previous, current) => (current += previous)
        ),
        ratingsAvg:
          Object.keys(results.ratings)
            .map((item, i) => {
              const valys = Object.values(results.ratings);
              return parseInt(item, 10) * valys[i];
            })
            .reduce((a, b) => a + b) /
          Object.values(results.ratings).reduce(
            (previous, current) => (current += previous)
          )
      })
    );
  }

  backupSum() {
    const { backupRatings } = this.props;

    return backupRatings.reduce((a, b) => a + b);
  }

  render() {
    const { handleStarSort } = this.props;
    // if (this.state.ratingsAvg === 0) {
    //   return null;
    // }
    if (this.state.recommendedYes === undefined) {
      return null; // this.state.recommendedYes = null;
    }
    return (
      <div
        style={{
          minHeight: "100vh",
          position: "relative"
        }}
      >
        <Row className="layout noBorder ratingAvg">
          {this.state.ratingsAvg !== 0
            ? this.state.ratingsAvg.toFixed(1)
            : this.props.backupAvg.toFixed(1)}

          <span className="stary">
            <StarRatings
              rating={this.state.ratingsAvg}
              starDimension="1em"
              starSpacing="0"
            />{" "}
          </span>
        </Row>
        <br />
        <Row className="layout">
          {this.state.recommendedYes || this.state.recommendedSum
            ? (
                (this.state.recommendedYes / this.state.recommendedSum) *
                100
              ).toFixed(0)
            : 0}
          % of reviews recommend
        </Row>
        <Row className="layout lessSpace">
          <Col xs={2}>
            <Row onClick={() => handleStarSort(5)} className="underline">
              5 Star
            </Row>
            <Row onClick={() => handleStarSort(4)} className="underline">
              4 Star{" "}
            </Row>
            <Row onClick={() => handleStarSort(3)} className="underline">
              3 Star
            </Row>
            <Row onClick={() => handleStarSort(2)} className="underline">
              2 Star
            </Row>
            <Row onClick={() => handleStarSort(1)} className="underline">
              1 Star
            </Row>
          </Col>
          <Col xs={8} className="noPaddy" style={{ width: "100%" }}>
            <ProgressBar
              className="ratingBars"
              variant="success"
              // style={{ width: "100%" }}
              max={this.state.ratingsValsSum}
              now={
                this.state.ratingStars.includes("5")
                  ? this.state.ratingVals[this.state.ratingStars.indexOf("5")]
                  : 0
              }
            />

            <ProgressBar
              className="ratingBars"
              variant="success"
              max={this.state.ratingsValsSum}
              now={
                this.state.ratingStars.includes("4")
                  ? this.state.ratingVals[this.state.ratingStars.indexOf("4")]
                  : 0
              }
            />

            <ProgressBar
              className="ratingBars"
              variant="success"
              max={this.state.ratingsValsSum}
              now={
                this.state.ratingStars.includes("3")
                  ? this.state.ratingVals[this.state.ratingStars.indexOf("3")]
                  : 0
              }
            />

            <ProgressBar
              className="ratingBars"
              variant="success"
              max={this.state.ratingsValsSum}
              now={
                this.state.ratingStars.includes("2")
                  ? this.state.ratingVals[this.state.ratingStars.indexOf("2")]
                  : 0
              }
            />

            <ProgressBar
              className="ratingBars"
              variant="success"
              max={this.state.ratingsValsSum}
              now={
                this.state.ratingStars.includes("1")
                  ? this.state.ratingVals[this.state.ratingStars.indexOf("1")]
                  : 0
              }
            />
          </Col>
          <Col xs={1}>
            <Row>
              {this.state.ratingStars.includes("5")
                ? this.state.ratingVals[this.state.ratingVals.length - 1]
                : 0}
            </Row>
            <Row>
              {this.state.ratingStars.includes("4")
                ? this.state.ratingVals[this.state.ratingStars.indexOf("4")]
                : 0}
            </Row>
            <Row>
              {this.state.ratingStars.includes("3")
                ? this.state.ratingVals[this.state.ratingStars.indexOf("3")]
                : 0}
            </Row>
            <Row>
              {this.state.ratingStars.includes("2")
                ? this.state.ratingVals[this.state.ratingStars.indexOf("2")]
                : 0}
            </Row>
            <Row>
              {this.state.ratingStars.includes("1")
                ? this.state.ratingVals[this.state.ratingStars.indexOf("1")]
                : 0}
            </Row>
          </Col>
        </Row>
        <br />
        {this.state.size !== 0 || this.state.characteristics === true ? (
          <Col xs={12}>
            <Row className="layout">
              <Col className="noPaddy">
                <Row className="noPaddy">
                  <strong>Size:</strong>
                </Row>
                <RangeSlider
                  disabled={true}
                  className="rangy"
                  tooltip="auto"
                  tooltipPlacement="top"
                  step={0.1}
                  onChange={() => true}
                  min={1}
                  max={5}
                  value={this.state.size}
                />
                <Row className="noPaddy smallerText">
                  <Col xs={4}>Too small</Col>
                  <Col xs={4}>Perfect</Col>
                  <Col xs={4}>Too Large</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        ) : null}
        <br />
        {this.state.width !== 0 ? (
           <Col xs={12}>
            <Row className="layout">
              <Col className="noPaddy">
                <Row className="noPaddy">
                  <strong>Width:</strong>
                </Row>
                <RangeSlider
                  disabled={true}
                  className="rangy"
                  tooltip="auto"
                  tooltipPlacement="top"
                  step={0.1}
                  onChange={() => true}
                  min={1}
                  max={5}
                  value={this.state.width}
                />
                <Row className="noPaddy smallerText">
                  <Col xs={4}>Too small</Col>
                  <Col xs={4}>Perfect</Col>
                  <Col xs={4}>Too Large</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        ) : null}
        <br />
        {this.state.comfort !== 0 ? (
          <Col xs={12}>
          <Row className="layout">
            <Col sm={12} className="noPaddy">
              <Row className="noPaddy">
                <strong>Comfort:</strong>
              </Row>
              <RangeSlider
                disabled={true}
                className="rangy"
                tooltip="auto"
                tooltipPlacement="top"
                step={0.1}
                onChange={() => true}
                min={1}
                max={5}
                value={this.state.comfort}
              />
              <Row className="noPaddy smallerText">
                <Col xs={4} style={{ float: "left" }}>
                  Poor
                </Col>
                <Col xs={4} />
                <Col xs={4}>Perfect</Col>
              </Row>
            </Col>
          </Row>
        </Col>
        ) : null}
        <br />
        {this.state.quality !== 0 ? (
           <Col xs={12}>
          <Row className="layout">
            <Col className="noPaddy">
              <Row className="noPaddy">
                <strong>Quality:</strong>
              </Row>
              <RangeSlider
                disabled={true}
                className="rangy"
                tooltip="auto"
                tooltipPlacement="top"
                step={0.1}
                onChange={() => true}
                min={1}
                max={5}
                value={this.state.quality}
              />
              <Row className="noPaddy smallerText">
                <Col xs={4}>Poor</Col>
                <Col xs={4} />
                <Col xs={4}>Great</Col>
              </Row>
            </Col>
          </Row>
          </Col>
        ) : null}
        <br />
        {this.state.Length !== 0 ? (
           <Col xs={12}>
          <Row className="layout">
            <Col className="noPaddy">
              <Row className="noPaddy">
                <strong>Length:</strong>
              </Row>
              <RangeSlider
                disabled={true}
                className="rangy"
                tooltip="auto"
                tooltipPlacement="top"
                step={0.1}
                onChange={() => true}
                min={1}
                max={5}
                value={this.state.Length}
              />
              <Row className="noPaddy smallerText">
                <Col xs={4}>Too small</Col>
                <Col xs={4}>Perfect</Col>
                <Col xs={4}>Too Large</Col>
              </Row>
            </Col>
          </Row>
          </Col>
        ) : null}
        <br />
        {this.state.fit !== 0 ? (
           <Col xs={12}>
          <Row className="layout">
            <Col className="noPaddy">
              <Row className="noPaddy">
                <strong>Fit:</strong>
              </Row>
              <RangeSlider
                disabled={true}
                className="rangy"
                tooltip="auto"
                tooltipPlacement="top"
                step={0.1}
                onChange={() => true}
                min={1}
                max={5}
                value={this.state.fit}
              />
              <Row className="noPaddy smallerText">
                <Col xs={4}>Too small</Col>
                <Col xs={4}>Perfect</Col>
                <Col xs={4}>Too Large</Col>
              </Row>
            </Col>
          </Row>
          </Col>
        ) : null}
        <br />
      </div>
    );
  }
}
