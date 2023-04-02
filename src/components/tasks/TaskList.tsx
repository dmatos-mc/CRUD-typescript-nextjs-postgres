import { Task } from '@/src/interfaces/Task';
import {Card} from 'semantic-ui-react'
import { useRouter } from 'next/router';

interface Props {
    tasks: Task[];
}

function TaskList({tasks}: Props) {
  //  console.log(tasks);
    const router = useRouter();
  return (
  <Card.Group itemsPerRow={4}>
    {tasks.map(tasks => (
        <Card key={tasks.id} onClick= {() => router.push(`/tasks/edit/${tasks.id}`)}>
            <Card.Content>
                <Card.Header>{tasks.title}</Card.Header>
                {tasks.create_on &&(
                <Card.Meta>
                    {new Date(tasks.create_on).toLocaleDateString()}
                </Card.Meta>
                )}
                
                <Card.Description>{tasks.description}</Card.Description>
            </Card.Content>
        </Card>
    ))}
  </Card.Group>
  )
}

export default TaskList
