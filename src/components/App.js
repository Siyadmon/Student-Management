import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutUs from './AboutUs';
import Header from './Header';
import Home from './Home';
import SignUp from './SignUp';
import '../css/styles.css';
import Login from './Login';
import PrivateRouting from './PrivateRouting';
import Discussions from './Discussions';
import Grievance from './Grievance';
import ChangePassword from './ChangePassword';
import View from './View';
import AddGrievance from './AddGrievance';
import AddDiscussions from './AddDiscussions';
import PhpStudy from './P2pStudy';
import FormikTest from './FormikTest';

export const Context = createContext();
export const ViewContext = createContext();

const App = () => {
  const [show, setShow] = useState(false);
  const [showView, setShowView] = useState(false);

  return (
    <div>
      <Context.Provider value={[show, setShow]}>
        <ViewContext.Provider value={[showView, setShowView]}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRouting />}>
              <Route path="/grievance" element={<Grievance />} />
              <Route path="/add-grievance" element={<AddGrievance />} />
              <Route path="/add-grievance/:grevId" element={<AddGrievance />} />
              <Route path="/discussions" element={<Discussions />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/view" element={<View />} />
              <Route path="/add-discussions" element={<AddDiscussions />} />
              <Route path="/sign-up/:id" element={<SignUp />} />
              <Route path="/php-study" element={<PhpStudy />} />
              <Route path="/formik-test" element={<FormikTest />} />
            </Route>
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </ViewContext.Provider>
      </Context.Provider>
    </div>
  );
};

export default App;
