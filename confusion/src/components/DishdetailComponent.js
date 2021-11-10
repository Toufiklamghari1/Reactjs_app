/* eslint-disable react/jsx-pascal-case */
import React  from 'react'
import {Card ,CardImg,CardBody, CardTitle,CardText ,Breadcrumb , BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap'
import '../App.css';
import { Link }  from 'react-router-dom'
import { Control, Errors, LocalForm } from 'react-redux-form';
import Loading from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const maxLength = (len) => (value) => !(value) || (value.length <= len);
const minLength = (len) => (value) => (value) && (value.length >= len);
class CommentForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isModalOpen : false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleComment = this.handleComment.bind(this)
    }


    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }
    handleComment(values){
        this.toggleModal()
        this.props.postComment(this.props.dishId,values.rating, values.author,values.comment)
    }
    render(){
        return (
            <>
                <Button className="btn bg-white text-dark" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>
                    &nbsp; submit Comment</Button>


                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                    <ModalBody>
                        <LocalForm  onSubmit={(values) => this.handleComment(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={3}>Rating : </Label>
                            <Col md={9} >
                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                    <option >1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="name" md={3}>Your Name : </Label>
                                <Col md={9}>
                                    <Control.text model=".author" id="name" name="name" 
                                    placeholder=" Your Name" 
                                    className="form-control"
                                    validators={
                                        {
                                            minLength: minLength(2), 
                                            maxLength : maxLength(15)
        
                                        }
                                    }
                                     />
                                   <Errors  className="text-danger" 
                                    model=".name"
                                    show="touched"
                                    messages={
                                        {
                                            minLength: ' minimum 4 characters ',
                                            maxLength: ' maximum 10  characters '
                                        }
                                    } 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={3}>Your Comment : </Label>
                                <Col md={9}>
                                    <Control.textarea model=".comment" id="comment" name="comment" 
                                    rows="12" className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10,offset:2}}>
                                    <Button type="submit" color ="primary">
                                        Submit
                                    </Button> 
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}
    const RanderDish = ({dish}) =>{
        if(dish != null){
            return (
                <FadeTransform
                in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                    }}
                >
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        }else{
            return (
                <>
                </>
            );
        }
    }
    const RenderComments = ({commentsArray,postComment,dishId}) =>{
        if(commentsArray != null){
            const comments = commentsArray.map((comment) => {
               
                return (
                    <Fade in>
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p> -- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric',month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
                        </li>
                    </Fade>
                );
            });
            return(
                <>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comments}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </>
            )
        }else{
            return (
                <>
                </>
            )
        }
    }
    export const DishDetail = (props) =>{
        if(props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }else if(props.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }else if(props.dish != null){
            return (
             
                <>
                    <div className="container">
                        <div className="row">
                            <Breadcrumb >
                                <BreadcrumbItem>
                                    <Link to='/home'>Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to='/menu'>Menu</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    {props.dish.name}
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-5 col-sm-12 m-1">
                                <RanderDish dish ={props.dish}  />
                            </div>
                            <div className="col-12 col-md-5 col-sm-12 m-1">
                                <h4>Comments</h4>
                                <RenderComments commentsArray= { props.comments } 
                                    postComment = {props.postComment}
                                    dishId={props.dish.id}
                                />
                        
                            </div>
                        </div>
                    </div>
                </>
            );
        }else {
            return (
                <>
                </>
            )
        }
        
    }
