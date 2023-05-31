
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
function Blog({ blog, deleteBlog, editBlogFun }) {


    const deleteMe = (id) => {
        deleteBlog(id)
    }

    const editMe = (id) => {
        editBlogFun(id)
    }

    return (
        <tr>
            <td>
                {blog.id}
            </td>
            <td>
                {blog.title}
            </td>
            <td>
                {blog.description}
            </td>
            <td>
                <Button onClick={() => editMe(blog.id)} ><FaEdit /></Button>
                <Button onClick={() => deleteMe(blog.id)} ><FaTrash /></Button>
            </td>
        </tr>
    )
}

export default Blog;