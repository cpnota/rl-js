import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

const ResultsTable = ({ results }) => (
  <Table celled style={{ maxWidth: 500, padding: 0 }}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Hyperparameters</Table.HeaderCell>
        <Table.HeaderCell>Mean</Table.HeaderCell>
        <Table.HeaderCell>Divergences</Table.HeaderCell>
        <Table.HeaderCell>Trials</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {results.map(([key, result]) => (
        <Table.Row key={key}>
          <Table.Cell>
            {Object.entries(result.hyperparameters).map(([parameter, value]) => (
              <div>
                {`${parameter}: ${typeof value === 'number' ? value.toFixed(5) : value}`}
              </div>
            ))}
          </Table.Cell>
          <Table.Cell>{result.mean && result.mean.toFixed(2)}</Table.Cell>
          <Table.Cell>{result.divergences}</Table.Cell>
          <Table.Cell>{result.count}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

ResultsTable.propTypes = {
  results: PropTypes.arrayOf(PropTypes.array).isRequired,
};

const mapStateToProps = state => ({
  results: state.results.byMean.slice(0, 10),
});

export default connect(mapStateToProps)(ResultsTable);
