import React, { Component} from 'react';
import { Container, Jumbotron } from 'reactstrap';
import Firebase from './../fire';
import Category from './category';
import Fade from 'react-reveal/Fade';

type Props = {
  isAdmin?: boolean,
}

class Menu extends Component<{},Props> {
    constructor(props) {
        super(props);
        this.state = {
            data: []
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
    }


    updateToSnapshot = (snapshot) => {
        var data = snapshot.toJSON();
        this.updateData(data);
    }

    updateData = (data) => {
      this.setState({data});
      console.log(data);
    }

    saveChanges() {
      let database = Firebase.database();
      let menuRef = database.ref('menu');

      console.log("Setting menu to", this.state.data);
      menuRef.set(this.state.data);
    }

    addCategory = () => {
      var data = {...this.state.data};
      let maxId = 0;
      for (let key in data) {
        let id = parseInt(key);
        if (!isNaN(id)) {
          maxId = Math.max(id, maxId);
        }
      }
      maxId++;
      data["" + maxId] = {name: "Name Here", description: "Description Here", items: []};
      this.setState({data}, this.saveChanges);
    }

    createCategories(data) {
        var category = [];
        for (var key in data) {
            category.push(
                <div key={key}>
                    <Category data={data[key]} updateData={this.updateData} col={"6"} />
                    <br />
                    <br />
                </div>
            );
        }

        if (this.props.isAdmin) {
            category.push(
                <div key='_newItem' onClick={this.addCategory}>
                    <Category data={null} />
                </div>
            );
        }

        return category;
    }

    render() {
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
                    <h1><strong>Menu</strong></h1>
                    {this.createCategories(this.state.data)}
                </Container>
            </div>
            )
        }
    }

};

export default Menu;
