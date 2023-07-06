import MenuSuperior from './components/MenuSuperior';
import InclusaoLivros from './components/InclusaoLivros';
import InclusaoAutores from './components/InclusaoAutores';
import InclusaoEditoras from './components/InclusaoEditoras';
import {Routes,Route} from 'react-router-dom';
import ManutencaoLivros from './components/ManutencaoLivros';
import ManutencaoAutores from './components/ManutencaoAutores';
import ManutencaoEditoras from './components/ManutencaoEditoras';

import ResumoLivros from './components/ResumoLivros';
const App = () => {
  return(  //tudo que vai aqui no return é o que aparece na aplicação
    <>
      <MenuSuperior/>
      <Routes>
        <Route path="/" element={<InclusaoLivros/>}/>
        <Route path="/autores" element={<InclusaoAutores/>}/>
        <Route path="/manutencaoAutores" element={<ManutencaoAutores/>}/>
        <Route path="/manutencaoEditoras" element={<ManutencaoEditoras/>}/>
        <Route path="/editoras" element={<InclusaoEditoras/>}/>
        <Route path="/manutencao" element={<ManutencaoLivros/>}/>
        <Route path="/resumo" element={<ResumoLivros/>}/>
      </Routes>
    </>
  )
}

export default App;