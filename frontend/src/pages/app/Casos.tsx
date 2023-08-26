import * as React from "react";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Tooltip from "@mui/joy/Tooltip";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { visuallyHidden } from "@mui/utils";

interface Data {
    id: string;
    patient: string;
    professional: string;
    currentProcess: "PCR";
    status: "TODO" | "DOING" | "DONE";
}

const rows: Data[] = [
    {
        id: "2023/001",
        patient: "Costa",
        professional: "Jose Lucas",
        currentProcess: "PCR",
        status: "DOING",
    },
    {
        id: "2023/002",
        patient: "Costa",
        professional: "Jose Lucas",
        currentProcess: "PCR",
        status: "DOING",
    },
    {
        id: "2023/003",
        patient: "Costa",
        professional: "Jose Lucas",
        currentProcess: "PCR",
        status: "DOING",
    },
    {
        id: "2023/004",
        patient: "Costa",
        professional: "Jose Lucas",
        currentProcess: "PCR",
        status: "DOING",
    },
    {
        id: "2023/005",
        patient: "Costa",
        professional: "Jose Lucas",
        currentProcess: "PCR",
        status: "DOING",
    },
    {
        id: "2023/006",
        patient: "Costa",
        professional: "Jose Lucas",
        currentProcess: "PCR",
        status: "DOING",
    },
    {
        id: "2023/007",
        patient: "Costa",
        professional: "Jose Lucas",
        currentProcess: "PCR",
        status: "DOING",
    },
];

function labelDisplayedRows({ from, to, count }: { from: number; to: number; count: number }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: "id",
        numeric: false,
        label: "ID",
    },
    {
        id: "patient",
        numeric: false,
        label: "PACIENTE",
    },
    {
        id: "professional",
        numeric: false,
        label: "PROFISSIONAL",
    },
    {
        id: "currentProcess",
        numeric: false,
        label: "PROCESSO ATUAL",
    },
    {
        id: "status",
        numeric: false,
        label: "STATUS",
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <thead>
            <tr>
                {headCells.map((headCell) => {
                    const active = orderBy === headCell.id;
                    return (
                        <th
                            key={headCell.id}
                            aria-sort={
                                active
                                    ? ({ asc: "ascending", desc: "descending" } as const)[order]
                                    : undefined
                            }>
                            <Link
                                underline="none"
                                color="neutral"
                                textColor={active ? "primary.plainColor" : undefined}
                                component="button"
                                onClick={createSortHandler(headCell.id)}
                                fontWeight="lg"
                                startDecorator={
                                    headCell.numeric ? (
                                        <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                                    ) : null
                                }
                                endDecorator={
                                    !headCell.numeric ? (
                                        <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                                    ) : null
                                }
                                sx={{
                                    textAlign: "center",
                                    "& svg": {
                                        transition: "0.2s",
                                        transform:
                                            active && order === "desc"
                                                ? "rotate(0deg)"
                                                : "rotate(180deg)",
                                    },
                                    "&:hover": { "& svg": { opacity: 1 } },
                                }}>
                                {headCell.label}
                                {active ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </Link>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

export default function Casos() {
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof Data>("patient");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (_: any, newValue: number | null) => {
        setRowsPerPage(parseInt(newValue!.toString(), 10));
        setPage(0);
    };

    const getLabelDisplayedRowsTo = () => {
        if (rows.length === -1) {
            return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1 ? rows.length : Math.min(rows.length, (page + 1) * rowsPerPage);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box
            sx={{
                width: "100%",
                flexGrow: 1,
                flex: 1,
                display: "flex",
                justifyContent: "center",
                paddingY: "1rem",
                alignItems: "center",
            }}>
            <Box
                sx={{
                    width: "90%",
                    height: "100%",
                    overflowY: "auto",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#d1d5db",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        py: 1,
                        borderTopLeftRadius: "var(--unstable_actionRadius)",
                        borderTopRightRadius: "var(--unstable_actionRadius)",
                    }}>
                    <Typography
                        level="body-lg"
                        sx={{ flex: "1 1 100%" }}
                        id="tableTitle"
                        component="div">
                        Casos
                    </Typography>
                    <Tooltip title="Filtrar lista">
                        <IconButton size="sm" variant="outlined" color="neutral">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Table
                    aria-labelledby="tableTitle"
                    hoverRow
                    sx={{
                        "--TableCell-headBackground": "transparent",
                        "--TableCell-selectedBackground": (theme) =>
                            theme.vars.palette.success.softBg,
                        "& thead th:nth-child(1)": {
                            width: "20%",
                        },
                        "& thead th:nth-child(2)": {
                            width: "20%",
                        },
                        "& thead th:nth-child(3)": {
                            width: "20%",
                        },
                        "& thead th:nth-child(4)": {
                            width: "20%",
                        },
                        "& thead th:nth-child(5)": {
                            width: "20%",
                        },
                    }}>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <tbody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <tr
                                        onClick={() => 1} /* Go to Case page */
                                        tabIndex={-1}
                                        key={row.id}
                                        style={{
                                            cursor: "pointer",
                                        }}>
                                        <th scope="row">{row.id}</th>
                                        <td>{row.patient}</td>
                                        <td>{row.professional}</td>
                                        <td>{row.currentProcess}</td>
                                        <td>{row.status}</td>
                                    </tr>
                                );
                            })}
                        {emptyRows > 0 && (
                            <tr
                                style={
                                    {
                                        height: `calc(${emptyRows} * 40px)`,
                                        "--TableRow-hoverBackground": "transparent",
                                    } as React.CSSProperties
                                }>
                                <td colSpan={5} />
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        justifyContent: "flex-end",
                                    }}>
                                    <FormControl orientation="horizontal" size="sm">
                                        <FormLabel>Rows per page:</FormLabel>
                                        <Select
                                            onChange={handleChangeRowsPerPage}
                                            value={rowsPerPage}>
                                            <Option value={5}>5</Option>
                                            <Option value={10}>10</Option>
                                            <Option value={25}>25</Option>
                                        </Select>
                                    </FormControl>
                                    <Typography textAlign="center" sx={{ minWidth: 80 }}>
                                        {labelDisplayedRows({
                                            from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                                            to: getLabelDisplayedRowsTo(),
                                            count: rows.length === -1 ? -1 : rows.length,
                                        })}
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <IconButton
                                            size="sm"
                                            color="neutral"
                                            variant="outlined"
                                            disabled={page === 0}
                                            onClick={() => handleChangePage(page - 1)}
                                            sx={{ bgcolor: "background.surface" }}>
                                            <KeyboardArrowLeftIcon />
                                        </IconButton>
                                        <IconButton
                                            size="sm"
                                            color="neutral"
                                            variant="outlined"
                                            disabled={
                                                rows.length !== -1
                                                    ? page >=
                                                      Math.ceil(rows.length / rowsPerPage) - 1
                                                    : false
                                            }
                                            onClick={() => handleChangePage(page + 1)}
                                            sx={{ bgcolor: "background.surface" }}>
                                            <KeyboardArrowRightIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Box>
        </Box>
    );
}
