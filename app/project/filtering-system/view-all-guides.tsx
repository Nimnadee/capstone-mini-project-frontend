"use client";
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { getAllGuideUpdated, MatchingGuide } from "@/service/guide.service";
import { useMultiStepContext } from "@/app/step-context";
import { Button } from "@nextui-org/react";
import { createRequest, deleteRequest } from "@/service/project.request.service";

export default function ViewALLGuides() {
    const { projectResponse } = useMultiStepContext();
    const [rows, setRows] = useState([]);
    const [requestedGuides, setRequestedGuides] = useState(new Map());

    const handleViewGuide = (params) => {
        const guideId = params.row.id;
        console.log("Viewing guide profile for:", guideId);
        // Implement the logic to navigate to the guide's profile page or open a modal
    };

    const handleRequestGuide = async (params) => {
        const guideId = params.row.id;
        const requestId = requestedGuides.get(guideId);

        if (requestId) {
            console.log("Canceling request for guide:", guideId);

            try {
                const res = await deleteRequest(requestId);
                console.log("Response from deleteRequest:", res);

                setRequestedGuides((prev) => {
                    const updated = new Map(prev);
                    updated.delete(guideId);
                    return updated;
                });
            } catch (error) {
                console.error("Error in handleRequestGuide (cancel):", error);
            }
        } else {
            console.log("Requesting guide for:", guideId);

            try {
                const res = await createRequest({
                    guideId: guideId,
                    projectId: projectResponse.id,
                    status: "pending",
                });
                console.log("Response from createRequest:", res);

                setRequestedGuides((prev) => {
                    const updated = new Map(prev);
                    updated.set(guideId, res.id);
                    return updated;
                });
            } catch (error) {
                console.error("Error in handleRequestGuide (create):", error);
            }
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'fullName',
            headerName: 'Name',
            width: 200,
            editable: false,
        },
        {
            field: 'rating',
            headerName: 'Rating',
            type: 'number',
            width: 150,
            editable: false,
            resizable: false,
        },
        {
            field: 'reviewCount',
            headerName: 'Review Count',
            type: 'number',
            width: 150,
            editable: false,
            resizable: false,
        },
        {
            field: 'actions',
            headerName: '',
            width: 400,
            sortable: false,
            disableClickEventBubbling: true,
            resizable: false,
            renderCell: (params) => {
                const isRequested = requestedGuides.has(params.row.id);

                return (
                    <div>
                        <Button
                            className={"w-1/2"}
                            variant="solid"
                            color="primary"
                            style={{ marginRight: 8 }}
                            onClick={() => handleViewGuide(params)}
                        >
                            View Guide Profile
                        </Button>
                        <Button
                            className={"w-1/2"}
                            variant={isRequested ? 'faded' : 'solid'}
                            color={isRequested ? 'default' : 'success'}
                            onClick={() => handleRequestGuide(params)}
                        >
                            {isRequested ? 'Cancel Request' : 'Request Guide'}
                        </Button>
                    </div>
                );
            }
        },
    ];

    useEffect(() => {
        getAllGuideUpdated().then(
            res => {
                console.log("fetch response: ", res);
                setRows((prevRows: MatchingGuide[]) => res);
            }
        )
    }, []);

    return (
        <Box sx={{ height: '100%', width: '100%' }}>

            <DataGrid
                rowHeight={60}
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                disableColumnSelector
                slots={{
                    toolbar: GridToolbar,
                }}
            />
        </Box>
    );
}
