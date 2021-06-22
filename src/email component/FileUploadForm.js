import React, { Component } from 'react';
import Card from '../Vragenlijst/Aanmaken/components/UI/Card/Card';

class FileUploadForm extends Component {
	render() {
		return (
			<Card>
				<form>
					<label for="file">File Upload</label>
					<input type="file" name="file" />
					<button type="submit">Upload</button>
				</form>
			</Card>
		);
	}
}
export default FileUploadForm;
