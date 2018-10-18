import React, { Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Item from './item';


class Category extends Component {

    listItems() {
        let listOfItems = this.props.data.items;
        let col = this.props.col;
        let itemsList = [];
        for (let i in listOfItems) {
            const iCopy = i;
            const updateItemData = (key, value) => {
              var data = {...this.props.data};
              data["items"][iCopy][key] = value;
              console.log("upd ", key, value, iCopy);
              console.log("Setting catdata to ", data);
              this.props.updateCategoryData(data);
            };
            const { name, description, price, isHot, isRaw, optionPriceSetting, optionPriceAugmenting } = listOfItems[i];
            itemsList.push(
<<<<<<< HEAD
                <Col sm={col}>
                    <Item name={name} description={description} price={price} isHot={isHot} isRaw={isRaw} optionPriceSetting={optionPriceSetting} optionPriceAugmenting={optionPriceAugmenting} updateItemData={updateItemData} />
=======
                <Col sm="4">
                    <Item name={name} description={description} price={price} isHot={isHot} isRaw={isRaw} optionPriceSetting={optionPriceSetting} optionPriceAugmenting={optionPriceAugmenting} updateItemData={updateItemData} />
>>>>>>> Make description update with field, and add a remove button
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
                <p><strong>*** Additional Protein: </strong>{this.props.data.footnote} <strong>***</strong></p>
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
            return (
                <Row>
                    <Col style={{textAlign: "left"}}>
                        <h6><strong>{finalPrice}</strong></h6>
                    </Col>
                </Row>
            );
        }
    }

    description() {
        let description = this.props.data.description;
        if (description) {
            return (
                <Row>
                  <Col sm="12" style={{textAlign: "left"}}>
                    {description}
                  </Col>

                </Row>
            );
        }
    }

    render() {
      let contents = null;
    //   console.log(this.props.data);
      if (this.props.data) {
        contents = (
          <div>
          <Container>
              <Row>
                  <Col style={{textAlign: "left"}}>
                    <h2 style={{color: "#C42C18"}}><strong>{this.props.data.name}</strong></h2>
                  </Col>
              </Row>
              {this.optionPriceSetting()}
              {this.description()}
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
