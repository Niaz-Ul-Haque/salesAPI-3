import React from 'react';
import  { ListGroup, ListGroupItem, Table } from 'react-bootstrap';

class Sale extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            sale: {},
            loading: true
        }
    }

    componentDidMount() {
        fetch(`https://salesapi-niaz.herokuapp.com/api/sales/${this.props.id}`)
            .then(response => {
                return response.json();
            })
            .then(sale => {
                if (this.props.id === sale._id) {
                    this.props.viewedSale(sale._id);
                    this.setState({ sale, loading: false });
                }
                else {
                    this.setState({ sale: {}, loading: false });
                }
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({ loading: true })
            fetch(`https://salesapi-niaz.herokuapp.com/api/sales/${this.props.id}`)
            .then(response => {
                return response.json();
            })
            .then(sale => {
                if (this.props.id === sale._id) {
                    this.props.viewedSale(sale._id);
                    this.setState({ sale, loading: false });
                }
                else {
                    this.setState({ sale: {}, loading: false });
                }
            });
        }
    }

    itemtotals(items) {
        return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }

    render() {
        if (this.state.loading) {
            return null; 
        } else {
            if (this.state.sale._id) {
                return (<div>
                    <h1>Sale: {this.props.id}</h1>
                    <h2>Customer</h2>
                    <ListGroup>
                        <ListGroupItem><strong>email:</strong> {this.state.sale.customer.email}</ListGroupItem>
                        <ListGroupItem><strong>age:</strong> {this.state.sale.customer.age}</ListGroupItem>
                        <ListGroupItem><strong>satisfaction:</strong> {this.state.sale.customer.satisfaction}/5</ListGroupItem>
                    </ListGroup>
                    <h2> Items: ${this.itemtotals(this.state.sale.items)}</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sale.items.map((items, index) =>
                                <tr key={index}>
                                    <td>{items.name}</td>
                                    <td>{items.quantity}</td>
                                    <td>{items.price}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>);
            } else {
                return <div><h1>Unable to find Sale</h1><p>id: {this.props.id}</p></div>
            }
        }
    }
}

export default Sale;