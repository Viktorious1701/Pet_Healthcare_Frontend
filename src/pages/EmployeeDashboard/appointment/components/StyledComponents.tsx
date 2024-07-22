import styled from 'styled-components';
import { Box, Dialog, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const StyledBox = styled(Box)`
  height: 400px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #ee99bf;
  overflow: hidden;
`;

export const StyledDataGrid = styled(DataGrid)`
  & .MuiDataGrid-root {
    border: none;
  }

  & .MuiDataGrid-cell {
    border-bottom: 1px solid #f0f0f0;
  }

  & .MuiDataGrid-columnHeaders {
    background-color: #ee99bf;
    color: #333;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  & .MuiDataGrid-columnHeader {
    &:focus,
    &:focus-within {
      outline: none;
    }
  }

  & .MuiDataGrid-columnHeadersInner {
    min-height: 56px !important; // Ensure the header has a minimum height
  }

  & .MuiDataGrid-columnHeaderTitle {
    font-weight: bold;
  }

  & .MuiDataGrid-cell:focus {
    outline: none;
  }

  & .MuiDataGrid-row {
    &:nth-of-type(even) {
      background-color: #fff8fa;
    }
    &:hover {
      background-color: #fde8f2;
    }
  }
`;

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledDialogTitle = styled.h2`
  color: #ee99bf;
  font-size: 24px;
  margin-bottom: 16px;
`;

export const StyledDialogContent = styled.div`
  color: #333333;
  font-size: 16px;
  margin-bottom: 24px;
`;

export const StyledDialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
`;

export const StyledButton = styled(Button)`
  &.MuiButton-root {
    background-color: ${(props) => (props.color === 'secondary' ? '#ee99bf' : '#ffffff')};
    color: ${(props) => (props.color === 'secondary' ? '#ffffff' : '#ee99bf')};
    border: 1px solid #ee99bf;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    text-transform: none;
    border-radius: 20px;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => (props.color === 'secondary' ? '#e580aa' : '#fff0f5')};
    }
  }
`;

export const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #ee99bf;
  transition: color 0.3s ease;

  &:hover {
    color: #e580aa;
  }

  &:disabled {
    color: #cccccc;
    cursor: not-allowed;
  }
`;
