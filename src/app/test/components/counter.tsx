import { Button } from '@/components/ui/button';
import useCountStore from '@/common/stores/counter';

export function BearCounter() {
  const bears = useCountStore((state: A) => state.count);
  return <h1>{bears} around here...</h1>;
}

export function Controls() {
  const increment = useCountStore((state: A) => state.increment);
  return (
    <Button variant="outline" onClick={() => increment(1)}>
      one up
    </Button>
  );
}
