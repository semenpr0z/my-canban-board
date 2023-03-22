import { Board } from "./component/board/board";
import { Footer } from "./component/footer/footer";
import { Header } from "./component/header/header";
import { Layout } from "./component/layout/layout";


function App() {
  return (
    <Layout>
      <Header/>
      <main>
        <Board/>
      </main>
      <Footer/>
    </Layout>
  );
}

export default App;
