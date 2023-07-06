import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemEditoras from "./ItemEditoras";

const ManutencaoEditoras = () => {
    const {register, handleSubmit, reset} = useForm();
    const [editoras, setEditoras] = useState([]);

    const obterLista = async () => {
        try{
            const lista = await api.get("editoras");
            setEditoras(lista.data);
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
        const lista = await api.get(`editoras/filtro/${campos.palavra}`);
        lista.data.length
        ? setEditoras(lista.data)
        : alert("Não há Editoras cadastrados com a palavra chave pesquisada");
    }catch(error){
        alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
}

const excluir = async (id, itemEditoras) => {
    if (!window.confirm(`Confirma a exclusão do editoras ${itemEditoras}?`)) {
      return;
    }
    try {
      await api.delete(`editoras/${id}`);
      setEditoras(editoras.filter(editora => editora.id !== id));
    } catch (error) {
      alert(`Erro: ..Não foi possível excluir o editoras ${itemEditoras}: ${error}`);
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
        setEditoras(telefoneAtualizados);
        obterLista();
    }catch(error){
        alert(`Erro: ..Não foi possível alterar o telefone ${telefone}: ${error}`);
    }
}

    return (
       <div className="container">
        <div className="row">
            <div className="col-sm-7">
                <h4 className="fst-italic mt-3">Manutenção Editoras</h4>
            </div>
            <div className="col-sm-5">
                <form onSubmit={handleSubmit(filtrarLista)}>
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="telefone ou Editora" required {...register("palavra")} />
                        <input type="submit" className="btn btn-primary" value="Pesquisar" />
                        <input type="button" className="btn btn-danger" value="Todos" onClick={()=>{reset({palavra:"palavra"});obterLista();}}/>
                    </div>
                </form>
            </div>
        </div>
        
        <table className="table table-striped mt-3">
            <thead>
                <tr>
                    <th>Cód.</th>
                    <th>nome</th>
                    <th>cidade</th>
                    <th>estado</th>
                    <th>telefone</th>
                    <th>rua</th>
                    <th>cep</th>
                </tr>
            </thead>
            <tbody>
                {editoras.map((editoras) => (
                    <ItemEditoras
                        key={editoras.id}
                        id={editoras.id}
                        nome={editoras.nome}
                        cidade={editoras.cidade}
                        estado={editoras.estado}
                        telefone={editoras.telefone}
                        rua={editoras.rua}
                        cep={editoras.cep}
                        excluirClick={()=>excluir(editoras.id,editoras.telefone)}
                        alterarClick={()=>alterar(editoras.id,editoras.telefone)}
                    />
                ))}
            </tbody>
        </table>

       </div> 
    );
};

export default ManutencaoEditoras;