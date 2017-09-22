import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
	constructor(props) {
		super(props);
		this.state = { content: '' };
	}

	onSubmit(event) {
		event.preventDefault();

		

		this.props.mutate({
			variables: {
				content: this.state.content,
				songId: this.props.songId
			}
		}).then(() => this.setState({ content: ''}));
	}
	handleInputChange(value){
		this.setState({
			content: value
		})
	}

	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<label>Add a Lyric</label>
				<input
					value={this.state.content}
					onChange={event => this.handleInputChange(event.target.value)}
				/>
			</form>		
		);
	}
}

export const mutation = gql`
	mutation AddLyricToSong($content: String, $songId: ID)
	{
		addLyricToSong(content: $content, songId: $songId) {
			id
			lyrics {
				content
			}
		}
	}
`

export default graphql(mutation)(LyricCreate);