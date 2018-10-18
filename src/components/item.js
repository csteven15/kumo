import React, { Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import EditableField from './EditableField'

class Item extends Component {

    isHotRaw() {
        if (this.props.isHot === true && this.props.isRaw === true) {
            return (
                <div style={{float:"right"}}>
                    &nbsp;&nbsp;
                    <img src={require('../images/fire.svg')} width="10" />
                    &nbsp;&nbsp;
                    <img src={require('../images/raw.png')} width="15" />
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
                    <img src={require('../images/raw.png')} width="15" />
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
            // let arr = Object.keys(optionPriceSetting.options).map((i) => optionPriceSetting.options[i])
            // console.log(arr);
            var priceList = [];
            for (var i in optionPriceSetting.options) {
                if (optionPriceSetting.options[i].text) {
                    priceList.push(optionPriceSetting.options[i].text + ': ' + optionPriceSetting.options[i].price);
                } else {
                    priceList.push(optionPriceSetting.options[i].price);
                }
            }
            // console.log(priceList);
            let finalPrice = priceList.join(' ');
            return finalPrice;
        }
    }

    render() {
        return (
            <Container style={{padding: "2px"}}>
                <Row>
                    <Col style={{textAlign: "left"}}>
                    <div>
                        <h6 style={{float: "left"}}><strong>{this.props.name}</strong>{this.isHotRaw()}</h6>
                    </div>
                    </Col>
                    <Col style={{textAlign: "right"}}>
                        <h6><strong>{this.priceSetting()}</strong></h6>
                    </Col>
                </Row>
                <Row>
                    <Col style={{fontSize: "11px", textAlign: "left"}}>
                        <EditableField defaultValue={this.props.description} canEdit={true} id="description" onUpdateValue={this.props.updateItemData}>{this.description()}</EditableField>
                    </Col>
                </Row>
            </Container>
        );
    }


};


export default Item;
