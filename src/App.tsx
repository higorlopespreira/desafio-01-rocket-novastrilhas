import { useState } from 'react'
import {Header} from './componentes/Header';
import styles from './App.module.css';
import {Clipboard, PlusCircle} from 'phosphor-react';
import {Tarefas} from './componentes/Tarefas'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';


interface tarefas {
    id:string,
    task:string,
    status:boolean
}
function App() {


    const [tarefas,setTarefas] = useState<tarefas[]>([])
    const [novatarefa,setNovatarefa] = useState('');

    const [concluidas,setconcluidas] = useState(0);
    const [todastarefas,settodastarefas] = useState(0);
    function handelchangenovatarefa(){
        // @ts-ignore
        setNovatarefa(event.target.value);
    }

    function handleformtarefas(){
        // @ts-ignore
        event.preventDefault()
        // @ts-ignore
        setTarefas([...tarefas,{id : uuidv4(), task : novatarefa, status : false}])
        setNovatarefa('')
        let t = todastarefas+1;
        settodastarefas(t);
    }
    function  handlealterar (idalt:string){

        const taskIndex = tarefas.findIndex((task) => {
            return task.id == idalt;
        });


        const tempTarefas = [...tarefas];
        if (tempTarefas[taskIndex].status === false){
            let con = concluidas+1;
            setconcluidas(con);
        }else{
            let con = concluidas-1;
            setconcluidas(con);

        }


        tempTarefas[taskIndex].status = !tempTarefas[taskIndex].status;


        setTarefas(tempTarefas);


    }

        function handleexluir(idexluir:string){

            const taskIndex = tarefas.findIndex((task) => {
                return task.id == idexluir;
            });


            const tempTarefas = [...tarefas];
            if (tempTarefas[taskIndex].status === true){
                let con = concluidas-1;
                setconcluidas(con);
            }

    const novalistatarefasdelete = tarefas.filter(taref => {
        return taref.id !== idexluir
    })
    setTarefas(novalistatarefasdelete)
            let t = todastarefas -1;
            settodastarefas(t);
}

    if(tarefas.length === 0){

        return (
            <div >
                <Header/>
                <div >
                    <form onSubmit={handleformtarefas} className={styles.form}>
                        <input name="novatarefa" onChange={handelchangenovatarefa} value={novatarefa} placeholder="Adicione uma tarefa" />
                        <button type="submit" >Criar <PlusCircle size={16}/> </button>
                    </form>

                </div>

                <div className={styles.main}>
                    <div className={styles.corpo}>
                        <header className={styles.cabeca}>
                            <strong>Tarefas criadas <span>{todastarefas}</span></strong>
                            <span className={styles.concluidas}> Concluídas <span>{concluidas}</span> </span>
                        </header>
                        <div className={styles.conteudobox}>


                            <Clipboard size={56}/>
                            <p>Você ainda não tem tarefas cadastradas</p>
                            <p> Crie tarefas e organize seus itens a fazer</p>



                        </div>
                    </div>

                </div>
            </div>
        )
    }else{
        return (
            <div >
                <Header/>
                <div >
                    <form onSubmit={handleformtarefas} className={styles.form}>
                        <input name="novatarefa" onChange={handelchangenovatarefa} value={novatarefa} placeholder="Adicione uma tarefa" />
                        <button type="submit" >Criar <PlusCircle size={16}/> </button>
                    </form>

                </div>

                <div className={styles.main}>
                    <div className={styles.corpo}>
                        <header className={styles.cabeca}>
                            <strong>Tarefas criadas <span>{todastarefas}</span></strong>
                            <span className={styles.concluidas}> Concluídas <span>{concluidas}</span> </span>
                        </header>
                        <div className={styles.conteudobox}>

                            {
                                tarefas.map(tarefa => {
                                    return(<Tarefas key={tarefa.id} id={tarefa.id} status={tarefa.status} task={tarefa.task} handleexluir={handleexluir} handlealterar={handlealterar}/>)
                                })
                            }




                        </div>
                    </div>

                </div>
            </div>
        )
    }


}

export default App
