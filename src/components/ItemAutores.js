import "../css/ItemAutores.css";
 //nome, sobrenome, idade, data_nascimento, sexo, telefone
const ItemAutores = ({id,nome,sobrenome,idade,data_nascimento,sexo,telefone,excluirClick,alterarClick}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{nome}</td>
            <td>{sobrenome}</td>
            <td>{idade}</td>
            <td>{data_nascimento}</td>
            <td>{sexo}</td>
            <td>{telefone}</td>

            <td class="text-end">
                {Number(telefone).toLocaleString("pt-br", {minimumFractionDigits:2})}
            </td>
            
            <td class="text-center">
                <i className="exclui text-danger fw-bold" title="Excluir" onClick={excluirClick}>&#10008;</i>
                <i className="altera text-sucess fw-bold ms-2" title="Alterar" onClick={alterarClick}>&#36;</i>
            </td>
        </tr>
    );
};

export default ItemAutores;