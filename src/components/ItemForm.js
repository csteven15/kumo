import React from 'react';
import { ModalHeader,ModalBody,ModalFooter,Button,Input,Label,FormGroup } from 'reactstrap';

type Props = {
  id: string,
  data: Object,
  updateItem: (data) => void,
}

type State = {
  isEditing: boolean,
  currentValue: ?string,
  data: Object,
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

class ItemForm extends React.Component<State,Props> {
  state = {
    currentValue: this.props.defaultValue,
    isEditing: false,
    data: clone(this.props.data),
  };

  handleSubmit = () => {
    console.log("Saving item: ", this.state.data);
    this.props.updateItem(this.state.data);
    this.props.toggle();
  }

  handleRemove = () => {
    this.props.updateItem(null);
    this.props.toggle();
  }

  handleCancel = () => {
    this.props.toggle();
  }

  updName = (e) => {
    const data = {...this.state.data, name: e.target.value};
    this.setState({data});
  }

  updDescription = (e) => {
    const data = {...this.state.data, description: !e.target.value ? null : e.target.value};
    if (!e.target.value) {
      delete data.description;
    }
    this.setState({data});
  }

  updHot = (e) => {
    const data = {...this.state.data, isHot: e.target.checked};
    this.setState({data});
  }

  updRaw = (e) => {
    const data = {...this.state.data, isRaw: e.target.checked};
    this.setState({data});
  }

  updPrice = (e) => {
    const data = {...this.state.data};
    data.optionPriceSetting.options[0].price = e.target.value;
    this.setState({data});
  }

  updPriceCount = (e) => {
    const data = {...this.state.data};
    const count = parseInt(e.target.value, 10) || 0;

    if (count > 0) {
      let options = {};
      for (let i=0;i<count;i++) {
        options[i] = {price: "$0.00"};
        if (count > 1) {
          options[i].text = "Label " + (i+1);
        }
      }
      data.optionPriceSetting = {
        options: options,
      }
      if (count > 1) {
        data.optionPriceSetting.title = "Custom";
      }
    } else {
      delete data.optionPriceSetting;
    }
    this.setState({data});
  }

  length(arr) {
    let size = 0;
    for(let x in arr) {
      size++;
    }
    return size;
  }

  render() {
    const prices = this.state.data.optionPriceSetting;
    const optionCount = prices ? this.length(prices.options) : 0;

    let priceOptionCountOptions = [];
    for(let x=0;x<=4;x++) {
      priceOptionCountOptions[x] = <option key={x}>{x}</option>;
    }

    let priceFields = null;
    if (optionCount === 1) {
      priceFields = <FormGroup><Label for="price">Price</Label><Input maxlength="6" value={prices.options[0].price} onChange={this.updPrice} id="name" /></FormGroup>;
    } else if(optionCount > 1) {
      let list = [];
      for(let x=0;x<optionCount;x++) {
        let updTextX = (e) => {
          const data = {...this.state.data};
          data.optionPriceSetting.options[x].text = e.target.value;
          this.setState({data});
        };
        let updPriceX = (e) => {
          const data = {...this.state.data};
          data.optionPriceSetting.options[x].price = e.target.value;
          this.setState({data});
        };
        list.push(
          <div style={{border: '1px solid black', marginBottom: '5px', padding: '5px'}} key={x}>
            <FormGroup><Label>Label</Label><Input maxlength="7" value={prices.options[x].text} onChange={updTextX}/></FormGroup>
            <FormGroup><Label>Price</Label><Input maxlength="6" value={prices.options[x].price} onChange={updPriceX} /></FormGroup>
          </div>
        );
      }
      priceFields = (
        <div>
          Price Options:
          {list}
        </div>
      );
    }

    return (
      <div>
        <ModalHeader>Edit Item #{this.props.id}: {this.props.data.name}</ModalHeader>
        <ModalBody>
          <FormGroup><Label for="name">Name</Label><Input maxlength="32" value={this.state.data.name} onChange={this.updName} id="name" /></FormGroup>
          <FormGroup><Label for="description">Description</Label><Input maxlength="150" value={this.state.data.description||''} onChange={this.updDescription} id="description" /></FormGroup>
          <FormGroup check><Label check><Input type="checkbox" checked={this.state.data.isHot} onChange={this.updHot} id="isHot" />Hot</Label></FormGroup>
          <FormGroup check><Label check><Input type="checkbox" checked={this.state.data.isRaw} onChange={this.updRaw} id="isRaw" />Raw</Label></FormGroup>
          <FormGroup>
            <Label for="priceOptionCount">Number of price options</Label>
            <Input type="select" id="priceOptionCount" value={optionCount} onChange={this.updPriceCount}>
              {priceOptionCountOptions}
            </Input>
          </FormGroup>
          {priceFields}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" size="sm" onClick={this.handleSubmit}>Update</Button>{' '}
          <Button color="danger" size="sm" onClick={this.handleRemove}>Remove</Button>{' '}
          <Button color="secondary" size="sm" onClick={this.handleCancel}>Cancel</Button>
        </ModalFooter>
      </div>
    );
  }
}

export default ItemForm;
