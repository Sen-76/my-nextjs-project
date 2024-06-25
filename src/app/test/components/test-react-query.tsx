import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import service from '@/common/services/apis';
import { Button } from '@/components/ui/button';

export default function Todos() {
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ['todos'], queryFn: service.todos.getTodos });

  const mutation = useMutation({
    mutationFn: service.todos.postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      console.log('error');
    },
  });

  return (
    <div>
      <ul>
        {query.data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <Button
        variant="outline"
        onClick={() => {
          mutation.mutate({
            id: Date.now().toString(),
            title: 'Do Laundry',
          });
        }}
      >
        Add Todo
      </Button>
    </div>
  );
}
