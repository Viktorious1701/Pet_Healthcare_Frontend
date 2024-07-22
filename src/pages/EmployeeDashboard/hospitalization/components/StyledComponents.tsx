import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

// Main container
export const StyledBox = styled.div`
  height: 450px;
  width: 100%;
  background-color: #fff0f5; // Light pink background
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Styled DataGrid
export const StyledDataGrid = styled(DataGrid)`
  background-color: white;

  .MuiDataGrid-columnHeaders {
    background-color: #d53f8c; // Darker pink
    color: white;
    font-weight: bold;
  }

  .MuiDataGrid-cell {
    border-bottom: 1px solid #ffb6c1;
  }

  .MuiDataGrid-row:nth-of-type(even) {
    background-color: #fff0f5;
  }

  .MuiDataGrid-row:hover {
    background-color: #ffe4e1;
  }
`;

// Styled Dialog components
export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    background-color: #fff0f5;
    border-radius: 8px;
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  background-color: #d53f8c;
  color: white;
`;

export const StyledDialogContent = styled(DialogContent)`
  padding: 24px;
`;

export const StyledDialogContentText = styled(DialogContentText)`
  color: #4a4a4a;
`;

export const StyledDialogActions = styled(DialogActions)`
  padding: 16px 24px;
`;

export const StyledButton = styled(Button)`
  &.MuiButton-containedPrimary {
    background-color: #d53f8c;
    color: white;
    &:hover {
      background-color: #b83280;
    }
  }
  &.MuiButton-outlinedPrimary {
    color: #d53f8c;
    border-color: #d53f8c;
    &:hover {
      background-color: rgba(213, 63, 140, 0.04);
    }
  }
`;
