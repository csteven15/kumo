import React from 'react';

type Props = {
    user: Object,
};

class AdminControls extends React.Component<{},Props> {
  render() {
    return (
        <div style={{ backgroundColor: '#eeeeee' }}>
            Welcome {this.props.user.email} to Admin page!
        </div>
    )
  }
};

export default AdminControls;
