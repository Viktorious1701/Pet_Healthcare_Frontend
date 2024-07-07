import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DeleteIcon } from 'lucide-react';

interface UserDeleteDialogProps {
  onDeleteUser: () => void;
}

const UserDeleteDialog: React.FC<UserDeleteDialogProps> = ({ onDeleteUser }) => {
  return (
    // <GridActionsCellItem
    //     icon={<DeleteIcon />}
    //     label="Delete"
    //     color="inherit"
    //     onClick={handleDeleteClick(id)}
    //   />,
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <DeleteIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this account and remove the account's data from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-custom-lightCrimson text-white' onClick={onDeleteUser}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UserDeleteDialog;
