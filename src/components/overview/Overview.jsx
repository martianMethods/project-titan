import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton
} from "react-share";
import { FacebookIcon, PinterestIcon, TwitterIcon } from "react-share";
import StarRatings from "react-star-ratings";
import ImageGallery from "react-image-gallery";
import ReactImageMagnify from "react-image-magnify";
import "react-image-gallery/styles/css/image-gallery.css";
import "./Overview.css";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselIndex: 0,
      fullscreen: false,
      megaZoom: false
    };
    this.defaultRadio = React.createRef();
    this.sizeSelector = React.createRef();
    this.carousel = React.createRef();
    this.radioLoaded = false;

    this.dummyStyle = {
      style_id: null,
      name: null,
      original_price: null,
      sale_price: null,
      "default?": null,
      photos: [
        {
          thumbnail_url: null,
          url: null
        }
      ],
      skus: {
        null: null
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      for (let i = 0; i < this.props.styles.length; i++) {
        if (this.props.styles[i]["default?"]) {
          var defaultStyle = this.props.styles[i];
        }
      }
      this.setState({
        currentStyle: defaultStyle || this.props.styles[0] || this.dummyStyle
      });
    }

    if (this.defaultRadio.current && this.radioLoaded === false) {
      this.defaultRadio.current.checked = true;
      this.radioLoaded = true;
    }

    if (
      this.state.currentStyle &&
      this.state.currentStyle.skus &&
      typeof this.state.currentStyle.outOfStock === "undefined"
    ) {
      let sizes = Object.values(this.state.currentStyle.skus);
      let stock = 0;
      sizes.forEach(size => (stock += size));
      if (stock === 0) {
        let tempStyle = this.state.currentStyle;
        tempStyle.outOfStock = true;
        this.setState({
          currentStyle: tempStyle
        });
      }
    }
  }

  conditionalReviews() {
    if (this.props.numReviews) {
      return (
        <div>
          <StarRatings
            rating={this.props.reviewRating}
            starDimension={"1em"}
            starSpacing={"0"}
          />
          <Button variant="link" onClick={this.props.scroll}>
            Read all {this.props.numReviews} reviews
          </Button>
        </div>
      );
    } else {
      return <br />;
    }
  }

  setStyle(style) {
    this.setState({
      currentStyle: style,
      size: null
    });
  }

  conditionalStyles() {
    let storage = [];
    let styles = [...this.props.styles];
    while (styles.length % 4) {
      styles.push({});
    }
    for (let i = 0; i < styles.length / 4; i++) {
      storage.push(
        <Row className="layout" key={i}>
          {styles.slice(4 * i, 4 * i + 4).map((each, i) => (
            <Col className="layout thumb-col" key={i}>
              <FormCheck.Label
                htmlFor={each.style_id}
                onClick={() => each.style_id && this.setStyle(each)}
              >
                {each.photos && (
                  <Form.Check.Input
                    ref={
                      !this.props.styles[1]
                        ? this.defaultRadio
                        : each["default?"]
                        ? this.defaultRadio
                        : null
                    }
                    name="style"
                    type="radio"
                    id={each.style_id}
                    className="radio-styles"
                  ></Form.Check.Input>
                )}
                <span className="checkmark"></span>
                {each.photos && (
                  <Image
                    className="style-thumbs"
                    src={
                      each.photos[0].thumbnail_url
                        ? each.photos[0].thumbnail_url.includes("unsplash")
                          ? `${each.photos[0].thumbnail_url.substring(
                              0,
                              each.photos[0].thumbnail_url.indexOf("&w=")
                            )}&w=${Math.round(
                              window.innerWidth <= 768
                                ? window.innerWidth / 4
                                : window.innerWidth / 15
                            )}&h=${Math.round(
                              window.innerWidth <= 768
                                ? window.innerWidth / 4
                                : window.innerWidth / 15
                            )}&q=80`
                          : each.photos[0].thumbnail_url
                        : require("../../noImg.svg")
                    }
                    alt={`Thumbnail of ${this.props.product.name} in ${each.name} style`}
                    roundedCircle
                    fluid
                  ></Image>
                )}
              </FormCheck.Label>
            </Col>
          ))}
        </Row>
      );
    }
    return (
      <Form>
        {storage.map((each, i) => (
          <div key={i}>{each}</div>
        ))}
      </Form>
    );
  }

  conditionalSalePrice() {
    if (this.state.currentStyle && this.state.currentStyle.sale_price > 0) {
      return (
        <div>
          <Row className="layout">
            <Col className="layout">
              ${this.state.currentStyle && this.state.currentStyle.sale_price}
            </Col>
          </Row>
          <Row className="layout">
            <Col className="layout">
              <del className="sale-price">
                $
                {this.state.currentStyle &&
                  this.state.currentStyle.original_price}
              </del>
            </Col>
          </Row>
        </div>
      );
    } else if (
      this.state.currentStyle &&
      this.state.currentStyle.original_price > 0
    ) {
      return (
        <Row className="layout">
          <Col className="layout">
            ${this.state.currentStyle && this.state.currentStyle.original_price}
          </Col>
        </Row>
      );
    } else {
      return (
        <Row className="layout">
          <Col className="layout">No pricing available</Col>
        </Row>
      );
    }
  }

  conditionalPinterest() {
    if (this.state.currentStyle && this.state.currentStyle.photos) {
      return (
        <PinterestShareButton
          url={window.location.href}
          media={
            this.state.currentStyle.photos[0].url
              ? this.state.currentStyle.photos[0].url
              : require("../../noImg.svg")
          }
        >
          <PinterestIcon size={window.innerWidth>575?"2em":48} />
        </PinterestShareButton>
      );
    } else {
      return (
        <PinterestShareButton
          url={window.location.href}
          media={"../../logo.png"}
        >
          <PinterestIcon size="1.5em" />
        </PinterestShareButton>
      );
    }
  }

  setSize(size, quantity) {
    this.setState({ size: size, quantity: quantity || 1, noSize: false });
  }

  conditionalSizeSelector() {
    if (this.state.currentStyle) {
      let sizes = Object.entries(this.state.currentStyle.skus);
      if (this.state.currentStyle.outOfStock) {
        return <Button variant="outline-primary">OUT OF STOCK</Button>;
      } else {
        return (
          <DropdownButton
            variant="outline-primary"
            title={this.state.size ? `SIZE: ${this.state.size}` : "SELECT SIZE"}
            ref={this.sizeSelector}
          >
            {sizes.length === 1 && !sizes[0][1] ? (
              <DropdownItem>OUT OF STOCK</DropdownItem>
            ) : (
              sizes.map(
                (size, i) =>
                  !!size[1] && (
                    <DropdownItem key={i} onClick={() => this.setSize(size[0])}>
                      {size[0]}
                    </DropdownItem>
                  )
              )
            )}
          </DropdownButton>
        );
      }
    }
  }

  conditionalQuantitySelector() {
    if (this.state.currentStyle && this.state.currentStyle.skus) {
      let sizes = this.state.currentStyle.skus;
      if (!this.state.size) {
        return <Button variant="outline-primary">-</Button>;
      } else {
        let quantity = [];

        if (sizes[this.state.size] < 15) {
          for (let i = 1; i <= sizes[this.state.size]; i++) {
            quantity.push(i);
          }
        } else {
          for (let i = 1; i <= 15; i++) {
            quantity.push(i);
          }
        }

        return (
          <DropdownButton variant="outline-primary" title={this.state.quantity}>
            {quantity.map((number, i) => (
              <DropdownItem
                key={i}
                onClick={() => this.setSize(this.state.size, number)}
              >
                {number}
              </DropdownItem>
            ))}
          </DropdownButton>
        );
      }
    }
  }

  bagger() {
    if (this.state.size && this.state.quantity) {
      this.props.addToCart({
        product: this.props.product,
        style: this.state.currentStyle,
        size: this.state.size,
        quantity: this.state.quantity
      });
      this.setState({
        size: null,
        quantity: null
      });
    } else {
      this.setState({ noSize: true });
      this.sizeSelector.current.firstChild.click();
    }
  }

  setCarousel(i) {
    this.setState({
      carouselIndex: i
    });
    console.log(i);
  }

  conditionalImageGallery() {
    let photoArray = [];
    this.state.currentStyle &&
      this.state.currentStyle.photos.forEach((each, i) => {
        photoArray.push({
          original: each.url
            ? each.url.includes("unsplash")
              ? `${each.url.substring(0, each.url.indexOf("&w="))}&w=${
                  window.innerWidth
                }&h=${Math.round(window.innerHeight * 0.922)}&q=80&${i}`
              : each.url
            : require("../../noImg.svg"),
          thumbnail: each.thumbnail_url
            ? each.thumbnail_url.includes("unsplash")
              ? `${each.thumbnail_url.substring(
                  0,
                  each.thumbnail_url.indexOf("&w=")
                )}&w=${Math.round(
                  window.innerWidth <= 768
                    ? window.innerWidth / 4
                    : window.innerWidth / 15
                )}&h=${Math.round(
                  window.innerWidth <= 768
                    ? window.innerWidth / 4
                    : window.innerWidth / 15
                )}&q=80&${i}`
              : each.thumbnail_url
            : require("../../noImg.svg"),
          originalAlt: `Image ${i + 1} of ${this.props.product.name} in ${
            this.state.currentStyle.name
          } style`,
          thumbnailAlt: `Thumbnail ${i + 1} of ${this.props.product.name} in ${
            this.state.currentStyle.name
          } style`
        });
      });
    if (
      photoArray.length - 1 < this.state.carouselIndex &&
      this.state.carouselIndex
    ) {
      this.carousel.current &&
        this.carousel.current.slideToIndex(photoArray.length - 1);
    }
    return this.state.megaZoom ? (
      <div onClick={() => this.zoomClick()} className="magnifier">
        <ReactImageMagnify
          enlargedImagePosition="over"
          imageStyle={{ objectFit: "cover" }}
          enlargedImageStyle={{ objectFit: "cover" }}
          {...{
            smallImage: {
              src: photoArray[this.state.carouselIndex].original,
              width: window.innerWidth,
              height: window.innerHeight * 0.922,
              alt: `Unmagnified image ${this.state.carouselIndex + 1} of ${
                this.props.product.name
              } in ${this.state.currentStyle.name} style`
            },
            largeImage: {
              src: `${photoArray[this.state.carouselIndex].original.substring(
                0,
                photoArray[this.state.carouselIndex].original.indexOf("&w=")
              )}&w=${window.innerWidth * 2.5}&h=${Math.round(
                window.innerHeight * 2.5 * 0.922
              )}&q=80&${this.state.carouselIndex}`,
              width: window.innerWidth * 2.5,
              height: window.innerHeight * 0.922 * 2.5,
              alt: `Magnified overlay of image ${this.state.carouselIndex +
                1} of ${this.props.product.name} in ${
                this.state.currentStyle.name
              } style `
            }
          }}
        />
      </div>
    ) : (
      <ImageGallery
        ref={this.carousel}
        items={photoArray}
        thumbnailPosition="left"
        showPlayButton={false}
        infinite={false}
        startIndex={
          photoArray.length - 1 < this.state.carouselIndex
            ? 0
            : this.state.carouselIndex
        }
        onSlide={currentIndex => this.setState({ carouselIndex: currentIndex })}
        useBrowserFullscreen={false}
        onScreenChange={() =>
          this.setState({ fullscreen: !this.state.fullscreen })
        }
        onClick={() => this.zoomClick()}
        showBullets={this.state.fullscreen ? true : false}
      />
    );
  }

  zoomClick() {
    if (this.state.megaZoom) {
      this.setState({ megaZoom: false, fullscreen: false }, () =>
        this.carousel.current.toggleFullScreen()
      );
    } else if (!this.state.fullscreen) {
      this.carousel.current.toggleFullScreen();
    } else if (this.state.fullscreen) {
      this.setState({ megaZoom: true });
    }
  }

  render() {
    return (
      <Container-fluid>
        <Col className="layout overview">
          <Row className="layout">
            <Col
              sm={this.state.fullscreen ? 12 : 8}
              className="layout"
              id="carousel"
            >
              {this.conditionalImageGallery()}
            </Col>
            <Col
              sm={4}
              className="layout"
              id="details"
              style={this.state.fullscreen ? { opacity: 0 } : null}
            >
              <Row className="layout">
                <Col className="layout">{this.conditionalReviews()}</Col>
              </Row>
              <Row className="layout">
                <Col className="layout">{this.props.product.category}</Col>
              </Row>
              <Row className="layout">
                <Col className="layout">
                  <h1>{this.props.product.name || "No product available"}</h1>
                </Col>
              </Row>
              <br />
              {this.conditionalSalePrice()}
              <br />
              <Row className="layout">
                <Col className="layout">
                  <b>STYLE ></b>{" "}
                  {(this.state.currentStyle && this.state.currentStyle.name) ||
                    "No styles available"}
                </Col>
              </Row>
              <br />
              <Row className="layout">
                <Col className="layout">{this.conditionalStyles()}</Col>
              </Row>
              {this.state.noSize && (
                <Row className="layout">
                  <Col className="layout">Please select size</Col>
                </Row>
              )}
              <br />
              <Row className="layout">
                <Col className="layout" sm={8}>
                  {this.conditionalSizeSelector()}
                </Col>
                <Col className="layout" sm={4}>
                  {this.conditionalQuantitySelector()}
                </Col>
              </Row>
              <br />
              <Row className="layout">
                <Col className="layout" sm={9}>
                  {this.state.currentStyle &&
                    !this.state.currentStyle.outOfStock && (
                      <Button
                        variant="outline-primary"
                        onClick={() => this.bagger()}
                      >
                        ADD TO BAG
                      </Button>
                    )}
                </Col>                
                <Col className="layout" id="social-media-buttons">
                  <FacebookShareButton url={window.location.href}>
                    <FacebookIcon size={window.innerWidth>575?"2em":48} />
                  </FacebookShareButton>
                  {this.conditionalPinterest()}
                  <TwitterShareButton url={window.location.href}>
                    <TwitterIcon size={window.innerWidth>575?"2em":48} />
                  </TwitterShareButton>
                </Col>
              </Row>
            </Col>
          </Row>
          <br></br>
          <Row className="layout">
            <Col className="layout" sm={{ span: 7, offset: 1 }}>
              <Row className="layout">
                <b>{this.props.product.slogan}</b>
              </Row>
              <br />
              <Row className="layout">{this.props.product.description}</Row>
            </Col>
            <Col className="layout" sm={3}>
              {this.props.product.features &&
                this.props.product.features.map((each, i) => (
                  <Row className="layout" key={i}>
                    <b>&#10003;&nbsp;</b>
                    {each.feature}
                    {each.value !== "null" ? `: ${each.value}` : null}
                  </Row>
                ))}
            </Col>
          </Row>
        </Col>
      </Container-fluid>
    );
  }
}
export default Overview;
