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
                <Col sm="4">
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

    render() {
      let contents = null;
      if (this.props.data) {
        contents = (
          <div>
          <h3>{this.props.data.name}</h3>
          <h6><strong>{this.props.data.description}</strong></h6>
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
