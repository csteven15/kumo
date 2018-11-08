import React, { Component} from 'react';
import { Container, Row, Col,Button,Modal } from 'reactstrap';
import Item from './item';
import CategoryForm from './CategoryForm';


class Category extends Component {
  state = {
    isEditing: false,
  };

    listItems() {
        let listOfItems = this.props.data.items;
        let col = this.props.col;
        let itemsList = [];
        for (let i in listOfItems) {
            const updateItemData = (itemData) => {
              var data = {...this.props.data};
              data.items[i] = itemData;
              if (!itemData) {
                delete data.items[i];
                let ptr = 0;
                for (let j in data.items) {
                  let x = data.items[j];
                  delete data.items[j];
                  data.items[ptr] = x;
                  ptr++;
                }
              }
              this.props.updateCategoryData(data);
            };
            const data = listOfItems[i];
            const { name, description, price, isHot, isRaw, optionPriceSetting } = data;
            itemsList.push(
                <Col sm={col}>
                    <Item name={name} description={description} price={price} isHot={isHot} isRaw={isRaw} optionPriceSetting={optionPriceSetting} updateItemData={updateItemData} isAdmin={this.props.isAdmin} data={data} id={i}/>
                </Col>
            );
        }
        return itemsList;
    }
    addItem = () => {
      var data = {...this.props.data};
      let maxId = -1;
      for (let key in data.items) {
        let id = parseInt(key, 10);
        console.log("Found " + key + " " + id);
        if (!isNaN(id)) {
          maxId = Math.max(id, maxId);
        }
      }
      maxId++;
      if (!data.items) {
        data.items = {};
      }
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

    toggleEditDialog = () => {
      this.setState({isEditing: !this.state.isEditing});
    }

    moveUp = () => {
      let curId = parseInt(this.props.id, 10);
      this.props.moveCat(curId, curId-1);
    }
    moveDown = () => {
        let curId = parseInt(this.props.id, 10);
        this.props.moveCat(curId, curId+1);
    }

    render() {
      console.log(this.props.id)
      let newItemButton = this.props.isAdmin ? (
        <div><br/>
          <Button color="secondary" size="sm" onClick={this.addItem} style={{margin: '5px'}}>Add item to {this.props.data.name}</Button>
          <Button color="secondary" size="sm" disabled={this.props.isFirst} onClick={this.moveUp} style={{margin: '5px'}}>Move up</Button>
          <Button color="secondary" size="sm" disabled={this.props.isLast} onClick={this.moveDown} style={{margin: '5px'}}>Move down</Button>
          <br/><br/>
        </div>
      ) : null;
      const editButton = this.props.isAdmin ? (
          <Button style={{fontSize: '20px', marginRight:'10px', marginTop: '0', marginBottom: '0'}} outline color="primary" size="sm" onClick={this.toggleEditDialog}>Edit</Button>
        ) : null;

      return (
        <div>
          <Container>
              <Row>
                  <Col style={{textAlign: "left"}}>
                    <h2 style={{color: "#C42C18"}}><div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>{editButton}<strong>{this.props.data.name}</strong></div></h2>
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
          {newItemButton}
          <Modal isOpen={this.state.isEditing} toggle={this.toggleEditDialog}>
            <CategoryForm id={this.props.id} data={this.props.data} toggle={this.toggleEditDialog} updateCategory={this.props.updateCategoryData} />
          </Modal>
        </div>
      );
    }


};

export default Category;
