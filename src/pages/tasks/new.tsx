import {Card, Form, Button, Icon, Grid, Confirm} from 'semantic-ui-react'
import {ChangeEvent, FormEvent, useState, useEffect} from 'react'
import { Task } from '@/src/interfaces/Task';
import { useRouter } from 'next/router';
import Layout from '@/src/components/Layout';


export default function newPage() {

    const router = useRouter();

    const [task, setTask] = useState({
        title: '',
        description: ''
    })
    
    const [openConfirm, setOpenConfirm] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        //console.log(e.target.name, e.target.value);
        setTask({...task, [e.target.name]:e.target.value})
    }

    const createTask = async (task: Task) => {
        await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(task)
        })
    }

    const updateTask = async (id: string, task: Task) => {
        await fetch("http://localhost:3000/api/tasks/"+ id,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(typeof router.query.id === "string"){
                updateTask(router.query.id, task)
                
            }
            else{
                createTask(task);
                
            }
            router.push('/')
        } catch (error) {
            console.log(error);
        };

    };

    const loadTask = async (id:string) => {
        const res = await fetch('http://localhost:3000/api/tasks/' + id)
        const task = await res.json()
        setTask({title:task.title, description: task.description});
    };

    const handleDelete = async (id:string)=>{
        try {
            await fetch("http://localhost:3000/api/tasks/" + id,{
            method: 'DELETE',
        });
        router.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (typeof router.query.id === "string"){
          loadTask(router.query.id)
        } 
    },[router.query])

  return (
    <Layout>
      <Grid centered columns={3} verticalAlign='middle' style={{height: "70%"}}>
        <Grid.Column>
        <Card>
        <Card.Content>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label htmlFor="title">Título:</label>
                    <input type="text" placeholder='Escriba su titulo' name='title' onChange={handleChange}  value={task.title}/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="description">Descripción:</label>
                    <textarea name="description" rows={2} placeholder="Escriba su descripción" onChange={handleChange} value={task.description}></textarea>
                </Form.Field>
                {
                    router.query.id ?(
                        <Button color='teal'>
                            <Icon name='save'/>
                            Actualizar
                        </Button>
                    ):(<Button primary>
                        <Icon name='save'/>
                        Guardar
                    </Button>
                    )
                }
            </Form>
        </Card.Content>
      </Card>
                <Button color='red' onClick={()=> setOpenConfirm(true)}>
                    Eliminar
                </Button>
        </Grid.Column>
      </Grid>
      <Confirm  
        header='Eliminar Tarea'
        content={`¿Estas seguro que deseas eliminar la tarea ${router.query.id}?`}
        open={openConfirm}
        onCancel = {() => setOpenConfirm(false)}
        onConfirm = {()=> handleDelete(router.query.id)}
      />
    </Layout>
  )
}
