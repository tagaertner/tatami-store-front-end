import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading, Navbar, Footer } from "../components";

function HomeLayout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <div className='align-element py-20 flex-1'>
        {isPageLoading ? <Loading /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
}
export default HomeLayout;