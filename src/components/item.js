import React, { Component} from 'react';
import { Container, Row, Col, Button, Modal} from 'reactstrap';
import ItemForm from './ItemForm';


class Item extends Component {
  state = {
    isEditing: false,
  };

    isHotRaw() {
        if (this.props.isHot === true && this.props.isRaw === true) {
            return (
                <span>
                    &nbsp;&nbsp;
                    <img src={require('../images/fire.svg')} alt="hot" width="10" />
                    &nbsp;&nbsp;
                    <img src={require('../images/raw.svg')} alt="raw" width="15" />
                </span>
            );
        } else if (this.props.isHot === true) {
            return (
                <span>
                    &nbsp;&nbsp;
                    <img src={require('../images/fire.svg')} alt="hot" width="10" />
                </span>
            );
        } else if (this.props.isRaw === true) {
            return (
                <span>
                    &nbsp;&nbsp;
                    <img src={require('../images/raw.svg')} alt="raw" width="15" />
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
                    priceList.push(<span style={{whiteSpace: "nowrap", display: "inline-block", marginLeft: "3px"}}>{optionPriceSetting.options[i].text + ': ' + optionPriceSetting.options[i].price}&nbsp;</span>);
                } else {
                    priceList.push(<span style={{whiteSpace: "nowrap", display: "inline-block", marginLeft: "3px"}}>{optionPriceSetting.options[i].price}&nbsp;</span>);
                }
            }
            // console.log(priceList);
            //let finalPrice = priceList.join(' ');
            return priceList;
        }
        return [];
    }

    toggleEditDialog = () => {
      this.setState({isEditing: !this.state.isEditing});
    }

    render() {
      const editButton = this.props.isAdmin ? (
          <Button style={{fontSize: '12px', padding: '.1rem .3rem', marginRight:'5px', marginTop: '0', marginBottom: '0'}} color="primary" size="sm" outline onClick={this.toggleEditDialog}>Edit</Button>
        ) : null;

      const priceCol = (this.priceSetting().length > 0) ? (
        <td style={{textAlign: "right", verticalAlign: "top", width: "25%"}}>
          {/* Pricing Information Here */}
          <h6><strong>{this.priceSetting()}</strong></h6>
        </td>
      ) : null;

      return (
          <table style={{width: "100%", marginBottom: "10px"}}>
            <tr style={{}}>
              <td style={{verticalAlign: "top"}}>
                <table style={{width: "100%"}}>
                  <tr style={{textAlign: "left"}}>
                    {/* Title Information Here */}
                    <h6>{editButton}<strong>{this.props.name}{this.isHotRaw()}</strong></h6>
                  </tr>
                  <tr style={{textAlign: "left", fontSize: "11px"}}>
                    {/* Description Information Here */}
                    <div style={{}}>
                      {this.description()}
                    </div>
                  </tr>
                </table>
              </td>

              {priceCol}

            </tr>
            <Modal isOpen={this.state.isEditing} toggle={this.toggleEditDialog}>
              <ItemForm id={this.props.id} data={this.props.data} toggle={this.toggleEditDialog} updateItem={this.props.updateItemData} />
            </Modal>
          </table>


          // <Container style={{padding: "2px", backgroundColor: "#FF0000"}}>
          //   <Row style={{backgroundColor: "#00FF00"}}>
          //     <Col style={{textAlign: "left"}}>
          //       <h6 style={{display: 'inline', margin: '0'}}>
          //         <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          //           {editButton}
          //           <strong>{this.props.name}</strong>{this.isHotRaw()}
          //         </div>
          //       </h6>
          //     </Col>
          //     <Col style={{textAlign: "right"}}>
          //       <h6><strong>{this.priceSetting()}</strong></h6>
          //     </Col>
          //   </Row>
          //   <Row style={{marginBottom: "10px", backgroundColor: "#0000FF"}}>
          //     <Col style={{fontSize: "11px", textAlign: "left"}}>
          //       {this.description()}
          //     </Col>
          //   </Row>
          //   <Modal isOpen={this.state.isEditing} toggle={this.toggleEditDialog}>
          //     <ItemForm id={this.props.id} data={this.props.data} toggle={this.toggleEditDialog} updateItem={this.props.updateItemData} />
          //   </Modal>
          // </Container>

      );

    }


};


export default Item;
