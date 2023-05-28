import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const UserTable = ({ table = 'user', list, deleteHandler }) => {
    if (table === 'product') {
        return (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((product) => (
                        <tr
                            key={product._id}
                            style={{ verticalAlign: 'middle' }}
                        >
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>

                            <td>
                                <LinkContainer
                                    to={`/admin/product/${product._id}/edit`}
                                >
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fa fa-edit fa-lg' />
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant='light'
                                    className='btn-sm  text-danger '
                                    onClick={() => {
                                        deleteHandler(product._id);
                                    }}
                                >
                                    <i className='fa fa-trash fa-lg' />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
    if (table === 'order') {
        return (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((order) => (
                        <tr key={order._id} style={{ verticalAlign: 'middle' }}>
                            <td>{order._id}</td>
                            <td>{order.userId.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                {order?.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (
                                    <i className='fa fa-times text-danger' />
                                )}
                            </td>
                            <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <i className='fa fa-times text-danger' />
                                    )}
                            </td>

                            <td>
                                <LinkContainer
                                    to={`/order/${order._id}`}
                                >
                                    <Button variant='light' className='btn-sm'>
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
    return (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {list?.map((user) => (
                    <tr key={user._id} style={{ verticalAlign: 'middle' }}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td>
                            {user.isAdmin ? (
                                <i className='fa fa-check text-success' />
                            ) : (
                                <i className='fa fa-times text-danger' />
                            )}
                        </td>
                        <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fa fa-edit fa-lg' />
                                </Button>
                            </LinkContainer>
                            <Button
                                variant='light'
                                className='btn-sm  text-danger '
                                onClick={() => {
                                    deleteHandler(user._id);
                                }}
                            >
                                <i className='fa fa-trash fa-lg' />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
export default UserTable;
