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

    render() {
        return (
            <div>
                <h3>{this.props.data.name}</h3>
                <h6>{this.props.data.description}</h6>
                <Container>
                    <Row>
                        {this.listItems()}
                    </Row>
                </Container>
            </div>
        )
    }

    
};

export default Category;