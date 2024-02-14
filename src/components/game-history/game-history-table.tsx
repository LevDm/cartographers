import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

import { HistoryRowType } from "@/data/types";

type HistoryPropsType = {
  gameHistory: HistoryRowType[];
};

export function GameActionHistory(props: HistoryPropsType) {
  const { gameHistory } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - gameHistory.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ paddingTop: 1, marginTop: 2 }}>
      <Typography paddingRight={1}>История</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align={"left"} style={{ minWidth: 100 }}>
                Тип хода
              </TableCell>
              <TableCell align={"right"} style={{ minWidth: 100 }}>
                Время
              </TableCell>
              <TableCell align={"right"} style={{ minWidth: 100 }}>
                Монеты
              </TableCell>
              <TableCell align={"right"} style={{ minWidth: 100 }}>
                Руины
              </TableCell>
              <TableCell align={"right"} style={{ minWidth: 100 }}>
                Старые клетки
              </TableCell>
              <TableCell align={"right"} style={{ minWidth: 100 }}>
                Новые клетки
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? gameHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : gameHistory
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.stepMode}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {String(row.time)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {String(row?.coins)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {String(row?.ruin)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row?.oldFrames?.map((el, i) => `${i > 0 ? " / " : ""}${el.count}x ${el.kind}`)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row?.newFrames?.map((el, i) => `${i > 0 ? " / " : ""}${el.count}x ${el.kind}`)}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[3, 10, 15, { label: "Все", value: -1 }]}
                //colSpan={4}
                count={gameHistory.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={"Строк на странице"}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}–${to} из ${count !== -1 ? count : `more than ${to}`}`
                }
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
