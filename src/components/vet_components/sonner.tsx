import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export default function Sonner() {
  return (
    <>
      <Button
        variant='outline'
        onClick={() => {
          toast('Event has been created', {
            type: 'success',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo')
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any);
        }}
      >
        Show Toast
      </Button>
    </>
  );
}
