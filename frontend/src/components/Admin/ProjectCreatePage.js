import React,{useState,useEffect} from 'react'
import { Button, Card, Form } from "react-bootstrap";
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from "react-redux";
import { createProjects } from '../../actions/projectsActions';
import Sidebar from './Sidebar'

const ProjectCreate = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState();
  const [picMessage, setPicMessage] = useState(null);

   
  const dispatch = useDispatch();

  const projectCreate = useSelector((state) => state.projectCreate);
  const { loading, project ,error} = projectCreate;

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "LAYOUTindex");
      data.append("cloud_name", "dknttakfo");
      fetch("https://api.cloudinary.com/v1_1/dknttakfo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
        //   console.log(data);
          setPhoto(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  //submit form
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProjects( name,description,price,photo ));
  };

  return (
    <div className="admin-dashboard" style={{ backgroundColor: "lightblue" }}>
       <Sidebar />

       
       <div className="admin-content">
        <div className="admin-header">
          <h1 style={{ marginLeft:"100px",marginTop:"50px"}}>Add Your New Projects</h1><br/>
        </div>

  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '58vh' }}>
  
    <Card>
    <Card.Body>

       <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="title"
                value={name}
                placeholder="Enter Project Title"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="title">
               <Form.Label>Description</Form.Label>
               <Form.Control
                type="testArea"
                placeholder="Enter Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

              <Form.Group controlId="title">
               <Form.Label>Price</Form.Label>
               <Form.Control
                type="price"
                placeholder="Enter the Project value"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

              {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Project Image</Form.Label>
            <Form.Control
              id="custom-file"
              type="file"
              label="Upload Project Picture"
              onChange={(e) => postDetails(e.target.files[0])}
              custom
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="my-4" >
             Create New Project
          </Button>
        </Form>
 

  </Card.Body>
  </Card>
  
 </div>
</div>
</div> 


  )
}


export default ProjectCreate