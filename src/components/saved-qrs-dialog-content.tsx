import {
  Button,
  Link,
  Table,
  Tooltip,
  useDialog,
  type TableColumn,
} from "@yamori-design/react-components";
import { type SavedQr, useSavedQrs } from "../utilities";
import { DeleteIcon } from "@yamori-design/icons";
import { useCallback, useEffect, useMemo } from "react";
import { assertNonNullable } from "@yamori-shared/react-utilities";

export const SavedQrsDialogContent: React.FC = () => {
  const { closeDialog } = useDialog();
  const [savedQrs, setSavedQrs] = useSavedQrs();

  assertNonNullable(savedQrs, "savedQrs in dialog");

  const getRowId = useCallback((rowData: SavedQr) => rowData.text, []);

  const columns = useMemo<TableColumn<SavedQr>[]>(
    () => [
      {
        header: "Text",
        id: "text",
        cellRenderer: ({ value }) => (
          <Link
            href={`${location.pathname}?${new URLSearchParams({
              text: value,
            })}`}
          >
            {value}
          </Link>
        ),
      },
      {
        header: "Date",
        id: "date",
        valueGetter: ({ data }) => new Date(data.date).toLocaleDateString(),
      },
      {
        header: "Actions",
        id: "actions",
        align: "center",
        cellRenderer: ({ index }) => (
          <Tooltip content="Delete" portalProps={{ id: "saved-qrs-dialog" }}>
            <Button
              variant="text"
              onClick={() => setSavedQrs(savedQrs!.toSpliced(index, 1))}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        ),
      },
    ],
    [savedQrs, setSavedQrs]
  );

  useEffect(() => {
    if (savedQrs.length === 0) {
      closeDialog();
    }
  }, [closeDialog, savedQrs]);

  return <Table columns={columns} getRowId={getRowId} rowData={savedQrs} />;
};
