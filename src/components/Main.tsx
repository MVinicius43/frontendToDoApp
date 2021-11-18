import { useEffect, useState } from 'react'
import { TextField, Box, Card, Avatar, Checkbox, Typography, Button } from '@material-ui/core'
import _ from 'lodash'
import { toast } from 'react-toastify'
import api from '../api/api'

interface IData {
    id: string
    title: string
}

const Main = () => {
    const [newTask, setNewTask] = useState('')
    const [tasks, setTasks] = useState([])
    
    const getTasks = () => new Promise(() => {
        api.getData().then(data => {
            setTasks(data)
        }).catch(() => {
            toast.error('Error get data.')
        })
    })

    const sendData = () => new Promise(async () => {
        api.sendData(`${tasks.length + 1}`, newTask).then(() => {
            toast.success('Success')
        }).catch(() => {
            toast.error('Error send data.')
        })

        await getTasks()
    })
    
    useEffect(() => {
        const hydrate = async () => {
            try {
                await getTasks()
            } catch (e) {
                console.log(e)
            }
        }
        hydrate()
    }, [])
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', color: '#5D478B', fontSize: 20, margin: 10 }} >
            To Do App

            <Box sx={{ height: 50, display: 'flex', alignItems: 'center' }}>
                <TextField 
                    onChange={e => { setNewTask(e.target.value) }}
                    variant="standard"
                    label="Digite nova tarefa:"
                    sx={{ width: 200, height: 50 }}
                />

                <Button variant="contained"
                        onClick={() => { sendData() }}
                        sx={{ height: 40, marginLeft: 5, marginTop: 2 }}
                >Adicionar</Button>
            </Box>

            <Box sx={{ display:'flex', flexDirection: 'row' }}>
                {
                    _.map(tasks, (item: IData, index) => {
                        return (
                            <Card sx={{ width: 180, padding: 3, height: 150,  marginTop: 10, marginLeft: 3, backgroundColor: '#5D478B', color: 'white', display: 'flex',}}>
                                <Box sx={{ display:'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                    <Avatar>{index + 1}</Avatar>
                                    <Typography marginTop="20px">{item.title}</Typography>
                                </Box>
                                <Checkbox sx={{ marginTop: -4, marginLeft: 5 }}></Checkbox>
                            </Card>
                        )
                    })
                }
            </Box>
            
        </Box>
    )
}

export default Main