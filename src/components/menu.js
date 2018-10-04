import React, { Component} from 'react';
import { Container, Jumbotron } from 'reactstrap';
import Firebase from './../fire';
import Category from './category';

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

    componentWillMount() {
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
                    <Jumbotron>
                        <Category data={data[key]} updateData={this.updateData} />
                    </Jumbotron>
                </div>
            );
        }

        if (this.props.isAdmin) {
            category.push(
                <div key='_newItem' onClick={this.addCategory}>
                    <Jumbotron>
                        <Category data={null} />
                    </Jumbotron>
                </div>
            );
        }

        return category;
    }

    render() {
      return (
          <div>
              <h1>Menu</h1>
              <Container>
                  {this.createCategories(this.state.data)}
              </Container>
          </div>
      )
    }

};

export default Menu;
