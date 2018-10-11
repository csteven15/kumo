import React from 'react';

type Props = {
  canEdit: boolean,
  id: string,
  onUpdateValue: (string, string) => void,
  defaultValue: ?string,
}

type State = {
  isEditing: boolean,
  currentValue: ?string,
}

class EditableField extends React.Component<State,Props> {
  state = {
    currentValue: this.props.defaultValue,
    isEditing: false,
  };

  onClick = () => {
      this.setState({isEditing: true});
  }

  onChange = (e) => {
    this.setState({currentValue: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const value = this.state.currentValue;
    this.props.onUpdateValue(this.props.id, value);
    this.setState({currentValue: this.props.defaultValue, isEditing: false});
  }

  render() {

    if (this.state.isEditing) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input style={{width: '200px'}} type="text" autoFocus onBlur={this.handleSubmit} value={this.state.currentValue} onChange={this.onChange} />
        </form>
      );
    }

    if (this.props.canEdit) {
      let subComponent = this.props.children;
      if (!this.props.defaultValue) {
          subComponent = <i>(Click here to add {this.props.id})</i>;
      }
      return <span onClick={this.onClick}>{subComponent}</span>;
    }

    return this.props.children;
  }
}

export default EditableField;
