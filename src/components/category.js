import React, { Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Item from './item';
import EditableField from './EditableField'


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
              this.props.updateCategoryData(data);
            };
            const { name, description, price, isHot, isRaw, optionPriceSetting, optionPriceAugmenting } = listOfItems[i];
            itemsList.push(
                <Col sm={col}>
                    <Item name={name} description={description} price={price} isHot={isHot} isRaw={isRaw} optionPriceSetting={optionPriceSetting} optionPriceAugmenting={optionPriceAugmenting} updateItemData={updateItemData} isAdmin={this.props.isAdmin}/>
                </Col>
            );
        }
        // let result = Object.keys(listOfItems).map((key) => {
        //     return [Number(key), listOfItems[key]]
        // })
        // console.log(result)
        return itemsList;
    }
    addItem = () => {
      var data = {...this.props.data};
      let maxId = -1;
      for (let key in data.items) {
        let id = parseInt(key);
        console.log("Found " + key + " " + id);
        if (!isNaN(id)) {
          maxId = Math.max(id, maxId);
        }
      }
      maxId++;
      data["items"][maxId] = {name: "Default name", description: "Default description", isHot: false, isRaw: false};
      this.props.updateCategoryData(data);
    }

    updateField = (id, name) => {
      var data = {...this.props.data};
      data[id] = name;
      if (!name) {
        delete data[id];
      }
      this.props.updateCategoryData(data);
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

    removeCategory = () => {
      this.props.updateCategoryData(null);
    }

    render() {
      let newItemButton = this.props.isAdmin ? (
        <div><br/><button onClick={this.addItem}>Add item</button><button onClick={this.removeCategory}>Remove category</button><br/><br/></div>
      ) : null;
      return (
        <div>
          <Container>
              <Row>
                  <Col style={{textAlign: "left"}}>
                    <h2 style={{color: "#C42C18"}}><EditableField defaultValue={this.props.data.name} canEdit={this.props.isAdmin} id="name" noDelete onUpdateValue={this.updateField}><strong>{this.props.data.name}</strong></EditableField></h2>
                  </Col>
              </Row>
              {this.optionPriceSetting()}
              <EditableField defaultValue={this.props.data.description} canEdit={this.props.isAdmin} id="description" onUpdateValue={this.updateField}>{this.description()}</EditableField>
          </Container>
          <hr />
          <Container>
              <Row>
                  {this.listItems()}
              </Row>
          </Container>
          {newItemButton}
          {this.footnote()}
          </div>
      );
    }


};

export default Category;
