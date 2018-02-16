import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {usersParties} from '../actions/usersActions';
import {Header, Image, Table} from 'semantic-ui-react';




class Parties extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    if (this.props.parties.parties === undefined){
      this.props.usersParties();
    }
  }

  renderPartyCards = () => {
    const cards = this.props.parties.parties.sort((a,b) => {
      return b.users_count - a.users_count
    }).map(card => { return this.partyCard(card)});

    return (
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Admin</Table.HeaderCell>
          <Table.HeaderCell>Members</Table.HeaderCell>
          <Table.HeaderCell>Total Points Gained</Table.HeaderCell>
          <Table.HeaderCell>Total Points Lost</Table.HeaderCell>
          <Table.HeaderCell>Created</Table.HeaderCell>
          <Table.HeaderCell>Active</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {cards}
        </Table.Body>
      </Table>
    )
  }


  partyCard = (card) => {
    return (
      <Table.Row key={card.info.id}>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='/assets/images/avatar/small/lena.png' rounded size='mini' />
            <Header.Content>
                {card.info.title}
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>
            admin
        </Table.Cell>
        <Table.Cell>
          {card.users_count}
        </Table.Cell>
        <Table.Cell>
          Total points gained
        </Table.Cell>
        <Table.Cell>
          total points lost
        </Table.Cell>
        <Table.Cell>
          {card.info.created_at.split("T")[0]}
        </Table.Cell>
        <Table.Cell>
          active
        </Table.Cell>
      </Table.Row>
    )
  }


  render(){
    console.log(this.props.parties);
    if (this.props.parties.parties){
      return (
        <div>
        {this.renderPartyCards()}
        </div>
      )
    } else {
      return (
        <div>
          parties
        </div>
      )
    };
  };
}




const mapStateToProps = (state) => {
  return {
    parties: state.user.parties
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    usersParties: usersParties
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Parties);
