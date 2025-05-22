import Counter from "./components/counter/Counter";
import TodoList from "./components/todo/TodoList";



export default function Home() {
  return (
   <>
   <section className="container">
       <h1>Redux - RTKs</h1>
       <hr/>
       <Counter />
       <hr/>
      <TodoList />      
      </section>
   </>
  );
}
