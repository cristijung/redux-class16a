import Counter from "./components/counter/Counter";
import TodoItem from "./components/todos/TodoItem";


export default function Home() {
  return (
   <>
   <section className="container">
       <h1>Redux - RTKs</h1>
       <hr/>
       <Counter />
       <hr/>
      
      </section>
   </>
  );
}
