import React, { Component} from 'react';
import { Button, Container, Jumbotron } from 'reactstrap';
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

    saveChanges = () => {
      let database = Firebase.database();
      let menuRef = database.ref('menu');

      console.log("Setting menu to", this.state.data);
      menuRef.set(this.state.data);
      this.setState({dirty: false});
    }

    addCategory = () => {
      var data = {...this.state.data};
      let maxId = -1;
      for (let key in data) {
        let id = parseInt(key);
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

    createCategories(data) {
        var category = [];
        for (let key in data) {
          const updateCategoryData = (catData) => {
            var data = {...this.state.data};
            data[key] = catData;
            this.setState({data});
            this.onAdminChange();
          };
            category.push(
                <div key={key}>
                    <Category data={data[key]} updateCategoryData={updateCategoryData}  isAdmin={this.props.isAdmin} col={"6"} />
                    <br />
                    <br />
                </div>
            );
        }

        if (this.props.isAdmin) {
            category.push(
                <div key='_newItem' onClick={this.addCategory}>
                    <Category data={null} col={"6"}  />
                    <br />
                    <br />
                </div>
            );
        }

        return category;
    }

    render() {
      const saveButton = this.props.isAdmin ? <Button style={{margin: '5px'}} onClick={this.saveChanges}>Save changes</Button> : null;
        console.log(this.state.data);
        if (this.state.data.length === 0) {
            return (
            <div>
                <br />
                <Fade big>
                    <h3 style={{fontFamily: "cursive",fontSize: "16pt",margin: "50px"}}>Loading Menu...</h3>
                </Fade>
            </div>
            );
        } else {
            return (
                <div>
                <br />
                <br />
                <Container>
                    <h1 style={{color: "#C42C18"}}><strong>Menu</strong></h1>
                    {this.createCategories(this.state.data)}
                </Container>
                {saveButton}
            </div>
            )
        }
    }

};

export default Menu;
