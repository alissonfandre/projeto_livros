import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemAutores from "./ItemAutores"; 
const ManutencaoAutores = () => {
    const {register, handleSubmit, reset} = useForm();
    const [autores, setAutores] = useState([]);

    const obterLista = async () => {
        try{
            const lista = await api.get("autores");
            setAutores(lista.data);
        }catch(error){
            alert(`Erro: ..Não foi possível obter os dados: ${error}`);
        }
    }


//define o método que será executado assim que o componente for renderizado
useEffect(() => {
    obterLista();
},[]);

const filtrarLista = async (campos) => {
    try{
        const lista = await api.get(`autores/filtro/${campos.palavra}`);
        lista.data.length
        ? setAutores(lista.data)
        : alert("Não há Autores cadastrados com a palavra chave pesquisada");
    }catch(error){
        alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
}

const excluir = async (id, ItemAutores) => {
    if (!window.confirm(`Confirma a exclusão do editoras ${ItemAutores}?`)) {
      return;
    }
    try {
      await api.delete(`autores/${id}`);
      setAutores(autores.filter(autores => autores.id !== id));
    } catch (error) {
      alert(`Erro: ..Não foi possível excluir os autores ${ItemAutores}: ${error}`);
    }
  };


//alterar os registros
const alterar = async (id,telefone,index) => {
    const novotelefone = Number(prompt(`Digite o novo telefone ${telefone}`));
    if (isNaN(novotelefone) || novotelefone <= 0 ) {
        alert('Digite um telefone valido!')
        return;
    }
    try{//captura os erros 
        //chamando o backend e passando os dados
        await api.put(`telefone/${id}`,{telefone: novotelefone});
        const telefoneAtualizados = [...telefone];
        const indicetelefone = telefoneAtualizados.findIndex(telefone => telefone.id === id);
        telefoneAtualizados[indicetelefone].telefone = novotelefone;
        setAutores(telefoneAtualizados);
        obterLista();
    }catch(error){
        alert(`Erro: ..Não foi possível alterar o autor ${telefone}: ${error}`);
    }
}

    return (
       <div className="container">
        <div className="row">
            <div className="col-sm-7">
                <h4 className="fst-italic mt-3">Manutenção Autores</h4>
            </div>
            <div className="col-sm-5">
                <form onSubmit={handleSubmit(filtrarLista)}>
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="telefone ou Autor" required {...register("palavra")} />
                        <input type="submit" className="btn btn-primary" value="Pesquisar" />
                        <input type="button" className="btn btn-danger" value="Todos" onClick={()=>{reset({palavra:""});obterLista();}}/>
                    </div>
                </form>
            </div>
        </div>
        
        <table className="table table-striped mt-3">
            <thead>
                <tr>
                    <th>Cód.</th>
                    <th>nome</th>
                    <th>sobrenome</th>
                    <th>idade</th>
                    <th>data_nascimento</th>
                    <th>sexo</th>
                    <th>telefone</th>
                </tr>
            </thead>
            <tbody>
                {autores.map((autores) => (
                    <ItemAutores
                        key={autores.id}
                        id={autores.id}
                        nome={autores.nome}
                        sobrenome={autores.sobrenome}
                        idade={autores.idade}
                        data_nascimento={autores.data_nascimento}
                        sexo={autores.sexo}
                        telefone={autores.telefone}
                        excluirClick={()=>excluir(autores.id,autores.telefone)}
                        alterarClick={()=>alterar(autores.id,autores.telefone)}
                    />
                ))}
            </tbody>
        </table>

       </div> 
    );
};

export default ManutencaoAutores;
