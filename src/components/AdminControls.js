import React from 'react';

type Props = {
    user: Object,
};

class AdminControls extends React.Component<{},Props> {
  render() {
    return (
        <div style={{ backgroundColor: '#eeeeee' }}>
            Admin page!
            {JSON.stringify(this.props.user)}
        </div>
    )
  }
};

export default AdminControls;
