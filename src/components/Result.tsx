import React from 'react';
import { Pair } from '../utils/generatePairs';
import generateTable from '../utils/generateTable';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  table: {
    borderCollapse: 'collapse',
    margin: '0 auto',

    '& tr:nth-child(2n)': {
      backgroundColor: '#f7f7f7'
    },

    '& th': {
      padding: 8
    },

    '& td': {
      padding: 8,
      textAlign: 'center'
    }
  }
});

interface Props {
  pairs: Pair[];
}

function Result(props: Props) {
  const classes = useStyles();

  const table = generateTable(props.pairs);

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Team</th>
          <th>Wins</th>
          <th>Draws</th>
          <th>Losses</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {table.map((row) => (
          <tr key={row.id}>
            <td>{ row.contestant }</td>
            <td>{ row.wins }</td>
            <td>{ row.draws }</td>
            <td>{ row.losses }</td>
            <td>{ row.score }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Result;
