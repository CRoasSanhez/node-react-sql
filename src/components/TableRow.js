import React, { Component } from 'react';

var photoStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
}
class TableRow extends Component {

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.id}
        </td>
        <td>
          <img src={this.props.obj.image_url} style={photoStyle} />
        </td>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          {this.props.obj.description}
        </td>
      </tr>
    );
  }
}

export default TableRow;