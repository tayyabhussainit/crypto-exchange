import { useState } from "react";
import Blog from './blog'
import Create from './create'
import { Table, Button } from "react-bootstrap";
import { useEffect } from "react";

function BlogListing() {
    const [blogs, setBlogs] = useState([
        {
            "id": 1,
            "title": "React",
            "description": "React basics"
        },
        {
            "id": 2,
            "title": "Angular",
            "description": "Angular basics"
        }
    ]);
    const [showModal, setShowModel] = useState(false);
    const [buttonText, setButtonText] = useState('Create')
    const [modalText, setModalText] = useState('Create Blog')
    const [blogToBeEdit, setBlogToBeEdit] = useState(null)

    const deleteBlog = (id) => {
        let blogsUpdated = blogs.filter((blog) => blog.id !== id)
        setBlogs(blogsUpdated)
    }
    const openModal = () => { setBlogToBeEdit(false); setShowModel(true) };
    const closeModal = () => setShowModel(false);
    const addBlog = (blog) => {
        setBlogs([...blogs, blog])
    }
    const editBlogFun = (id) => {
        let matchBlog = blogs.filter((blog) => { return (blog.id === id) });
        if (matchBlog.length) {

            setBlogToBeEdit(matchBlog[0]);
            setModalText('Edit Blog');
            setButtonText('Save');
            setShowModel(true)
        }

    }

    const editBlog = (blog) => {
        console.log(blog)
        let updatedBlogs = blogs;

        let foundIndex = updatedBlogs.findIndex(b => b.id == blog.id);
        const obj = {
            title: blog.title,
            description: blog.description,
            id: blog.id
        }

        updatedBlogs[foundIndex] = obj;
        setBlogs(updatedBlogs)
    }
    return (
        <>
            <Button className="create" onClick={openModal}>Create</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>description</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => <Blog editBlogFun={editBlogFun} deleteBlog={deleteBlog} key={blog.id} blog={blog} />)}
                </tbody>
            </Table>
            <Create blogToBeEdit={blogToBeEdit} editBlog={editBlog} closeModal={closeModal} showModal={showModal} buttonText={buttonText} modalText={modalText} addBlog={addBlog} />
        </>

    );

}

export default BlogListing;