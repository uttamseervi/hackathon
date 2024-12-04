import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { Dashboard, PredictPage, Suggestions, SuggestionsPage } from "./components/index"
import Layout from "./components/layout/Layout"
import { Provider } from "react-redux"
import store from './store/store'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path='/predict' element={<PredictPage />} />
      <Route path='suggestions' element={<SuggestionsPage />} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </StrictMode>,
)
