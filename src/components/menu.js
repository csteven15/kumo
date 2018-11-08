import React, { Component} from 'react';
import { Button, Container,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import Firebase from './../fire';
import Category from './category';
import Fade from 'react-reveal/Fade';

type Props = {
  isAdmin?: boolean,
}

type State = {
  data: Object,
  dirty: boolean,
}

class Menu extends Component<State,Props> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dirty: false,
            showDiscardDialog: false,
            showSaveDialog: false,
        }
    }

    componentDidMount() {
      let database = Firebase.database();
      let menuRef = database.ref('menu');

      if (this.props.isAdmin) {
        menuRef.once('value', this.updateToSnapshot);
      } else {
        menuRef.on('value', this.updateToSnapshot);
      }

      window.addEventListener("beforeunload", e => {
        if (this.state.dirty) {
            const message = "You have unsaved changes to the menu. Are you sure you want to leave the page?";
            e.preventDefault();
            e.returnValue = message;
            return message;
        }
      });
    }


    updateToSnapshot = (snapshot) => {
        var data = snapshot.toJSON();
        this.updateData(data);
    }

    updateData = (data) => {
      this.setState({data});
      console.log(data);
    }

    toggleSaveDialog = () => {
      this.setState({showSaveDialog: !this.state.showSaveDialog})
    }

    toggleDiscardDialog = () => {
      this.setState({showDiscardDialog: !this.state.showDiscardDialog})
    }

    saveChanges = () => {
      this.toggleSaveDialog();
      let database = Firebase.database();
      let menuRef = database.ref('menu');

      console.log("Setting menu to", this.state.data);
      menuRef.set(this.state.data);
      this.setState({dirty: false});
    }

    discardChanges = () => {
      this.toggleDiscardDialog();
      let database = Firebase.database();
      let menuRef = database.ref('menu');

      menuRef.once('value', this.updateToSnapshot);

      this.setState({dirty: false});
    }

    addCategory = () => {
      let data = {...this.state.data};
      let maxId = -1;
      for (let key in data) {
        let id = parseInt(key, 10);
        if (!isNaN(id)) {
          maxId = Math.max(id, maxId);
        }
      }
      maxId++;
      data["" + maxId] = {name: "Name Here", description: "Description Here", items: []};
      this.setState({data});
      this.onAdminChange();
    }

    onAdminChange() {
      this.setState({dirty: true});
    }

    moveCategory = (oid, nid) => {
      let data = {...this.state.data};
      let arr = []
      for (let key in data) {
        arr.push(data[key])
      }
      let cat = data[oid]
      arr.splice(oid, 1);
      arr.splice(nid, 0, cat);
      data = {};
      for (let key in arr) {
        data[key+""] = arr[key]
      }
      this.setState({data});
      this.onAdminChange();
    }

    createCategories(data) {
        let lastId = '';
        for (let key in this.state.data)
          lastId = key;
        var category = [];
        for (let key in data) {
          const updateCategoryData = (catData) => {
            var data = {...this.state.data};
            if (!catData) {
              delete data[key];
              let ptr = 0;
              for (let i in data) {
                let x = data[i];
                delete data[i];
                data[ptr] = x;
                ptr++;
              }
            } else {
              data[key] = catData;
            }
            this.setState({data});
            this.onAdminChange();
          };
          category.push(
              <div key={key}>
                  <Category data={data[key]} id={key} moveCat={this.moveCategory} updateCategoryData={updateCategoryData}  isAdmin={this.props.isAdmin} col={"6"} isLast={key === lastId} isFirst={key === '0'}/>
                  <br />
                  <br />
              </div>
          );
        }

        return category;
    }

    render() {
      const saveButton = this.props.isAdmin ? (
        <span>
          <Button style={{margin: '5px'}} color="success" onClick={this.toggleSaveDialog}>Save changes</Button>
          <Button style={{margin: '5px'}} color="warning" onClick={this.toggleDiscardDialog}>Discard changes</Button>
        </span>
      ) : null;
      let dialogs = (
        <span>
          <Modal isOpen={this.state.showSaveDialog} toggle={this.toggleSaveDialog}>
            <ModalHeader>Save Changes</ModalHeader>
              <ModalBody>
                Are you sure you want to commit your changes to the menu?
              </ModalBody>
            <ModalFooter>
              <Button color="success" size="sm" onClick={this.saveChanges}>Save</Button>{' '}
              <Button color="secondary" size="sm" onClick={this.toggleSaveDialog}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.showDiscardDialog} toggle={this.toggleDiscardDialog}>
            <ModalHeader>Discard Changes</ModalHeader>
              <ModalBody>
                Are you sure you want to discard your changes to the menu?
              </ModalBody>
            <ModalFooter>
              <Button color="warning" size="sm" onClick={this.discardChanges}>Discard</Button>{' '}
              <Button color="secondary" size="sm" onClick={this.toggleDiscardDialog}>Cancel</Button>
            </ModalFooter>
          </Modal>

        </span>
      )
        console.log(this.state.data);
        if (this.state.data.length === 0) {
            return (
            <div>
                <br />
                <Fade big>
                    <h3 style={{fontFamily: "gangOf3",fontSize: "16pt",margin: "50px"}}>Loading Menu...</h3>
                </Fade>
            </div>
            );
        } else {
          let newCategoryButton = this.props.isAdmin ? (
              <Button onClick={this.addCategory} color="secondary" style={{margin: '5px'}}>Add category</Button>
          ) : null;
            return (
                <div>
                <br />
                <br />
                <Container>
                    <h1 style={{color: '#C42C18',fontWeight: 'bold',fontFamily: 'gangOf3'}}><span className="heading">Menu</span></h1>
                    <p style={{fontFamily: 'gangOf3', fontSize: '12px'}}>Spicy: <img src={require('../images/fire.svg')} alt="hot" width="10" /> &nbsp; &nbsp; Raw: <img src={require('../images/raw.svg')} alt="raw" width="15" /></p>
                    {this.createCategories(this.state.data)}
                </Container>
                {saveButton}
                {dialogs}
                {newCategoryButton}
            </div>
            )
        }
    }

};

export default Menu;
