import React, { Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Item from './item';


class Category extends Component {

    listItems() {
        let listOfItems = this.props.data.items;
        let itemsList = [];
        for (var i in listOfItems) {
            const { name, description, price, isHot, isRaw, optionPriceSetting, optionPriceAugmenting } = listOfItems[i];
            itemsList.push(
                <Col sm="6">
                    <Item name={name} description={description} price={price} isHot={isHot} isRaw={isRaw} optionPriceSetting={optionPriceSetting} optionPriceAugmenting={optionPriceAugmenting} />
                </Col>
            );
        }
        // let result = Object.keys(listOfItems).map((key) => {
        //     return [Number(key), listOfItems[key]]
        // })
        // console.log(result)
        return itemsList;
    }

    footnote() {
        if (this.props.data.footnote) {
            return (
                <div>
                    <p><strong>*** Additional Protein: </strong>{this.props.data.footnote} <strong>***</strong></p>
                </div>
            );
        }
    }

    optionPriceSetting() {
        let optionPriceSetting = this.props.data.optionPriceSetting;
        if (optionPriceSetting) {
            var priceList = [];
            for (var i in optionPriceSetting.options) {
                if (optionPriceSetting.options[i].text) {
                    priceList.push(optionPriceSetting.options[i].text + ': ' + optionPriceSetting.options[i].price);
                } else {
                    priceList.push(optionPriceSetting.options[i].price);
                }
            }
            // console.log(priceList);
            let finalPrice = priceList.join(' ~ ');
            return finalPrice;
        }
    }

    description() {
        let description = this.props.data.description;
        if (description) {
            return (<h6>{description}</h6>);
        }
    }

    render() {
      let contents = null;
      console.log(this.props.data);
      if (this.props.data) {
        contents = (
          <div>
          <Container>
              <Row>
                  <Col sm="4" style={{textAlign: "left"}}>
                    <h2><strong>{this.props.data.name}</strong></h2>
                  </Col>
                  <Col sm="8" style={{textAlign: "right", verticalAlign: "text-bottom"}}>
                    <h6><strong>{this.optionPriceSetting()}</strong></h6>
                  </Col>
              </Row>
              <Row>
                  <Col sm="12" style={{textAlign: "left"}}>
                    {this.description()}
                  </Col>
                  
              </Row>
          </Container>
          <hr />
          <Container>
              <Row>
                  {this.listItems()}
              </Row>
          </Container>
          {this.footnote()}
          </div>
      );
      } else {
        contents = <div><b>Add a new category</b></div>;
      }
      
      return (
          <div>
            {contents}
          </div>
      );
    }


};

export default Category;
