import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
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
import { Button } from "@mui/joy";
import { Add } from "@mui/icons-material";
import { Case } from "../../../../../backend/common/case";
import { Patient } from "../../../../../backend/common/patients";
import { Process } from "../../../../../backend/common/process";
import { toast } from "react-toastify";
import Barloader from "react-spinners/BarLoader";
import { useNavigate } from "react-router-dom";
import { CSSProperties, Fragment, useEffect, useState, MouseEvent } from "react";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

type Data = Pick<
    Case & { updatedAt: string; currentProcess: string; processStatus: string },
    "id" | "motherId" | "updatedAt" | "currentProcess" | "processStatus"
>;

function labelDisplayedRows({ from, to, count }: { from: number; to: number; count: number }) {
    return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`;
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
        id: "motherId",
        numeric: false,
        label: "MÃE",
    },
    {
        id: "updatedAt",
        numeric: false,
        label: "MODIFICADO EM",
    },
    {
        id: "currentProcess",
        numeric: false,
        label: "PROCESSO ATUAL",
    },
    {
        id: "processStatus",
        numeric: false,
        label: "STATUS",
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: MouseEvent<unknown>) => {
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

interface CaseRowProps {
    caseData: Data;
}

function CaseRow({ caseData }: CaseRowProps) {
    const [motherData, setMotherData] = useState<Patient | undefined>(undefined);
    const [processData, setProcessData] = useState<Process | undefined>(undefined);
    const caseProcesses = JSON.parse((caseData as any).processes) as Process[];
    const navigate = useNavigate();

    useEffect(() => {
        const loaderProcess = async () => {
            for (let i = 0; i < caseProcesses.length; i++) {
                let found = false;

                await fetch("http://localhost:3000/processes?id=" + caseProcesses[i], {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(async (res) => {
                        if (res.status === 500) {
                            toast.error("Algo deu errado :/", {
                                position: "bottom-center",
                                theme: "light",
                            });

                            return;
                        }

                        await res
                            .json()
                            .then((response: Process) => {
                                if (response.status == "FAZENDO" || response.name == "CONCLUÍDO") {
                                    setProcessData(response);
                                    found = true;
                                }
                            })
                            .catch(() => {
                                toast.error("Algo deu errado :/", {
                                    position: "bottom-center",
                                    theme: "light",
                                });
                            });
                    })
                    .catch(() => {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });
                    });

                if (found) break;
            }
        };

        const loaderPatient = async () => {
            await fetch("http://localhost:3000/patients?cpf=" + caseData.motherId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(async (res) => {
                    if (res.status === 500) {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });
                    }

                    await res
                        .json()
                        .then((response) => {
                            setMotherData(response as Patient);
                        })
                        .catch(() => {
                            toast.error("Algo deu errado :/", {
                                position: "bottom-center",
                                theme: "light",
                            });
                        });
                })
                .catch(() => {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });
                });
        };

        if (caseData.motherId != "") loaderPatient();
        loaderProcess();
    }, []);

    return (
        <tr
            key={caseData.id}
            onClick={() => navigate(`/app/caso/${caseData.id}`)} /* Go to Case page */
            tabIndex={-1}
            style={{
                cursor: "pointer",
            }}>
            <th scope="row">{caseData.id}</th>
            <td>
                {caseData.motherId == "" ? (
                    <Typography variant="solid" color="danger" sx={{ maxWidth: "max-content" }}>
                        NÃO REGISTRADO
                    </Typography>
                ) : (
                    <Typography sx={{ textAlign: "start" }}>
                        {motherData === undefined ? "CARREGANDO" : motherData.name}
                    </Typography>
                )}
            </td>
            <td>
                <Typography sx={{ textAlign: "start" }}>
                    {new Date(caseData.updatedAt).toLocaleString()}
                </Typography>
            </td>
            <td>
                <Typography sx={{ textAlign: "start" }}>
                    {processData === undefined ? "CARREGANDO" : processData.name}
                </Typography>
            </td>
            <td>
                {processData === undefined ? (
                    <Typography variant="soft" sx={{ width: "max-content" }}>
                        CARREGANDO
                    </Typography>
                ) : (
                    <Typography
                        variant="solid"
                        color={
                            (processData.status as any) === "FEITO"
                                ? "success"
                                : (processData.status as any) === "FAZENDO"
                                ? "primary"
                                : "danger"
                        }
                        level="title-sm"
                        sx={{
                            maxWidth: "max-content",
                            paddingX: "0.500rem",
                        }}>
                        {processData.status}
                    </Typography>
                )}
            </td>
        </tr>
    );
}

export default function Casos() {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof Data>("id");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [casesData, setCasesData] = useState<Data[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [emptyRows, setEmptyRows] = useState<number>(0);

    const navigate = useNavigate();

    useEffect(() => {
        const loader = async () => {
            await fetch("http://localhost:3000/cases/all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(async (res) => {
                    if (res.status === 500) {
                        toast.error("Algo deu errado :/", {
                            position: "bottom-center",
                            theme: "light",
                        });

                        return;
                    }

                    await res
                        .json()
                        .then((response) => {
                            setCasesData(response as Data[]);
                            setEmptyRows(
                                page > 0
                                    ? Math.max(0, (1 + page) * rowsPerPage - response.length)
                                    : 0
                            );
                            setLoading(false);
                        })
                        .catch(() => {
                            toast.error("Algo deu errado :/", {
                                position: "bottom-center",
                                theme: "light",
                            });
                        });
                })
                .catch(() => {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });
                });
        };

        loader();
    }, []);

    const createNewCase = async () => {
        toast("Criando caso...", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
        });

        await fetch("http://localhost:3000/cases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        })
            .then((res) => {
                if (res.status === 500) {
                    toast.error("Algo deu errado :/", {
                        position: "bottom-center",
                        theme: "light",
                    });

                    return;
                }

                return res.json();
            })
            .then((response) => {
                navigate(`/app/caso/${response.id}`);
            })
            .catch(() => {
                toast.error("Algo deu errado :/", {
                    position: "bottom-center",
                    theme: "light",
                });
            });
    };

    const handleRequestSort = (_: MouseEvent<unknown>, property: keyof Data) => {
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

    if (loading == true || casesData == undefined) {
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
                        boxShadow:
                            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                        padding: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}>
                    <Barloader
                        color="#0B6BCB"
                        loading={loading}
                        cssOverride={override}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </Box>
            </Box>
        );
    }

    const getLabelDisplayedRowsTo = () => {
        if (casesData.length === -1) {
            return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1
            ? casesData.length
            : Math.min(casesData.length, (page + 1) * rowsPerPage);
    };

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
                        level="h3"
                        sx={{ flex: "1 1 100%" }}
                        id="tableTitle"
                        component="div">
                        Casos
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                        <Button
                            size="sm"
                            startDecorator={<Add />}
                            sx={{ whiteSpace: "nowrap" }}
                            onClick={() => createNewCase()}>
                            Novo caso
                        </Button>
                        <Tooltip title="Filtrar lista">
                            <IconButton size="sm" variant="outlined" color="neutral">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box>
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
                            {stableSort(casesData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <Fragment key={row.id}>
                                            <CaseRow caseData={row} />
                                        </Fragment>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <tr
                                    style={
                                        {
                                            height: `calc(${emptyRows} * 40px)`,
                                            "--TableRow-hoverBackground": "transparent",
                                        } as CSSProperties
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
                                                <Option value={15}>15</Option>
                                            </Select>
                                        </FormControl>
                                        <Typography textAlign="center" sx={{ minWidth: 80 }}>
                                            {labelDisplayedRows({
                                                from:
                                                    casesData.length === 0
                                                        ? 0
                                                        : page * rowsPerPage + 1,
                                                to: getLabelDisplayedRowsTo(),
                                                count:
                                                    casesData.length === -1 ? -1 : casesData.length,
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
                                                    casesData.length !== -1
                                                        ? page >=
                                                          Math.ceil(
                                                              casesData.length / rowsPerPage
                                                          ) -
                                                              1
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
        </Box>
    );
}
