'use client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Todos from './components/test-react-query';
import { BearCounter, Controls } from './components/counter';

export const title = 'hihi';
export default function SonnerDemo() {
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast
      </Button>
      <Todos />
      <BearCounter />
      <Controls />
    </>
  );
}
