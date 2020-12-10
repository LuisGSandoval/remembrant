import React, { useContext, useEffect, useState } from 'react';
import { CTX } from '../../../Store/Store';
import { getTxs } from '../../../Actions/TransactionsActions';
import { ListGroup, Collapse, Button, Card, CardBody } from 'reactstrap';
import JSONPretty from 'react-json-prettify';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
const TransactionsList = () => {
  const [store, dispatch] = useContext(CTX);

  useEffect(() => {
    dispatch({ type: 'LOADER', payload: true });
    getTxs()
      .then((data) => {
        dispatch({
          type: 'LOAD_TRANSACTIONS_LIST',
          payload: data,
        });
        dispatch({ type: 'LOADER', payload: false });
      })
      .catch((err) => {
        dispatch({ type: 'LOADER', payload: false });
        dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: err });
      });
    return () => {
      dispatch({
        type: 'LOAD_TRANSACTIONS_LIST',
        payload: [],
      });
      dispatch({ type: 'LOADER', payload: false });
    };
  }, [dispatch]);

  const { transactions } = store;

  return (
    <div className="my-5">
      <ListGroup>
        {transactions &&
          transactions.length > 0 &&
          transactions.map((tx) => (
            <TransactionsItem
              tx={tx}
              data={tx ? JSON.parse(tx.description) : ''}
              key={tx._id}
            />
          ))}
      </ListGroup>
    </div>
  );
};

const TransactionsItem = ({ tx, data }) => {
  const [showCollapsable, setShowCollapsable] = useState(false);

  const toggleDescription = () => setShowCollapsable(!showCollapsable);

  return (
    <div>
      <Button onClick={toggleDescription} block>
        Referencia <b> {tx.referenceId ? tx.referenceId : ''} </b> <br />
        fecha:{' '}
        <b>
          {tx.dateRegistered
            ? format(new Date(tx.dateRegistered), 'dd MMMM yyyy', {
                locale: es,
              })
            : ''}
        </b>
      </Button>

      <Collapse isOpen={showCollapsable}>
        <Card className="mt-3">
          <CardBody>
            {data ? <JSONPretty json={data} padding={4} /> : null}
          </CardBody>
        </Card>
      </Collapse>

      <hr />
    </div>
  );
};

export default TransactionsList;
