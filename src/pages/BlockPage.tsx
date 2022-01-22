import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {fetchBlock} from "../store/block-reducer/block-reducer";
import {Spinner, Table} from "react-bootstrap";
import {useTypedSelector} from "../hooks/useTypedSelector";

const BlockPage = () => {

    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const {currentBlock: block, isPending, error} = useTypedSelector((state) => state.blockReducer)
    useEffect(() => {
        if (id) {
            dispatch(fetchBlock({id}))
        }
    }, [id])

    if (isPending) {
        return (
            <div className='spinnerWrapper'>
                <div>
                    <Spinner animation={'border'} role={'status'}/>
                </div>
            </div>
        )
    }

    if (error) {
        return <h1>{error}</h1>
    }

    if (!block) {
        return (
            <h1>
                Server Error
            </h1>
        )
    }

    return (
        <div className='blockInfoWrapper'>
            <div className='label'>
                <span className='value'>Number: {block.number}</span>
            </div>
            <div className='label'>
                <span className='value'>Hash: {block.hash}</span>
            </div>
            <div>
                <h3 style={{
                    width: '100%',
                    textAlign: 'center',
                    justifyItems: 'center'
                }}>
                    Transactions
                </h3>
            </div>
            <div className='tableWrapper'>
                <Table striped bordered size='sm'>
                    <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Hash</th>
                    </tr>
                    </thead>
                    <tbody>
                    {block.tableOfTransactions.map(transaction =>
                        <tr key={transaction.hash}>
                            <td>{transaction.from}</td>
                            <td>{transaction.to}</td>
                            <td>{transaction.hash}</td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default BlockPage;