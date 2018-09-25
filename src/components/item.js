import React, { Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

class Item extends Component {

    isHot() {
        if (this.props.isHot === true)
            return (
                <p>It is HOT</p>
            );
    }

    isRaw() {
        if (this.props.isRaw == true)
            return (
                <p>It is RAW</p>
            );
    }

    price() {
        let price = this.props.price;
        if (price) {
            return (price);
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
                <Container>
                    <Row>
                        <Col sm="10">
                            <h6 style={{textAlign: "left"}}><strong>{this.props.name}</strong></h6>
                        </Col>
                        <Col sm="2">
                            <h6 style={{textAlign: "right"}}><strong>{this.price()}</strong></h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p style={{fontSize: "11px", textAlign: "left"}}>{this.props.description}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.isHot()}
                            {this.isRaw()}
                        </Col>
                    </Row>
                    <div>
                        
                        {this.priceSetting()}
                        {this.priceAugmenting()}
                    </div>
                </Container>
                
                
            </div>
        );
    }

    
};


export default Item;