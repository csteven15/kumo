import React, { Component} from 'react';
import { Container, Jumbotron } from 'reactstrap';
import Firebase from './../fire';
import Category from './category';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentWillMount() {
        let database = Firebase.database();
        let menuRef = database.ref('menu');
        // var list = [];
        menuRef.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                var json = child.toJSON();
                this.setState({list: [...this.state.list, json]});
            });
        });
    }

    createCategories(list) {
        var category = [];
        for (var i = 0; i < this.state.list.length;i++) {
            category.push(
                <div>
                    <Jumbotron>
                        <Category data={list[i]} />
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
                    {this.createCategories(this.state.list)}
                </Container>
            </div>
        )
    }
    
};

export default Menu;