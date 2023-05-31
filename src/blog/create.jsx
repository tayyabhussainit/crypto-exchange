import Modal from 'react-bootstrap/Modal'
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import CustomAlert from '../components/alert'

function Create({ closeModal, showModal, buttonText, modalText, addBlog, blogToBeEdit, editBlog }) {

    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const thisCloseModal = () => closeModal()
    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const description = formData.get("description");
        if (title === '' || description === '') {
            setAlert(true);
            setAlertType('danger');
            setAlertMessage('Title or Description is missing');
            return;
        }
        let blog = {
            "title": title,
            "description": description
        }
        if(!blogToBeEdit){
            blog.id = new Date().valueOf();
            addBlog(blog)
        } else {
            blog.id = blogToBeEdit.id
            editBlog(blog)
        }
        
        closeModal()
    }


    return (
        <Modal show={showModal} onHide={thisCloseModal}>
            <Modal.Header closeButton >
                <Modal.Title>{modalText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alert && <CustomAlert alertType={alertType} alertMessage={alertMessage} />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" defaultValue={blogToBeEdit ? blogToBeEdit.title: ''} name="title" placeholder="Enter Title" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDesc">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" defaultValue={blogToBeEdit ? blogToBeEdit.description: ''} name="description" placeholder="Description" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {buttonText}
                    </Button>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={thisCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Create;