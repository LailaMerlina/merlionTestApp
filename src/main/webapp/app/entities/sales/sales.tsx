import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export interface ISalesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Sales = (props: ISalesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  const { salesList, match, loading } = props;
  return (
    <div>
      <h2 id="sales-heading">
        <Translate contentKey="testApp.sales.home.title">Sales</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity button-round" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="testApp.sales.home.createLabel">Create new Sales</Translate>
        </Link>
      </h2>
      <div className="table-responsive table-hover">
        {salesList && salesList.length > 0 ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className="th-style">
                <TableRow>
                  <TableCell>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </TableCell>
                  <TableCell align="left">
                    <Translate contentKey="testApp.sales.description">Description</Translate>
                  </TableCell>
                  <TableCell align="left">
                    <Translate contentKey="testApp.sales.state">State</Translate>
                  </TableCell>
                  <TableCell align="left">
                    <Translate contentKey="testApp.sales.date">Date</Translate>
                  </TableCell>
                  <TableCell></TableCell> {/*celda vacía adicional para que la línea superior de la tabla continue hasta el final*/}
                </TableRow>
              </TableHead>
              <TableBody>
                {salesList.map((sales, i) => (
                  <TableRow key={sales.id}>
                    <TableCell component="th" scope="row">
                      <Button tag={Link} to={`${match.url}/${sales.id}`} color="link" size="sm">
                        {sales.id}
                      </Button>
                    </TableCell>
                    <TableCell align="left">{sales.description}</TableCell>
                    <TableCell align="left">
                      <Translate contentKey={`testApp.State.${sales.state}`} />
                    </TableCell>
                    <TableCell align="left">
                      {sales.date ? <TextFormat type="date" value={sales.date} format={APP_LOCAL_DATE_FORMAT} /> : null}
                    </TableCell>
                    <TableCell align="right">
                      <div className=" flex-btn-group-container">
                        <Button className="button-round mx-2 my-1" tag={Link} to={`${match.url}/${sales.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button className="button-edit mx-2 my-1" tag={Link} to={`${match.url}/${sales.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button
                          className="button-delete mx-2 my-1"
                          tag={Link}
                          to={`${match.url}/${sales.id}/delete`}
                          color="danger"
                          size="sm"
                        >
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="testApp.sales.home.notFound">No Sales found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
