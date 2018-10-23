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

  componentDidUpdate(prevProps) {
    if(this.props.defaultValue !== prevProps.defaultValue) {
      this.setState({currentValue: this.props.defaultValue});
    }
  }

  onClick = () => {
      this.setState({isEditing: true, currentValue: this.state.currentValue || (this.props.id + " here")});

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

  handleRemove = (e) => {
    e.preventDefault();
    this.props.onUpdateValue(this.props.id, null);
    this.setState({currentValue: this.props.defaultValue, isEditing: false});
  }

  render() {
    if (this.state.isEditing) {
      const deleteButton = this.props.noDelete ? null : <button type="button" onClick={this.handleRemove}>X</button>;
      return (
        <form onSubmit={this.handleSubmit}>
          <input style={{width: '200px'}} type="text" autoFocus value={this.state.currentValue} onChange={this.onChange} />
          {deleteButton}
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

    return <span>{this.props.children}</span>;
  }
}

export default EditableField;
