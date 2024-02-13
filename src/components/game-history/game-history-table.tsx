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

type FieldTypes = "none" | "hill" | "home" | "tree" | "evil" | "brim" | "pond" | "void";
type HistoryRowType = {
  stepMode: "skill" | "simpl" | "season";
  time: string | Date;
  oldFrames?: { count: number; kind: FieldTypes }[];
  newFrames?: { count: number; kind: FieldTypes }[];
};

const ROWS: HistoryRowType[] = [
  {
    stepMode: "simpl",
    time: "00-00-00",
    oldFrames: [{ count: 3, kind: "home" }],
    newFrames: [{ count: 3, kind: "none" }],
  },
  {
    stepMode: "season",
    time: "00-00-00",
  },
  {
    stepMode: "simpl",
    time: "00-00-00",
    oldFrames: [{ count: 3, kind: "home" }],
    newFrames: [{ count: 3, kind: "none" }],
  },
  {
    stepMode: "skill",
    time: "00-00-00",
    oldFrames: [
      { count: 2, kind: "home" },
      { count: 2, kind: "tree" },
    ],
    newFrames: [{ count: 4, kind: "none" }],
  },
  {
    stepMode: "simpl",
    time: "00-00-00",
    oldFrames: [{ count: 3, kind: "home" }],
    newFrames: [{ count: 3, kind: "none" }],
  },
  {
    stepMode: "simpl",
    time: "00-00-00",
    oldFrames: [{ count: 3, kind: "home" }],
    newFrames: [{ count: 3, kind: "none" }],
  },
];

export function GameActionHistory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ROWS.length) : 0;

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
                1 field
              </TableCell>
              <TableCell align={"right"} style={{ minWidth: 100 }}>
                2 field
              </TableCell>
              <TableCell align={"right"} style={{ minWidth: 100 }}>
                3 field
              </TableCell>
              <TableCell align={"right"} style={{ minWidth: 100 }}>
                4 field
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? ROWS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : ROWS
            ).map((row, index) => (
              <TableRow key={row.stepMode + index}>
                <TableCell component="th" scope="row">
                  {row.stepMode}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {String(row.time)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row?.oldFrames?.map((el, i) => `${i > 0 ? " / " : ""}${el.count} ${el.kind}`)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row?.newFrames?.map((el, i) => `${i > 0 ? " / " : ""}${el.count} ${el.kind}`)}
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
                colSpan={4}
                count={ROWS.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
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
