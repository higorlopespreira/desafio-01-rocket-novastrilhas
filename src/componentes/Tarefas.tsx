import styles from './Tarefas.module.css';
import {Trash,CheckCircle} from 'phosphor-react';

interface conteudo {
    id:string,
    task:string,
    status:boolean,
    handleexluir:(ids:string) => void
    handlealterar:(idalt:string) => void;
}


export  function Tarefas ({id,task,status,handleexluir,handlealterar}:conteudo){
    console.log(status)
    function handleexecuta(){
        handlealterar(id);
    }
    function handletras(){
        handleexluir(id)
    }


        if(status===true){
            return(<aside className={styles.concluido} >
                <a onClick={handleexecuta}  className={styles.butoncheck} ><CheckCircle size={24}/></a>
                <p>{task}</p>
                <a onClick={handletras} className={styles.butontrash}> <Trash/></a>
            </aside>)
        }else{
            return(<aside className={styles.tarefabox} >
                <a onClick={handleexecuta}  className={styles.butoncheck} ><CheckCircle size={24}/></a>
                <p>{task}</p>
                <a onClick={handletras} className={styles.butontrash}> <Trash/></a>
            </aside>)
        }


}