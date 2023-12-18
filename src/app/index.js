import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Authorization from './authorization';
import User from './user';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import ProtectedRouteElement from '../components/protected-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore()

  useInit(() => {
    store.actions.auth.tokenCheck()
  }, []);

  const select = useSelector(state => ({
    access: state.auth.access,
    isLoading: state.auth.isLoading
  }))

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Authorization />} />
        <Route path={'/profile'} element={!select.isLoading && <ProtectedRouteElement element={User} loggedIn={select.access} />}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
