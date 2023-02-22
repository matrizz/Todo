import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import './Todo.css'
import Dark from "../assets/Dark_mode";
import Light from "../assets/Light_mode";


export default () => {
    const [ inputText, setInputText ] = useState("");
    const [ todos, setTodos ] = useState([]);
    const [ theme, setTheme ] = useState(false)
    
    
    function handleAddTodo() {
    const newTodo = {
      text: inputText,
      checked: false
    };
    setTodos([...todos, newTodo]);
    setInputText("");

    // coloca o novo todo no cookie
    Cookies.set("todos", JSON.stringify([...todos, newTodo], {expires: 7}));
  }

  function handleToggleChecked(index) {
    const newTodos = [...todos]
    newTodos[index].checked = !newTodos[index].checked
    setTodos(newTodos)

    // atualiza o cookie com os todos atualizados
    Cookies.set("todos", JSON.stringify(newTodos))
  }

  // verifica se tem algum cookie com as tarefas/todos salvos para atualizar o estado
  useEffect(() => {
      const savedTodos = Cookies.get("todos")
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])
  
  const clearStorage = a => {
      Cookies.remove("todos")
      if (a) {
          location.reload()
        }
    }
    
  function handleToggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'lightmode' ? 'darkmode' : 'lightmode';
    document.documentElement.setAttribute('data-theme', newTheme);
    Cookies.set('_THEME_', newTheme);
    setTheme(!theme)
  }

  
  useEffect(() => {
      const _THEME = Cookies.get('_THEME_');
      if (_THEME) {
          document.documentElement.setAttribute('data-theme', _THEME);
        }
    }, []);
    const isDark = () => {
        const THPR = document.querySelector('html').getAttribute('data-theme')
        return THPR === 'darkmode'? true : false
    }

  return (
    <div className="head-div">
        <span className="v">1.0.6v</span>
      <h1>Minha lista de tarefas:</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        
      />
      <div className="buttons">
        <div>
            <button onClick={inputText !== ''? handleAddTodo : () => alert("Input is empty, please type something")}>Adicionar</button>
            <button onClick={() => confirm('Realmente deseja apagar todas as tarefas?')? clearStorage(true) : ''}>Limpar</button>
            <button onClick={handleToggleTheme} style={{width: '5rem'}}>{isDark()? <Light h={28} w={28}/> : <Dark h={28} w={28}/>}</button>
        </div>
      </div>
      <div className="list-all">
        {todos.map((todo, index) => (
          <div className="item" key={index}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleToggleChecked(index)}
            />
            {todo.text}
          </div>
        ))}
      </div>
        <div className="beta">
            <h1 className="watermark">BETA</h1>
        </div>      
    </div>
  );
}