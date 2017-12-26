import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class FriendRequest extends React.Component{
  constructor(props){
    super(props)
  };

  render(){
    return (
      <div> null </div>
    )
  };

};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
};


// export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);
