import React from 'react';
import axios from 'axios';
import { Container, Button, Form, Alert } from 'react-bootstrap';

export default class App extends React.Component {

  state = {
    uploadedFile: null,
    alert: null,
    uploading: false,
  }

  handleOnChange = (e) => {
    this.setState({
      uploadedFile: e.target.files[0],
      alert: null,
    });
  };

  handleOnClick = () => {
    this.setState({
      uploading: true,
    });

    if (!this.state.uploadedFile) {
      this.setState({
        alert: {
          variant: 'danger',
          title: 'No file added!',
          message: 'Please add file and try again!',
        }
      });
    }

    const data = new FormData();
    data.append('file', this.state.uploadedFile);
    axios.post('/upload', data).then(res => {
      this.setState({
        alert: {
          variant: 'success',
          title: 'File uploaded successfully!',
          message: res.data,
        },
        uploading: false,
      });
    }).catch(err => {
      this.setState({
        alert: {
          variant: 'danger',
          title: 'Upload failed',
          message: err.response.data,
        },
        uploading: false,
      })
    });
  };

  handleAlertClose = () => {
    this.setState({
      alert: null,
      uploadedFile: null,
    });
  };

  render() {
    return (
      <Container fluid>
        <Header />  
        <Form>
          {this.state.alert && <Alert variant={this.state.alert.variant} onClose={this.handleAlertClose} dismissible>
            <Alert.Heading>{ this.state.alert.title }</Alert.Heading>
            <p>
              { this.state.alert.message }
            </p>
          </Alert>}
          <Form.File
            id="custom-file"
            label={ this.state.uploadedFile ? this.state.uploadedFile.name : 'Upload file here!' }
            custom
            onChange={this.handleOnChange}
          />
        </Form>
        <Button 
          variant="primary"
          block
          onClick={this.handleOnClick}
          disabled={this.state.uploading}
        >
          { this.state.uploading ? 'Uploading file...' : 'Upload' }
        </Button>
      </Container>
    );
  }
}

const Header = () => (
  <div>
    <h1>Add files App</h1>
  </div>
);