import React, { Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

class Item extends Component {

    isHotRaw() {
        if (this.props.isHot === true && this.props.isRaw === true) {
            return (
                <div style={{float:"right"}}>
                    &nbsp;&nbsp;
                    <img src={require('../images/fire.svg')} width="10" />
                    &nbsp;&nbsp;
                    <img src={require('../images/raw.jpg')} width="15" />
                </div>
            );
        } else if (this.props.isHot === true) {
            return (
                <div style={{float:"right"}}>
                    &nbsp;&nbsp;
                    <img src={require('../images/fire.svg')} width="10" />
                </div>
            );
        } else if (this.props.isRaw === true) {
            return (
                <div style={{float:"right"}}>
                    &nbsp;&nbsp;
                    <img src={require('../images/raw.jpg')} width="15" />
                </div>
            );
        }
    }

    price() {
        let price = this.props.price;
        if (price) {
            return (price);
        }
    }

    description() {
        let description = this.props.description;
        if (description) {
            return (description);
        }
    }

    priceSetting() {
        let optionPriceSetting = this.props.optionPriceSetting;
        if (optionPriceSetting) {
            let priceList = [];
            priceList.push(
                <h6>{optionPriceSetting.title}</h6>
            )
            for (var i in optionPriceSetting.options) {
                priceList.push(
                    <p>{optionPriceSetting.options[i].text}: {optionPriceSetting.options[i].price}</p>
                );
            }
            return priceList;
        }
    }

    priceAugmenting() {
        let optionPriceAugmenting = this.props.optionPriceAugmenting;
        if (optionPriceAugmenting) {
            let optionList = [];
            // need to add base price and augment the price
            console.log(optionPriceAugmenting)
            for (var i in optionPriceAugmenting) {
                optionList.push(<p>{optionPriceAugmenting[i].title}:</p>);
                for (var j in optionPriceAugmenting[i].options) {
                    optionList.push(<p>{optionPriceAugmenting[i].options[j].text}</p>)
                }
            }
            return optionList;
        }
    }

    render() {

        return (
            <div>
                <Container style={{padding: "2px"}}>
                    <Row>
                        <Col sm="10" style={{textAlign: "left"}}>
                        <div>
                            <h6 style={{float: "left"}}><strong>{this.props.name}</strong>{this.isHotRaw()}</h6>
                        </div>
                        </Col>
                        <Col sm="2"  style={{textAlign: "right"}}>
                            <h6><strong>{this.price()}</strong></h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{fontSize: "11px", textAlign: "left"}}>
                            {this.description()}
                            {this.priceSetting()}
                            {this.priceAugmenting()}
                            
                        </Col>
                    </Row>
                </Container>
                
                
            </div>
        );
    }

    
};


export default Item;