import React from 'react';
import './index.css';

class Delete extends React.Component {
    constructor(props) {
        super()
        this.props = props
    }
    render() {

    return(
    <>
    <button id = "delete" type="submit">Delete account and ALL posts</button>
    </>
  )
}
}

export default Delete;
