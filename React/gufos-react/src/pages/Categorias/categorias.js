import React,{Component} from "react";

//imagem
import logo from '../../assets/img/icon-login.png'


//component
import Rodape from '../../components/Rodape';
import Titulo from '../../components/Titulo';
 

class Categorias extends Component{

  //Criando o state
  constructor(){
      super();
      this.state = {
          lista: [
              // {idCategoria: 1, nome: 'Design'},
              // {idCategoria: 2, nome: 'Jogos'},
              // {idCategoria: 3, nome: 'Meetup'}
            ],

            // nome:""
      }
  }

  componentDidMount(){
        this.listarCategorias();
  }

  listarCategorias = () =>{
    fetch('http://192.168.7.85:5000/api/categorias')
    .then(Response => Response.json())
    .then(data => this.setState({lista: data}));
  }

  // adicionaItem =(event) =>{
  //       event.preventDefault();

  //       let lista = {idCategoria: 4, nome: 'Nova Categoria'}
  //       let lista_state = this.state.lista;

  //       lista_state.push(lista);

  //       this.setState({lista: lista_state});
  // }


  cadastrarCategoria = (event) =>{
    event.preventDefault();
    
    fetch('http://192.168.7.85:5000/api/categorias',{
      method: "POST",
      body: JSON.stringify({ nome: this.state.nome }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => this.listarCategorias())
    .catch(erro => console.log(erro));
  }


  //capturar o valor do imput
  nomeCategoria = (event) =>{
    //alterar o estado
    this.setState({nome: event.target.value});
    console.log(this.state);
    
  }

    render(){
        return(
            <div>
      <header className="cabecalhoPrincipal">
        <div className="container">
          <img src={logo} />

          <nav className="cabecalhoPrincipal-nav">
            Administrador
          </nav>
        </div>
      </header>

      <main className="conteudoPrincipal">
        <section className="conteudoPrincipal-cadastro">
          <Titulo titulo="Categorias" />
          <div className="container" id="conteudoPrincipal-lista">
            <table id="tabela-lista">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Título</th>
                </tr>
              </thead>

              <tbody id="tabela-lista-corpo">
                    {this.state.lista.map(element => {
                        return(
                            <tr key={element.idCategoria}>
                                <td>{element.idCategoria}</td>
                                <td>{element.nome}</td>
                            </tr>
                        );
                    })}
              </tbody>
            </table>
          </div>

          <div className="container" id="conteudoPrincipal-cadastro">
            <h2 className="conteudoPrincipal-cadastro-titulo">
              Cadastrar Categoria
            </h2>
            <form onSubmit={this.cadastrarCategoria}>
              <div className="container">
                <input
                  type="text"
                  className="className__categoria"
                  id="input__categoria"
                  placeholder="tipo do evento"
                  value={this.state.nome}
                  onChange={this.nomeCategoria}
                />
                <button
                  id="btn__cadastrar"
                  className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Rodape/>
    </div>
        );
    }
}
export default Categorias;