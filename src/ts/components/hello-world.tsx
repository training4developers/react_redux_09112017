import * as React from 'react';
import { Jumbotron, Container } from 'reactstrap';

export class HelloWorld extends React.Component<undefined, undefined> {

    public render() {
        return <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">Hello World!!</h1>
            <p className="lead">Welcome to React + Redux with TypeScript!</p>
          </Container>
        </Jumbotron>;
    }
}