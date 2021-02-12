import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RegistrationForm = (props) => {
  return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="formFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control required placeholder="First name" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control required placeholder="Last name" />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formCompany">
        <Form.Label>Company</Form.Label>
        <Form.Control required type="text" placeholder="Company" />
      </Form.Group>

      <Form.Group controlId="formPosition">
        <Form.Label>Position</Form.Label>
        <Form.Control required type="text" placeholder="Position" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default RegistrationForm;
