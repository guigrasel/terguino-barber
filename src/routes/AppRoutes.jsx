import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout.jsx'
import ClientLayout from '../layouts/ClientLayout.jsx'
import Dashboard from '../pages/admin/Dashboard/index.jsx'
import Professionals from '../pages/admin/Professionals/index.jsx'
import Services from '../pages/admin/Services/index.jsx'
import Schedule from '../pages/admin/Schedule/index.jsx'
import AppointmentHistory from '../pages/admin/AppointmentHistory/index.jsx'
import AppointmentConfirmation from '../pages/client/AppointmentConfirmation/index.jsx'
import ClientLogin from '../pages/client/ClientLogin/index.jsx'
import MyAppointments from '../pages/client/MyAppointments/index.jsx'
import NewAppointment from '../pages/client/NewAppointment/index.jsx'
import NotFound from '../pages/NotFound/index.jsx'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route index element={<ClientLogin />} />
          <Route path="agendamento" element={<NewAppointment />} />
          <Route path="meus-agendamentos" element={<MyAppointments />} />
          <Route path="confirmacao" element={<AppointmentConfirmation />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profissionais" element={<Professionals />} />
          <Route path="servicos" element={<Services />} />
          <Route path="agenda" element={<Schedule />} />
          <Route path="historico" element={<AppointmentHistory />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
