import React, { Component} from 'react';
import { Container, Row, Col, Button, Modal} from 'reactstrap';
import EditableField from './EditableField'
import ItemForm from './ItemForm'


class Item extends Component {
  state = {
    isEditing: false,
  };

    isHotRaw() {
        if (this.props.isHot === true && this.props.isRaw === true) {
            return (
                <span>
                    &nbsp;&nbsp;
                    <img src={require('../images/fire.svg')} width="10" />
                    &nbsp;&nbsp;
                    <img src={require('../images/raw.png')} width="15" />
                </span>
            );
        } else if (this.props.isHot === true) {
            return (
                <span>
                    &nbsp;&nbsp;
                    <img src={require('../images/fire.svg')} width="10" />
                </span>
            );
        } else if (this.props.isRaw === true) {
            return (
                <span>
                    &nbsp;&nbsp;
                    <img src={require('../images/raw.png')} width="15" />
                </span>
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

    toggleEditDialog = () => {
      this.setState({isEditing: !this.state.isEditing});
    }

    render() {
      const editButton = this.props.isAdmin ? (
          <Button style={{fontSize: '12px', padding: '.1rem .3rem', marginRight:'5px', marginTop: '0', marginBottom: '0'}} color="primary" size="sm" outline onClick={this.toggleEditDialog}>Edit</Button>
        ) : null;
      return (
          <Container style={{padding: "2px"}}>
              <Row>
                  <Col style={{textAlign: "left"}}>
                  <h6 style={{display: 'inline', margin: '0'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      {editButton}
                      <strong>{this.props.name}</strong>{this.isHotRaw()}
                    </div>
                  </h6>
                  </Col>
                  <Col style={{textAlign: "right"}}>
                      <h6><strong>{this.priceSetting()}</strong></h6>
                  </Col>
              </Row>
              <Row>
                  <Col style={{fontSize: "11px", textAlign: "left"}}>
                      {this.description()}
                  </Col>
              </Row>
              <Modal isOpen={this.state.isEditing} toggle={this.toggleEditDialog}>
                <ItemForm id={this.props.id} data={this.props.data} toggle={this.toggleEditDialog} updateItem={this.props.updateItemData} />
              </Modal>
          </Container>
      );
    }


};


export default Item;
