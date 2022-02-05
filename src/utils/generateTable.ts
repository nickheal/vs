import { Pair, Status } from './generatePairs';

const WIN_SCORE = 3;
const DRAW_SCORE = 1;
const LOSS_SCORE = 0;

interface Table {
  id: string;
  contestant: string;
  wins: number;
  draws: number;
  losses: number;
  score: number;
}

function generateTable(pairs: Pair[]) {
  const table: Table[] = [];
  
  for (const pair of pairs) {
    const homeTeamId = pair.home.id;
    const awayTeamId = pair.away.id;

    let homeTeamRow = table.find(({ id }) => id === homeTeamId);
    if (!homeTeamRow) {
      homeTeamRow = {
        id: homeTeamId,
        contestant: pair.home.value,
        wins: 0,
        draws: 0,
        losses: 0,
        score: 0
      };
      table.push(homeTeamRow);
    }
    if (pair.status === Status.Home) {
      homeTeamRow.wins = homeTeamRow.wins + 1;
      homeTeamRow.score = homeTeamRow.score + WIN_SCORE;
    } else if (pair.status === Status.Draw) {
      homeTeamRow.draws = homeTeamRow.draws + 1;
      homeTeamRow.score = homeTeamRow.score + DRAW_SCORE;
    } else if (pair.status === Status.Away) {
      homeTeamRow.losses = homeTeamRow.losses + 1;
      homeTeamRow.score = homeTeamRow.score + LOSS_SCORE;
    }

    let awayTeamRow = table.find(({ id }) => id === awayTeamId);
    if (!awayTeamRow) {
      awayTeamRow = {
        id: awayTeamId,
        contestant: pair.away.value,
        wins: 0,
        draws: 0,
        losses: 0,
        score: 0
      };
      table.push(awayTeamRow);
    }
    if (pair.status === Status.Away) {
      awayTeamRow.wins = awayTeamRow.wins + 1;
      awayTeamRow.score = awayTeamRow.score + WIN_SCORE;
    } else if (pair.status === Status.Draw) {
      awayTeamRow.draws = awayTeamRow.draws + 1;
      awayTeamRow.score = awayTeamRow.score + DRAW_SCORE;
    } else if (pair.status === Status.Home) {
      awayTeamRow.losses = awayTeamRow.losses + 1;
      awayTeamRow.score = awayTeamRow.score + LOSS_SCORE;
    }
  }

  return table.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    } else {
      return b.wins - a.wins;
    }
  });
}

export default generateTable;
