import { Task } from "../interfaces/Task";
import {Grid, Button} from 'semantic-ui-react'
import { useRouter } from "next/router";
import TaskList from "../components/tasks/TaskList";
import Layout from "../components/Layout";

interface Props {
  tasks: Task[]
}

export default function IndexPage({tasks}: Props) {

  const router = useRouter()

  return <Layout>
    {tasks.length === 0 ? 
    (<Grid
      columns={3}
      centered
      verticalAlign="middle"
      style = {{height: "70%"}}
    >
      <Grid.Row>
        <Grid.Column>
          <h1>No hay Tareas</h1>
          <Button primary onClick={() => router.push('/tasks/new')}>Crear Tareas</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>) : 
    (<TaskList tasks={tasks}/>

    )}
    </Layout>
}

export const getServerSideProps = async() => {

  const res = await fetch('http://localhost:3000/api/tasks')
  const tasks = await res.json()
  console.log(tasks)

  return {
    props: {
      tasks: tasks,
    },
  };
};

