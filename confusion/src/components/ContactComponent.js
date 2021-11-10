/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Breadcrumb , BreadcrumbItem , Button , Label , Col, Row} from 'reactstrap'
import {Link} from 'react-router-dom'
import  { Control , Form , Errors} from 'react-redux-form'

const required = (value) => value && value.length;
const maxLength = (len) => (value) => !(value) || (value.length <= len);
const minLength = (len) => (value) => (value) && (value.length >= len);
const isNumber = (value) => !isNaN(Number(value));
const validEmail =  (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)

class Contact extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleSubmit(values){
        alert("current state is : " + JSON.stringify(values))
       this.props.postFeedback(values.firstname, values.lastname, values.telnum, values.email, values.agree , values.contactType,values.message)
        this.props.resetFeedbackForm()
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb >
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            Contact us
                        </BreadcrumbItem>
      
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content" >
                    <div className="col-12">
                        <h3>Send us your feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name : </Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" className="form-control" id="firstname" name="firstname" 
                                    placeholder=" First Name"
                                    validators={
                                        {
                                            required,
                                            minLength: minLength(4), 
                                            maxLength : maxLength(10)
        
                                        }
                                    }
                                     />
                                    <Errors  className="text-danger" 
                                    model=".firstname"
                                    show="touched"
                                    messages={
                                        {
                                            required: ' required ',
                                            minLength: ' minimum 4 characters ',
                                            maxLength: ' maximum 10  characters '
                                        }
                                    }
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name : </Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname" 
                                    placeholder=" Last Name" 
                                    className="form-control"
                                    validators={
                                        {
                                            required,
                                            minLength: minLength(4), 
                                            maxLength : maxLength(10)
        
                                        }
                                    }
                                     />
                                   <Errors  className="text-danger" 
                                    model=".lastname"
                                    show="touched"
                                    messages={
                                        {
                                            required: ' required ',
                                            minLength: ' minimum 4 characters ',
                                            maxLength: ' maximum 10  characters '
                                        }
                                    } 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact tel. : </Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" className="form-control" id="telnum" name="telnum" 
                                    placeholder=" tel num"
                                    validators={
                                        {
                                            required,
                                            minLength: minLength(10), 
                                            maxLength : maxLength(10),
                                            isNumber ,
                                        }
                                    }
                                   />
                                    <Errors  className="text-danger" 
                                    model=".telnum"
                                    show="touched"
                                    messages={
                                        {
                                            required: ' required ',
                                            minLength: ' minimum 10 numbers ',
                                            maxLength: ' maximum 10  numbers ',
                                            isNumber  : ' only numbers are required '
                                        }
                                    } 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email : </Label>
                                <Col md={10}>
                                    <Control.text model=".email" className="form-control" id="email" name="email" 
                                    placeholder=" Email "
                                    validators={
                                        {
                                            required,
                                            validEmail ,
                                        }
                                    }
                                   />
                                    <Errors  className="text-danger" 
                                    model=".email"
                                    show="touched"
                                    messages={
                                        {
                                            required: ' required ',
                                            
                                            validEmail  : ' Invalid email Address '
                                        }
                                    } 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size : 6, offset : 2}}>
                                    <div  className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree" 
                                            className="form-check-input"
                                            /> { ' '} 
                                            <strong>May we contact you ?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size : 3, offset : 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                    className="form-control">
                                        <option >Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback : </Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message" 
                                    rows="12" className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10,offset:2}}>
                                    <Button type="submit" color ="primary">
                                        send feedback
                                    </Button> 
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}


export default Contact
