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

import { AllFrameTypes } from "@/data/types";
import { ACTIONS_TITLES, BASIC_FRAMES } from "@/data/elements";
import { observer } from "mobx-react-lite";
import { useStore } from "@/mobx-store/use-store-provider";

export const GameActionHistory = observer(() => {
  const { history: gameHistory } = useStore();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - gameHistory.length) : 0;

  const handleChangePage = (_: unknown, newPage: number) => {
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
                Действие
              </TableCell>
              <TableCell align={"center"} style={{ minWidth: 100 }}>
                Время
              </TableCell>
              <TableCell align={"center"} style={{ minWidth: 100 }}>
                Монеты
              </TableCell>
              <TableCell align={"center"} style={{ minWidth: 100 }}>
                Руины
              </TableCell>
              <TableCell align={"center"} style={{ minWidth: 100 }}>
                Старые клетки
              </TableCell>
              <TableCell align={"center"} style={{ minWidth: 100 }}>
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
                  {ACTIONS_TITLES[row.stepMode]}
                </TableCell>
                <TableCell style={{ width: 170 }} align="center">
                  {String(row.time)}
                </TableCell>
                <TableCell style={{ width: 80 }} align="center">
                  {row?.coins !== 0 && typeof row?.coins == "number" ? String(row?.coins) : ""}
                </TableCell>
                <TableCell style={{ width: 80 }} align="center">
                  {row?.ruin === true ? "Да" : ""}
                </TableCell>
                <TableCell style={{ width: 180 }} align="center">
                  {row?.oldFrames?.map((el, i) => (
                    <FrameInHistory key={`tc-old-frame-${el.kind}-${i}`} {...el} />
                  ))}
                </TableCell>
                <TableCell style={{ width: 180 }} align="center">
                  {row?.newFrames?.map((el, i) => (
                    <FrameInHistory key={`tc-new-frame-${el.kind}-${i}`} {...el} />
                  ))}
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
});

function FrameInHistory({ count, kind }: { count: number; kind: AllFrameTypes }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        gap: 4,
        marginTop: "2px",
      }}
    >
      {`${count}x`}
      <div
        style={{
          height: 18,
          width: 18,
          backgroundColor: BASIC_FRAMES[kind].bgc,
          borderRadius: 4,
          border: "1px solid black",
        }}
      />
    </div>
  );
}
